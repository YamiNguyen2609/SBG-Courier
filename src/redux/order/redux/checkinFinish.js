const ACTION = 'FINISH_CHECKIN';
const ACTION_SUCCESS = ACTION + '_SUCCESS';
const ACTION_ERROR = ACTION + '_ERROR';

const checkinFinish = data => ({
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

export {ACTION, onSuccess, onFailure, checkinFinish};

const initialState = {
  flag: 0,
  error: '',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ACTION:
      return {...state};

    case ACTION_SUCCESS:
      state['flag'] += 1;

      return {...state};

    case ACTION_ERROR:
      state['error'] = action.error;

      return {...state};

    default:
      return state;
  }
};
