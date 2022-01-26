import {takeEvery, put} from 'redux-saga/effects';
import r from 'reactotron-react-native';

import {Colors} from '../../../themes';
import {ACTION, onFailure, onSuccess} from '../redux/readImage';
import carAPI from '../../../api/carAPI';

import {flagIndicator} from '../../app';
import {ApiResponseStatusCode, typeMenu} from '../../../helpers/Constants';
import {showMessage} from 'react-native-flash-message';

function attachImage(data) {
  let path = /\d{2}\s?-?\s?[A-Z]{1,2}\d?(\s|-|)(\d{5}|\d{3}.\d{2}|\d{4})/;

  return String(data).match(path);
}

function detachImage(data) {
  return data.filter(e => {
    return (
      e.description
        .toString()
        .replace(/[,]/g, '')
        .replace(/[.]/g, '').length >= 5 &&
      Number(e.description.replace(/[,]/g, '-').replace(/[.]/g, '-')) > 0
    );
  });
}

function* readImage(action) {
  try {
    yield put(flagIndicator(true, {color: Colors.appColor}));
    var res = yield carAPI.DetectTextFromImage(action.base64);
    yield put(flagIndicator(false));
    if (res.status == ApiResponseStatusCode.SUCCESS) {
      var response = res.data.responses[0];
      switch (action.typeItem) {
        case typeMenu.CAR_DETACH: {
          var resData = detachImage(response.textAnnotations);
          console.log('resData', resData);
          if (resData.length == 1) {
            console.log('congtomet', resData[0].description.substring(0, 6));
            yield put(onSuccess(resData[0].description.substring(0, 6)));
          } else {
            showMessage({
              message: 'Thông báo lỗi',
              description: 'Không đọc được số công tơ mét của xe',
              type: 'warning',
            });
            yield put(onFailure('Không đọc được số công tơ mét của xe'));
          }
          break;
        }
        case typeMenu.CAR_ATTACH: {
          var res = attachImage(response.fullTextAnnotation.text);
          console.log(res);
          if (res.length > 0) {
            yield put(onSuccess(String(res[0]).replace(/[\n]/g, ' ')));
          } else {
            showMessage({
              message: 'Thông báo lỗi',
              description: 'Không đọc được biển số của xe',
              type: 'warning',
            });
            yield put(onFailure('Không đọc được biển số của xe'));
          }
        }
      }
    } else {
      yield put(
        onFailure(
          'Đã có lỗi xảy ra trong quá trình nhận dự liệu, vui lòng thử lại',
        ),
      );
    }
  } catch (error) {
    yield put(flagIndicator(false));
    yield put(
      onFailure(
        'Đã có lỗi xảy ra trong quá trình nhận dự liệu, vui lòng thử lại',
      ),
    );
  }
}

export default function* saga() {
  yield takeEvery(ACTION, readImage);
}
