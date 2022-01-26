const ACTION = 'UPDATE_FUEL';
const ACTION_SUCCESS = ACTION + '_SUCCESS';
const ACTION_ERROR = ACTION + 'ERROR';
const CLEAR = ACTION + 'CLEAR';

const updateFuel = (vehicle, litter) => ({
  type: ACTION,
  vehicle,
  litter,
});

const onSuccess = payload => ({
  type: ACTION_SUCCESS,
  payload,
});

const onFailure = error => ({
  type: ACTION_ERROR,
  error,
});

const onClearFuel = () => ({
  type: CLEAR,
});

const initialState = {
  error: false,
  fuel: 0,
  refreshFlag: 0,
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
        fuel: Number(action.payload),
        error: false,
        refreshFlag: state.refreshFlag + 1,
      };
    }

    case CLEAR: {
      return {
        ...state,
        fuel: 0,
      };
    }

    case ACTION_ERROR: {
      return {
        ...state,
        error: true,
        refreshFlag: state.refreshFlag + 1,
      };
    }

    default:
      return state;
  }
};

export {updateFuel, onSuccess, onFailure, ACTION, onClearFuel};
