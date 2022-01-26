import React, {Component} from 'react';
import {View} from 'react-native';

import styles from './styles';
import {AppText} from '../../../components';
import {Fonts, Colors, Images} from '../../../themes';
import {isTablet} from '../../../themes/iPhoneXHelper';

export default class HeaderForm extends Component {
  state = {};
  render() {
    return (
      <View
        style={[
          isTablet() ? styles.titleTab : styles.title,
          {
            backgroundColor:
              this.props.company == 'sbp' ? Colors.appColor : Colors.appColorFd,
          },
        ]}>
        <AppText
          text={this.props.title}
          align={'center'}
          size={isTablet() ? Fonts.size.h2 * 1.3 : Fonts.size.h5}
          color={Colors.appWhite}
        />
      </View>
    );
  }
}
