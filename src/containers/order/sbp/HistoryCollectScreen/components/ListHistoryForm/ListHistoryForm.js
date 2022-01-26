import React, {Component} from 'react';
import {FlatList, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import moment from 'moment';
import r from 'reactotron-react-native';

import styles from './styles';
import {AppText, Divider} from '../../../../../../components';
import {Fonts, Colors, Metrics, Images} from '../../../../../../themes';

export default class ListHistoryForm extends Component {
  _renderItem = ({item, index}) => {
    return (
      <View
        style={index ? {marginTop: Metrics.margin.regular} : null}
        key={index}>
        <View style={styles.container_header}>
          <AppText
            text={item.date}
            size={Fonts.size.h5}
            color={Colors.appWhite}
          />
        </View>
        <FlatList
          style={{backgroundColor: Colors.appLightGrayColor}}
          data={item['data']}
          renderItem={this._renderItemChild}
          ItemSeparatorComponent={() => (
            <View style={{height: Metrics.margin.regular}} />
          )}
        />
        {index + 1 == this.props.data.length ? (
          <View style={{height: Metrics.margin.regular}} />
        ) : null}
      </View>
    );
  };

  _renderItemChild = ({item, index}) => {
    const element = item;

    return (
      <View
        style={[
          styles.item,
          !index ? {marginTop: Metrics.margin.regular} : null,
        ]}>
        <View style={styles.header}>
          <AppText text={element['orderNumber']} size={Fonts.size.h5} />
        </View>
        <FlatList
          data={element['hawb']}
          renderItem={({item, index}) => (
            <View style={styles.form}>
              <AppText text={item} size={Fonts.size.h6} />
            </View>
          )}
        />
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
