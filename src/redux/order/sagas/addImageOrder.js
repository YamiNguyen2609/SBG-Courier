import {takeEvery, put} from 'redux-saga/effects';
import {showMessage} from 'react-native-flash-message';

import {Colors} from '../../../themes';
import {ACTION, onFailure, onSuccess} from '../redux/addImageOrder';
import orderAPI from '../../../api/orderAPI';
import {flagIndicator} from '../../app';

function* addImageOrder(action) {
  try {
    yield put(flagIndicator(true, {color: Colors.appColor}));
    var response = yield orderAPI.updateImageOrder(action.data);
    yield put(flagIndicator(false));
    if (response.isSuccess) {
      yield put(onSuccess());
    } else {
      showMessage({
        type: 'warning',
        message: 'Lỗi upload ảnh',
        description: 'Đã có lỗi xảy ra, vui lòng thử lại',
      });
      yield put(onFailure(response.status));
    }
  } catch (error) {
    yield put(flagIndicator(false));
    yield put(onFailure(JSON.stringify(error)));
  }
}

export default function* saga() {
  yield takeEvery(ACTION, addImageOrder);
}
