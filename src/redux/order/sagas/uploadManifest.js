import {takeEvery, put} from 'redux-saga/effects';
import r from 'reactotron-react-native';
import RNFS from 'react-native-fs';

import {Colors} from '../../../themes';
import {ACTION, onFailure, onSuccess} from '../redux/uploadManifest';
import orderAPI from '../../../api/orderAPI';

import {flagIndicator} from '../../app';
import {showMessage} from 'react-native-flash-message';

function* uploadManifest(action) {
  try {
    yield put(flagIndicator(true, {color: Colors.appColor}));

    r.log('action', action);

    if (!action.isAddImageBill) {
      var res = yield orderAPI.uploadManifest(action);
    } else {
      res = yield orderAPI.addImageManifest(action);
    }
    yield put(flagIndicator(false));

    if (res.success) {
      showMessage({
        message: 'Upload Manifest',
        description: 'Bill ' + action.bill_id + ' upload thành công',
        type: 'success',
      });
      RNFS.unlink(RNFS.ExternalDirectoryPath + '/' + action.bill_id + '/');
      yield put(
        onSuccess(action.isAddImageBill ? true : {bill: action.bill_id}),
      );
    } else {
      if (res.error_code == 'BILL_ID_CONFLICT') {
        showMessage({
          message: 'Lỗi upload bill',
          description: 'Bill ' + action.bill_id + ' upload bị trùng',
          type: 'warning',
        });
        RNFS.unlink(RNFS.ExternalDirectoryPath + '/' + action.bill_id + '/');
        yield put(onSuccess(true));
      } else {
        yield put(onFailure(false));
      }
    }
  } catch (error) {
    yield put(flagIndicator(false));
  }
}

export default function* saga() {
  yield takeEvery(ACTION, uploadManifest);
}
