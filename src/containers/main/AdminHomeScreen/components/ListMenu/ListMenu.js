import React, {Component} from 'react';
import {View, FlatList, TouchableOpacity} from 'react-native';

import styles from './styles';
import {Divider, AppButton, AppText} from '../../../../../components';
import {Metrics, Fonts, Colors} from '../../../../../themes';
import FastImage from 'react-native-fast-image';
import {isTablet} from '../../../../../themes/iPhoneXHelper';

export default class ListMenu extends Component {
  state = {};

  _renderItem = item => {
    return (
      <TouchableOpacity
        onPress={() => this.props.onPressMenu(item['id'])}
        key={item['id']}
        activeOpacity={1}
        style={isTablet() ? styles.itemTab : styles.item}>
        <FastImage
          source={item['iconsbp']}
          style={isTablet() ? styles.logoTab : styles.logo}
        />
        <AppText
          text={item['title']}
          align={'center'}
          size={isTablet() ? Fonts.size.h5 : Fonts.size.large}
          bold
        />
      </TouchableOpacity>
    );
  };

  render() {
    const {data} = this.props;
    return (
      <View style={styles.container}>{data.map(e => this._renderItem(e))}</View>
    );
  }
}
