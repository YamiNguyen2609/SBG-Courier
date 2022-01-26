const ACTION = 'CHANGE_PASSWORD';
const ACTION_SUCCESS = ACTION + '_SUCCESS';
const ACTION_ERROR = ACTION + '_ERROR';

const changePassword = (OldPassword, NewPassword) => ({
  type: ACTION,
  OldPassword,
  NewPassword,
});

const onSuccess = () => ({
  type: ACTION_SUCCESS,
});

const onFailure = () => ({
  type: ACTION_ERROR,
});

const initialState = {
  status: true,
  refreshFlag: 0,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ACTION:
      return {
        ...state,
      };

    case ACTION_SUCCESS:
      return {
        status: true,
        refreshFlag: state.refreshFlag + 1,
      };

    case ACTION_ERROR:
      return {
        status: false,
      };

    default:
      return state;
  }
};

export {ACTION, changePassword, onFailure, onSuccess};
