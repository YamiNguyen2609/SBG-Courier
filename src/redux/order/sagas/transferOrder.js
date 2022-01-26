import {takeEvery, put} from 'redux-saga/effects';
import r from 'reactotron-react-native';
import {showMessage} from 'react-native-flash-message';
import RNFS from 'react-native-fs';

import {Colors} from '../../../themes';
import {ACTION, onFailure, onSuccess} from '../redux/transferOrder';
import orderAPI from '../../../api/orderAPI';
import {flagIndicator} from '../../app';

function* transferOrder(action) {
  try {
    yield put(flagIndicator(true, {color: Colors.appColor}));
    var response = yield orderAPI.transferOrder(action.data);
    yield put(flagIndicator(false));
    if (response.isSuccess) {
      showMessage({
        type: 'success',
        message: 'Thông báo chuyển bộ phận',
        description: 'Chuyển ' + action.data + ' thành công',
      });
      yield put(onSuccess());
    } else {
      showMessage({
        type: 'warning',
        message: 'Lỗi chuyển bộ phận',
        description: response.message,
      });
      yield put(onFailure(response.status));
    }
  } catch (error) {
    yield put(flagIndicator(false));
    yield put(onFailure(JSON.stringify(error)));
  }
}

export default function* saga() {
  yield takeEvery(ACTION, transferOrder);
}
