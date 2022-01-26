import {takeEvery, put} from 'redux-saga/effects';

import {ACTION, onFailure, onSuccess} from '../redux/getProcessSpecials';
import orderAPI from '../../../api/orderAPI';
import {flagIndicator} from '../../app';

function* getProcessSpecials(action) {
  try {
    var res = yield orderAPI.getProcessSpecials();
    yield put(flagIndicator(false));
    if (res.success) {
      yield put(onSuccess(res.data));
    } else {
      yield put(onFailure(false));
    }
  } catch (error) {
    yield put(onFailure(false));
  }
}

export default function* saga() {
  yield takeEvery(ACTION, getProcessSpecials);
}
