const ACTION = 'UPDATE_ORDER';
const ACTION_CHANGE_SUCCESS = ACTION + '_CHANGE_SUCCESS';
const ACTION_UPDATE_SUCCESS = ACTION + '_UPDATE_SUCCESS';
const ACTION_ERROR = ACTION + '_ERROR';
const ACTION_CLEAR = 'CLEAR_ORDER';

const updateOrder = data => ({
  type: ACTION,
  data,
});

const clearPaymentOrder = () => ({
  type: ACTION_CLEAR,
});

const onSuccessChange = payload => ({
  type: ACTION_CHANGE_SUCCESS,
  payload,
});

const onSuccessUpdate = payload => ({
  type: ACTION_UPDATE_SUCCESS,
  payload,
});

const onFailure = error => ({
  type: ACTION_ERROR,
  error,
});

const initialState = {
  payment: undefined,
  error: '',
  flag: 0,
  data: '',
};

export {
  ACTION,
  updateOrder,
  onSuccessChange,
  onFailure,
  clearPaymentOrder,
  onSuccessUpdate,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ACTION:
      return {
        ...state,
      };

    case ACTION_CHANGE_SUCCESS:
      return {
        ...state,
        payment: action.payload,
      };

    case ACTION_UPDATE_SUCCESS:
      return {
        ...state,
        flag: state.flag + 1,
        data: action.payload,
      };

    case ACTION_CLEAR:
      return {
        ...state,
        payment: undefined,
      };

    case ACTION_ERROR:
      return {
        ...state,
        error: action.error,
      };

    default:
      return state;
  }
};
