import {takeEvery, put} from 'redux-saga/effects';
import r from 'reactotron-react-native';
import {showMessage} from 'react-native-flash-message';
import RNFS from 'react-native-fs';

import {Colors} from '../../../themes';
import {ACTION, onFailure, onSuccess} from '../redux/cancelOrder';
import orderAPI from '../../../api/orderAPI';
import {flagIndicator} from '../../app';
import {typeDispatch} from '../../../helpers/Constants';

function* cancelOrder(action) {
  try {
    yield put(flagIndicator(true, {color: Colors.appColor}));
    var response = yield orderAPI.cancelOrder(action.data);
    yield put(flagIndicator(false));
    if (response.success) {
      RNFS.unlink(RNFS.ExternalDirectoryPath + '/' + action.bill + '/');
      showMessage({
        message: '',
        description:
          typeDispatch.DELIVERY == action.data.typeDispatch
            ? 'Huỷ giao hàng thành công'
            : 'Huỷ nhận hàng thành công',
        type: 'success',
      });
      yield put(onSuccess());
    } else {
      yield put(onFailure(response.status));
    }
  } catch (error) {
    yield put(flagIndicator(false));
    yield put(onFailure(JSON.stringify(error)));
  }
}

export default function* saga() {
  yield takeEvery(ACTION, cancelOrder);
}
