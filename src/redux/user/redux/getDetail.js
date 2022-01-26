const ACTION = 'GET_DETAIL';
const ACTION_SUCCESS = ACTION + '_SUCCESS';
const ACTION_ERROR = ACTION + '_ERROR';

const getDetail = () => ({
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

export {ACTION, getDetail, onSuccess, onFailure};

const initialState = {
  data: undefined,
  flag: 0,
  error: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ACTION:
      return {
        ...state,
      };

    case ACTION_SUCCESS: {
      return {
        ...state,
        flag: state.flag + 1,
        data: action.payload,
      };
    }

    case ACTION_ERROR: {
      return {
        ...state,
        error: action.error,
        data: undefined,
      };
    }

    default:
      return state;
  }
};
