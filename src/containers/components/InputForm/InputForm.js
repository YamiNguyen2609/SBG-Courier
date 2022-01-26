import React, {Component} from 'react';
import {View} from 'react-native';
import FastImage from 'react-native-fast-image';

import styles from './styles';
import {AppButton, AppInput, Divider, AppText} from '../../../components';
import {Colors, Fonts} from '../../../themes';
import {isTablet} from '../../../themes/iPhoneXHelper';

export default class InputForm extends Component {
  state = {};

  _setValue = value => {
    this.input.value(value);
  };

  render() {
    const {
      title,
      company,
      placeholder,
      keyboardType,
      maxLength = null,
      autoFocus = false,
      renderItem,
      renderImage,
    } = this.props;
    return (
      <View style={styles.container}>
        {title ? <AppText text={''} /> : null}
        <View style={styles.container_input}>
          {renderImage}
          <Divider
            height={isTablet() ? '80%' : '60%'}
            width={0.8}
            color={Colors.overlay2}
          />
          <AppInput
            ref={input => (this.input = input)}
            bgColor={'transparent'}
            width={'85%'}
            size={isTablet() ? Fonts.size.h2 : Fonts.size.h5}
            style={styles.input}
            placeholder={placeholder}
            autoFocus={autoFocus}
            keyboardType={keyboardType}
            maxLength={maxLength}
            onFocus={this.props.onFocus}
          />
        </View>
        {renderItem}
        <View style={styles.container_button}>
          <AppButton
            text={'Hủy'}
            size={isTablet() ? Fonts.size.h2 : Fonts.size.h5}
            border={0.8}
            borderColor={Colors.overlay2}
            width={'45%'}
            onPress={this.props.onPressBack}
          />
          <AppButton
            color={Colors.appWhite}
            text={'OK'}
            size={isTablet() ? Fonts.size.h2 : Fonts.size.h5}
            bgColor={company == 'sbs' ? Colors.appColorFd : Colors.appColor}
            width={'45%'}
            onPress={() => this.props.onPressSuccess(this.input.value())}
          />
        </View>
      </View>
    );
  }
}
