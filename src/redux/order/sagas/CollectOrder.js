import {takeEvery, put} from 'redux-saga/effects';
import r from 'reactotron-react-native';
import {showMessage} from 'react-native-flash-message';
import RNFS from 'react-native-fs';

import {Colors} from '../../../themes';
import {ACTION, onFailure, onSuccess} from '../redux/collectOrder';
import orderAPI from '../../../api/orderAPI';
import {flagIndicator} from '../../app';
import {clearHawb} from '../redux/checkExistHAWBs';

function* CollectOrder(action) {
  try {
    yield put(flagIndicator(true, {color: Colors.appColor}));

    var hawbs = [];
    action.data.forEach(e => {
      hawbs.push(...e['hawb']);
    });

    yield put(clearHawb(action.data));

    var response = yield orderAPI.consolidateOrder(hawbs);
    yield put(flagIndicator(false));
    if (response.isSuccess) {
      showMessage({
        type: 'success',
        message: 'Gom hàng',
        description: 'Gom hàng thành công',
      });
      yield put(clearHawb(action.data));
    } else {
      showMessage({
        type: 'warning',
        message: 'Lỗi gom đơn hàng',
        description: JSON.stringify(response.data.error),
      });

      yield put(onFailure(response.status));
    }
  } catch (error) {
    yield put(flagIndicator(false));
    yield put(onFailure(JSON.stringify(error)));
  }
}

export default function* saga() {
  yield takeEvery(ACTION, CollectOrder);
}
