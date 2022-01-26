import {takeEvery, put} from 'redux-saga/effects';
import r from 'reactotron-react-native';
import {showMessage} from 'react-native-flash-message';
import RNFS from 'react-native-fs';
import Sound from 'react-native-sound';

import {Colors} from '../../../themes';
import {ACTION, onFailure, onSuccess} from '../redux/checkInOrder';
import orderAPI from '../../../api/orderAPI';
import {flagIndicator} from '../../app';

function* CheckInOrder(action) {
  try {
    yield put(flagIndicator(true, {color: Colors.appColor}));
    yield executeHawb(action);
    yield put(flagIndicator(false));
  } catch (error) {
    yield put(flagIndicator(false));
    yield put(onFailure(JSON.stringify(error)));
  }
}

export default function* saga() {
  yield takeEvery(ACTION, CheckInOrder);
}

function* executeHawb(action) {
  var response = yield orderAPI.createLogCheckIn(action.data, action.station);

  r.log('res', response);

  if (response.isSuccess) {
    response = yield orderAPI.checkInOrder(action.data);

    if (response.isSuccess) {
      showMessage({
        type: 'success',
        message: 'Scan check in hawb',
        description: 'Check in hawb ' + action.data + '  thành công',
      });
    } else {
      var del = yield orderAPI.removeLogCheckIn(action.data, action.station);
      var mess = '';

      if (response.message) {
        mess = response.message;
      } else {
        if (response.data.data.checkin.error.length > 0) {
          let tmp = response.data.data.checkin.error;
          mess = tmp.map(e => e['HAWB'] + '\n' + e['cause']).join('\n');
        }
      }
      showMessage({
        type: 'warning',
        message: 'Scan check in hawb',
        description: mess,
      });
    }
  } else {
    var errMess = '';
    switch (response.data.code) {
      case 'NOT_FOUND':
        if (response.data.error != undefined) {
          if (response.data.error.length > 0)
            errMess = 'Không tìm thấy hawb ' + response.data.error.join(',');
          else errMess = response.data.message;
        } else {
          errMess = response.data.message;
        }
        break;
      case 'EXISTED':
        errMess = response.data.message;
        break;
    }

    showMessage({
      type: 'warning',
      message: 'Lỗi scan đơn hàng',
      description: errMess,
    });
  }
}
