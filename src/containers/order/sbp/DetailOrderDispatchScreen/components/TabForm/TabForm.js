import React, {Component} from 'react';
import {View, Text} from 'react-native';

import styles from './styles';
import {AppButton} from '../../../../../../components';
import {Fonts, Colors} from '../../../../../../themes';

export default class TabForm extends Component {
  state = {};
  render() {
    const {index} = this.props;
    return (
      <View style={styles.container}>
        <AppButton
          color={index == 0 ? Colors.appColor : Colors.appTextBlack}
          borderRadius={0}
          style={[
            styles.button,
            index == 0 ? {borderBottomColor: Colors.appColor} : null,
          ]}
          text={'Đơn hàng'}
          size={Fonts.size.large + 2}
          onPress={() => this.props.onChangeTab(0)}
        />
        <AppButton
          color={index == 1 ? Colors.appColor : Colors.appTextBlack}
          borderRadius={0}
          style={[
            styles.button,
            index == 1 ? {borderBottomColor: Colors.appColor} : null,
          ]}
          text={'Sản phẩm'}
          size={Fonts.size.large + 2}
          onPress={() => this.props.onChangeTab(1)}
        />
        <AppButton
          color={index == 2 ? Colors.appColor : Colors.appTextBlack}
          borderRadius={0}
          style={[
            styles.button,
            index == 2 ? {borderBottomColor: Colors.appColor} : null,
          ]}
          text={'Lịch sử'}
          size={Fonts.size.large + 2}
          onPress={() => this.props.onChangeTab(2)}
        />
      </View>
    );
  }
}
