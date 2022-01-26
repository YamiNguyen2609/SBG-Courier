import {takeEvery, put} from 'redux-saga/effects';
import {showMessage} from 'react-native-flash-message';
import r from 'reactotron-react-native';

import {Colors} from '../../../themes';
import {ACTION, onFailure, onSuccess} from '../redux/searchOrder';
import orderAPI from '../../../api/orderAPI';
import {flagIndicator} from '../../app';

function* scanOrder(action) {
  try {
    yield put(flagIndicator(true, {color: Colors.appColor}));

    var result = null;
    let classify = 0;

    const {code, type} = action.orderNumber;

    let incomplete = yield orderAPI.getListDispatchOrder(type, 1, code);
    if (incomplete['data']) {
      result = incomplete['data'][0];
      classify = 1;
    } else {
      let complete = yield orderAPI.getListDispatchOrderComplete(type, 1, code);
      if (complete['data']) {
        result = complete['data'][0];
        classify = 2;
      } else {
        let dismiss = yield orderAPI.getListDispatchOrderDismiss(type, 1, code);
        if (dismiss['data']) {
          result = dismiss['data'][0];
          classify = 0;
        }
      }
    }

    if (result) {
      yield put(onSuccess({item: result, type, classify}));
    } else {
      yield put(onFailure(''));
    }
    yield put(flagIndicator(false));
  } catch (error) {
    r.log(error);
    yield put(flagIndicator(false));
    yield put(onFailure(JSON.stringify(error)));
  }
}

export default function* saga() {
  yield takeEvery(ACTION, scanOrder);
}
