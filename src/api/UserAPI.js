import axiosUser from './AxiosUserConfig';
import axios, {baseUrl} from './AxiosConfig';
import Axios from 'axios';
import md5 from 'md5';

import {length} from '../helpers/Constants';

const LOGIN_USER = '/mobile/login';
const LIST_HISTORY = '/driver/log';
const RESET_PASSWORD = '/resetPassword';
const CHANGE_PASSWORD = '/changePassword';
const CHECK_PHONE = '/verifyPhone';
const GET_DETAIL = '/mobile/me';
const CONFIG_APP = baseUrl + '/driver/appConfig';

const loginUser = base64 => {
  return axiosUser.get(LOGIN_USER, {
    headers: {
      Authorization: 'Basic ' + base64,
    },
  });
};

const changePassword = (password, new_password, token, secret) => {
  // console.log(password, new_password);
  // return {
  //   success: true,
  // };
  return axiosUser.put(
    CHANGE_PASSWORD,
    {
      currentPassword: password,
      newPassword: new_password,
    },
    {
      headers: {
        'access-token': 'Bearer ' + token,
        secret,
      },
    },
  );
};

const checkPhone = (username, phone) => {
  return axiosUser.post(CHECK_PHONE, {
    username,
    phone,
  });
};

const resetPassword = (username, phone, password) => {
  return axiosUser.put(RESET_PASSWORD, {
    username,
    password,
    phone,
  });
};

const getListHistory = (pagenum, pagelength = length) => {
  return axios.get(LIST_HISTORY, {
    params: {
      pagenum,
      pagelength,
    },
  });
};

const getDetail = (token, secret) => {
  return axiosUser.get(GET_DETAIL, {
    headers: {
      'access-token': 'Bearer ' + token,
      secret,
    },
  });
};

const configApp = token => {
  return new Promise((reslove, reject) => {
    Axios.get(CONFIG_APP, {
      headers: {'Access-Token': token},
    })
      .then(response => {
        reslove(response.data);
      })
      .catch(error => {
        reslove({
          data: [],
        });
      });
  });
};

export default {
  loginUser,
  changePassword,
  checkPhone,
  getListHistory,
  getDetail,
  configApp,
  resetPassword,
};
