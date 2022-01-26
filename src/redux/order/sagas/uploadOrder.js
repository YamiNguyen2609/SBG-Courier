import {takeEvery, put} from 'redux-saga/effects';
import r from 'reactotron-react-native';
import RNFS from 'react-native-fs';

import {Colors} from '../../../themes';
import {ACTION, onFailure, onSuccess} from '../redux/uploadOrder';
import orderAPI from '../../../api/orderAPI';
import {flagIndicator} from '../../app';
import {showMessage} from 'react-native-flash-message';

function* cancelOrder(action) {
  try {
    var res = yield orderAPI.cancelOrder(action);
    if (res.isSuccess) {
      setTimeout(() => {
        showMessage({
          message: 'Huỷ hàng',
          description: 'Huỷ đơn hàng ' + action.orderNumber + ' thành công',
          type: 'success',
        });
      }, 500);
      yield put(onSuccess(true));
    } else {
      yield put(onFailure(false));
    }
    yield put(flagIndicator(false));
  } catch (error) {}
}

function* uploadOrder(action) {
  try {
    var res = yield orderAPI.UploadOrder(action);

    console.log('vo ne');

    if (res.isSuccess) {
      showMessage({
        message: action.typeOrder ? 'Nhận hàng' : 'Giao hàng',
        description:
          (action.typeOrder ? 'Nhận ' : 'Giao ') + 'thành công đơn hàng',
        type: 'success',
      });
      yield put(onSuccess(true));
    } else {
      yield put(onFailure(false));
    }
    yield put(flagIndicator(false));
  } catch (error) {
    console.log(error);
  }
}

function* handleOrder(action) {
  try {
    yield put(flagIndicator(true, {color: Colors.appColor}));
    console.log(action.status, 'check this');
    if (action.status) {
      yield uploadOrder(action.data);
    } else {
      yield cancelOrder(action.data);
    }
  } catch (error) {
    showMessage({
      type: 'warning',
      message: 'Lỗi cập nhật đơn hàng',
      description: error.message,
    });
    yield put(flagIndicator(false));
  }
}

export default function* saga() {
  yield takeEvery(ACTION, handleOrder);
}
