import {takeEvery, put} from 'redux-saga/effects';
import carAPI from '../../../api/carAPI';
import r from 'reactotron-react-native';
import {showMessage} from 'react-native-flash-message';

import {ACTION, onSuccess, onFailure} from '../redux/reportIncident';
// import {getLocation} from '../../location/';
import {flagIndicator} from '../../app';
import {Colors} from '../../../themes';

function* reportIncident(action) {
  try {
    yield put(flagIndicator(true, {color: Colors.appColor}));

    // var location = yield getLocation();

    var res = yield carAPI.incidentCar(
      String(action.vehicle),
      action.id,
      location.location.lat,
      location.location.lng,
      action.note,
    );
    yield put(flagIndicator(false));
    if (res.success) {
      showMessage({
        message: 'Thông báo',
        description: 'Thông báo ' + action.title + ' thành công',
        type: 'success',
      });
      yield put(onSuccess(true));
    } else {
      showMessage({
        message: 'Thông báo',
        description:
          'Thông báo ' + action.title + ' không thành công, vui lòng thử lại',
        type: 'warning',
      });
      yield put(onFailure('Thông báo ' + action.title + ' không thành công'));
    }
  } catch (error) {
    yield put(flagIndicator(false));
    r.log(JSON.stringify(error));
    yield put(
      onFailure(
        'Đã có lỗi xảy ra trong quá trình lấy vị trí, vui lòng thử lại',
      ),
    );
  }
}

export default function* saga() {
  yield takeEvery(ACTION, reportIncident);
}
