const ACTION = 'LOGIN_USER';
const ACTION_SUCCESS = ACTION + '_SUCCESS';
const ACTION_ERROR = ACTION + '_ERROR';
const ACTION_LOGOUT = 'LOGOUT_USER';
const ACTIVE_USER = 'ACTIVE_USER';
const UPDATE_PASSWORD = 'UPDATE_PASSWORD';

const loginUser = (username, password, token, notifyCar, notifyUser) => ({
  type: ACTION,
  username,
  password,
  token,
  notifyCar,
  notifyUser,
});

const onSuccess = payload => ({
  type: ACTION_SUCCESS,
  payload,
});

const onFailure = error => ({
  type: ACTION_ERROR,
  error,
});

const logoutUser = () => ({
  type: ACTION_LOGOUT,
});

const activeUser = username => ({
  type: ACTIVE_USER,
  username,
});

const updatePassword = password => ({
  type: UPDATE_PASSWORD,
  password,
});

const initialState = {
  username: undefined,
  user: undefined,
  error: undefined,
  successStack: 0,
  errorStack: 0,
  userActive: false,
};

export {
  ACTION,
  loginUser,
  onSuccess,
  onFailure,
  logoutUser,
  activeUser,
  updatePassword,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ACTION:
      return {
        ...state,
      };
    case ACTION_SUCCESS:
      return {
        ...state,
        user: action.payload,
        successStack: state.successStack + 1,
        userActive: false,
        username: undefined,
      };
    case ACTION_ERROR:
      return {
        ...state,
        error: action.error,
        errorStack: state.errorStack + 1,
      };

    case ACTIVE_USER:
      return {
        ...state,

        userActive: true,
        successStack: state.successStack + 1,
      };

    case UPDATE_PASSWORD:
      state.user['password'] = action.password;

      return {
        ...state,
        user: {
          ...state.user,
          password: password,
        },
      };

    case ACTION_LOGOUT:
      return {
        ...state,
        user: undefined,
      };
    default:
      return state;
  }
};
