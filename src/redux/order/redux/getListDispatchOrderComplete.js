import {typeDispatch} from '../../../helpers/Constants';
import r from 'reactotron-react-native';

const ACTION = 'GET_LIST_DISPATCH_ORDER_COMPLETE';
const ACTION_SUCCESS = ACTION + '_SUCCESS';
const ACTION_ERROR = ACTION + '_ERROR';

const getListDispatchOrderComplete = (
  typeDispatch,
  pageNumber,
  refreshing,
  keyword,
  pageLength,
) => ({
  type: ACTION,
  typeDispatch,
  pageNumber,
  pageLength,
  refreshing,
  keyword,
});

const onSuccess = result => ({
  type: ACTION_SUCCESS,
  result,
});

const onFailure = error => ({
  type: ACTION_ERROR,
  error,
});

const initialState = {
  deliveries: {
    total: 0,
    data: [],
    flag: 0,
  },
  receives: {
    total: 0,
    data: [],
    flag: 0,
  },
  error: '',
  firstLoad: false,
};

export {ACTION, getListDispatchOrderComplete, onFailure, onSuccess};

export default (state = initialState, action) => {
  switch (action.type) {
    case ACTION: {
      if (action.refreshing) {
        if (action.typeDispatch == typeDispatch.DELIVERY)
          return {
            ...state,
            deliveries: {
              ...state.deliveries,
              data: [],
            },
          };
        else
          return {
            ...state,
            receives: {
              ...state.receives,
              data: [],
            },
          };
      } else {
        return {...state};
      }
    }

    case ACTION_SUCCESS: {
      if (action.result.typeDispatch == typeDispatch.DELIVERY)
        return {
          ...state,
          deliveries: {
            ...state.deliveries,
            data: state.deliveries.data.concat(action.result.data),
            total: action.result.total,
            flag: state.deliveries.flag + 1,
          },
        };
      else
        return {
          ...state,
          receives: {
            ...state.receives,
            data: state.receives.data.concat(action.result.data),
            total: action.result.total,
            flag: state.receives.flag + 1,
          },
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
