import {takeEvery, put} from 'redux-saga/effects';
import {showMessage} from 'react-native-flash-message';
import r from 'reactotron-react-native';
import moment from 'moment';

import {Colors} from '../../../themes';
import {
  ACTION,
  onFailure,
  onSuccess,
} from '../redux/getListDispatchOrderComplete';
import orderAPI from '../../../api/orderAPI';
import {flagIndicator} from '../../app';

function* getListDispatchOrder(action) {
  try {
    yield put(flagIndicator(true, {color: Colors.appColor}));
    let response = yield orderAPI.getListDispatchOrderComplete(
      action.typeDispatch,
      action.pageNumber,
      action.keyword,
      action.pageLength,
      {
        successDeliveryDate:
          'between|' +
          moment().format('YYYY-MM-DD') +
          ' 00:00:00,' +
          moment().format('YYYY-MM-DD') +
          ' 23:59:59',
      },
    );
    if (response.isSuccess || response.isSuccess == undefined) {
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
