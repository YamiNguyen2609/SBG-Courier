import React, {Component} from 'react';
import {View} from 'react-native';
import FastImage from 'react-native-fast-image';

import styles from './styles';
import {IconBack, AppInput} from '../../../../../../components';
import {Colors, Fonts, Images, Metrics} from '../../../../../../themes';

export default class SearchOrderForm extends Component {
  state = {
    keyword: '',
  };

  _onTextChange = value => {
    clearTimeout(this.timeout);
    this.setState({keyword: value}, () => {
      this.timeout = setTimeout(() => {
        this.props.onTextChange(this.state.keyword);
      }, 200);
    });
  };

  render() {
    const {keyword} = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.container_input}>
          <FastImage source={Images.icSearch} style={styles.search} />
          <AppInput
            placeholder={'Tìm kiếm theo bill'}
            placeholderColor={Colors.appWhite}
            size={Fonts.size.h6}
            value={keyword}
            onChangeText={value => this._onTextChange(value)}
            width={'90%'}
            bgColor={'transparent'}
          />
        </View>
        <IconBack
          color={Colors.appWhite}
          size={60}
          onPress={this.props.back}
          style={styles.back}
        />
      </View>
    );
  }
}
