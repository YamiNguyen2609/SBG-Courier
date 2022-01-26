const ACTION = 'GET_LIST_BILL_ID';
const ACTION_SUCCESS = ACTION + '_SUCCESS';
const ACTION_ERROR = ACTION + '_ERROR';
const ACTION_CLEAR = ACTION + '_CLEAR';

const getListBillId = () => ({
  type: ACTION,
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
  type: ACTION_CLEAR,
});

const initialState = {
  billIds: [],
};

export {ACTION, getListBillId, onFailure, onSuccess, onClear};

export default (state = initialState, action) => {
  switch (action.type) {
    case ACTION:
      return {...state};

    case ACTION_SUCCESS:
      return {
        ...state,
        billIds: action.payload ? action.payload : [],
      };

    case ACTION_ERROR:
      return {
        ...state,
        error: action.error,
      };

    case ACTION_CLEAR:
      return {
        ...state,
        billIds: [],
      };

    default:
      return state;
  }
};
