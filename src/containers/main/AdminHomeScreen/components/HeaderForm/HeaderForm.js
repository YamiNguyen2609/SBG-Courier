import React, {Component} from 'react';
import {View, Text} from 'react-native';
import FastImage from 'react-native-fast-image';

import {Images, Colors, Fonts, Metrics} from '../../../../../themes';
import styles from './styles';
import {AppText, AppButton} from '../../../../../components';
import {isTablet} from '../../../../../themes/iPhoneXHelper';

export default class HeaderForm extends Component {
  state = {};
  render() {
    const {user} = this.props;
    return (
      <View style={styles.container}>
        <FastImage source={Images.backgroundsbp} style={styles.background}>
          <FastImage
            source={Images.logoAppTrans}
            style={isTablet() ? styles.logoTabMini : styles.logoMini}
          />
          <Text style={styles.title}>
            <AppText
              text={'Chào '}
              color={Colors.appWhite}
              size={isTablet() ? Fonts.size.h3 : Fonts.size.h6}
            />
            <AppText
              text={user.full_name}
              color={Colors.appWhite}
              bold
              size={isTablet() ? Fonts.size.h2 : Fonts.size.h5}
            />
          </Text>
        </FastImage>
      </View>
    );
  }
}
