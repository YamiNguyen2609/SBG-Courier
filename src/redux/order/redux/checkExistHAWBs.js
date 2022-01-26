const ACTION = 'CHECK_EXIST_HAWB';
const ACTION_SUCCESS = ACTION + '_SUCCESS';
const ACTION_ERROR = ACTION + '_ERROR';
const REMOVE_HAWB = 'REMOVE_HAWB';
const CLEAR_HAWB = 'CLEAR_HAWB';
const ADD_HAWB = 'ADD_HAWB';

const checkExistHawb = data => ({
  type: ACTION,
  data,
});

const onSuccess = payload => ({
  type: ACTION_SUCCESS,
  payload,
});

const addHawb = payload => ({
  type: ADD_HAWB,
  payload,
});

const onFailure = error => ({
  type: ACTION_ERROR,
  error,
});

const removeHawb = (id, hawb) => ({
  type: REMOVE_HAWB,
  id,
  hawb,
});

const clearHawb = data => ({
  type: CLEAR_HAWB,
  data,
});

const initialState = {
  item: undefined,
  flag: 0,
  flagItem: 0,
  data: [],
  error: false,
  status: 0, //0 - không tìm thấy, 1 - hold, 2 - success, 3 - gom đủ
};

export {
  ACTION,
  checkExistHawb,
  onSuccess,
  onFailure,
  removeHawb,
  clearHawb,
  addHawb,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ACTION:
      return {...state, error: false, status: 0, item: undefined};

    case ACTION_SUCCESS:
      return {
        ...state,
        flagItem: state.flagItem + 1,
        item: action.payload,
      };

    case ADD_HAWB:
      var data = state.data;
      var arr = action.payload;

      if (arr.length > 0) {
        var item = arr[0];

        var index = data
          .map(e => e['orderNumber'])
          .indexOf(item['orderNumber']);

        if (index == -1) {
          data.push({
            id: data.length + 1,
            orderNumber: item['orderNumber'],
            hawb: [item['HAWBs']],
            total: item['totalManifest'],
            current: 1,
          });

          state.status = 1 == item['totalManifest'] ? 3 : 2;
        } else {
          if (data[index]['hawb'].indexOf(item['HAWBs']) == -1) {
            data[index]['hawb'].push(item['HAWBs']);
            data[index]['current'] += 1;

            state.status =
              data[index]['current'] == data[index]['total'] ? 3 : 2;
          } else {
            state.status = 1;
          }
        }
      }

      console.log('status', state.status);

      return {
        ...state,
        flag: state.flag + 1,
        data,
      };

    case ACTION_ERROR:
      return {
        ...state,
        error: true,
        status: 0,
      };

    case REMOVE_HAWB:
      var data = state.data;

      var index = data.map(e => e['id']).indexOf(action.id);

      data[index]['hawb'] = data[index]['hawb'].filter(e => e != action.hawb);
      data[index]['current'] -= 1;

      if (data[index]['current'] == 0)
        data = data.filter(e => e.id != action.id);

      return {
        ...state,
        data,
      };

    case CLEAR_HAWB:
      var data = state.data;

      let result = action.data;

      console.log(result);

      if (result.length == 1) {
        var data = data.filter(x => x.id != result[0].id);
      } else {
        data = [];
      }

      return {
        ...state,
        data,
      };

    default:
      return state;
  }
};
