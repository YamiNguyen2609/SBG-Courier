import {takeEvery, put} from 'redux-saga/effects';
import r from 'reactotron-react-native';

import {Colors} from '../../../themes';
import {ACTION, onFailure, onSuccess} from '../redux/getListBillId';
import orderAPI from '../../../api/orderAPI';

import {flagIndicator} from '../../app';
import {showMessage} from 'react-native-flash-message';

function* getBillIds(action) {
  try {
    yield put(flagIndicator(true, {color: Colors.appColor}));
    var response = yield orderAPI.getOrders(0);
    yield put(flagIndicator(false));
    if (response.success) {
      yield put(onSuccess(response.result.bill_list));
    } else {
      yield put(onFailure(response.status));
      showMessage({
        message: 'Thông báo lỗi',
        description: response.status,
        type: 'danger',
      });
    }
  } catch (error) {
    yield put(flagIndicator(false));
    yield put(onFailure(JSON.stringify(error)));
  }
}

export default function* saga() {
  yield takeEvery(ACTION, getBillIds);
}
