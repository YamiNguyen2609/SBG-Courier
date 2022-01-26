import {takeEvery, put} from 'redux-saga/effects';
import r from 'reactotron-react-native';
import {showMessage} from 'react-native-flash-message';

import {Colors} from '../../../themes';
import {ACTION, onSuccess, onFailure} from '../redux/checkExistPhone';
import userAPI from '../../../api/UserAPI';
import {flagIndicator} from '../../app';

function* checkExistPhone(action) {
  try {
    yield put(flagIndicator(true, {color: Colors.appColor}));

    var res = yield userAPI.checkPhone(action.username, action.phoneNumber);

    yield put(onSuccess(res));

    yield put(onFailure());
    yield put(flagIndicator(false));
  } catch (error) {
    yield put(flagIndicator(false));
    r.log(JSON.stringify(error));
    yield put(onFailure());
  }
}
export default function* saga() {
  yield takeEvery(ACTION, checkExistPhone);
}
