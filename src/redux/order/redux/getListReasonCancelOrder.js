const ACTION = 'GET_LIST_REASON_CANCEL_ORDER';
const ACTION_SUCCESS = ACTION + '_SUCCESS';
const ACTION_ERROR = ACTION + '_ERROR';

const getListReasonCancelOrder = typeOrder => ({
  type: ACTION,
  typeOrder,
});

const onSuccess = payload => ({
  type: ACTION_SUCCESS,
  payload,
});

const onFailure = error => ({
  type: ACTION_ERROR,
  error,
});

const initialState = {
  data: [],
  error: '',
};

export {ACTION, getListReasonCancelOrder, onFailure, onSuccess};

export default (state = initialState, action) => {
  switch (action.type) {
    case ACTION:
      return {
        ...state,
      };

    case ACTION_SUCCESS:
      return {
        ...state,
        data: action.payload,
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
