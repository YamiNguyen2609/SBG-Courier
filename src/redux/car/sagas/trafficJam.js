import {takeEvery, put} from 'redux-saga/effects';
import r from 'reactotron-react-native';

import carAPI from '../../../api/carAPI';
// import {getLocation} from '../../location';
import mqtt from '../../socket';
import {ACTION, onSuccess, onFailure} from '../redux/trafficJam';

function* trafficJam(action) {
  try {
    let result = {
      success: true,
    };

    // var location = yield getLocation();

    if (action.isAPI) {
      result = yield carAPI.incidentCar(
        action.vehicle,
        'KET_XE',
        location['latitude'],
        location['longitude'],
      );
    }

    if (result.success) {
      yield sendData(action, location);
      yield put(onSuccess(action.status));
    }
  } catch (error) {
    r.log(JSON.stringify(error));
  }
}

function* sendData(action, data) {
  if (action.user) {
    const client = yield mqtt.connectionMqtt();
    client.on('connect', () => {
      console.log('you are connected!!!!');
      client.subscribe('/traffic_jam', 0);
      client.publish(
        '/traffic_jam',
        JSON.stringify({
          driver_id: action.user.username,
          driver_name: action.user.full_name,
          license_plates: action.vehicle,
          lat: data['latitude'].toFixed(6),
          long: data['longitude'].toFixed(6),
          status: action.status,
          comment: 'Kẹt xe',
        }),
        0,
        false,
      );
      console.log('send success');
    });
    client.connect();
  }
}

export default function* saga() {
  yield takeEvery(ACTION, trafficJam);
}
