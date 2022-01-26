const ACTION = 'LISTEN_ORDER_DISPATCH';
const ACTION_CLOSE = 'CLOSE_LISTEN';

const onListenOrderDispatch = userId => ({
  type: ACTION,
  userId,
});

const onDisconnectListen = () => ({
  type: ACTION_CLOSE,
});

const initialState = {
  flag: 0,
  client: undefined,
};

export {onListenOrderDispatch, onDisconnectListen, ACTION};

export default (state = initialState, action) => {
  switch (action.type) {
    case ACTION:
      return {...state, flag: state.flag + 1};

    case ACTION_CLOSE:
      return {...state, flag: state.flag + 1};
    default:
      return state;
  }
};
