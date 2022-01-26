import React, {Component} from 'react';
import {View} from 'react-native';

import styles from './styles';
import {AppInput, AppButton} from '../../../../../../components';
import {Fonts, Colors, Metrics} from '../../../../../../themes';

export default class BarCodeForm extends Component {
  state = {
    flag: 0,
  };

  _onAdd = () => {
    this.props.dispatchOrder(this.orderNumber.value());
    this.orderNumber.clear();
  };

  render() {
    let width = Metrics.screenWidth - Metrics.margin.regular * 2 - 70;
    return (
      <View style={styles.container}>
        <AppInput
          placeholder={'Nhập mã đơn hàng'}
          size={Fonts.size.h6}
          border={0.8}
          borderColor={Colors.overlay2}
          width={width}
          height={60}
          ref={orderNumber => (this.orderNumber = orderNumber)}
        />
        <AppButton
          text={'Nhập'}
          size={Fonts.size.large}
          height={60}
          width={70}
          onPress={this._onAdd}
          bgColor={Colors.appColor}
          color={Colors.appWhite}
        />
      </View>
    );
  }
}
