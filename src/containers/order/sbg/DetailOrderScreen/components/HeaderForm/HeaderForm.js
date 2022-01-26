import React, {Component} from 'react';
import {View, Text} from 'react-native';

import styles from './styles';
import {AppText} from '../../../../../../components';
import {Fonts, Colors} from '../../../../../../themes';

export default class HeaderForm extends Component {
  state = {};
  render() {
    const {bill} = this.props;
    return (
      <View style={styles.container}>
        <Text>
          <AppText text={bill} size={Fonts.size.h5} color={Colors.appWhite} />
        </Text>
      </View>
    );
  }
}
