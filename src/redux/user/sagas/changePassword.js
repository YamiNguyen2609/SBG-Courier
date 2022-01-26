import {takeEvery, put} from 'redux-saga/effects';
import {showMessage} from 'react-native-flash-message';
import AsyncStorage from '@react-native-community/async-storage';

import {Colors} from '../../../themes';
import {ACTION, onFailure, onSuccess} from '../redux/changePassword';
import userAPI from '../../../api/UserAPI';
import {flagIndicator} from '../../app';
import {updatePassword} from '../redux/loginUser';

function* changePassword(action) {
  try {
    yield put(flagIndicator(true, {color: Colors.appColor}));
    let tk = yield AsyncStorage.getItem('@TOKEN');

    let tokenJson = JSON.parse(tk);
    const {token, secret} = tokenJson;

    var response = yield userAPI.changePassword(
      action.OldPassword,
      action.NewPassword,
      token,
      secret,
    );
    yield put(flagIndicator(false));
    if (response.isSuccess) {
      showMessage({
        message: 'Thông báo cập nhập',
        description: 'Cập nhật mật khẩu thành công',
        type: 'success',
      });
      yield put(updatePassword(action.NewPassword));
      yield put(onSuccess());
    } else {
      showMessage({
        message: 'Thông báo cập nhập',
        description: 'Cập nhật mật khẩu không thành công',
        type: 'warning',
      });
      yield put(onFailure());
    }
  } catch (error) {
    yield put(flagIndicator(false));
    yield put(onFailure());
  }
}

function* sleep(time) {
  yield new Promise(resolve => setTimeout(resolve, time));
}

export default function* saga() {
  yield takeEvery(ACTION, changePassword);
}
