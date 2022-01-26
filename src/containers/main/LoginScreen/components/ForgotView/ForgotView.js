import React, {Component} from 'react';
import {View, Animated, TouchableOpacity} from 'react-native';
import Modal from 'react-native-modal';
import AntIcon from 'react-native-vector-icons/AntDesign';

import styles from './styles';
import {AppText, AppButton, AppInput} from '../../../../../components';
import {Colors, Fonts, Metrics, Styles} from '../../../../../themes';
import strings from '../../../../../languages';

const formAnimate = new Animated.ValueXY({x: 0, y: 0});

let username = null;
let phone = null;
let otp = null;

export default class ForgotView extends Component {
  state = {
    index: 0,
  };

  _onMoveScreen = index => {
    this.setState({index}, () => {
      Animated.spring(formAnimate, {
        toValue: {
          x: -Metrics.screenWidth * index,
          y: 0,
        },
        speed: 1000,
        useNativeDriver: false,
      }).start();
    });
  };

  _getPhone = () => {
    return '+84' + Number(phone.value());
  };

  _verifyOtp = code =>
    this.props.confirmOtp(code, username.value(), phone.value());

  clearValue = () => this.validate.clearValue();

  render() {
    return (
      <Modal
        isVisible={this.props.visible}
        style={[Styles.modal, {justifyContent: 'flex-end'}]}>
        <View style={styles.container}>
          <View style={styles.header}>
            {!this.state.index ? (
              <View style={{width: 55}} />
            ) : (
              <TouchableOpacity
                style={{
                  width: 55,
                  ...Styles.center,
                }}
                onPress={() => this._onMoveScreen(0)}>
                <AntIcon
                  name="arrowleft"
                  color={Colors.appWhite}
                  size={Fonts.size.h4}
                />
              </TouchableOpacity>
            )}
            <AppText
              text={'Quên mật khẩu'}
              align={'center'}
              color={Colors.appWhite}
              size={Fonts.size.h6}
            />
            <TouchableOpacity style={{width: 55}} onPress={this.props.onClose}>
              <AppText
                text={'Huỷ'}
                size={Fonts.size.h6}
                color={Colors.appWhite}
              />
            </TouchableOpacity>
          </View>
          <Animated.View
            style={[styles.container_animate, formAnimate.getLayout()]}>
            <ForgotForm
              onVerify={() =>
                this.props.onCheckPhone(username.value(), phone.value())
              }
            />
            <ValidateForm
              {...this.props}
              verifyOtp={this._verifyOtp}
              ref={view => (this.validate = view)}
            />
          </Animated.View>
        </View>
      </Modal>
    );
  }
}

class ForgotForm extends Component {
  render() {
    return (
      <View style={[{width: Metrics.screenWidth}, Styles.center]}>
        <View style={styles.container_input}>
          <AntIcon name={'user'} size={25} color={Colors.overlay2} />
          <AppInput
            textColor={Colors.overlay8}
            bgColor={'transparent'}
            placeholder={strings.login_screen.username}
            height={60}
            style={styles.input}
            ref={input => {
              username = input;
            }}
            size={Fonts.size.h5}
          />
        </View>
        <View
          style={[
            styles.container_input,
            {marginVertical: Metrics.margin.huge},
          ]}>
          <AntIcon name={'phone'} size={25} color={Colors.overlay2} />
          <AppInput
            textColor={Colors.overlay8}
            bgColor={'transparent'}
            placeholder={strings.login_screen.phoneNumber}
            height={60}
            style={styles.input}
            ref={input => {
              phone = input;
            }}
            size={Fonts.size.h5}
          />
        </View>
        <AppButton
          borderRadius={Metrics.borderRadius.small}
          // style={styles.button}
          bgColor={Colors.appColor}
          width={'70%'}
          height={50}
          text={'Tiếp tục'}
          color={Colors.appWhite}
          size={Fonts.size.h6}
          onPress={this.props.onVerify}
        />
      </View>
    );
  }
}

class ValidateForm extends Component {
  state = {
    value: '',
  };

  clearValue = () => this.setState({value: ''});

  _onChangeText = value =>
    this.setState({value}, () => {
      if (this.state.value.length == 6) {
        this.props.verifyOtp(this.state.value);
      }
    });

  render() {
    return (
      <View style={[{width: Metrics.screenWidth}, Styles.center]}>
        <View style={styles.container_input}>
          <AppInput
            keyboardType={'number-pad'}
            textColor={Colors.overlay8}
            bgColor={'transparent'}
            placeholder={'Mã OTP'}
            onChangeText={this._onChangeText}
            height={60}
            style={styles.input}
            size={Fonts.size.h5}
            value={this.state.value}
          />
        </View>
        <AppButton
          borderRadius={Metrics.borderRadius.small}
          width={'70%'}
          height={50}
          text={'Gửi lại OTP'}
          color={Colors.overlay3}
          size={Fonts.size.h6}
          onPress={this.props.sendOtp}
        />
      </View>
    );
  }
}
