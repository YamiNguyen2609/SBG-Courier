const ACTION = 'UPLOAD_ORDER';
const ACTION_SUCCESS = ACTION + '_SUCCESS';
const ACTION_ERROR = ACTION + '_ERROR';

const uploadOrder = (data, status) => ({
  type: ACTION,
  data,
  status,
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
  error: '',
  data: undefined,
};

export {ACTION, uploadOrder, onSuccess, onFailure};

export default (state = initialState, action) => {
  switch (action.type) {
    case ACTION:
      return {
        ...state,
      };

    case ACTION_SUCCESS:
      return {
        ...state,
        flag: state.flag + 1,
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
