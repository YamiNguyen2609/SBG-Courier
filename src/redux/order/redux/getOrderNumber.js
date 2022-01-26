const ACTION = 'GET_ORDER_NUMBER';
const ACTION_SUCCESS = ACTION + '_SUCCESS';
const ACTION_ERROR = ACTION + '_ERROR';

const getOrderNumber = data => ({
  type: ACTION,
  data,
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
  data: undefined,
  flagSuccess: 0,
  flagError: 0,
};

export {ACTION, getOrderNumber, onFailure, onSuccess};

export default (state = initialState, action) => {
  switch (action['type']) {
    case ACTION:
      return {...state};

    case ACTION_SUCCESS:
      return {
        ...state,
        data: action.payload,
        flagSuccess: state['flagSuccess'] + 1,
      };

    case ACTION_ERROR: {
      state['data'] = action.error;
      state['flagError'] += 1;
      return {
        ...state,
      };
    }

    default:
      return state;
  }
};
