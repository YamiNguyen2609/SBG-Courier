import React, {Component} from 'react';
import {View} from 'react-native';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import codePush from 'react-native-code-push';
import BackgroundJob from 'react-native-background-job';

import {store, persistor} from '../redux/ConfigureStore';
import '../config/ReactotronConfig';
import RootContainer from './RootContainer';

let codePushOptions = {checkFrequency: codePush.CheckFrequency.MANUAL};

export class App extends Component {
  state = {
    isUpdate: false,
    receivedBytes: 0,
    totalBytes: 1,
  };

  UNSAFE_componentWillMount() {
    BackgroundJob.cancelAll();
  }

  render() {
    const {isUpdate, receivedBytes, totalBytes} = this.state;
    return (
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <RootContainer />
        </PersistGate>
      </Provider>
    );
  }
}

export default codePush(codePushOptions)(App);
