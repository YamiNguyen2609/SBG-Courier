import {takeEvery, put} from 'redux-saga/effects';
import r from 'reactotron-react-native';

import {Colors} from '../../../themes';
import {ACTION, onFailure, onSuccess} from '../redux/getListHistory';
import userAPI from '../../../api/UserAPI';
import carAPI from '../../../api/carAPI';
import {flagIndicator} from '../../app';

function* getListHistory(action) {
  try {
    console.log(action);
    if (action.pageNumber == 1) {
      yield put(flagIndicator(true, {color: Colors.appColor}));
    }
    var response = yield userAPI.getListHistory(action.pageNumber);
    var res = yield carAPI.incidentList();

    yield put(flagIndicator(false));
    if (response.success) {
      yield put(
        onSuccess({
          total: response.total,
          data: response.data,
          // listIncident: res.incident_list,
          listIncident: res.data,
        }),
      );
    }
  } catch (error) {
    r.log(error);
    yield put(flagIndicator(false));
    yield put(onFailure(JSON.stringify(error)));
  }
}

export default function* saga() {
  yield takeEvery(ACTION, getListHistory);
}
