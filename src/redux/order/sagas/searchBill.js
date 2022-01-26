import {takeEvery, put} from 'redux-saga/effects';
import r from 'reactotron-react-native';

import {Colors} from '../../../themes';
import {ACTION, onFailure, onSuccess} from '../redux/searchBill';
import orderAPI from '../../../api/orderAPI';

import {flagIndicator} from '../../app';
import {ApiResponseStatusCode, rqtoken} from '../../../helpers/Constants';
import {_saveToken, _saveTimeLogout} from '../../../helpers/LocalStorage';

function* searchBill(action) {
  try {
    yield put(flagIndicator(true, {color: Colors.appColor}));
    yield sleep(1000);
    var response = yield orderAPI.searchBill(action.billId);
    yield put(flagIndicator(false));
    if (response.success) {
      yield put(onSuccess(response.data));
    } else {
      yield put(onFailure(response.status));
    }
  } catch (error) {
    yield put(flagIndicator(false));
    yield put(onFailure(JSON.stringify(error)));
  }
}

function* sleep(time) {
  yield new Promise((resolve) => setTimeout(resolve, time));
}

export default function* saga() {
  yield takeEvery(ACTION, searchBill);
}
