import React, {Component} from 'react';
import {View} from 'react-native';

import styles from './styles';
import FastImage from 'react-native-fast-image';
import {AppText} from '..';
import {Fonts, Colors} from '../../themes';

export default class EmptyData extends Component {
  render() {
    const {icon, title, content} = this.props;
    return (
      <View style={styles.container}>
        <FastImage style={styles.icon} source={icon} />

        <AppText
          style={styles.title}
          text={title}
          size={Fonts.size.h5}
          color={'#adadad'}
        />

        <AppText
          style={styles.content}
          text={content}
          size={Fonts.size.small}
          color={Colors.appGrayColor}
        />
      </View>
    );
  }
}
