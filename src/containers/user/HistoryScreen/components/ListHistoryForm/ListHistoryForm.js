import React, {Component} from 'react';
import {FlatList, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import moment from 'moment';
import r from 'reactotron-react-native';

import styles from './styles';
import {AppText, Divider} from '../../../../../components';
import {Fonts, Colors, Metrics, Images} from '../../../../../themes';

export default class ListHistoryForm extends Component {
  _renderItem = ({item, index}) => {
    return (
      <View style={styles.container} key={index}>
        <View style={styles.container_header}>
          <AppText text={item.header} size={Fonts.size.h5} />
        </View>
        {item.child.length > 0 ? item.child.map(this._renderItemChild) : null}
      </View>
    );
  };

  _renderItemChild = (item, index) => {
    return (
      <View>
        <View style={styles.item}>
          <View style={styles.icon}>
            <FastImage source={item.icon} style={{flex: 1}} />
          </View>
          <View
            style={{
              paddingRight: Metrics.margin.small,
              flexWrap: 'wrap',
            }}>
            <AppText text={item.title} size={Fonts.size.h6} />
            <AppText text={item.date} color={Colors.appLightGrayColor} />
          </View>
        </View>
        <Divider height={0.8} color={Colors.overlay2} />
      </View>
    );
  };

  render() {
    return (
      <View style={styles.container}>
        <FlatList {...this.props} renderItem={this._renderItem} />
      </View>
    );
  }
}
