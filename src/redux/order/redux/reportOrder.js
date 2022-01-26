import {stat} from 'react-native-fs';

const ACTION = 'TABLE_ORDER_REPORT';
const ACTION_SUCCESS = ACTION + '_SUCCESS';
const ACTION_ERROR = ACTION + '_ERROR';

const reportOrder = (pageNumber, refreshing) => ({
  type: ACTION,
  pageNumber,
  refreshing,
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
  error: undefined,
  total: 0,
};

export {reportOrder, onSuccess, onFailure, ACTION};

export default (state = initialState, action) => {
  switch (action.type) {
    case ACTION:
      return {...state};

    case ACTION_SUCCESS: {
      const {refreshing, data, total} = payload;
      if (refreshing) state.data = [];

      state.data.concat(action.payload.data);

      state.total = total;

      return {
        ...state,
      };
    }

    case ACTION_ERROR:
      return {
        ...state,
        error: action.error,
      };

    default:
      return state;
  }
};
