import React, {Component} from 'react';
import {View} from 'react-native';

import styles from './styles';
import HeaderForm from '../HeaderForm';
import ListOrderImageForm from '../ListOrderImageForm';
import {IconBack} from '../../../../../../components';
import {Colors} from '../../../../../../themes';

export default class Render extends Component {
  state = {};
  render() {
    const {bill} = this.props;
    return (
      <View style={styles.container}>
        <IconBack
          style={styles.logoBack}
          onPress={this.props.back}
          color={Colors.appWhite}
        />
        <HeaderForm bill={bill} />
        <ListOrderImageForm {...this.props} />
      </View>
    );
  }
}
