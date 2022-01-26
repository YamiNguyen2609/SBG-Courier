import moment from 'moment';
import r from 'reactotron-react-native';
import {Images} from '../../../themes';

const ACTION = 'GET_LIST_HISTORY';
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
      const {total, data, listIncident} = action.payload;

      r.log(action.payload);

      let dataIncidents = {};

      listIncident.forEach(el => {
        // var key = Object.keys(el)[0];
        // dataIncidents[key] = el[key];
        dataIncidents[el.code] = el.name;
      });

      // r.log('log', dataIncidents);

      let resultData = state.data;

      data.forEach(el => {
        let index = resultData
          .map(e => e.header)
          .indexOf(moment(new Date(el.taken_at)).format('MM-YYYY'));
        // console.log('vo 1');
        let title = '';
        let icon = undefined;
        switch (el.action) {
          case 'attach_vehicle':
            title = 'Nhận xe ' + el.metadata.vehicle;
            icon = Images.icReturn;
            break;
          case 'detach_vehicle':
            title = 'Trả xe ' + el.metadata.vehicle;
            icon = Images.icReturn;
            break;
          case 'report_gas_pump':
            title =
              'Đỗ ' + el.metadata.liter + ' lít vào xe ' + el.metadata.vehicle;
            icon = Images.icRefuel;
            break;
          case 'report_incident':
            title =
              'Báo sự cố ' +
              dataIncidents[el.metadata.incident_code].toLowerCase() +
              ' của xe ' +
              el.metadata.vehicle;
            icon = Images.icTruckBroken;
            break;
          case 'upload_manifest':
            title = 'Upload bill ' + el.metadata.bill_id;
            icon = Images.icScan;
            break;
          case 'add_image':
            title = 'Thêm ảnh vào bill ' + el.metadata.bill_id;
            icon = Images.icScan;
            break;
          default:
            title = '';
            break;
        }

        // console.log('vo 2');

        if (title)
          if (index == -1) {
            resultData.push({
              header: moment(new Date(el.taken_at)).format('MM-YYYY'),
              child: [
                {
                  date: moment(new Date(el.taken_at)).format('DD-MM HH:mm'),
                  title,
                  icon,
                },
              ],
            });
          } else {
            resultData[index].child.push({
              date: moment(new Date(el.taken_at)).format('DD-MM HH:mm'),
              title,
              icon,
            });
          }
        // r.log(title);
      });

      return {
        ...state,
        data: resultData,
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
