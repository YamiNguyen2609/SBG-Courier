const ACTION = 'CANCEL_ORDER';
const ACTION_SUCCESS = ACTION + '_SUCCESS';
const ACTION_ERROR = ACTION + '_ERROR';

const cancelOrder = (data) => ({
  type: ACTION,
  data,
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
  flag: 0,
};

export {ACTION, cancelOrder, onSuccess, onFailure};

export default (state = initialState, action) => {
  switch (action.type) {
    case ACTION:
      return {...state};

    case ACTION_SUCCESS:
      return {...state, flag: state.flag + 1};

    case ACTION_ERROR:
      return {
        ...state,
      };

    default:
      return state;
  }
};
