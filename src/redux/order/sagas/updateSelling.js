import {takeEvery, put} from 'redux-saga/effects';
import {showMessage} from 'react-native-flash-message';

import {Colors} from '../../../themes';
import {ACTION, onFailure, onSuccess} from '../redux/updateSelling';
import {clearSelling} from '../redux/getSelling';
import orderAPI from '../../../api/orderAPI';
import {flagIndicator} from '../../app';

function* updateSelling(action) {
  try {
    yield put(flagIndicator(true, {color: Colors.appColor}));
    var data = yield orderAPI.updateSelling(action.data, action.orderId);

    if (data['isSuccess']) {
      showMessage({
        type: 'success',
        message: 'Cập nhật đơn hàng',
        description: 'Cập nhập đơn hàng thành công',
      });
    } else {
      showMessage({
        type: 'warning',
        message: 'Cập nhật đơn hàng',
        description: 'Cập nhập đơn hàng thất bại',
      });
    }
    yield put(flagIndicator(false));
    yield put(clearSelling());
    yield put(onSuccess(data['isSuccess']));
  } catch (error) {
    yield put(flagIndicator(false));
    yield put(onFailure(JSON.stringify(error)));
  }
}

export default function* saga() {
  yield takeEvery(ACTION, updateSelling);
}
