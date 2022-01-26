import {takeEvery, put} from 'redux-saga/effects';
import {showMessage} from 'react-native-flash-message';

import {Colors} from '../../../themes';
import {ACTION, onFailure, onSuccess} from '../redux/getListOrder';
import orderAPI from '../../../api/orderAPI';
import {flagIndicator} from '../../app';

function* getOrders(action) {
  try {
    yield put(flagIndicator(true, {color: Colors.appColor}));
    let response = yield orderAPI.getOrders(1, action.page_number);

    yield put(flagIndicator(false));
    if (response.success) {
      yield put(
        onSuccess({
          isRefresh: action.isRefresh,
          data: response.result.bill_list ? response.result.bill_list : [],
          total: response.result.bill_list ? response.result.total : 0,
        }),
      );
    } else {
      console.log(response.status);
      yield put(onFailure(response.status));
      showMessage({
        message: 'Thông báo lỗi',
        description: response.status,
        type: 'warning',
      });
    }
  } catch (error) {
    yield put(flagIndicator(false));
    yield put(onFailure(JSON.stringify(error)));
  }
}

export default function* saga() {
  yield takeEvery(ACTION, getOrders);
}
