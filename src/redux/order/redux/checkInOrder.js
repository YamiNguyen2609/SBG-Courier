const ACTION = 'CHECK_IN_ORDER';
const ACTION_SUCCESS = ACTION + '_SUCCESS';
const ACTION_ERROR = ACTION + '_ERROR';
const CLEAR_ORDER = 'CLEAR_ORDER';

const checkInOrder = (data, station, scanOrder) => ({
  type: ACTION,
  data,
  station,
  scanOrder,
});

const onSuccess = payload => ({
  type: ACTION_SUCCESS,
  payload,
});

const onFailure = error => ({
  type: ACTION_ERROR,
  error,
});

const clearOrderCheckIn = () => ({
  type: CLEAR_ORDER,
});

const initialState = {
  flag: 0,
  data: undefined,
  error: false,
};

export {ACTION, checkInOrder, onSuccess, onFailure, clearOrderCheckIn};

export default (state = initialState, action) => {
  switch (action.type) {
    case ACTION:
      return {...state, error: false, data: undefined};

    case ACTION_SUCCESS:
      return {
        ...state,
        flag: state.flag + 1,
        data: action.payload,
      };

    case ACTION_ERROR:
      return {
        ...state,
        flag: state.flag + 1,
        error: true,
      };

    case CLEAR_ORDER:
      return {
        ...state,
        data: undefined,
      };

    default:
      return state;
  }
};
