import React, {Component} from 'react';
import {View, Linking, TouchableOpacity} from 'react-native';
import Swiper from 'react-native-swiper';
import r from 'reactotron-react-native';
import call from 'react-native-phone-call';
import IonIcon from 'react-native-vector-icons/Ionicons';

import styles from './styles';
import {AppText} from '../../../../../../components';
import {Colors, Fonts} from '../../../../../../themes';
import FooterForm from '../FooterForm';
import TabForm from '../TabForm';
import DetailListProduct from '../DetailListProduct';
import HistoryForm from '../HistoryForm';
import DeliveryForm from '../DeliveryForm';
import ReceiveForm from '../ReceiveForm';

export default class Render extends Component {
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

  _onPressConfirm = (status, type, data) => {
    this.props.onPressConfirm(status, type, data);
  };

  _onPressCall = phone => {
    call({
      number: phone,
      prompt: false,
    });
  };

  _onPressMap = async address => {
    Linking.openURL(`google.navigation:q=${address}`).catch(error => {
      showMessage({
        message: 'Lỗi định vị',
        description: 'Không thể tìm thấy địa điểm',
      });
    });
  };

  render() {
    const {index} = this.state;
    const {item, type, payment, classify, histories, images} = this.props;

    const {
      CODRemain,
      orderNumber,
      orderNumberClient,
      receiverAddress,
      receiverFullName,
      receiverPhone,
      senderAddress,
      senderFullName,
      senderPhone,
      details,
      orderDetails,
      orderId,
      packageDetails,
      senderData,
      bookingNumber,
      bookingId,
      isBooking,
      codRemainAmountActual,
      currency,
      orderClient,
      unitAmount,
      unitFeeActual,
      originalOrderNumberClient,
      codAmountActual,
      codPaidAmountActual,
      remark,
      serviceId,
      phase,
    } = item;

    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.tmp} />
          <AppText
            align={'center'}
            text={orderNumber ?? bookingNumber ?? orderNumberClient}
            size={Fonts.size.h5}
            style={{flexShrink: 1}}
            color={Colors.appWhite}
          />
          <TouchableOpacity
            onPress={this.props.back}
            style={[styles.tmp, {backgroundColor: Colors.whiteOverlay3}]}>
            <IonIcon
              name={'ios-close'}
              size={Fonts.size.h2}
              color={Colors.appWhite}
            />
          </TouchableOpacity>
        </View>
        {!type ? (
          <View style={{flex: 1}}>
            <TabForm index={index} onChangeTab={this._onChangeTab} />
            <Swiper
              keyboardShouldPersistTaps={'handled'}
              loop={false}
              ref={swiper => (this.swiper = swiper)}
              nextButton={true}
              showsPagination={false}
              active={index}
              onIndexChanged={index => this._onChangeTab(index, true)}>
              <DeliveryForm
                item={{
                  name: phase == 52 ? senderFullName : receiverFullName,
                  address: phase == 52 ? senderAddress : receiverAddress,
                  phone: phase == 52 ? senderPhone : receiverPhone,
                  codRemain: codRemainAmountActual,
                  codAmount: codAmountActual,
                  codPaid: codPaidAmountActual,
                  orderId: orderId,
                  currency: 'VNĐ',
                  ref: originalOrderNumberClient,
                  remark: remark ?? 'Không có ghi chú',
                }}
                classify={classify}
                images={images}
                onPressPhone={this._onPressCall}
                onPressAddress={this._onPressMap}
              />
              <DetailListProduct
                data={details ?? orderDetails}
                currency={currency ?? unitAmount}
              />
              <HistoryForm data={histories} type={type} />
            </Swiper>
            {classify != 2 ? (
              <FooterForm
                {...this.props}
                onPressConfirm={this._onPressConfirm}
              />
            ) : null}
          </View>
        ) : (
          <ReceiveForm {...this.props} />
        )}
      </View>
    );
  }
}
