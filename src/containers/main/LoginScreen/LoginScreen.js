import React, {Component} from 'react';
import {Keyboard} from 'react-native';
import {connect} from 'react-redux';
import {showMessage} from 'react-native-flash-message';

import Render from './components/Render';
import {loginUser} from '../../../redux/user/redux/loginUser';
import {replaceScreen} from '../../../redux/navigation';
import {checkExistPhone} from '../../../redux/user/redux/checkExistPhone';
import {resetPassword} from '../../../redux/user/redux/resetPassword';

export class LoginScreen extends Component {
  state = {
    username: '',
  };

  UNSAFE_componentWillReceiveProps = nextProps => {
    if (this.props.successStack !== nextProps.successStack) {
      console.log(this.state.username);
      if (nextProps.activeUser)
        this.props.navigation.navigate('ForgotPasswordScreen', {
          forgotPassword: false,
          username: this.state.username,
        });
      else
        this.props.navigation.reset({
          index: 0,
          routes: [{name: 'Home'}],
        });
    }
  };

  _onPressLogin = (user, pass) => {
    Keyboard.dismiss();
    if (user && pass) {
      this.setState({username: user});
      this.props.loginUser(user, pass, true, false);
    } else
      showMessage({
        message: 'Lỗi đăng nhập',
        description: 'Mã nhân viên và mật khẩu không được để trống',
        type: 'warning',
      });
  };

  render() {
    return (
      <Render
        onPressForgot={this._onPressForgot}
        onPressLogin={this._onPressLogin}
        {...this.props}
      />
    );
  }
}

const mapStateToProp = state => ({
  user: state.loginUser.user,
  successStack: state.loginUser.successStack,
  activeUser: state.loginUser.userActive,
  checkUser: state.checkExistPhone,
});

const mapDispatchToProp = {
  loginUser,
  replaceScreen,
  checkExistPhone,
  resetPassword,
};

export default connect(
  mapStateToProp,
  mapDispatchToProp,
)(LoginScreen);
