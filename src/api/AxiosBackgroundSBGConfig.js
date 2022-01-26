import axios from 'axios';
import BuildConfig, {Environments} from '../config/BuildConfig';
import _ from 'lodash';
import clear from 'react-native-clear-cache';

import {_getToken} from '../helpers/LocalStorage';
import {store} from '../redux/ConfigureStore';
import connection from '../redux/socket';
import {groupId, ApiResponseStatusCode} from '../helpers/Constants';
import {refreshToken} from '../redux/user/sagas/refreshToken';

const api = axios.create({
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
  baseURL:
    BuildConfig == Environments.PRODUCTION
      ? 'https://api.globex.vn/tms'
      : 'https://devapi.globex.vn/tms',
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
        client.sendMessage(
          groupId,
          JSON.stringify({
            name: 'SBG-Driver',
            message: result.error_code,
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
        name: 'SBG-Driver',
        status,
        url: error.config.url,
        data: error.config.params,
        message: data.message ?? error.message,
        username: store.getState().loginUser.user.username,
        password: store.getState().loginUser.user.password,
      }),
      {
        disable_notification: true,
      },
    );

    switch (status) {
      case ApiResponseStatusCode.PERMISSION: {
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
