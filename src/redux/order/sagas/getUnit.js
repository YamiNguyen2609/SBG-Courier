import {takeEvery, put} from 'redux-saga/effects';
import {showMessage} from 'react-native-flash-message';

import {Colors} from '../../../themes';
import {ACTION, onFailure, onSuccess} from '../redux/getUnit';
import orderAPI from '../../../api/orderAPI';
import {flagIndicator} from '../../app';

function* getUnit(action) {
  try {
    let data = {
      lengths: [],
      weights: [],
    };
    yield put(flagIndicator(true, {color: Colors.appColor}));
    var lengths = yield orderAPI.getUnitLength();
    var weights = yield orderAPI.getUnitWeight();

    if (lengths['isSuccess']) data['lengths'] = lengths['data'];

    if (weights['isSuccess']) data['weights'] = weights['data'];

    yield put(flagIndicator(false));

    yield put(onSuccess(data));
  } catch (error) {
    yield put(flagIndicator(false));
    yield put(onFailure(JSON.stringify(error)));
  }
}

export default function* saga() {
  yield takeEvery(ACTION, getUnit);
}
