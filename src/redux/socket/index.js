import mqtt from 'sp-react-native-mqtt';
import {TelegramClient} from 'messaging-api-telegram';
import {MQTT, TOKEN_TELEGRAM} from '../../helpers/Constants';

const connectionMqtt = (config) => {
  return new Promise((reslove, reject) => {
    try {
      mqtt
        .createClient({
          host: MQTT.host,
          // host: '103.48.191.251',
          // port: 1883,
          port: MQTT.port,
          // uri: uri,
          user: MQTT.username,
          pass: MQTT.password,
          auth: true,
          ...config,
        })
        .then(function (client) {
          reslove(client);
        });
    } catch (error) {
      //-------------- Request API Failure
      reject(JSON.stringify(error));
    }
  });
};

const connectTelegram = () => {
  return TelegramClient.connect(TOKEN_TELEGRAM);
};

export default {connectionMqtt, connectTelegram};
