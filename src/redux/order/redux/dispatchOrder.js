const ACTION = 'DISPATCH_ORDER';
const ACTION_SUCCESS = ACTION + '_SUCCESS';
const ACTION_ERROR = ACTION + '_ERROR';

const dispatchOrder = data => ({
  type: ACTION,
  data,
});

const onSuccess = result => ({
  type: ACTION_SUCCESS,
  result,
});

const onFailure = result => ({
  type: ACTION_ERROR,
  result,
});

const initialState = {
  refreshFlag: 0,
  item: undefined,
  success: false,
  isComplete: false,
};

export {ACTION, dispatchOrder, onSuccess, onFailure};

export default (state = initialState, action) => {
  switch (action.type) {
    case ACTION: {
      state.success = false;
      return {...state};
    }

    case ACTION_SUCCESS:
      return {
        ...state,
        refreshFlag: state.refreshFlag + 1,
        success: true,
        item: action['result']['data'],
        isComplete: action['result']['isComplete'],
      };

    case ACTION_ERROR:
      return {
        ...state,
        refreshFlag: state.refreshFlag + 1,
        success: false,
        item: action['result']['data'],
        isComplete: action['result']['isComplete'],
      };

    default:
      return state;
  }
};
