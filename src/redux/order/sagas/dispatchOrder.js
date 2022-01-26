import {takeEvery, put} from 'redux-saga/effects';
import r from 'reactotron-react-native';
import {showMessage} from 'react-native-flash-message';
import Sound from 'react-native-sound';

import {Colors, Audios} from '../../../themes';
import {ACTION, onFailure, onSuccess} from '../redux/dispatchOrder';
import orderAPI from '../../../api/orderAPI';
import {flagIndicator} from '../../app';

function* dispatchOrder(action) {
  try {
    yield put(flagIndicator(true, {color: Colors.appColor}));
    r.log('data', action.data);
    for (idx = 0; idx < action.data.length; idx++) {
      let data = action['data'][idx];
      var response = yield orderAPI.dispatchOrder(data.bill);
      let isComplete = idx == action.data.length - 1;
      console.log('is', isComplete);
      if (response.isSuccess) {
        yield put(onSuccess({data, isComplete}));
      } else {
        data['message'] =
          response.data.message ?? 'Đơn hàng không tồn tại trong hệ thống';
        yield put(onFailure({data, isComplete}));
      }
    }

    yield put(flagIndicator(false));
    // if (response.isSuccess) {
    //   Sound.setCategory('Playback');
    //   var whoosh = new Sound('ok', Sound.MAIN_BUNDLE, error => {
    //     if (error) {
    //       console.log('failed to load the sound', error);
    //       return;
    //     }
    //     whoosh.play();
    //   });
    //   showMessage({
    //     message: 'Thông báo scan',
    //     description: 'Nhận đơn hàng thành công',
    //     type: 'success',
    //   });
    //   yield put(onSuccess());
    // } else {
    //   switch (response['data']['code'].toLowerCase()) {
    //     case 'hold':
    //       Sound.setCategory('Playback');
    //       var whoosh = new Sound('hold', Sound.MAIN_BUNDLE, error => {
    //         if (error) {
    //           console.log('failed to load the sound', error);
    //           return;
    //         }
    //         whoosh.play();
    //       });
    //       break;

    //     case 'not_found':
    //       Sound.setCategory('Playback');
    //       var whoosh = new Sound('notfound', Sound.MAIN_BUNDLE, error => {
    //         if (error) {
    //           console.log('failed to load the sound', error);
    //           return;
    //         }
    //         whoosh.play();
    //       });
    //       break;

    //     default:
    //       break;
    //   }

    //   showMessage({
    //     message: 'Lỗi scan',
    //     description:
    //       response.data.message ?? 'Đơn hàng không tồn tại trong hệ thống',
    //     type: 'warning',
    //   });
    //   yield put(onFailure(response.status));
    // }
  } catch (error) {
    //yield put(onFailure(JSON.stringify(error)));
  }
}

export default function* saga() {
  yield takeEvery(ACTION, dispatchOrder);
}
