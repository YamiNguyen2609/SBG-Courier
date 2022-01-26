import {takeEvery, put} from 'redux-saga/effects';

import {ACTION} from '../redux/updateLocation';
// import {getLocation} from '../../location';
import carAPI from '../../../api/carAPI';

function* updateLocation(action) {
  let success = true;

  // const data = yield getLocation();

  if (data) {
    let res =
      action['company'] == 'sbs'
        ? yield carAPI.updateLocationSBG(data['latitude'], data['longitude'])
        : yield carAPI.updateLocation(data['latitude'], data['longitude']);
  }
}

export default function* saga() {
  yield takeEvery(ACTION, updateLocation);
}
