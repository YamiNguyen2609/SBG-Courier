import axios from 'axios';
import _ from 'lodash';
import r from 'reactotron-react-native';
import {showMessage} from 'react-native-flash-message';

import BuildConfig, {Environments} from '../config/BuildConfig';
import connection from '../redux/socket';
import {groupId, ApiResponseStatusCode, version} from '../helpers/Constants';
import {Colors} from '../themes';
import {store} from '../redux/ConfigureStore';
import {showFlagMessage, hideFlagMessage, flagIndicator} from '../redux/app';

const api = axios.create({
  timeout: 10000,
  baseURL:
    BuildConfig == Environments.PRODUCTION
      ? 'https://api.globex.vn/auth/api'
      : 'https://devapi.globex.vn/auth/api',
});

const client = connection.connectTelegram();

api.interceptors.response.use(
  response => response.data,
  error => {
    const {response, message} = error;
    r.log('error', error);

    if (message == 'Network Error') {
      store.dispatch(
        showFlagMessage({
          message: 'Không thể kết nối internet',
          buttons: [
            {
              title: 'Đồng ý',
              onPress: () => {
                store.dispatch(hideFlagMessage());
              },
            },
          ],
        }),
      );
    } else {
      const {data, status} = response;

      let errText =
        'Auth - [' +
        version +
        ']\nError: ' +
        data.message +
        '\nUrl: ' +
        error.config.url;
      client.sendMessage(groupId, errText, {
        disable_notification: true,
      });

      switch (status) {
        case ApiResponseStatusCode.ERROR_SERVER: {
          showMessage({
            message: 'Lỗi đăng nhập',
            description: 'Đã có lỗi xảy ra trên hệ thống',
            type: 'warning',
          });
          break;
        }
      }

      store.dispatch(flagIndicator(true, {color: Colors.appColor}));
    }

    return Promise.reject({common: error.message});
  },
);

export default api;
