const ACTION = 'GET_IMAGE';
const ACTION_SUCCESS = ACTION + '_SUCCESS';
const ACTION_ERROR = ACTION + '_ERROR';
const CLEAR = 'CLEAR';

const getImage = list_image => ({
  type: ACTION,
  list_image,
});

const onSuccess = payload => ({
  type: ACTION_SUCCESS,
  payload,
});

const onFailure = error => ({
  type: ACTION_ERROR,
  error,
});

const onClear = () => ({
  type: CLEAR,
});

const initialState = {
  images: [],
  error: false,
};

export {ACTION, getImage, onSuccess, onFailure, onClear};

export default (state = initialState, action) => {
  switch (action.type) {
    case ACTION:
      return {...state};

    case ACTION_SUCCESS:
      return {
        ...state,
        images: action.payload.map(e => {
          return {
            ...e,
            uri: `data:image/jpg;base64,${e.uri}`,
          };
        }),
      };

    case ACTION_ERROR:
      return {
        ...state,
        error: action.error,
      };

    case CLEAR:
      return {
        ...state,
        image: undefined,
        error: false,
      };

    default:
      return state;
  }
};
