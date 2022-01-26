const ACTION = 'REPORT_INCIDENT';
const ACTION_SUCCESS = ACTION + '_SUCCESS';
const ACTION_ERROR = ACTION + '_ERROR';

const reportIncident = (vehicle, id, title, note, location) => ({
  type: ACTION,
  id,
  title,
  note,
  vehicle,
  location,
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
        ...state,
        refreshFlag: state.refreshFlag + 1,
      };
    case ACTION_ERROR:
      return {
        ...state,
      };

    default:
      return state;
  }
};

export {ACTION, onSuccess, reportIncident, onFailure};
