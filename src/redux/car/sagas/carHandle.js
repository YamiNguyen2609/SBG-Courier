import {takeEvery, put} from 'redux-saga/effects';
import r from 'reactotron-react-native';
import {showMessage} from 'react-native-flash-message';

import {Colors} from '../../../themes';
import {ACTION, onFailure, onSuccess} from '../redux/carHandle';
import carAPI from '../../../api/carAPI';

import {flagIndicator, messageWarning} from '../../app';
// import {_setLicensePlates} from '../../../helpers/LocalStorage';
import {typeMenu} from '../../../helpers/Constants';

function* carAction(action) {
  try {
    console.log(action);
    yield put(flagIndicator(true, {color: Colors.appColor}));
    switch (action.typeItem) {
      case typeMenu.CAR_ATTACH:
        yield attachCar(action);
        break;
      case typeMenu.CAR_DETACH:
        yield detachCar(action);
        break;
    }
    yield put(flagIndicator(false));
  } catch (error) {
    yield put(flagIndicator(false));
    r.log(JSON.stringify(error));
    yield put(onFailure('Đã có lỗi xảy ra, vui lòng thử lại'));
  }
}

function* attachCar(action) {
  let response = yield carAPI.attachCar(
    action.vehicle.replace(/[^A-Za-z0-9]/g, '').toUpperCase(),
  );
  if (response.success) {
    showMessage({
      message: 'Thông báo',
      description: 'Nhận xe thành công',
      type: 'success',
    });
    // yield _setLicensePlates(action.data.toUpperCase());

    yield put(
      onSuccess({
        stateCar: true,
        licensePlates: action.vehicle
          .replace(/[^A-Za-z0-9]/g, '')
          .toUpperCase(),
        // odometer: response['data']['odometer'],
        odometer: response['odometer'],
      }),
    );
    if (response.warning) {
      yield put(messageWarning([response['data']['warning']]));
    }
  } else {
    switch (response['error_code']) {
      case 'VEHICLE_NOT_AVAILABLE':
        showMessage({
          description: response['info']['driver_name'] + ' đang nhận xe',
          message: 'Thông báo',
          type: 'warning',
        });
        break;

      case 'VEHICLE_NOT_FOUND':
        showMessage({
          description: 'Xe chưa được đăng ký trong hệ thống',
          message: 'Thông báo',
          type: 'warning',
        });
        break;
    }
    yield put(onFailure(''));
  }
}

function* detachCar(action) {
  r.log(action);

  let response = yield carAPI.detachCar(
    action.vehicle.replace(/[^A-Za-z0-9]/g, '').toUpperCase(),
    action.odometer,
  );
  r.log('res', response);
  if (response.success) {
    showMessage({
      message: 'Thông báo',
      description: 'Trả xe thành công',
      type: 'success',
    });
    yield put(
      onSuccess({
        stateCar: false,
        licensePlates: '',
        odometer: 0,
      }),
    );
  } else {
    switch (response['error_code']) {
      case 'INVALID_ODOMETER':
        showMessage({
          description: 'Số công tơ mét phải lớn hơn số hiện tại',
          message: 'Thông báo',
          type: 'warning',
        });
        break;

      default:
        showMessage({
          description: 'đã có lỗi xảy ra, vui lòng thử lại',
          message: 'Thông báo',
          type: 'warning',
        });
        break;
    }
    yield put(onFailure(''));
  }
}

export default function* saga() {
  yield takeEvery(ACTION, carAction);
}
