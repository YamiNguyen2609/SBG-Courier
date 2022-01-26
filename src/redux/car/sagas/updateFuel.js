import {takeEvery, put} from 'redux-saga/effects';
import r from 'reactotron-react-native';
import {showMessage} from 'react-native-flash-message';

import {Colors} from '../../../themes';
import {ACTION, onFailure, onSuccess} from '../redux/updateFuel';
import carAPI from '../../../api/carAPI';

import {flagIndicator} from '../../app';

function* updateFuel(action) {
  try {
    yield put(flagIndicator(true, {color: Colors.appColor}));
    yield sleep(1000);
    console.log(
      action.vehicle.replace(/[^A-Za-z0-9]/g, '').toUpperCase(),
      action.litter,
    );
    var response = yield carAPI.gasPump(
      action.vehicle.replace(/[^A-Za-z0-9]/g, '').toUpperCase(),
      action.litter,
    );
    yield put(flagIndicator(false));

    if (response.success) {
      showMessage({
        message: 'Thông báo',
        description: 'Cập nhật xăng trong xe thành công',
        type: 'success',
      });
      yield put(onSuccess(0));
    } else {
      showMessage({
        message: 'Thông báo',
        description: 'Cập nhật xăng trong xe không thành công',
        type: 'warning',
      });
      yield put(onFailure(response.status));
    }
  } catch (error) {
    yield put(flagIndicator(false));
    yield put(onFailure(JSON.stringify(error)));
  }
}

function* sleep(time) {
  yield new Promise(resolve => setTimeout(resolve, time));
}

export default function* saga() {
  yield takeEvery(ACTION, updateFuel);
}
