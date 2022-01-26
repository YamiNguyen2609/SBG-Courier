const ACTION = 'GET_SELLING';
const ACTION_SUCCESS = ACTION + '_SUCCESS';
const ACTION_ERROR = ACTION + '_ERROR';
const ACTION_CLEAR = 'CLEAR_SELLING';

const getSelling = data => ({
  type: ACTION,
  data,
});

const clearSelling = () => ({
  type: ACTION_CLEAR,
});

const onSuccess = payload => ({
  type: ACTION_SUCCESS,
  payload,
});

const onFailure = error => ({
  type: ACTION_ERROR,
  error,
});

export {ACTION, getSelling, clearSelling, onSuccess, onFailure};

const initialState = {
  flag: 0,
  error: '',
  data: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ACTION:
      state['data'] = null;
      return {...state};

    case ACTION_SUCCESS:
      state['flag'] += 1;
      state['data'] = action.payload;
      return {...state};

    case ACTION_ERROR:
      state['error'] = action.error;
      return {...state};

    case ACTION_CLEAR:
      state['flag'] += 1;
      state['data'] = null;
      return {...state};

    default:
      return state;
  }
};
