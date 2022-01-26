const ACTION = 'GET_UNIT';
const ACTION_SUCCESS = ACTION + '_SUCCESS';
const ACTION_ERROR = ACTION + '_ERROR';

const getUnit = () => ({
  type: ACTION,
});

const onSuccess = payload => ({
  type: ACTION_SUCCESS,
  payload,
});

const onFailure = error => ({
  type: ACTION_ERROR,
  error,
});

export {ACTION, getUnit, onFailure, onSuccess};

const initialState = {
  lengths: [],
  weights: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ACTION:
      return {...state};

    case ACTION_SUCCESS: {
      const {lengths, weights} = action.payload;

      state['lengths'] = lengths;
      state['weights'] = weights;

      return {...state};
    }

    case ACTION_ERROR:
      return {...state};

    default:
      return state;
  }
};
