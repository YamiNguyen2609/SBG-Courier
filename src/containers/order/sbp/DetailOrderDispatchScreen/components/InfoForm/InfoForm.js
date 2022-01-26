import React, {Component} from 'react';
import {View} from 'react-native';
import Swiper from 'react-native-swiper';

import styles from './styles';
import {
  AppText,
  AppInput,
  Divider,
  AppButton,
} from '../../../../../../components';
import {Fonts, Colors, Metrics} from '../../../../../../themes';
import DetailOderForm from '../DetailOrderForm';
import DetailListProduct from '../DetailListProduct';

export default class InfoForm extends Component {
  state = {
    index: 0,
  };

  _onChangeTab = (index, isSwipe) => {
    if (this.state.index !== index) {
      this.setState(
        {index},
        !isSwipe ? () => this.swiper.scrollTo(index) : null,
      );
    }
  };

  render() {
    const {index} = this.state;
    const {images, typeDispatch} = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <AppButton
            color={!index ? Colors.appColor : Colors.appTextBlack}
            borderRadius={0}
            style={[
              styles.button,
              !index ? {borderBottomColor: Colors.appColor} : null,
            ]}
            text={'Thông tin đơn hàng'}
            size={Fonts.size.large + 2}
            onPress={() => this._onChangeTab(0)}
          />
          <AppButton
            color={index ? Colors.appColor : Colors.appTextBlack}
            borderRadius={0}
            style={[
              styles.button,
              index ? {borderBottomColor: Colors.appColor} : null,
            ]}
            text={'Danh sách sản phẩm'}
            size={Fonts.size.large + 2}
            onPress={() => this._onChangeTab(1)}
          />
        </View>
        <Swiper
          loop={false}
          ref={swiper => (this.swiper = swiper)}
          nextButton={true}
          showsPagination={false}
          active={index}
          onIndexChanged={index => this._onChangeTab(index, true)}>
          <DetailOderForm
            images={images}
            type={typeDispatch}
            ref={form => (this.detailForm = form)}
          />
          <DetailListProduct />
        </Swiper>
      </View>
    );
  }
}
