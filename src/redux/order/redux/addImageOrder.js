const ACTION = 'ADD_IMAGE_ORDER';
const ACTION_SUCCESS = ACTION + '_SUCCESS';
const ACTION_ERROR = ACTION + '_ERROR';

const onAddImageOrder = data => ({
  type: ACTION,
  data,
});

const onSuccess = () => ({
  type: ACTION_SUCCESS,
});

const onFailure = error => ({
  type: ACTION_ERROR,
  error,
});

const initialState = {
  flag: 0,
  error: '',
};

export {ACTION, onAddImageOrder, onSuccess, onFailure};

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
