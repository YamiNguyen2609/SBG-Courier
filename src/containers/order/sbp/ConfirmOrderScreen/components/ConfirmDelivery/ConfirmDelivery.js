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

export default class ConfirmDelivery extends Component {
  state = {
    index: 0,
    isCamera: false,
    isReceiver: true,
  };

  formatAmount = amount => {
    let result = 0;
    if (amount) {
      if (String(amount).indexOf('.') > -1)
        amount = String(amount).substr(0, String(amount).indexOf('.'));
      if (amount > 0) result = formatPrice(String(amount));
    }

    return String(result);
  };

  _getData = () => {
    return {
      payment: this.paymentForm
        ? this.paymentForm.state.data.map(e => {
            return {
              note: e.note,
              paymentMethodId: e.payment.id,
              codPaid: e.amount,
            };
          })
        : [],
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
      images,
      isShowIndicator,
      remark,
    } = this.props;

    codAmount = codAmount != 'NaN' && codAmount != null ? codAmount : 0;

    const width = 120;

    return (
      <ScrollView
        keyboardShouldPersistTaps="handled"
        style={styles.container}
        showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <AppText
            text="Th??ng tin ????n h??ng"
            size={Fonts.size.h5}
            color={Colors.appColor}
            bold
          />
        </View>
        <View style={styles.body}>
          <View style={styles.form}>
            <AppText text="M?? ????n h??ng" size={Fonts.size.h6} style={{width}} />
            <AppText
              text={orderNumber}
              size={Fonts.size.h6}
              color={Colors.appColor}
              bold
              style={{flex: 1}}
              align={'right'}
            />
          </View>
          {reff ? (
            <View style={styles.form}>
              <AppText text="REFF" size={Fonts.size.h6} style={{width}} />
              <AppText
                text={reff}
                size={Fonts.size.h6}
                style={{flex: 1}}
                align={'right'}
              />
            </View>
          ) : null}
          <View
            style={[
              styles.form,
              {
                paddingRight: Metrics.margin.regular,
              },
            ]}>
            <AppText text="Ng?????i nh???n" size={Fonts.size.h6} style={{width}} />
            <AppInput
              placeholder="T??n ng?????i nh???n"
              height={50}
              placeholderTextColor={
                this.state.isReceiver ? Colors.appLightGrayColor : Colors.appRed
              }
              onFocus={() =>
                this.setState({
                  isReceiver: true,
                })
              }
              style={[
                styles.input,
                {
                  borderColor: this.state.isReceiver
                    ? Colors.overlay2
                    : Colors.appRed,
                },
              ]}
              size={Fonts.size.large}
              ref={receiver => (this.receiver = receiver)}
            />
          </View>
          <View style={styles.form}>
            <AppText text="Ghi ch??" style={{width}} size={Fonts.size.h6} />
            <AppText
              style={{flex: 1}}
              text={remark ?? 'Kh??ng c?? ghi ch??'}
              size={Fonts.size.h6}
              align={'right'}
            />
          </View>
        </View>
        <View
          style={[
            styles.item,
            styles.header,
            {
              paddingRight: Metrics.margin.regular,
            },
          ]}>
          <AppText
            text="H??nh ???nh"
            size={Fonts.size.h5}
            color={Colors.appColor}
            bold
          />
          <TouchableOpacity onPress={() => this.setState({isCamera: true})}>
            <AppText
              text={'+ Th??m ???nh'}
              size={Fonts.size.h6}
              color={Colors.appPrimaryColor}
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
                <View
                  style={{
                    marginHorizontal: Metrics.margin.small,
                  }}
                />
              )}
              renderItem={({item, index}) => (
                <AppButton
                  onPress={() => this.props.onReadImage(index, images)}
                  style={styles.image}
                  renderItem={
                    <FastImage
                      source={{
                        uri: item.base64,
                      }}
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
        <View style={styles.header}>
          <AppText
            text="Th??ng tin thanh to??n"
            size={Fonts.size.h5}
            color={Colors.appColor}
            bold
          />
        </View>
        <View style={styles.body}>
          <View style={[styles.form, {paddingBottom: 0}]}>
            <AppText
              text={codAmount >= 0 ? 'Ph?? COD' : 'Ti???n tr??? l???i'}
              size={Fonts.size.h6}
            />
            <AppText
              text={`${formatPrice(this.formatAmount(codAmount))} ${currency}`}
              size={Fonts.size.h6}
              style={{flex: 1}}
              align={'right'}
            />
          </View>
        </View>
        {codAmount > 0 ? (
          <View
            style={{
              marginVertical: Metrics.margin.regular,
            }}>
            <PaymentForm
              {...this.props}
              isLoad={true}
              isMax={true}
              amount={Number(this.formatAmount(codAmount).replace(/[.]/g, ''))}
              ref={paymentForm => (this.paymentForm = paymentForm)}
            />
          </View>
        ) : null}
        <View style={styles.container_button}>
          <AppButton
            width={'40%'}
            text={'X??c nh???n'}
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
