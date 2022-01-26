import React, {Component} from 'react';
import {View, FlatList, TouchableOpacity} from 'react-native';
import IonIcon from 'react-native-vector-icons/Ionicons';
import AntIcon from 'react-native-vector-icons/AntDesign';
import Modal from 'react-native-modal';

import styles from './styles';
import {AppText, AppButton} from '../../../../../../components';
import {Styles, Fonts, Colors} from '../../../../../../themes';
import {formatPrice} from '../../../../../../helpers/Utils';

export default class DeliveryForm extends Component {
  state = {
    visiblePhone: false,
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

  render() {
    const {images, item, classify} = this.props;

    const {
      address,
      phone,
      codPaid,
      codRemain,
      name,
      currency,
      ref,
      codAmount,
      remark,
    } = item;

    const width = 80;

    return (
      <View style={styles.container}>
        <View style={styles.title}>
          <AppText
            size={Fonts.size.h5}
            text={'Thông tin người nhận'}
            bold
            color={Colors.appColor}
          />
          <View style={styles.container_button}>
            <AppButton
              border={0.8}
              height={40}
              width={40}
              borderRadius={20}
              onPress={() =>
                this.props.onPressAddress(address.split('null ').join(''))
              }
              bgColor={Colors.appPrimaryColor}
              renderItem={
                <View style={[Styles.center, {flex: 1}]}>
                  <IonIcon
                    name="ios-pin"
                    size={20}
                    color={Colors.appWhite}
                    // style={styles.icon}
                  />
                </View>
              }
            />
            <AppButton
              border={0.8}
              height={40}
              width={40}
              borderRadius={20}
              onPress={() => this.props.onPressPhone(phone)}
              bgColor={Colors.appPrimaryColor}
              renderItem={
                <View style={[Styles.center, {flex: 1}]}>
                  <AntIcon
                    name="phone"
                    size={18}
                    color={Colors.appWhite}
                    // style={styles.icon}
                  />
                </View>
              }
            />
          </View>
        </View>
        <View style={styles.card}>
          <AppText size={Fonts.size.h6} text={name} />
          <AppText
            size={Fonts.size.h6}
            text={address.split('null ').join('')}
          />
        </View>
        <View style={styles.title}>
          <AppText
            size={Fonts.size.h5}
            text={'Thông tin đơn hàng'}
            bold
            color={Colors.appColor}
          />
        </View>
        <View style={styles.card}>
          {ref ? (
            <View style={styles.form}>
              <AppText
                size={Fonts.size.h6}
                text="REFF"
                style={{width}}
                color={Colors.appColor}
                bold
              />
              <AppText
                size={Fonts.size.h6}
                text={ref}
                style={{flex: 1}}
                color={Colors.appColor}
                bold
                align={'right'}
              />
            </View>
          ) : null}
          <View style={styles.form}>
            <AppText size={Fonts.size.h6} text="Phí COD" style={{width}} />
            <AppText
              style={{flex: 1}}
              size={Fonts.size.h6}
              text={`${this.formatAmount(codAmount)} ${currency}`}
              align={'right'}
            />
          </View>
          {classify == 2 ? (
            <View>
              <View style={styles.form}>
                <AppText
                  size={Fonts.size.h6}
                  text="Tổng tiền"
                  style={{width}}
                />
                <AppText
                  size={Fonts.size.h6}
                  text={`${this.formatAmount(codAmount)} ${currency}`}
                  style={{flex: 1}}
                  align={'right'}
                />
              </View>
              <View style={styles.form}>
                <AppText size={Fonts.size.h6} text="Đã thu" style={{width}} />
                <AppText
                  size={Fonts.size.h6}
                  text={`${this.formatAmount(codPaid)} ${currency}`}
                  style={{flex: 1}}
                  align={'right'}
                />
              </View>
              <View style={styles.form}>
                <AppText size={Fonts.size.h6} text="Còn lại" style={{width}} />
                <AppText
                  size={Fonts.size.h6}
                  text={`${this.formatAmount(codRemain)} ${currency}`}
                  style={{flex: 1}}
                  align={'right'}
                />
              </View>
            </View>
          ) : null}
          <View style={styles.form}>
            <AppText size={Fonts.size.h6} text="Ghi chú" style={{width}} />
            <AppText
              size={Fonts.size.h6}
              text={remark}
              style={{flex: 1}}
              align={'right'}
            />
          </View>
        </View>
        {images.length > 0 ? (
          <View style={styles.card}>
            <AppText
              size={Fonts.size.h6}
              text={'Hình ảnh đơn hàng'}
              bold
              size={Fonts.size.h6}
            />
            <View
              style={{
                flexWrap: 'wrap',
                flexDirection: 'row',
              }}>
              <FlatList
                keyExtractor={(item, index) => index}
                numColumns={3}
                renderItem={({item, index}) => {
                  return (
                    <AppButton
                      onPress={() => this.props.onReadImage(index, images)}
                      style={styles.image}
                      renderItem={
                        <FastImage
                          source={{uri: item}}
                          style={{
                            flex: 1,
                            borderRadius: Metrics.borderRadius.small,
                          }}
                        />
                      }
                    />
                  );
                }}
                data={images}
              />
            </View>
          </View>
        ) : null}
        {phone ? (
          <PhoneModal
            onClose={() => this.setState({visiblePhone: false})}
            onCall={this.props.onPressPhone}
            visible={this.state.visiblePhone}
            data={phone.split(';')}
          />
        ) : null}
      </View>
    );
  }
}

class PhoneModal extends Component {
  render() {
    const {data, visible} = this.props;
    return data ? (
      <Modal
        onBackdropPress={this.props.onClose}
        backdropOpacity={0}
        style={[Styles.modal, {justifyContent: 'flex-end'}]}
        isVisible={visible}>
        <View style={styles.container_phone}>
          <View style={styles.phone_header}>
            <AppText text={'Danh sách điện thoại'} bold size={Fonts.size.h6} />
            <TouchableOpacity onPress={this.props.onClose}>
              <IonIcon name={'ios-close'} size={35} />
            </TouchableOpacity>
          </View>
          {data.map(e => (
            <TouchableOpacity
              onPress={() => this.props.onCall(e)}
              style={styles.item_phone}>
              <AppText size={Fonts.size.h5} text={e} />
              <View
                style={[
                  Styles.center,
                  {
                    width: 40,
                    height: 40,
                    borderRadius: 20,
                    backgroundColor: Colors.appPrimaryColor,
                  },
                ]}>
                <AntIcon
                  name="phone"
                  size={20}
                  color={Colors.appWhite}
                  // style={styles.icon}
                />
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </Modal>
    ) : null;
  }
}
