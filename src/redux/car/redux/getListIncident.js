import r from 'reactotron-react-native';

const ACTION = 'GET_LIST_INCIDENT';
const ACTION_SUCCESS = ACTION + '_SUCCESS';
const ACTION_ERROR = ACTION + '_ERROR';

const getListIncident = () => ({
  type: ACTION,
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
  incidents: [],
  error: '',
};

export {ACTION, getListIncident, onSuccess, onFailure};

export default (state = initialState, action) => {
  switch (action.type) {
    case ACTION: {
      return {
        ...state,
      };
    }

    case ACTION_SUCCESS: {
      // const data = action.payload;

      // let incidents = [];

      let incidents = action.payload;

      r.log('incidents', incidents);

      // data.forEach(e => {
      //   let key = Object.keys(e)[0];
      //   incidents.push({
      //     code: key,
      //     name: e[key],
      //   });
      // });

      return {
        ...state,
        incidents,
        error: '',
      };
    }

    case ACTION_ERROR: {
      return {
        ...state,
        error: action.error,
        data: '',
      };
    }

    default:
      return state;
  }
};
