const ACTION = 'CAR_ACTION';
const ACTION_SUCCESS = ACTION + '_SUCCESS';
const ACTION_ERROR = ACTION + 'ERROR';
const ATTACH_CAR_LOGIN = 'ATTACH_CAR_LOGIN';
const ACTION_CLEAR = ACTION + 'CLEAR';

const actionCar = (typeItem, vehicle, odometer) => ({
  type: ACTION,
  typeItem,
  vehicle,
  odometer,
});

const onSuccess = payload => ({
  type: ACTION_SUCCESS,
  payload,
});

const attachCar = payload => ({
  type: ATTACH_CAR_LOGIN,
  payload,
});

const onFailure = error => ({
  type: ACTION_ERROR,
  error,
});

const clearCar = () => ({
  type: ACTION_CLEAR,
});

const initialState = {
  error: false,
  stateCar: false,
  licensePlates: '',
  refreshFlag: 0,
  odometer: 0,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ACTION: {
      return {
        ...state,
        types: action.types,
      };
    }

    case ACTION_SUCCESS: {
      return {
        ...state,
        stateCar: action.payload.stateCar,
        licensePlates: action.payload.licensePlates,
        error: false,
        refreshFlag: state.refreshFlag + 1,
        odometer: action.payload.odometer,
      };
    }

    case ACTION_ERROR: {
      return {
        ...state,
        error: true,
        refreshFlag: state.refreshFlag + 1,
      };
    }

    case ATTACH_CAR_LOGIN: {
      return {
        ...state,
        error: false,
        licensePlates: action.payload.license_plate,
        stateCar: true,
        odometer: action.payload.odometer,
      };
    }

    case ACTION_CLEAR: {
      return {
        ...state,
        error: false,
        licensePlates: '',
        stateCar: false,
        odometer: 0,
      };
    }

    default:
      return state;
  }
};

export {actionCar, onSuccess, onFailure, attachCar, clearCar, ACTION};
