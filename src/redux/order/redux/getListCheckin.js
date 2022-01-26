const ACTION = 'GET_LIST_CHECKIN';
const ACTION_SUCCESS = ACTION + '_SUCCESS';
const ACTION_ERROR = ACTION + 'ERROR';

const getListCheckin = stationId => ({
  type: ACTION,
  stationId,
});

const onSuccess = payload => ({
  type: ACTION_SUCCESS,
  payload,
});

const onFailure = error => ({
  type: ACTION_ERROR,
  error,
});

export {ACTION, getListCheckin, onSuccess, onFailure};

const initialState = {
  data: [],
  flag: 0,
  error: 0,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ACTION:
      return {...state};

    case ACTION_SUCCESS:
      state['data'] = [];

      state['data'] = action.payload;

      state['flag'] = state['flag'] + 1;

      return {...state};

    case ACTION_ERROR:
      state['data'] = [];

      state['error'] = action.error;

      return {...state};

    default:
      return state;
  }
};
