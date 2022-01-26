import React, {Component} from 'react';
import {BackHandler, AppState} from 'react-native';
import {connect} from 'react-redux';
import NetInfo from '@react-native-community/netinfo';
import Orientation from 'react-native-orientation-locker';
import AsyncStorage from '@react-native-community/async-storage';
import PushNotification from 'react-native-push-notification';
import {showMessage} from 'react-native-flash-message';
import moment from 'moment';
import BackgroundJob from 'react-native-background-job';
import {firebase} from '@react-native-firebase/messaging';
import Permissions from 'react-native-permissions';
import clear from 'react-native-clear-cache';
import mqttSp from 'sp-react-native-mqtt';
import r from 'reactotron-react-native';

import HomeTabNavigation from '../../../navigation/HomeTabNavigation';
import HomeAdminTabNavigation from '../../../navigation/HomeAdminTabNavigation';
import {loginUser} from '../../../redux/user/redux/loginUser';
import {
  getRouteFocus,
  showFlagMessage,
  hideFlagMessage,
  connectionNetwork,
} from '../../../redux/app';
import {updateLocation} from '../../../redux/car/redux/updateLocation';
import {getOrders} from '../../../redux/order/redux/getListOrder';
import {clearCar} from '../../../redux/car/redux/carHandle';
import {getListBillId} from '../../../redux/order/redux/getListBillId';
import {onFirstLoad} from '../../../redux/order/redux/getListDispatchOrder';
import {trafficJam} from '../../../redux/car/redux/trafficJam';
import {
  onListenOrderDispatch,
  onDisconnectListen,
} from '../../../redux/order/redux/listenOrderDispatch';

export class Home extends Component {
  state = {
    back: 0,
    isConnected: false,
    flagUpload: 0,
  };

  componentDidMount() {
    // console.log('Native', NativeModule);
    // this._trackingLocation();

    Orientation.lockToPortrait();

    BackHandler.addEventListener('hardwareBackPress', this._onPressBack);

    AppState.addEventListener('change', this._onChangeState);

    this.props.navigation.addListener('willFocus', () =>
      this.setState({back: 0}),
    );

    this._checkConnect();

    this.setState({flagUpload: this.props.flagSuccessUpload});
  }

  UNSAFE_componentWillReceiveProps = nextProps => {
    if (this.props.user != nextProps.user && !nextProps.user) {
      mqttSp.disconnectAll();
      BackHandler.removeEventListener('hardwareBackPress', this._onPressBack);
      if (this.props.user['role'] == 3) {
        this.props.clearCar();
        this.props.onFirstLoad(false);
        if (nextProps.isTraffic)
          this.props.trafficJam(
            null,
            this.props.car.licensePlates,
            false,
            false,
          );
        BackgroundJob.cancelAll();
      }
      this.props.navigation.reset({
        index: 0,
        routes: [{name: 'LoginScreen'}],
      });
    }
    if (
      nextProps.refreshFlag !== this.props.refreshFlag &&
      !nextProps.errorCar
    ) {
      this.props.loginUser(
        this.props.user.username,
        this.props.user.password,
        true,
        true,
        false,
      );
    }

    if (nextProps.isTraffic) {
      this._listenTraffic();
    } else {
      BackgroundJob.cancel({jobKey: 'get_location_traffic'});
    }
  };

  _onPressBack = () => {
    if (!this.props.navigation.canGoBack()) {
      this.props.showFlagMessage({
        message: 'Bạn thật sự muốn thoát khỏi ứng dụng',
        buttons: [
          {
            title: 'Hủy',
            onPress: () => {
              this.props.hideFlagMessage();
            },
          },
          {
            title: 'Xác nhận',
            onPress: () => {
              this.props.hideFlagMessage();
              BackHandler.exitApp();
            },
          },
        ],
      });
      return true;
    }
    return false;
  };

  _refreshToken = async () => {
    this.props.loginUser(
      this.props.user.username,
      this.props.user.password,
      true,
      false,
      true,
    );
  };

  _onLoad = async () => {
    let dateActive = await AsyncStorage.getItem('@DATE_ACTIVE');
    if (!dateActive || dateActive != moment().format('YYYY-MM-DD')) {
      await AsyncStorage.setItem('@DATE_ACTIVE', moment().format('YYYY-MM-DD'));
    }

    this._refreshToken();
    // .finally(() => {
    //   console.log('start location');
    //   setTimeout(() => {
    //     this._listenLocation();
    //   }, 2000);
    // });

    if (this.props.user.companyId == 'sbp') {
      PushNotification.configure({
        onRegister: function(token) {},
        onNotification: notification => this._listenNotify(false, notification),
        popInitialNotification: true,
        requestPermissions: true,
      });

      this._listenOrder();
    }

    if (this.props.isTraffic) {
      this._listenTraffic();
    }
  };

  _onChangeState = async nextAppState => {
    if (nextAppState === 'active') {
      clear.runClearCache();
      this.props.loginUser(
        this.props.user.username,
        this.props.user.password,
        true,
        false,
        false,
      );
    }
  };

  _checkConnect = () => {
    NetInfo.addEventListener(state => {
      if (state.isConnected != this.state.isConnected) {
        if (state.isConnected) {
          this.setState({isConnected: state.isConnected}, () => {
            this.props.connectionNetwork(state.isConnected);
            if (this.props.user['role'] == 3) this._onLoad();
          });
        }
      }
    });
  };

  _listenLocation = async () => {
    var perRes = await Permissions.check(
      'android.permission.ACCESS_FINE_LOCATION',
      'android.permission.ACCESS_COARSE_LOCATION',
    );
    if (perRes != 'granted') {
      await Permissions.request('android.permission.ACCESS_FINE_LOCATION');
      await Permissions.request('android.permission.ACCESS_COARSE_LOCATION');
    }

    BackgroundJob.register({
      jobKey: 'update_location',
      job: () => this.props.updateLocation(this.props.user.companyId),
    });
    BackgroundJob.schedule({
      jobKey: 'update_location',
      period: 60 * 1000,
      allowExecutionInForeground: true,
      requiresDeviceIdle: true,
      networkType: BackgroundJob.NETWORK_TYPE_ANY,
    });
  };

  _listenNotify = async (state, notification) => {
    if (state) {
      return firebase.messaging().onMessage(message => {
        console.log('notification', message);
        showMessage({
          message: 'Thông báo',
          description: message.data.data,
          type: 'info',
          duration: 5 * 1000,
        });
      });
    } else {
      let messageId = await AsyncStorage.getItem('MessageId');
      console.log('noti offline:', notification);
      if (messageId != notification['google.message_id']) {
        await AsyncStorage.setItem(
          'MessageId',
          notification['google.message_id'],
        );
        this.props.showFlagMessage({
          message: notification.data,
          buttons: [
            {
              title: 'OK',
              onPress: () => {
                this.props.hideFlagMessage();
              },
            },
          ],
        });
      }
    }
  };

  _listenTraffic = () => {
    BackgroundJob.register({
      jobKey: 'get_location_traffic',
      job: () =>
        this.props.trafficJam(
          this.props.user,
          this.props.car.licensePlates,
          true,
          false,
        ),
    });
    BackgroundJob.schedule({
      jobKey: 'get_location_traffic',
      period: 40 * 1000,
      allowExecutionInForeground: true,
      requiresDeviceIdle: true,
      networkType: BackgroundJob.NETWORK_TYPE_ANY,
    });
  };

  _listenOrder = () => {
    let code = this.props.user.username.toUpperCase();
    this.props.onListenOrderDispatch(code);
    BackgroundJob.register({
      jobKey: 'get_list_dispatch_' + code,
      job: () => this.props.onListenOrderDispatch(code),
    });
    BackgroundJob.schedule({
      jobKey: 'get_list_dispatch_' + code,
      period: 100 * 1000,
      persist: false,
      override: true,
      exact: true,
      requiresDeviceIdle: true,
      allowWhileIdle: true,
      allowExecutionInForeground: true,
      networkType: BackgroundJob.NETWORK_TYPE_ANY,
    });
  };

  render() {
    const {user} = this.props;

    return user ? (
      user['role'] == 3 ? (
        <HomeTabNavigation />
      ) : (
        <HomeAdminTabNavigation />
      )
    ) : null;
  }
}

const mapStateToProp = state => ({
  user: state.loginUser.user,
  car: state.carHandle,
  errorCar: state.carHandle.error,
  refreshFlag: state.carHandle.refreshFlag,
  routeFocus: state.app.routeFocus,
  dataUpload: state.uploadManifest.data,
  flagSuccessUpload: state.uploadManifest.flagSuccess,
  flagAddUpload: state.uploadManifest.flagAdd,
  isTraffic: state.trafficJam.isTraffic,
});

const mapDispatchToProp = {
  loginUser,
  getRouteFocus,
  showFlagMessage,
  hideFlagMessage,
  connectionNetwork,
  getOrders,
  getListBillId,
  clearCar,
  onFirstLoad,
  trafficJam,
  onListenOrderDispatch,
  onDisconnectListen,
  updateLocation,
};

export default connect(
  mapStateToProp,
  mapDispatchToProp,
)(Home);
