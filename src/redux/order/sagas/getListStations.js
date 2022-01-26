import {takeEvery, put} from 'redux-saga/effects';
import r from 'reactotron-react-native';
import RNFS from 'react-native-fs';

import {Colors} from '../../../themes';
import {ACTION, onFailure, onSuccess} from '../redux/getListStations';
import orderAPI from '../../../api/orderAPI';
import {flagIndicator} from '../../app';

function* getListStations(action) {
  try {
    yield put(flagIndicator(true, {color: Colors.appColor}));
    var res = yield orderAPI.getListStations();
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
  yield takeEvery(ACTION, getListStations);
}
