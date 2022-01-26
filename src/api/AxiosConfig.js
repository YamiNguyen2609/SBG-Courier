import axios from 'axios';
import BuildConfig, {Environments} from '../config/BuildConfig';
import _ from 'lodash';
import clear from 'react-native-clear-cache';
import r from 'reactotron-react-native';

import {_getToken} from '../helpers/LocalStorage';
import {store} from '../redux/ConfigureStore';
import {showFlagMessage, hideFlagMessage, flagIndicator} from '../redux/app';
import {logoutUser} from '../redux/user/redux/loginUser';
import connection from '../redux/socket';
import {groupId, ApiResponseStatusCode, version} from '../helpers/Constants';
import {replaceScreenWithRemoveStack} from '../redux/navigation';

const baseUrl =
  BuildConfig == Environments.PRODUCTION
    ? 'https://api.globex.vn/tms'
    : 'https://devapi.globex.vn/tms';

const api = axios.create({
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
  baseURL: baseUrl,
});

api.interceptors.request.use(async config => {
  const token = await _getToken();
  const res = JSON.parse(token);
  config.headers['Access-Token'] = res['access_token'];
  // config.headers['Access-Token'] =
  //   'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZGVudGl0eSI6IkM1YVdDd3F6a3ZrWHZJMSIsImVudmlyb25tZW50cyI6Imdsb2JleCx0bW0sb21tIiwiaWF0IjoxNTk2NjkyMzc1LCJleHAiOjE1OTY3Nzg3NzV9.IWBulmujOubCAHIEw6NtfOdxpDJYmlNyPyiTrNGIoqE';

  return config;
});

const client = connection.connectTelegram();

api.interceptors.response.use(
  response => {
    let result = response.data;
    if (result) {
      if (!result.success && result.success !== undefined) {
        let errText =
          'TMS - [' +
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
      let errText =
        'TMS - [' +
        version +
        ']\nStatus: ' +
        (status ?? '000') +
        '\nError: ' +
        (data.message ?? message) +
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
        case ApiResponseStatusCode.PERMISSION: {
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
              title: 'Mất kết nối với hệ thống',
              message,
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

    return Promise.reject({common: error.message});
  },
);

export {baseUrl};

export default api;
