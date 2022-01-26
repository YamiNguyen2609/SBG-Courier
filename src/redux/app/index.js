import r from 'reactotron-react-native';

const FLAG_INDICATOR = 'FLAG_INDICATOR';

const FLAG_TEXT_MESSAGE = 'FLAG_TEXT_MESSAGE';

const ROUTE_FOCUS = 'ROUTE_FOCUS';

const SHOW_FLAG_MESSAGE = 'SHOW_FLAG_MESSAGE';

const HIDE_FLAG_MESSAGE = 'HIDE_FLAG_MESSAGE';

const GET_CONNECT = 'GET_CONNECT';

const MESSAGE_WARNING = 'MESSAGE_WARNING';

const CHANGE_COMPANY = 'CHANGE_COMPANY';

const NOTIFY_DISPATCH = 'NOTIFY_DISPATCH';

const flagIndicator = (status, params) => ({
  type: FLAG_INDICATOR,
  status,
  params,
});

const flagTextMessage = params => ({
  type: FLAG_TEXT_MESSAGE,
  params,
});

const getRouteFocus = route => ({
  type: ROUTE_FOCUS,
  route,
});

const showFlagMessage = params => ({
  type: SHOW_FLAG_MESSAGE,
  params,
});

const hideFlagMessage = () => ({
  type: HIDE_FLAG_MESSAGE,
});

const connectionNetwork = state => ({
  type: GET_CONNECT,
  state,
});

const messageWarning = data => ({
  type: MESSAGE_WARNING,
  data,
});

const changeCompany = company => ({
  type: CHANGE_COMPANY,
  company,
});

const notifyDispatch = data => ({
  type: NOTIFY_DISPATCH,
  data,
});

const initialState = {
  flagIndicator: false,
  colorIndicator: '',
  routeFocus: 'HomeStack',
  textMessage: {
    message: '',
    time: 5000,
    flag: 0,
  },
  flagMessage: {
    horizontal: true,
    message: '',
    buttons: [],
    flag: false,
    item: undefined,
  },
  connection: true,
  messageWarning: {
    message: '',
    flag: 0,
  },
  company: 'sbs',
  messageDispatch: undefined,
  flagDispatch: 0,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FLAG_INDICATOR: {
      if (action.status) {
        return {
          ...state,
          colorIndicator: action.params.color,
          flagIndicator: action.status,
        };
      } else {
        return {
          ...state,
          flagIndicator: action.status,
        };
      }
    }

    case FLAG_TEXT_MESSAGE:
      return {
        ...state,
        textMessage: {
          ...state.textMessage,
          message: action.params.message,
          flag: state.textMessage.flag + 1,
        },
      };

    case ROUTE_FOCUS:
      return {
        ...state,
        routeFocus: action.route,
      };

    case SHOW_FLAG_MESSAGE:
      return {
        ...state,
        flagMessage: {
          horizontal: action.params.horizontal,
          message: action.params.message,
          title: action.params.title ? action.params.title : 'Thông báo',
          buttons: action.params.buttons,
          item: action.params.item,
          flag: true,
        },
      };

    case HIDE_FLAG_MESSAGE:
      return {
        ...state,
        flagMessage: {
          horizontal: true,
          message: '',
          buttons: [],
          flag: false,
          item: undefined,
        },
      };

    case GET_CONNECT:
      return {
        ...state,
        connection: action.state,
      };

    case MESSAGE_WARNING:
      return {
        ...state,
        messageWarning: {
          message: action.data,
          flag: state.messageWarning.flag + 1,
        },
      };

    case CHANGE_COMPANY:
      return {
        ...state,
        company: action.company,
      };

    case NOTIFY_DISPATCH: {
      return {
        ...state,
        messageDispatch: action.data,
        flagDispatch: state.flagDispatch + 1,
      };
    }

    default:
      return {...state};
  }
};

export {
  flagIndicator,
  flagTextMessage,
  getRouteFocus,
  hideFlagMessage,
  showFlagMessage,
  connectionNetwork,
  messageWarning,
  changeCompany,
  notifyDispatch,
};
