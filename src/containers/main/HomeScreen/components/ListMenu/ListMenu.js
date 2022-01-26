import React, {Component} from 'react';
import {View, FlatList, TouchableOpacity} from 'react-native';

import styles from './styles';
import {Divider, AppButton, AppText} from '../../../../../components';
import {Metrics, Fonts, Colors} from '../../../../../themes';
import FastImage from 'react-native-fast-image';
import {isTablet} from '../../../../../themes/iPhoneXHelper';

export default class ListMenu extends Component {
  state = {};

  _renderItem = ({item, index}) => {
    return (
      <TouchableOpacity
        onPress={() => this.props.onPressMenu(item['id'])}
        key={item['id']}
        activeOpacity={1}
        style={isTablet() ? styles.itemTab : styles.item}>
        <FastImage
          source={item['icon' + this.props.company]}
          style={isTablet() ? styles.logoTab : styles.logo}
        />
        <AppText
          text={item['title']}
          align={'center'}
          size={isTablet() ? Fonts.size.h5 : Fonts.size.regular}
          bold
        />
      </TouchableOpacity>
    );
  };

  render() {
    const {data} = this.props;
    return (
      <FlatList
        showsVerticalScrollIndicator={false}
        keyExtractor={(item, index) => item['id']}
        style={styles.container}
        numColumns={3}
        data={data}
        renderItem={this._renderItem}
      />
    );
  }
}
