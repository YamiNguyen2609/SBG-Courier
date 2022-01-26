import {takeEvery, put} from 'redux-saga/effects';
import r from 'reactotron-react-native';

import {
  ACTION,
  onFailure,
  onSuccessChange,
  onSuccessUpdate,
} from '../redux/updateOrder';
import orderAPI from '../../../api/orderAPI';

function* updateOrder(action) {
  try {
    console.log('check this');
    var response = yield orderAPI.updateOrder(action.data);

    r.log('response', response);

    if (response.isSuccess) {
      if (!action.data.updateOrder) yield put(onSuccessChange(response.data));
      else yield put(onSuccessUpdate(response.data));
    } else {
      yield put(onFailure(response.status));
    }
  } catch (error) {
    yield put(onFailure(JSON.stringify(error)));
  }
}

export default function* saga() {
  yield takeEvery(ACTION, updateOrder);
}
