import {takeEvery, put} from 'redux-saga/effects';
import {ACTION, onFailure, onSuccess} from '../redux/getOrderNumber';
import orderAPI from '../../../api/orderAPI';
import {flagIndicator} from '../../app';

function* getOrderNumber(action) {
  try {
    const data = action['data']['value'].toUpperCase();
    var res = yield orderAPI.getOrderNumber(data);
    if (res['data'].length > 0) {
      let data = res['data'][0];
      data['selected'] = true;
      data['isExist'] = true;
      data['index'] = action['data']['index'];
      yield put(onSuccess(data));
    } else
      yield put(
        onSuccess({
          index: action['data']['index'],
          selected: true,
          isExist: false,
          orderNumber: data,
          senderFee: 0,
          pcs: 0,
          orderWeightKg: 0,
          unitFee: 'VND',
          orderNumberClient: '',
        }),
      );
  } catch (error) {
    console.log('error', error);
  }
}

export default function* saga() {
  yield takeEvery(ACTION, getOrderNumber);
}
