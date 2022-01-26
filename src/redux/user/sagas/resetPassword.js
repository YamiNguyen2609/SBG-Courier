import {takeEvery, put} from 'redux-saga/effects';
import r from 'reactotron-react-native';
import {showMessage} from 'react-native-flash-message';
import {Buffer} from 'safe-buffer';

import {Colors} from '../../../themes';
import {ACTION, onFailure} from '../redux/resetPassword';
import {onSuccess} from '../redux/loginUser';
import UserAPI from '../../../api/UserAPI';
import {attachCar} from '../../car/redux/carHandle';
import {
  flagIndicator,
  showFlagMessage,
  hideFlagMessage,
  messageWarning,
} from '../../app';
import {_saveToken} from '../../../helpers/LocalStorage';

function* resetPassword(action) {
  try {
    yield put(flagIndicator(true, {color: Colors.appColor}));
    var response = yield UserAPI.resetPassword(
      action['username'],
      action['phone'],
      'songbinh',
    );

    console.log('res', response);

    if (response['isSuccess']) {
      console.log('1', action['username'] + ':songbinh');

      let base64 = Buffer.from(
        action['username'].toUpperCase() + ':songbinh',
      ).toString('base64');

      console.log('res', base64);

      var res = yield UserAPI.loginUser(base64);

      action['password'] = 'songbinh';

      yield loginSuccess(action, res);
    }

    yield put(flagIndicator(false));
    yield put(onFailure());
  } catch (error) {
    yield put(flagIndicator(false));
    r.log(JSON.stringify(error));
  }
}

function* loginSuccess(action, res) {
  let company = 1; //sbp

  var con = {
    pushLocationInterval: 120000,
  };

  if (action['token']) {
    _saveToken(
      res['data']['access_token'],
      res['data']['secret'],
      res['data']['access_system'],
      JSON.stringify(con),
    );
  }
  if (res['data']['vehicle']) {
    yield put(attachCar(res['data']['vehicle']));
  }
  yield put(
    onSuccess({
      full_name: res['data']['fullname'],
      // companyId: 'sbp',
      companyId:
        res['data']['company'] == company || res['data']['company'] == null
          ? 'sbp'
          : 'sbs',
      username: action['username'].toUpperCase(),
      password: action['password'],
      role: res['data']['role'],
      //multi: true,
      multi: res['data']['isAllowMultiStation'],
    }),
  );
  if (action['notify']) {
    let message = [];
    if (res['data']['vehicle']) {
      if (res['data']['vehicle']['oil_warning']) {
        if (res['data']['vehicle']['oil_warning_odometer'] > 0)
          message.push(
            'Xe ' +
              res['data']['vehicle']['license_plate'] +
              ' còn ' +
              res['data']['vehicle']['oil_warning_odometer'] +
              ' km là đến kỳ hạn thay nhớt',
          );
        else if (res['data']['vehicle']['oil_warning_odometer'] < 0)
          message.push(
            'Xe ' +
              res['data']['vehicle']['license_plate'] +
              ' đã quá kỳ hạn thay nhớt ' +
              Math.abs(res['data']['vehicle']['oil_warning_odometer']) +
              ' km',
          );
        else {
          message.push(
            'Xe ' +
              res['data']['vehicle']['license_plate'] +
              ' đã dến kỳ hạn thay nhớt',
          );
        }
      }
    }

    if (res['data']['expiredWarning']) {
      if (res['data']['expiredDays'] > 0)
        message.push(
          'Giấy phép lái xe của bạn sẽ hết hạn sau ' +
            res['data']['expiredDays'] +
            ' ngày',
        );
      else if (res['data']['expiredDays'] < 0)
        message.push(
          'Giấy phép lái xe của bạn đã quá hạn ' +
            Math.abs(res['data']['expiredDays']) +
            ' ngày',
        );
      else {
        message.push('Xe Giấy phép lái xe của bạn đã quá hạn');
      }
    }
    if (message.length > 0) {
      yield put(messageWarning(message));
    } else {
      yield put(messageWarning([]));
    }
  }
}

export default function* saga() {
  yield takeEvery(ACTION, resetPassword);
}
