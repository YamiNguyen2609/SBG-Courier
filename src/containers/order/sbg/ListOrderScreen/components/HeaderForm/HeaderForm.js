import React, {Component} from 'react';
import {View} from 'react-native';

import styles from './styles';
import {AppText} from '../../../../../../components';
import {Fonts, Colors} from '../../../../../../themes';

export default class HeaderForm extends Component {
  state = {};
  render() {
    const {total} = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.title}>
          <AppText
            text={'Danh sách bill trong ngày'}
            align={'center'}
            size={Fonts.size.h5}
            color={Colors.appWhite}
          />
        </View>
        <View style={styles.totalForm}>
          <AppText text={'Tổng bill hiện tại'} bold size={Fonts.size.h5} />
          <AppText
            text={total + ' bill'}
            bold
            color={Colors.appOrange}
            size={Fonts.size.h5}
          />
        </View>
      </View>
    );
  }
}
