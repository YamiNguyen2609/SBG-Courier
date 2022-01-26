import {takeEvery, put} from 'redux-saga/effects';
import r from 'reactotron-react-native';
import RNFS from 'react-native-fs';

import {Colors} from '../../../themes';
import {ACTION, onFailure, onSuccess} from '../redux/getListReasonCancelOrder';
import orderAPI from '../../../api/orderAPI';
import {flagIndicator} from '../../app';

function* getListReasonCancelOrder(action) {
  try {
    var res = yield orderAPI.getListReasonCancelOrder(action.typeOrder);
    yield put(flagIndicator(false));
    if (res.data) {
      yield put(onSuccess(res.data));
    } else {
      yield put(onFailure(false));
    }
  } catch (error) {
    yield put(flagIndicator(false));
  }
}

export default function* saga() {
  yield takeEvery(ACTION, getListReasonCancelOrder);
}
