import React, {Component} from 'react';
import {View} from 'react-native';

import styles from './styles';
import {AppInput, AppButton} from '../../../../../../components';
import {Fonts, Colors, Metrics} from '../../../../../../themes';

export default class BarCodeForm extends Component {
  state = {
    flag: 0,
    value: '',
  };

  UNSAFE_componentWillReceiveProps = nextProps => {
    console.log(nextProps.refreshFlag);
    if (this.state.flag !== nextProps.refreshFlag) {
      this.setState({flag: nextProps.refreshFlag, value: ''});
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <AppInput
          placeholder={'Nhập mã đơn hàng'}
          size={Fonts.size.h6}
          border={0.8}
          borderColor={Colors.overlay2}
          width={'100%'}
          height={60}
          value={this.state.value}
          onChangeText={value => this.setState({value})}
          onSubmitEditing={() => this.props.searchOrder(this.state.value)}
          returnKeyType={'search'}
        />
      </View>
    );
  }
}
