import {takeEvery, put} from 'redux-saga/effects';
import r from 'reactotron-react-native';

import {Colors} from '../../../themes';
import {ACTION, onFailure, onSuccess} from '../redux/reportOrder';
import orderAPI from '../../../api/orderAPI';

import {flagIndicator} from '../../app';
import {_saveToken, _saveTimeLogout} from '../../../helpers/LocalStorage';

function* reportOrder(action) {
  try {
    yield put(flagIndicator(true, {color: Colors.appColor}));

    var res = yield orderAPI.orderTable(action.pageNumber);
    yield put(flagIndicator(false));
    if (response['data']) {
      yield put(
        onSuccess({
          data: response.data,
          refreshing: action.refreshing,
          total: response['meta']['total'],
        }),
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
  yield takeEvery(ACTION, reportOrder);
}
