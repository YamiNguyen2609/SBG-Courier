const ACTION = 'UPDATE_LOCATION';
const ACTION_SUCCESS = ACTION + '_SUCCESS';
const ACTION_ERROR = ACTION + '_ERROR';

const updateLocation = company => ({
  type: ACTION,
  company,
});

const onSuccess = payload => ({
  type: ACTION_SUCCESS,
  payload,
});

const onError = error => ({
  type: ACTION_ERROR,
  error,
});

const initialState = {
  location: undefined,
  flag: 0,
};

export {ACTION, updateLocation, onSuccess, onError};

export default (state = initialState, action) => {
  switch (action.type) {
    case ACTION:
      return {...state};

    case ACTION_SUCCESS:
      return {
        ...state,
        flag: state.flag + 1,
      };

    case ACTION_ERROR:
      return {
        ...state,
        flag: state.flag - 1,
      };

    default:
      return state;
  }
};
