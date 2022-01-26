import React, {Component} from 'react';
import {View, Keyboard, TouchableOpacity} from 'react-native';
import AntIcon from 'react-native-vector-icons/AntDesign';
import IonIcon from 'react-native-vector-icons/Ionicons';

import styles from './styles';
import {AppInput, AppText, AppButton} from '../../../../../components';
import {Colors, Fonts, Metrics} from '../../../../../themes';

export default class PasswordChangeForm extends Component {
  state = {
    oldPassword: '',
    isShowOldPassword: true,
    isShowPassword: true,
    isShowPasswordRepeat: true,
    password: '',
    password_repeat: '',
    isDuplicate: false,
    isKeyboard: false,
  };

  _onChangeText = (key, value) => {
    this.setState({[key]: value}, () => {
      this.setState({
        isDuplicate:
          this.state.password == this.state.password_repeat &&
          this.state.password,
      });
    });
  };

  componentDidMount() {
    this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () =>
      this.setState({isKeyboard: true}),
    );
    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () =>
      this.setState({isKeyboard: false}),
    );
  }

  render() {
    const {
      oldPassword,
      password,
      password_repeat,
      isDuplicate,
      isShowOldPassword,
      isShowPassword,
      isShowPasswordRepeat,
    } = this.state;

    return (
      <View
        style={[
          styles.container,
          this.state.isKeyboard
            ? {
                marginTop: -Metrics.margin.huge * 2,
                marginBottom: Metrics.margin.huge * 1.2,
              }
            : null,
        ]}>
        <View style={styles.container_input}>
          <AntIcon name={'lock'} size={25} color={Colors.overlay2} />
          <AppInput
            value={oldPassword}
            onChangeText={value => this._onChangeText('oldPassword', value)}
            // textColor={Colors.overlay2}
            bgColor={'transparent'}
            placeholder={'Mật khẩu cũ'}
            height={60}
            secureTextEntry={isShowOldPassword}
            ref={input => {
              this.password = input;
            }}
            size={Fonts.size.h5}
          />
          <AppButton
            style={styles.logoPassword}
            bgColor={'transparent'}
            height={30}
            onPress={() =>
              this.setState({isShowOldPassword: !isShowOldPassword})
            }
            renderItem={
              <IonIcon
                color={Colors.overlay2}
                size={30}
                name={isShowOldPassword ? 'ios-eye' : 'ios-eye-off'}
              />
            }
          />
        </View>
        <View style={styles.container_input}>
          <AntIcon name={'lock'} size={25} color={Colors.overlay2} />
          <AppInput
            value={password}
            onChangeText={value => this._onChangeText('password', value)}
            // textColor={Colors.overlay2}
            bgColor={'transparent'}
            placeholder={'Mật khẩu mới'}
            height={60}
            secureTextEntry={isShowPassword}
            ref={input => {
              this.password = input;
            }}
            size={Fonts.size.h5}
          />
          <AppButton
            style={styles.logoPassword}
            bgColor={'transparent'}
            height={30}
            onPress={() => this.setState({isShowPassword: !isShowPassword})}
            renderItem={
              <IonIcon
                color={Colors.overlay2}
                size={30}
                name={isShowPassword ? 'ios-eye' : 'ios-eye-off'}
              />
            }
          />
        </View>
        <View style={styles.container_input}>
          <AntIcon name={'lock'} size={25} color={Colors.overlay2} />
          <AppInput
            value={password_repeat}
            onChangeText={value => this._onChangeText('password_repeat', value)}
            // textColor={Colors.overlay2}
            bgColor={'transparent'}
            placeholder={'Nhập lại mật khẩu mới'}
            height={60}
            secureTextEntry={isShowPasswordRepeat}
            ref={input => {
              this.password = input;
            }}
            size={Fonts.size.h5}
          />
          <AppButton
            style={styles.logoPassword}
            bgColor={'transparent'}
            height={30}
            onPress={() =>
              this.setState({isShowPasswordRepeat: !isShowPasswordRepeat})
            }
            renderItem={
              <IonIcon
                color={Colors.overlay2}
                size={30}
                name={isShowPasswordRepeat ? 'ios-eye' : 'ios-eye-off'}
              />
            }
          />
        </View>
        {!isDuplicate ? (
          <AppText text={'Mật khẩu không trùng nhau'} color={Colors.appRed} />
        ) : null}
        <View style={styles.container_button}>
          <AppButton
            bgColor={'#f6f6f6'}
            width={150}
            onPress={() => this.props.changeStep(0)}
            size={Fonts.size.h5}
            text={'Trở về'}
          />
          <AppButton
            bgColor={Colors.appColor}
            width={150}
            color={Colors.appWhite}
            onPress={() =>
              this.props.onChangePassword(
                this.state.oldPassword,
                this.state.password,
              )
            }
            size={Fonts.size.h5}
            text={'Đổi mật khẩu'}
          />
        </View>
      </View>
    );
  }
}
