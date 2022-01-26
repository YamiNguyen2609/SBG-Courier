import React, {Component} from 'react';
import {View} from 'react-native';
import {connect} from 'react-redux';
import FastImage from 'react-native-fast-image';
import {firebase} from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-community/async-storage';

import {Styles, Metrics, Images} from '../../../themes';

export class LauncherScreen extends Component {
  componentDidMount() {
    this.checkPermission();
    this._navigateScreen();
  }

  checkPermission = async () => {
    const enabled = await firebase.messaging().hasPermission();
    if (enabled) {
      this.getToken();
    } else {
      this.requestPermission();
    }
  };

  //2
  requestPermission = async () => {
    try {
      await firebase.messaging().requestPermission();
      // User has authorised
      this.getToken();
    } catch (error) {
      // User has rejected permissions
      console.log('permission rejected');
    }
  };

  //3
  getToken = async () => {
    let fcmToken = await AsyncStorage.getItem('fcmToken');
    if (!fcmToken) {
      fcmToken = await firebase.messaging().getToken();
      if (fcmToken) {
        // user has a device token
        console.log(fcmToken);
        await AsyncStorage.setItem('fcmToken', fcmToken);
      }
    }

    //   deviceToken = await firebase.messaging().onTokenRefresh();

    //   console.log('device token ', deviceToken);
    const topic = await firebase.messaging().subscribeToTopic('sbptest');
  };

  _navigateScreen = () => {
    setTimeout(() => {
      this.props.navigation.reset({
        index: 0,
        routes: [{name: this.props.user ? 'Home' : 'LoginScreen'}],
      });
    }, 1000);
  };

  render() {
    return (
      <View style={[Styles.center, Styles.container]}>
        <FastImage
          source={Images.logoApp}
          style={{
            width: Metrics.screenWidth - Metrics.margin.huge * 5,
            height: Metrics.screenWidth - Metrics.margin.huge * 5,
          }}
        />
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.loginUser.user,
  };
};

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(LauncherScreen);
