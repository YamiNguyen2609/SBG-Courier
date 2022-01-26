import {takeEvery, put} from 'redux-saga/effects';
import r from 'reactotron-react-native';
import {showMessage} from 'react-native-flash-message';
import Sound from 'react-native-sound';

import {Colors} from '../../../themes';
import {ACTION, onFailure, onSuccess} from '../redux/checkExistHAWBs';
import orderAPI from '../../../api/orderAPI';
import {flagIndicator} from '../../app';

function* checkExistHAWBs(action) {
  try {
    yield put(flagIndicator(true, {color: Colors.appColor}));
    var response = yield orderAPI.checkExistHAWBs(action.data);
    yield put(flagIndicator(false));
    if (response.isSuccess) {
      yield put(onSuccess(response['data']['data'][0]));
    } else {
      Sound.setCategory('Playback');
      var whoosh = new Sound('notfound', Sound.MAIN_BUNDLE, error => {
        if (error) {
          console.log('failed to load the sound', error);
          return;
        }
        whoosh.play();
      });

      showMessage({
        type: 'warning',
        message: 'Lỗi scan đơn hàng',
        description: response.data.message,
      });
      yield put(onFailure(response.status));
    }
  } catch (error) {
    yield put(flagIndicator(false));
    yield put(onFailure(JSON.stringify(error)));
  }
}

export default function* saga() {
  yield takeEvery(ACTION, checkExistHAWBs);
}
