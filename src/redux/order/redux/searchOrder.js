const ACTION = 'SCAN_ORDER_NUMBER';
const ACTION_SUCCESS = ACTION + '_SUCCESS';
const ACTION_ERROR = ACTION + '_ERROR';

const scanOrderNumber = orderNumber => ({
  type: ACTION,
  orderNumber,
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
  flag: 0,
  item: undefined,
  classify: 0,
  type: 0,
  error: '',
};

export {ACTION, scanOrderNumber, onSuccess, onFailure};

export default (state = initialState, action) => {
  switch (action.type) {
    case ACTION:
      return {
        ...state,
        item: undefined,
      };

    case ACTION_SUCCESS:
      return {
        ...state,
        flag: state.flag + 1,
        item: action.payload.item,
        type: action.payload.type,
        classify: action.payload.classify,
      };

    case ACTION_ERROR:
      return {
        ...state,
        flag: state.flag + 1,
        orderItem: null,
      };

    default:
      return state;
  }
};
