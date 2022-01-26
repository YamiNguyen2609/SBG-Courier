import React, {Component} from 'react';
import {View, ProgressBarAndroid} from 'react-native';
import FastImage from 'react-native-fast-image';

import styles from './styles';
import {Images, Colors, Metrics} from '../../../../../themes';

export default class Render extends Component {
  render() {
    const {byteProcess} = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.processBar} />
        <FastImage
          source={Images.logoApp}
          style={{
            width: Metrics.screenWidth - Metrics.margin.huge * 5,
            height: Metrics.screenWidth - Metrics.margin.huge * 5,
          }}
        />
        <View style={styles.processBar}>
          {byteProcess ? (
            <ProgressBarAndroid
              styleAttr="Horizontal"
              indeterminate={false}
              progress={byteProcess}
              color={Colors.appColor}
            />
          ) : null}
        </View>
      </View>
    );
  }
}
