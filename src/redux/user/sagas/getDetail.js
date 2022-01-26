import {takeEvery, put} from 'redux-saga/effects';
import r from 'reactotron-react-native';
import AsyncStorage from '@react-native-community/async-storage';

import {Colors} from '../../../themes';
import {ACTION, onFailure, onSuccess} from '../redux/getDetail';
import userAPI from '../../../api/UserAPI';
import carAPI from '../../../api/carAPI';
import {flagIndicator} from '../../app';

function* getDetail(action) {
  try {
    yield put(flagIndicator(true, {color: Colors.appColor}));
    let tk = yield AsyncStorage.getItem('@TOKEN');

    let tokenJson = JSON.parse(tk);
    const {token, secret} = tokenJson;
    var response = yield userAPI.getDetail(token, secret);

    yield put(flagIndicator(false));
    if (response.isSuccess) {
      yield put(onSuccess(response['data']));
    }
  } catch (error) {
    r.log(error);
    yield put(flagIndicator(false));
    yield put(onFailure(JSON.stringify(error)));
  }
}

export default function* saga() {
  yield takeEvery(ACTION, getDetail);
}
