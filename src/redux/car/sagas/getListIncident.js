import {takeEvery, put} from 'redux-saga/effects';
import r from 'reactotron-react-native';

import {Colors} from '../../../themes';
import {ACTION, onFailure, onSuccess} from '../redux/getListIncident';
import carAPI from '../../../api/carAPI';

import {flagIndicator} from '../../app';

function* getListIncident(action) {
  try {
    yield put(flagIndicator(true, {color: Colors.appColor}));

    var res = yield carAPI.incidentList();

    yield put(flagIndicator(false));
    if (res.success || res.data) {
      yield put(onSuccess(res.data));
      // yield put(onSuccess(res.incident_list));
    } else {
      yield put(onFailure('Đã có lỗi xảy ra, vui lòng thử lại'));
    }
  } catch (error) {
    yield put(flagIndicator(false));
    yield put(onFailure('Đã có lỗi xảy ra, vui lòng thử lại'));
  }
}

export default function* saga() {
  yield takeEvery(ACTION, getListIncident);
}
