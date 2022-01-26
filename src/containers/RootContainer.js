import React, {Component} from 'react';
import {View, StatusBar, AppState} from 'react-native';
import {connect} from 'react-redux';
import FlashMessage, {showMessage} from 'react-native-flash-message';
import {SafeAreaView} from 'react-navigation';
import PushNotification, {Importance} from 'react-native-push-notification';

import RootNavigation from '../navigation/RootNavigation';
import {Styles, Fonts} from '../themes';
import {AppMessage, AppIndicator, AppAlert, AppText} from '../components';
import {showFlagMessage, hideFlagMessage} from '../redux/app';
import UpdateScreen from './main/UpdateScreen';
import {isTablet} from '../themes/iPhoneXHelper';
import {getListDispatchOrder} from '../redux/order/redux/getListDispatchOrder';
import {replaceScreen} from '../redux/navigation';

PushNotification.createChannel(
  {
    channelId: '123456', // (required)
    channelName: 'SBG chanel', // (required)
    playSound: false, // (optional) default: true
    soundName: 'default', // (optional) See `soundName` parameter of `localNotification` function
    importance: Importance.HIGH, // (optional) default: Importance.HIGH. Int value of the Android notification importance
    vibrate: true, // (optional) default: true. Creates the default vibration pattern if true.
  },
  created => console.log(`createChannel returned '${created}'`), // (optional) callback returns whether the channel was created, false means it already existed.
);

export class RootContainer extends Component {
  state = {
    updateCodePush: true,
    flagIndicator: false,
    isUpdateState: true,
    flagMessage: false,
    flagWarning: 0,
    flagTextMessage: 0,
    flagDispatch: 0,
  };

  UNSAFE_componentWillReceiveProps = nextProp => {
    if (this.props.isUpdate !== nextProp.isUpdate && nextProp.isUpdate) {
      this.setState({updateCodePush: nextProp.isUpdate});
    }
    if (this.props.flagIndicator != nextProp.flagIndicator) {
      this.setState({flagIndicator: nextProp.flagIndicator});
    }
    if (this.props.flagMessage.flag != nextProp.flagMessage.flag) {
      this.setState({flagMessage: nextProp.flagMessage.flag});
    }
    if (this.state.flagTextMessage != nextProp.textMessage.flag) {
      this.setState({flagTextMessage: nextProp.textMessage.flag});
    }
    if (this.state.flagWarning !== nextProp.flagWarning.flag) {
      this.setState({flagWarning: nextProp.flagWarning.flag}, () => {
        if (nextProp.flagWarning.message.length > 0) {
          let view = (
            <View>
              {nextProp.flagWarning.message.map((el, index) => {
                return (
                  <AppText
                    text={el}
                    key={index}
                    size={isTablet() ? Fonts.size.h5 : null}
                  />
                );
              })}
            </View>
          );
          this.props.showFlagMessage({
            item: view,
            buttons: [
              {
                title: 'OK',
                onPress: this.props.hideFlagMessage,
              },
            ],
          });
        }
      });
    }
    if (this.state.flagDispatch !== nextProp.flagDispatch) {
      this.setState({flagDispatch: nextProp.flagDispatch}, () => {
        let type = nextProp.notifyDispatch;
        this.props.getListDispatchOrder(type == 'delivery' ? 0 : 1, 1, null);

        if (AppState.currentState === 'active') {
          showMessage({
            type: 'info',
            message: 'Thông báo',
            description: 'Bạn nhận được đơn hàng mới',
          });
        } else {
          PushNotification.configure({
            onRegister: function(token) {},
            onNotification: notification =>
              //console.log(notification),
              this.props.replaceScreen('ListOrderDispatchScreen', {
                typeOrder: type == 'delivery' ? 0 : 1,
                isComplete: 0,
                isTab: true,
              }),
            requestPermissions: true,
          });

          PushNotification.localNotification({
            autoCancel: true,
            largeIcon: 'ic_launcher',
            smallIcon: 'ic_notification',
            title: 'SBG Driver',
            channelId: '123456',
            message: 'Có thông báo mới',
            number: 10,
            visibility: 'public',
          });
        }
      });
    }
  };

  _onUpdate = status => {
    if (status) {
      this.props.syncData();
    } else {
      this.setState({updateCodePush: false});
    }
  };

  render() {
    const {textMessage, flagMessage} = this.props;
    const {flagIndicator, flagTextMessage, updateCodePush} = this.state;

    return (
      <View style={Styles.container}>
        <StatusBar
          barStyle="dark-content"
          backgroundColor="transparent"
          translucent={true}
        />
        <SafeAreaView style={{backgroundColor: 'transparent'}} />
        {updateCodePush ? (
          <UpdateScreen onUpdate={this._onUpdate} />
        ) : (
          <RootNavigation />
        )}
        <FlashMessage position="top" style={{paddingTop: 20}} />
        <AppMessage
          visible={flagTextMessage}
          text={textMessage.message}
          time={textMessage.time}
        />
        <AppIndicator visible={flagIndicator} />
        <AppAlert
          horizontal={flagMessage.horizontal ?? true}
          visible={flagMessage.flag}
          title={flagMessage.title}
          align={'center'}
          description={flagMessage.message}
          renderItem={flagMessage.item}
          renderButton={flagMessage.buttons}
        />
      </View>
    );
  }
}

const mapStateToProp = state => ({
  flagIndicator: state.app.flagIndicator,
  textMessage: state.app.textMessage,
  flagMessage: state.app.flagMessage,
  flagWarning: state.app.messageWarning,
  notifyDispatch: state.app.messageDispatch,
  flagDispatch: state.app.flagDispatch,
});

const mapDispatchToProp = {
  showFlagMessage,
  hideFlagMessage,
  getListDispatchOrder,
  replaceScreen,
};

export default connect(
  mapStateToProp,
  mapDispatchToProp,
)(RootContainer);
