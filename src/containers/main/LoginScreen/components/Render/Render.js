import React, {Component} from 'react';
import {View} from 'react-native';
import auth from '@react-native-firebase/auth';
import {showMessage} from 'react-native-flash-message';

import {AppText} from '../../../../../components';
import styles from './styles';
import {Fonts, Images, Styles, Colors, Metrics} from '../../../../../themes';
import LoginView from '../LoginView';
import FastImage from 'react-native-fast-image';
import {version} from '../../../../../helpers/Constants';
import {isTablet} from '../../../../../themes/iPhoneXHelper';
import ForgotView from '../ForgotView';

export default class Render extends Component {
  state = {
    visible: false,
    flag: 0,
    errorCode: '',
  };

  UNSAFE_componentWillReceiveProps = nextProps => {
    if (this.state.flag != nextProps.checkUser.flag) {
      switch (nextProps.checkUser.code) {
        case 'PHONE_NUMBER_INCORRECT':
          showMessage({
            message: 'Sai số điện thoại',
            description: 'Số điện thoại không có trong hệ thống',
            type: 'warning',
          });
          break;
        case 'NOT_FOUND':
          showMessage({
            message: 'Sai mã nhân viên',
            description: 'Mã nhân viên không có trong hệ thống',
            type: 'warning',
          });
          break;

        default:
          this.setState({flag: nextProps.checkUser.flag}, this.sendOtp);
          break;
      }
    }
  };

  sendOtp = reSend => {
    auth()
      .signInWithPhoneNumber(this.forgotView._getPhone(), true)
      .then(confirm => {
        if (!reSend) {
          this.loginPhone = confirm;

          this.forgotView._onMoveScreen(1);
        }
      });
  };

  confirmOtp = (code, user, phone) => {
    try {
      this.loginPhone.confirm(code).then(() => {
        this.setState({visible: false}, () =>
          this.props.resetPassword(user, phone),
        );
      });
    } catch (error) {
      console.log(error);
      this.forgotView.clearValue();
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={[{flex: 0.6}, Styles.center]}>
          <AppText
            text={'SBG Driver'.toUpperCase()}
            align={'center'}
            color={Colors.appWhite}
            size={isTablet() ? Fonts.size.h1 * 1.8 : Fonts.size.h1 * 1.2}
            bold
          />
        </View>
        <View
          style={{
            flex: 1,
          }}>
          <LoginView
            version={version}
            onPressLogin={this.props.onPressLogin}
            onPressForgot={() =>
              this.setState({visible: true}, () => {
                this.forgotView._onMoveScreen(0);
              })
            }
          />
        </View>
        <ForgotView
          confirmOtp={this.confirmOtp}
          ref={fw => (this.forgotView = fw)}
          visible={this.state.visible}
          onClose={() => this.setState({visible: false})}
          onCheckPhone={this.props.checkExistPhone}
          sendOtp={() => this.sendOtp(true)}
        />
      </View>
    );
  }
}
