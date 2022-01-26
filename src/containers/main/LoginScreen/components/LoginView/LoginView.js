import React, {Component} from 'react';
import {View} from 'react-native';
import AntIcon from 'react-native-vector-icons/AntDesign';
import IonIcon from 'react-native-vector-icons/Ionicons';

import {AppButton, AppInput, AppText} from '../../../../../components';
import styles from './styles';
import {Colors, Fonts, Metrics} from '../../../../../themes';
import strings from '../../../../../languages';
import {isTablet} from '../../../../../themes/iPhoneXHelper';

export default class LoginView extends Component {
  state = {
    showPassword: true,
  };
  render() {
    const {showPassword} = this.state;
    const {version} = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.container_form}>
          <View style={styles.container_input}>
            <AntIcon name={'user'} size={25} color={Colors.overlay2} />
            <AppInput
              textColor={Colors.overlay8}
              bgColor={'transparent'}
              placeholder={strings.login_screen.username}
              height={60}
              style={styles.input}
              ref={input => {
                this.username = input;
              }}
              size={Fonts.size.h5}
            />
          </View>
          <View style={styles.container_input}>
            <AntIcon name={'lock'} size={25} color={Colors.overlay2} />
            <AppInput
              textColor={Colors.overlay8}
              bgColor={'transparent'}
              placeholder={strings.login_screen.password}
              height={60}
              secureTextEntry={showPassword}
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
                this.setState({showPassword: !this.state.showPassword})
              }
              renderItem={
                <IonIcon
                  color={Colors.overlay2}
                  size={30}
                  name={showPassword ? 'ios-eye' : 'ios-eye-off'}
                />
              }
            />
          </View>
          <AppButton
            borderRadius={Metrics.borderRadius.small}
            // style={styles.button}
            bgColor={Colors.appWhite}
            width={isTablet() ? '50%' : '70%'}
            height={50}
            text={strings.login_screen.login}
            color={Colors.appColor}
            size={Fonts.size.h6}
            onPress={() =>
              this.props.onPressLogin(
                this.username.value(),
                this.password.value(),
              )
            }
          />

          <AppButton
            text="Quên mật khẩu"
            color={Colors.appLightGrayColor}
            size={Fonts.size.h6}
            onPress={this.props.onPressForgot}
            height={80}
          />
        </View>
        <AppText
          text={version}
          italic
          size={Fonts.size.large}
          color={Colors.appLightGrayColor}
          align="center"
          style={{marginTop: -Metrics.margin.small}}
        />
      </View>
    );
  }
}
