import React, {Component} from 'react';
import {View, FlatList} from 'react-native';
import FastImage from 'react-native-fast-image';
import r from 'reactotron-react-native';
import {MaterialIndicator} from 'react-native-indicators';
import Modal from 'react-native-modal';

import styles from './styles';
import PaymentForm from '../PaymentForm';
import {
  AppText,
  AppButton,
  AppInput,
  Divider,
  AppAlert,
  IconBack,
} from '../../../../../../components';
import {Fonts, Colors, Metrics} from '../../../../../../themes';
import {formatPrice} from '../../../../../../helpers/Utils';
import CameraForm from '../CameraForm';
import {TouchableOpacity} from 'react-native';
import {ScrollView} from 'react-native';

export default class ConfirmForm extends Component {
  state = {
    index: 0,
    isCamera: false,
    isReceiver: true,
  };

  _getData = () => {
    return {
      payment: this.paymentForm ? this.paymentForm.state.data : [],
      receiver: this.receiver ? this.receiver.value() : '',
    };
  };

  _onPressConfirm = () => {
    if (this.receiver)
      if (this.receiver.value()) {
        this.props.onPressConfirm();
      } else {
        this.setState({isReceiver: false});
      }
    else {
      this.props.onPressConfirm();
    }
  };

  render() {
    let {
      codAmount,
      currency,
      typeOrder,
      reff,
      orderNumber,
      payments,
      images,
      isShowIndicator,
      remark,
    } = this.props;

    codAmount = codAmount != 'NaN' && codAmount != null ? codAmount : 0;

    console.log('codAmount', codAmount);

    return (
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <AppText
            text="Thông tin đơn hàng"
            size={Fonts.size.h5}
            color={Colors.appColor}
            bold
          />
        </View>
        <View style={styles.body}>
          <View style={{width: '100%'}}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingTop: Metrics.margin.regular,
                paddingBottom: Metrics.margin.large,
              }}>
              <AppText
                text="Mã đơn hàng"
                size={Fonts.size.h6}
                color={Colors.overlay6}
                bold
              />
              <AppText
                text={orderNumber}
                size={Fonts.size.h6}
                color={Colors.appColor}
                bold
              />
            </View>
            <Divider height={0.8} width={'100%'} />
          </View>
          {reff ? (
            <View style={{width: '100%'}}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  paddingVertical: Metrics.margin.large,
                }}>
                <AppText
                  text="REFF"
                  size={Fonts.size.h6}
                  color={Colors.overlay6}
                  bold
                />
                <AppText text={reff} size={Fonts.size.h6} />
              </View>
              <Divider height={0.8} width={'100%'} />
            </View>
          ) : null}
          {!typeOrder ? (
            <View
              style={[
                styles.item,
                {flexDirection: 'column', alignItems: 'flex-start'},
              ]}>
              <AppText
                text="Người nhận"
                size={Fonts.size.h6}
                color={Colors.overlay6}
                bold
              />
              <AppInput
                placeholder="Tên người nhận"
                width={'95%'}
                height={50}
                placeholderTextColor={
                  this.state.isReceiver
                    ? Colors.appLightGrayColor
                    : Colors.appRed
                }
                onFocus={() => this.setState({isReceiver: true})}
                style={[
                  styles.input,
                  {
                    borderBottomColor: this.state.isReceiver
                      ? Colors.overlay2
                      : Colors.appRed,
                  },
                ]}
                size={Fonts.size.large}
                ref={receiver => (this.receiver = receiver)}
              />
            </View>
          ) : null}
          <Divider height={0.8} width={'100%'} />
          <View style={styles.item}>
            <AppText
              text="Hình ảnh"
              size={Fonts.size.h6}
              color={Colors.overlay6}
              bold
            />
            <TouchableOpacity onPress={() => this.setState({isCamera: true})}>
              <AppText
                text={'+ Thêm ảnh'}
                size={Fonts.size.h6}
                color={Colors.appColor}
              />
            </TouchableOpacity>
          </View>
          {images.length > 0 ? (
            <View
              style={[
                {
                  marginTop: -Metrics.margin.regular,
                  paddingHorizontal: Metrics.margin.regular,
                },
                styles.item,
              ]}>
              <FlatList
                showsHorizontalScrollIndicator={false}
                data={images}
                horizontal={true}
                ItemSeparatorComponent={() => (
                  <View style={{marginHorizontal: Metrics.margin.small}} />
                )}
                renderItem={({item, index}) => (
                  <AppButton
                    onPress={() => this.props.onReadImage(index, images)}
                    style={styles.image}
                    renderItem={
                      <FastImage
                        source={{uri: item.base64}}
                        style={{
                          flex: 1,
                          borderRadius: Metrics.borderRadius.small,
                        }}
                      />
                    }
                  />
                )}
              />
            </View>
          ) : null}
          <Divider height={0.8} width={'100%'} />
          <View style={{paddingTop: Metrics.margin.large, width: '100%'}}>
            <AppText
              text="Ghi chú"
              align={'left'}
              size={Fonts.size.h6}
              color={Colors.overlay6}
              bold
            />
            <AppText style={{flex: 1}} text={remark} size={Fonts.size.h6} />
          </View>
        </View>
        <View style={styles.header}>
          <AppText
            text="Thông tin thanh toán"
            size={Fonts.size.h6}
            size={Fonts.size.h5}
            color={Colors.appColor}
            bold
          />
        </View>
        <View style={styles.body}>
          <View style={styles.item}>
            <AppText
              text={codAmount >= 0 ? 'Phí COD' : 'Tiền trả lại'}
              size={Fonts.size.h6}
              color={Colors.overlay6}
              bold
            />
            <AppText
              text={formatPrice(codAmount.toString()) + ' ' + currency}
              size={Fonts.size.h6}
            />
          </View>
        </View>
        {codAmount > 0 ? (
          payments.length > 0 ? (
            <PaymentForm
              {...this.props}
              ref={paymentForm => (this.paymentForm = paymentForm)}
            />
          ) : null
        ) : null}
        <View style={styles.container_button}>
          <AppButton
            width={'40%'}
            text={'Xác nhận'}
            size={Fonts.size.h6}
            bgColor={Colors.appColor}
            color={Colors.appWhite}
            onPress={this._onPressConfirm}
          />
        </View>
        <Modal
          isVisible={this.state.isCamera}
          style={styles.modal}
          animationInTiming={250}
          animationIn="zoomInUp"
          animationOut="zoomOutUp"
          animationOutTiming={250}>
          <IconBack
            style={styles.logoBack}
            onPress={() => this.setState({isCamera: false})}
            color={Colors.appWhite}
          />
          <CameraForm {...this.props} />
          {isShowIndicator ? (
            <View style={styles.indicator}>
              <MaterialIndicator color={Colors.appColor} />
            </View>
          ) : null}
        </Modal>
      </ScrollView>
    );
  }
}
