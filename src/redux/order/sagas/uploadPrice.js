import {takeEvery, put} from 'redux-saga/effects';
import r from 'reactotron-react-native';
import RNFS from 'react-native-fs';

import {Colors} from '../../../themes';
import {ACTION, onFailure, onSuccess} from '../redux/uploadPrice';
import orderAPI from '../../../api/orderAPI';
import {flagIndicator} from '../../app';
import {showMessage} from 'react-native-flash-message';

function* uploadPrice(action) {
  try {
    yield put(flagIndicator(true, {color: Colors.appColor}));
    var res = yield orderAPI.UploadPrice(action.data);
    yield put(flagIndicator(false));
    if (res.isSuccess) {
      yield put(onSuccess(true));
    } else {
      showMessage({
        type: 'warning',
        message: 'Lỗi thanh toán',
        description: res.message,
      });
      yield put(onFailure(false));
    }
  } catch (error) {
    showMessage({
      message: 'Lỗi thanh toán',
      description: error.message,
      type: 'warning',
    });
    yield put(flagIndicator(false));
  }
}

export default function* saga() {
  yield takeEvery(ACTION, uploadPrice);
}
