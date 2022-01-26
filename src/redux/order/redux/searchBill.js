const ACTION = 'SEARCH_BILL_ID';
const ACTION_SUCCESS = ACTION + '_SUCCESS';
const ACTION_ERROR = ACTION + '_ERROR';
const CLEAR = 'CLEAR';

import r from 'reactotron-react-native';

const searchBillId = billId => ({
  type: ACTION,
  billId,
});

const onSuccess = payload => ({
  type: ACTION_SUCCESS,
  payload,
});

const onFailure = error => ({
  type: ACTION_ERROR,
  error,
});

const onClear = () => ({
  type: CLEAR,
});

const initialState = {
  bill: undefined,
  error: '',
};

export {ACTION, searchBillId, onSuccess, onFailure, onClear};

export default (state = initialState, action) => {
  switch (action.type) {
    case ACTION:
      return {...state};

    case ACTION_SUCCESS: {
      const {bill_id, image_list, image_thumb} = action.payload;

      let bill = {};

      bill['code'] = bill_id;
      bill['images'] = image_list.map(e => {
        return {
          name: e,
          uri: `data:image/jpg;base64,${image_thumb[e]}`,
        };
      });

      return {
        ...state,
        bill: bill,
      };
    }

    case ACTION_ERROR:
      return {
        ...state,
        error: action.error,
      };
    case CLEAR:
      return {
        ...state,
        bill: undefined,
        error: '',
      };

    default:
      return state;
  }
};
