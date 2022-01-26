import {takeEvery, put} from 'redux-saga/effects';
import r from 'reactotron-react-native';
import {Buffer} from 'safe-buffer';

import {Colors} from '../../../themes';
import {ACTION, onFailure, onSuccess} from '../redux/getImage';
import orderAPI from '../../../api/orderAPI';

import {flagIndicator} from '../../app';
import {showMessage} from 'react-native-flash-message';

function* getImage(action) {
  try {
    yield put(flagIndicator(true, {color: Colors.appColor}));
    var res = [];
    for (let index = 0; index < action.list_image.length; index++) {
      var response = yield orderAPI.getImage(action.list_image[index].name);
      var base64 = Buffer.from(response, 'binary').toString('base64');

      var nameSpl = action.list_image[index].name.split('_');
      let wh = nameSpl[3].replace('.jpg', '').split('x');
      res.push({
        id: action.list_image[index].name,
        uri: base64,
        width: Number(wh[0]),
        height: Number(wh[1]),
      });
    }

    yield put(flagIndicator(false));
    yield put(onSuccess(res));
  } catch (error) {
    yield put(flagIndicator(false));
    yield put(onFailure(JSON.stringify(error)));
  }
}

export default function* saga() {
  yield takeEvery(ACTION, getImage);
}
