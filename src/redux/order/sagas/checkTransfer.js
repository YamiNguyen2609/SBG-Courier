import {takeEvery, put} from 'redux-saga/effects';
import r from 'reactotron-react-native';
import {showMessage} from 'react-native-flash-message';
import RNFS from 'react-native-fs';

import {Colors} from '../../../themes';
import {ACTION, onFailure, onSuccess} from '../redux/checkTransfer';
import orderAPI from '../../../api/orderAPI';
import {flagIndicator} from '../../app';

function* checkTransfer(action) {
  try {
    yield put(flagIndicator(true, {color: Colors.appColor}));
    var response = yield orderAPI.checkExistHAWBTransfer(action.data);
    yield put(flagIndicator(false));
    if (response.isSuccess) {
      yield put(onSuccess(response.data[0]));
    } else {
      showMessage({
        type: 'warning',
        message: 'Lỗi scan đơn hàng',
        description: response.message ?? 'Đơn hàng đã được được chuyển',
      });
      yield put(onFailure(response.status));
    }
  } catch (error) {
    yield put(flagIndicator(false));
    yield put(onFailure(JSON.stringify(error)));
  }
}

export default function* saga() {
  yield takeEvery(ACTION, checkTransfer);
}
