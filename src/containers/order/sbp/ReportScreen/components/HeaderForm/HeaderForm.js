import React, {Component} from 'react';
import {View} from 'react-native';

import styles from './styles';
import {IconBack, AppText} from '../../../../../../components';
import {Colors, Fonts} from '../../../../../../themes';

export default class HeaderForm extends Component {
  state = {};
  render() {
    return (
      <View>
        <IconBack
          style={styles.logoBack}
          onPress={this.props.back}
          color={Colors.appWhite}
        />
        <View style={styles.header}>
          <AppText
            text={'Bảng kê'}
            size={Fonts.size.h5}
            color={Colors.appWhite}
          />
        </View>
      </View>
    );
  }
}
