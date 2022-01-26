const ACTION = 'UPDATE_PRICE';
const ACTION_SUCCESS = ACTION + '_SUCCESS';
const ACTION_ERROR = ACTION + '_ERROR';
const ACTION_CLEAR = 'CLEAR';

const uploadPrice = data => ({
  type: ACTION,
  data,
});

const onSuccess = payload => ({
  type: ACTION_SUCCESS,
  payload,
});

const clearUpload = () => ({
  type: ACTION_CLEAR,
});

const onFailure = error => ({
  type: ACTION_ERROR,
  error,
});

const initialState = {
  flag: 0,
  error: '',
  isUpload: false,
};

export {ACTION, uploadPrice, onSuccess, onFailure, clearUpload};

export default (state = initialState, action) => {
  switch (action.type) {
    case ACTION:
      return {...state};

    case ACTION_SUCCESS:
      return {
        ...state,
        flag: state.flag + 1,
        isUpload: true,
      };

    case ACTION_ERROR:
      return {
        ...state,
        error: action.error,
      };

    case ACTION_CLEAR: {
      return {
        ...state,
        isUpload: false,
      };
    }

    default:
      return state;
  }
};
