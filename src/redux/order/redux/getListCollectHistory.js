import moment from 'moment';
import r from 'reactotron-react-native';

const ACTION = 'GET_LIST_HISTORY_COLLECT';
const ACTION_SUCCESS = ACTION + '_SUCCESS';
const ACTION_ERROR = ACTION + '_ERROR';
const CLEAR = ACTION + '_CLEAR';

const getListHistory = (pageNumber, isRefresh) => ({
  type: ACTION,
  pageNumber,
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

const onClear = () => ({
  type: CLEAR,
});

const initialState = {
  data: [],
  error: '',
  total: 0,
  refreshFlag: 0,
  listIncident: undefined,
};

export {ACTION, getListHistory, onSuccess, onFailure, onClear};

export default (state = initialState, action) => {
  switch (action.type) {
    case ACTION: {
      let data = state.data;
      if (action.isRefresh) data = [];
      if (action)
        return {
          ...state,
          data,
        };
    }
    case ACTION_SUCCESS:
      const {total, data} = action.payload;

      let initData = state.data;

      r.log('data', data);

      data.forEach(e => {
        var indexDate = initData
          .map(e => e.date)
          .indexOf(moment(e['createdAt']).format('DD-MM-YYYY'));

        r.log('indexDate', indexDate);

        if (indexDate == -1) {
          initData.push({
            date: moment(e['createdAt']).format('DD-MM-YYYY'),
            data: [
              {
                orderNumber: e['orderNumber'] ?? e['orderNumberClient'],
                hawb: [e['HAWB']],
              },
            ],
          });
        } else {
          var indexOrder = initData[indexDate]['data']
            .map(e => e.orderNumber)
            .indexOf(e.orderNumber ?? e.orderNumberClient);

          if (indexOrder == -1) {
            initData[indexDate]['data'].push({
              orderNumber: e['orderNumber'] ?? e['orderNumberClient'],
              hawb: [e['HAWB']],
            });
          } else {
            initData[indexDate]['data'][indexOrder]['hawb'].push(e['HAWB']);
          }
        }
      });

      r.log('initData', initData);

      return {
        ...state,
        data: initData,
        total,
        refreshFlag: state.refreshFlag + 1,
      };
    case ACTION_ERROR:
      return {
        ...state,
        error: action.error,
      };
    case CLEAR:
      return {
        ...state,
        refreshFlag: state.refreshFlag + 1,
      };
    default:
      return state;
  }
};
