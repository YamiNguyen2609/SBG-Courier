const ACTION = 'GET_LIST_PAYMENT_METHOD';
const ACTION_SUCCESS = ACTION + '_SUCCESS';
const ACTION_ERROR = ACTION + '_ERROR';

const getListPayments = () => ({
  type: ACTION,
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
  payments: [],
  error: '',
};

export {ACTION, getListPayments, onFailure, onSuccess};

export default (state = initialState, action) => {
  switch (action.type) {
    case ACTION:
      return {...state};

    case ACTION_SUCCESS: {
      return {
        ...state,
        payments: action.payload,
      };
    }

    case ACTION_ERROR: {
      return {
        ...state,
        error: action.error,
      };
    }

    default:
      return state;
  }
};
