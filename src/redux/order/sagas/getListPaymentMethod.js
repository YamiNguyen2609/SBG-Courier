import {takeEvery, put} from 'redux-saga/effects';
import r from 'reactotron-react-native';
import {showMessage} from 'react-native-flash-message';

import {Colors} from '../../../themes';
import {ACTION, onFailure, onSuccess} from '../redux/getListPaymentMethod';
import orderAPI from '../../../api/orderAPI';
import {flagIndicator} from '../../app';

function* getListPayments(action) {
  try {
    yield put(flagIndicator(true, {color: Colors.appColor}));
    var response = yield orderAPI.getListPayments();
    yield put(flagIndicator(false));
    if (response.isSuccess) {
      yield put(onSuccess(response.data));
    } else {
      yield put(onFailure(response.status));
    }
  } catch (error) {
    yield put(flagIndicator(false));
    yield put(onFailure(JSON.stringify(error)));
  }
}

export default function* saga() {
  yield takeEvery(ACTION, getListPayments);
}
