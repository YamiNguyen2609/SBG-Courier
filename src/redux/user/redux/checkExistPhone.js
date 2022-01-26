const ACTION = 'SEND_OTP';
const ACTION_SUCCESS = ACTION + '_SUCCESS';
const ACTION_ERROR = ACTION + '_ERROR';

const checkExistPhone = (username, phoneNumber) => ({
  type: ACTION,
  username,
  phoneNumber,
});

const onSuccess = payload => ({
  type: ACTION_SUCCESS,
  payload,
});

const onFailure = () => ({
  type: ACTION_ERROR,
});

const initialState = {
  flag: 0,
  data: false,
  code: '',
};

export {ACTION, checkExistPhone, onSuccess, onFailure};

export default (state = initialState, action) => {
  switch (action.type) {
    case ACTION:
      return {
        ...state,
      };
    case ACTION_SUCCESS:
      state['flag'] += 1;
      state['data'] = action.payload.data;
      state['code'] = action.payload.code;

      return {
        ...state,
      };
    case ACTION_ERROR:
      return {
        ...state,
        status: false,
        refreshFlag: state.refreshFlag + 1,
      };
    default:
      return state;
  }
};
