import {takeEvery, put} from 'redux-saga/effects';
import {showMessage} from 'react-native-flash-message';
import r from 'reactotron-react-native';

import {Colors} from '../../../themes';
import {ACTION, onFailure, onSuccess} from '../redux/getListDispatchOrder';
import orderAPI from '../../../api/orderAPI';
import {flagIndicator, messageWarning} from '../../app';

function* getListDispatchOrder(action) {
  try {
    yield put(flagIndicator(true, {color: Colors.appColor}));
    let response = yield orderAPI.getListDispatchOrder(
      action.typeDispatch,
      action.pageNumber,
      action.keyword,
      action.pageLength,
    );
    if (response.isSuccess || response.isSuccess == undefined) {
      if (response.data) {
        if (response.data.remark) {
          yield put(messageWarning([response.data.remark]));
        }
      }

      yield put(
        onSuccess({
          typeDispatch: action.typeDispatch,
          data: response.data ?? [],
          total: response.meta ? response.meta.total : 0,
        }),
      );
    } else {
      yield put(
        onSuccess({
          typeDispatch: action.typeDispatch,
          data: [],
          total: 0,
        }),
      );
    }
    yield put(flagIndicator(false));
  } catch (error) {
    r.log(error);
    yield put(flagIndicator(false));
    yield put(
      onSuccess({
        typeDispatch: action.typeDispatch,
        data: [],
        total: 0,
      }),
    );
  }
}

export default function* saga() {
  yield takeEvery(ACTION, getListDispatchOrder);
}
