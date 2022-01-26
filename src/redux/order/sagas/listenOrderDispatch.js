import {takeEvery} from 'redux-saga/effects';

import {notifyDispatch} from '../../app';
import {store} from '../../ConfigureStore';
import connection from '../../socket';
import {ACTION} from '../redux/listenOrderDispatch';

function* listenOrderDispatch(action) {
  try {
    const {userId} = action;
    console.log('vo ne', userId);

    const subscribe = userId.substring(userId.length - 4) + '-orders';
    const client = yield connection.connectionMqtt({
      clientId: subscribe,
      keepalive: 86400,
    });

    console.log('subscribe', subscribe);
    client.on('connect', () => {
      console.log('you are connected!!!!');
      client.subscribe(subscribe, 0);
      client.on('message', function(msg) {
        console.log('co mes nes');
        console.log('mess', msg.data.toString());
        const mess = JSON.parse(msg.data.toString());
        const {cmd} = mess;
        store.dispatch(notifyDispatch(cmd));
        console.log('xong ne');
      });

      console.log('listen success');
    });
    client.connect();
  } catch (error) {}
}

export default function* saga() {
  yield takeEvery(ACTION, listenOrderDispatch);
}
