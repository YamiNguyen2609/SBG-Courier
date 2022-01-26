import {takeEvery, put} from 'redux-saga/effects';
import r from 'reactotron-react-native';

import {Colors} from '../../../themes';
import {ACTION, onFailure, onSuccess} from '../redux/getListCollectHistory';
import orderAPI from '../../../api/orderAPI';
import {flagIndicator} from '../../app';

function* getListHistory(action) {
  try {
    console.log(action);
    if (action.pageNumber == 1) {
      yield put(flagIndicator(true, {color: Colors.appColor}));
    }
    var response = yield orderAPI.getHistoryCollect(action.pageNumber);
    if (action.pageNumber == 1) {
      yield put(flagIndicator(false));
    }
    yield put(
      onSuccess({
        total: response.meta.total,
        data: response.data,
      }),
    );
  } catch (error) {
    r.log(error);
    yield put(flagIndicator(false));
    yield put(
      onSuccess({
        total: 0,
        data: [],
      }),
    );
  }
}

export default function* saga() {
  yield takeEvery(ACTION, getListHistory);
}
