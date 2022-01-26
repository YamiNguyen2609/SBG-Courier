import {takeEvery, put} from 'redux-saga/effects';
import {showMessage} from 'react-native-flash-message';

import {Colors} from '../../../themes';
import {ACTION, onFailure, onSuccess} from '../redux/getListCheckin';
import orderAPI from '../../../api/orderAPI';
import {flagIndicator} from '../../app';

function* getListCheckin(action) {
  try {
    yield put(flagIndicator(true, {color: Colors.appColor}));
    let response = yield orderAPI.getCheckin(action.stationId);
    yield put(flagIndicator(false));

    yield put(onSuccess(response.data));
  } catch (error) {
    yield put(flagIndicator(false));
    yield put(onFailure(JSON.stringify(error)));
  }
}

export default function* saga() {
  yield takeEvery(ACTION, getListCheckin);
}
