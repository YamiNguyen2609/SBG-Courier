const ACTION = 'READ_IMAGE';
const ACTION_SUCCESS = ACTION + '_SUCCESS';
const ACTION_ERROR = ACTION + 'ERROR';
const CLEAR = ACTION + 'CLEAR';
const ACTION_SET_DATA = 'SET_DATA';

const readImage = (typeItem, base64) => ({
  type: ACTION,
  base64,
  typeItem,
});

const setData = (data) => ({
  type: ACTION_SET_DATA,
  data,
});

const onSuccess = (payload) => ({
  type: ACTION_SUCCESS,
  payload,
});

const onFailure = (error) => ({
  type: ACTION_ERROR,
  error,
});

const onClear = () => ({
  type: CLEAR,
});

const initialState = {
  error: '',
  data: '',
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
        data: action.payload,
        error: '',
      };
    }

    case ACTION_SET_DATA: {
      return {
        ...state,
        data: action.data,
      };
    }

    case ACTION_ERROR: {
      return {
        ...state,
        error: action.error,
        data: '',
      };
    }

    case CLEAR: {
      return {
        ...state,
        error: '',
        data: '',
      };
    }

    default:
      return state;
  }
};

export {readImage, onSuccess, onFailure, ACTION, onClear, setData};
