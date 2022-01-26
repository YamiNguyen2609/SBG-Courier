const ACTION = 'LOG_ORDER';
const ACTION_SUCCESS = ACTION + '_SUCCESS';
const ACTION_ERROR = ACTION + '_ERROR';

const onLogOrder = (orderId, bookingId) => ({
  type: ACTION,
  orderId,
  bookingId,
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
};

export {onLogOrder, onSuccess, onFailure, ACTION};

export default (state = initialState, action) => {
  switch (action.type) {
    case ACTION:
      return {...state, data: []};

    case ACTION_SUCCESS: {
      let data = action.payload.order.concat(
        action.payload.accounting.map(e => {
          return {
            ...e,
            files: [],
          };
        }),
      );

      return {
        ...state,
        data: data.sort((a, b) => new Date(a.CreateAt) - new Date(b.CreateAt)),
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
