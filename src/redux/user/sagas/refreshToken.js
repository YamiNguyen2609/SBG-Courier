import {put} from 'redux-saga/effects';
import {Buffer} from 'safe-buffer';

import {onFailure, onSuccess} from '../redux/loginUser';
import UserAPI from '../../../api/UserAPI';
import {attachCar} from '../../car/redux/carHandle';
import {_saveToken} from '../../../helpers/LocalStorage';

function refreshToken(action) {
  return new Promise((reslove, reject) => {
    try {
      let base64 = Buffer.from(
        action['username'].toUpperCase() + ':' + action['password'],
      ).toString('base64');

      UserAPI.loginUser(base64).then(res => {
        if (res['isSuccess']) {
          _saveToken(
            res['data']['access_token'],
            res['data']['secret'],
            res['data']['access_system'],
          );
          reslove({
            success: true,
          });
        } else {
          reject({
            success: false,
          });
        }
      });
    } catch (error) {
      //-------------- Request API Failure
      reject({
        success: false,
        error: JSON.stringify(error),
      });
    }
  });
}

export {refreshToken};
