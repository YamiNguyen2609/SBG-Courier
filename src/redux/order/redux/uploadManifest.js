import r from 'reactotron-react-native';

const ACTION = 'UPLOAD_MANIFEST';
const ACTION_ADD = 'ADD_MANIFEST';
const ACTION_SUCCESS = ACTION + '_SUCCESS';
const ACTION_ERROR = ACTION + '_ERROR';

const addManifest = (bill_id, images) => ({
  type: ACTION_ADD,
  bill_id,
  images,
});

const uploadManifest = (bill_id, images, isAddImageBill, status) => ({
  type: ACTION,
  bill_id,
  images,
  isAddImageBill,
  status,
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
  data: [],
  error: false,
  flagAdd: 0,
  flagSuccess: 0,
};

export {ACTION, uploadManifest, onSuccess, onFailure, addManifest};

export default (state = initialState, action) => {
  switch (action.type) {
    case ACTION:
      return {
        ...state,
        error: false,
      };
    case ACTION_ADD: {
      return {
        ...state,
        data: state.data.concat({
          bill: action.bill_id,
          images: action.images.map(e => {
            return {
              uri: e.uri,
              name: e.name,
            };
          }),
        }),
        flagAdd: state.flagAdd + 1,
      };
    }
    case ACTION_SUCCESS:
      return {
        ...state,
        flagSuccess: state.flagSuccess + 1,
      };
    case ACTION_ERROR:
      return {
        ...state,
        error: action.error,
        flagSuccessUpload: state.flagSuccess + 1,
      };
    default:
      return state;
  }
};
