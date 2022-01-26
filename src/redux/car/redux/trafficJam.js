const ACTION = 'TRAFFIC_JAM';
const ACTION_SUCCESS = ACTION + '_SUCCESS';
const ACTION_ERROR = ACTION + 'ERROR';

const trafficJam = (user, vehicle, status, isAPI) => ({
  type: ACTION,
  user,
  vehicle,
  status,
  isAPI,
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
  isTraffic: false,
  error: '',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ACTION: {
      return {
        ...state,
      };
    }

    case ACTION_SUCCESS: {
      return {
        ...state,
        isTraffic: action.payload,
        flag: state.flag + 1,
      };
    }

    case ACTION_ERROR: {
      return {
        ...state,
        error: action.error,
      };
    }

    default:
      return state;
  }
};

export {trafficJam, onSuccess, onFailure, ACTION};
