import {takeEvery, put} from 'redux-saga/effects';
import r from 'reactotron-react-native';
import {showMessage} from 'react-native-flash-message';
import RNFS from 'react-native-fs';

import {Colors} from '../../../themes';
import {ACTION, onFailure, onSuccess} from '../redux/getDetail';
import orderAPI from '../../../api/orderAPI';
import {flagIndicator} from '../../app';

function* getDetailOrder(action) {
  try {
    yield put(flagIndicator(true, {color: Colors.appColor}));
    var response = undefined;

    console.log(action, 'action');

    switch (action.classify) {
      case 0:
        response = yield orderAPI.getListDispatchOrderDismiss(
          action.typeOrder,
          1,
          action.data,
        );
        break;

      case 1:
        response = yield orderAPI.getListDispatchOrder(
          action.typeOrder,
          1,
          action.data,
        );
        break;

      case 2:
        response = yield orderAPI.getListDispatchOrderComplete(
          action.typeOrder,
          1,
          action.data,
        );
        break;

      default:
        break;
    }

    yield put(flagIndicator(false));

    if (response.data) {
      yield put(
        onSuccess(response.data[0], action.typeOrder, action.isComplete),
      );
    } else {
      yield put(onFailure(response.status));
    }
  } catch (error) {
    yield put(flagIndicator(false));
    yield put(onFailure(JSON.stringify(error)));
  }
}

export default function* saga() {
  yield takeEvery(ACTION, getDetailOrder);
}
