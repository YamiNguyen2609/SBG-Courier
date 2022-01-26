import {takeEvery, put} from 'redux-saga/effects';
import {showMessage} from 'react-native-flash-message';

import {Colors} from '../../../themes';
import {ACTION, onFailure, onSuccess} from '../redux/checkinFinish';
import orderAPI from '../../../api/orderAPI';
import {flagIndicator} from '../../app';

function* checkinFinish(action) {
  try {
    yield put(flagIndicator(true, {color: Colors.appColor}));
    console.log(action.data);
    var response = yield orderAPI.finishCheckin(action.data);
    yield put(onSuccess(response));

    yield put(flagIndicator(false));

    showMessage({
      type: response.isSuccess ? 'success' : 'warning',
      message: 'Kết thúc check in',
      description: response.data.message,
    });
  } catch (error) {
    yield put(flagIndicator(false));
    yield put(onFailure(JSON.stringify(error)));
  }
}

export default function* saga() {
  yield takeEvery(ACTION, checkinFinish);
}
