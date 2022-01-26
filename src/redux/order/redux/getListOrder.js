const ACTION = 'GET_ORDERS';
const ACTION_SUCCESS = ACTION + '_SUCCESS';
const ACTION_ERROR = ACTION + '_ERROR';
const ACTION_REFRESH = ACTION + '_REFRESH';
const ACTION_TAB_DELIVERY = ACTION + '_TAB_DELIVERY';
const CLEAN = 'CLEAN';

const getOrders = (page_number, isRefresh) => ({
  type: ACTION,
  page_number,
  isRefresh,
});

const onSuccess = payload => ({
  type: ACTION_SUCCESS,
  payload,
});

const onFailure = error => ({
  type: ACTION_ERROR,
  error,
});

const onRefresh = () => ({
  type: ACTION_REFRESH,
});

const onCleanData = () => ({
  type: CLEAN,
});

const targetTab = () => ({
  type: ACTION_TAB_DELIVERY,
});

const initialState = {
  orders: [],
  error: '',
  total: 0,
  refreshing: 0,
  isTabDelivery: false,
};

export {
  ACTION,
  getOrders,
  onFailure,
  onSuccess,
  onRefresh,
  targetTab,
  onCleanData,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ACTION: {
      if (action.isRefresh) state.orders = [];
      return {...state};
    }

    case ACTION_SUCCESS: {
      const data = action.payload.data;
      let total = action.payload.total;
      let orders = [];
      if (data.length > 0) {
        data.forEach(element => {
          let {bill_id, thumbs} = element;
          var images = [];
          for (var keys in thumbs) {
            images.push({
              name: keys,
              uri: `data:image/jpg;base64,${thumbs[keys]}`,
            });
          }
          orders.push({
            code: bill_id,
            images: images,
          });
        });
      } else {
        orders = [];
      }

      return {
        ...state,
        orders: state.orders.concat(orders),
        total: total,
      };
    }

    case ACTION_ERROR:
      return {
        ...state,
        error: action.error,
      };

    case ACTION_TAB_DELIVERY:
      return {
        ...state,
        isTabDelivery: true,
      };

    case ACTION_REFRESH:
      return {
        ...state,
        refreshing: state.refreshing + 1,
      };

    case CLEAN:
      return {
        ...state,
        orders: [],
        error: '',
        total: 0,
        refreshing: 0,
        isTabDelivery: false,
      };

    default:
      return state;
  }
};
