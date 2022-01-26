const ACTION = 'GET_DETAIL_ORDER';
const ACTION_SUCCESS = ACTION + '_SUCCESS';
const ACTION_ERROR = ACTION + '_ERROR';
const CLEAR_ORDER = 'CLEAR_ORDER';

const getDetailOrder = (typeOrder, data, classify) => ({
  type: ACTION,
  data,
  typeOrder,
  classify,
});

const onSuccess = (payload, typeOrder, isComplete) => ({
  type: ACTION_SUCCESS,
  payload,
  typeOrder,
  isComplete,
});

const onFailure = error => ({
  type: ACTION_ERROR,
  error,
});

const clearOrderCheckIn = () => ({
  type: CLEAR_ORDER,
});

const initialState = {
  flag: 0,
  data: undefined,
  isComplete: false,
  error: false,
};

export {ACTION, getDetailOrder, onSuccess, onFailure, clearOrderCheckIn};

export default (state = initialState, action) => {
  switch (action.type) {
    case ACTION:
      return {...state, error: false, data: undefined};

    case ACTION_SUCCESS:
      return {
        ...state,
        flag: state.flag + 1,
        data: action.payload,
        typeOrder: action.typeOrder,
        isComplete: action.isComplete,
      };

    case ACTION_ERROR:
      return {
        ...state,
        error: true,
      };

    case CLEAR_ORDER:
      return {
        ...state,
        data: undefined,
      };

    default:
      return state;
  }
};
