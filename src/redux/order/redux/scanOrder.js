import moment from 'moment';
import r from 'reactotron-react-native';

const ACTION = 'SCAN_ORDER';
const ACTION_ADD = 'ADD_IMAGE';
const ACTION_REMOVE = 'REMOVE_IMAGE';
const ACTION_SUCCESS = ACTION + '_SUCCESS';
const ACTION_ERROR = ACTION + '_ERROR';

const onScan = (barCode) => ({
  type: ACTION,
  barCode,
});

const onAddImage = (code, base64) => ({
  type: ACTION_ADD,
  base64,
  code,
});

const onRemoveImage = (id) => ({
  type: ACTION_REMOVE,
  id,
});

const onSuccess = (payload) => ({
  type: ACTION_SUCCESS,
  payload,
});

const onFailure = (error) => ({
  type: ACTION_ERROR,
  error,
});

const initialState = {
  error: '',
  barCodes: [],
  images: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ACTION: {
      let barCodes = state.barCodes;
      const idx = barCodes.findIndex((e) => {
        return e.code == action.barCode;
      });
      if (idx == -1) {
        barCodes = barCodes.concat({
          id: state.barCodes.length + 1,
          code: action.barCode,
          time: moment().format('DD-MM-YYYY HH:mm'),
        });
      } else {
        barCodes[idx]['time'] = moment().format('DD-MM-YYYY HH:mm');
      }
      return {
        ...state,
        barCodes,
      };
    }

    case ACTION_ADD: {
      let images = state.images;
      let imagesList = images.concat({
        id: images.length + 1,
        idBarCode: state.barCodes.filter((e) => {
          return e.code == action.code;
        })[0].id,
        uri: action.base64,
      });
      return {
        ...state,
        images: imagesList,
      };
    }

    case ACTION_REMOVE: {
      let images = state.images;
      let imagesList = images.filter((e) => {
        return e.id !== action.id;
      });
      return {
        ...state,
        images: imagesList,
      };
    }

    case ACTION_SUCCESS:
      return {
        ...state,
      };

    case ACTION_ERROR:
      return {
        ...state,
      };

    default:
      return state;
  }
};

export {ACTION, onSuccess, onScan, onFailure, onAddImage, onRemoveImage};
