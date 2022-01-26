const ACTION = 'RESET_PASSWORD';
const ACTION_SUCCESS = ACTION + '_SUCCESS';
const ACTION_ERROR = ACTION + '_ERROR';

const resetPassword = (username, phone) => ({
  type: ACTION,
  username,
  phone,
});

const onSuccess = () => ({
  type: ACTION_SUCCESS,
});

const onFailure = () => ({
  type: ACTION_ERROR,
});

export {ACTION, onSuccess, resetPassword, onFailure};

const initialState = {
  flag: 0,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ACTION:
      return {...state};

    case ACTION_SUCCESS:
      state['flag'] += 1;

      return {...state};

    case ACTION_ERROR:
      state['flag'] += 1;

      return {...state};

    default:
      return state;
  }
};
