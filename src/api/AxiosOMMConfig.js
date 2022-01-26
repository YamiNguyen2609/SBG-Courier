import axios from 'axios';
import BuildConfig, {Environments} from '../config/BuildConfig';
import _ from 'lodash';
import r from 'reactotron-react-native';
import clear from 'react-native-clear-cache';

import {_getToken} from '../helpers/LocalStorage';
import {store} from '../redux/ConfigureStore';
import {showFlagMessage, hideFlagMessage, flagIndicator} from '../redux/app';
import {logoutUser} from '../redux/user/redux/loginUser';
import connection from '../redux/socket';
import {groupId, ApiResponseStatusCode, version} from '../helpers/Constants';
import {Colors} from '../themes';
import {replaceScreenWithRemoveStack} from '../redux/navigation';

const api = axios.create({
  timeout: 10000,
  baseURL:
    BuildConfig == Environments.PRODUCTION
      ? 'https://api.globex.vn/omm/api/v1'
      : 'https://devapi.globex.vn/omm/api/v1',
});

api.interceptors.request.use(async config => {
  const token = await _getToken();
  const res = JSON.parse(token);
  config.headers['authorization'] = 'Bearer ' + res['token'];
  config.headers['secret'] = res['secret'];
  return config;
});

const client = connection.connectTelegram();

api.interceptors.response.use(
  response => {
    let result = response.data;
    if (result) {
      if (
        (!result.success && result.success !== undefined) ||
        (!result.isSuccess && result.isSuccess !== undefined) ||
        result.error_code
      ) {
        let errText =
          'TMM - [' +
          version +
          ']\nError: ' +
          result.error_code +
          '\nUrl: ' +
          response.config.url +
          '\nUser: ' +
          store.getState().loginUser.user.username +
          ' - ' +
          store.getState().loginUser.user.password;
        client.sendMessage(groupId, errText, {
          disable_notification: true,
        });
      }
    }
    clear.runClearCache();
    return result;
  },
  error => {
    const {response, config, message} = error;
    store.dispatch(flagIndicator(false));
    if (message == 'Network Error') {
      store.dispatch(
        showFlagMessage({
          message: 'Không thể kết nối internet',
          buttons: [
            {
              title: 'Đồng ý',
              onPress: () => {
                store.dispatch(hideFlagMessage());
                store.dispatch(replaceScreenWithRemoveStack('Home'));
              },
            },
          ],
        }),
      );
    } else {
      const {data, status} = response;

      console.log('status', status);

      let errText =
        'OMM - [' +
        version +
        ']\nStatus: ' +
        status +
        '\nError: ' +
        data.message +
        '\nUrl: ' +
        config.url +
        '\nUser: ' +
        store.getState().loginUser.user.username +
        ' - ' +
        store.getState().loginUser.user.password;

      client.sendMessage(groupId, errText, {
        disable_notification: true,
      });

      store.dispatch(flagIndicator(false));

      switch (status) {
        case ApiResponseStatusCode.AUTHORIZED: {
          store.dispatch(
            showFlagMessage({
              message: data.message,
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
          break;
        }
        case ApiResponseStatusCode.PERMISSION: {
          store.dispatch(
            showFlagMessage({
              message: data.message,
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
          break;
        }
        case ApiResponseStatusCode.TOKEN: {
          store.dispatch(
            showFlagMessage({
              message: 'Phiên đăng nhập của bạn đã hết hạn',
              buttons: [
                {
                  title: 'Đồng ý',
                  onPress: () => {
                    store.dispatch(hideFlagMessage());
                    store.dispatch(logoutUser());
                  },
                },
              ],
            }),
          );
          break;
        }
        case ApiResponseStatusCode.TOKEN_EXPIRED: {
          store.dispatch(
            showFlagMessage({
              message: 'Phiên đăng nhập của bạn đã hết hạn',
              buttons: [
                {
                  title: 'Đồng ý',
                  onPress: () => {
                    store.dispatch(hideFlagMessage());
                    store.dispatch(logoutUser());
                  },
                },
              ],
            }),
          );
          break;
        }
        default:
          store.dispatch(
            showFlagMessage({
              message: 'Mất kết nối với hệ thống - ' + status,
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
          break;
      }
    }
    return Promise.reject({common: data.message});
  },
);

export default api;
