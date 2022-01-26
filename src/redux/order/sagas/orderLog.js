import {takeEvery, put} from 'redux-saga/effects';
import {showMessage} from 'react-native-flash-message';

import {Colors} from '../../../themes';
import {ACTION, onFailure, onSuccess} from '../redux/orderLog';
import orderAPI from '../../../api/orderAPI';
import {flagIndicator} from '../../app';

function* logOrder(action) {
  try {
    yield put(flagIndicator(true, {color: Colors.appColor}));
    var response = yield orderAPI.logOrder(action.orderId, action.bookingId);
    if (!action.bookingId)
      var resAcc = yield orderAPI.logAccountingOrder(action.orderId);
    yield put(flagIndicator(false));
    yield put(
      onSuccess({order: response.data ?? [], accounting: resAcc.data ?? []}),
    );
  } catch (error) {
    yield put(flagIndicator(false));
    yield put(onFailure(JSON.stringify(error)));
  }
}

export default function* saga() {
  yield takeEvery(ACTION, logOrder);
}
