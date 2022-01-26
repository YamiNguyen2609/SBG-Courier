import {takeEvery, put} from 'redux-saga/effects';
import {showMessage} from 'react-native-flash-message';

import {Colors} from '../../../themes';
import {ACTION, onFailure, onSuccess} from '../redux/getSelling';
import orderAPI from '../../../api/orderAPI';
import {flagIndicator} from '../../app';

function* getSelling(action) {
  try {
    yield put(flagIndicator(true, {color: Colors.appColor}));
    var data = yield orderAPI.checkSellingOrder(action.data);

    yield put(flagIndicator(false));
    if (data['data'] != null) {
      if (data['data'].length > 0) yield put(onSuccess(data['data'][0]));
    } else {
      showMessage({
        type: 'warning',
        message: 'Lỗi scan',
        description: 'Đơn hàng không tồn tại',
      });
    }
  } catch (error) {
    yield put(flagIndicator(false));
    yield put(onFailure(JSON.stringify(error)));
  }
}

export default function* saga() {
  yield takeEvery(ACTION, getSelling);
}
