import React, {Component} from 'react';
import {FlatList, TouchableOpacity, View, Linking} from 'react-native';
import IonIcon from 'react-native-vector-icons/Ionicons';
import AntIcon from 'react-native-vector-icons/AntDesign';
import Modal from 'react-native-modal';
import call from 'react-native-phone-call';
import {showMessage} from 'react-native-flash-message';

import styles from './styles';
import {AppText, Divider} from '../../../../../../components';
import {Colors, Fonts, Metrics, Styles} from '../../../../../../themes';
import {formatPrice} from '../../../../../../helpers/Utils';

export default class Item extends Component {
  state = {
    visible: false,
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

  _onCall = phone =>
    phone
      ? call({
          number: phone,
          prompt: false,
        })
      : showMessage({
          message: 'Lỗi cuộc gọi',
          type: 'warning',
          description: 'Số điện thoại không tồn tại',
        });

  _onMap = async address =>
    Linking.openURL(`google.navigation:q=${address}`).catch(error => {
      showMessage({
        message: 'Lỗi định vị',
        type: 'warning',
        description: 'Không thể tìm thấy địa điểm',
      });
    });

  render() {
    const {item, index, total, classify} = this.props;

    const orderNumber = item['bookingNumber'] ?? item['orderNumber'];
    if (item['bookingNumber']) {
      var customerName = item['contactFullName'];
      var customerPhone = item['contactPhone'];
      var customerAddress = item['fullAddress'];
      var title = 'Thu người gửi';
      var type = 1;
    } else {
      customerName =
        item['phase'] != 52 ? item['receiverFullName'] : item['senderFullName'];
      customerPhone =
        item['phase'] != 52 ? item['receiverPhone'] : item['senderPhone'];
      customerAddress =
        item['phase'] != 52 ? item['receiverAddress'] : item['senderAddress'];
      title = 'Phí COD';
      type = 0;
    }
    if (customerAddress)
      customerAddress = customerAddress.split('null ').join('');

    let ref = item['originalOrderNumberClient'] ?? item['orderNumberClient'];

    let note = item['remark'];

    let amount = item['codAmount'] ?? item['codRemainAmountActual'];

    let totalAmount = item['codAmountActual'];

    return (
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => this.props.onPress(orderNumber, type, classify)}
        style={[
          styles.container,
          !index ? {marginTop: Metrics.margin.large} : null,
          index == total - 1
            ? {
                marginBottom: Metrics.margin.large,
              }
            : null,
        ]}
        key={'order-' + index}>
        <View style={styles.header}>
          <AppText
            text={orderNumber}
            size={Fonts.size.h6}
            bold
            color={Colors.appColor}
            style={{
              flexWrap: 'wrap',
              width: Metrics.screenWidth - Metrics.margin.regular * 2 - 140,
            }}
          />
          <View style={styles.container_button}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => this._onMap(customerAddress)}>
              <IonIcon name={'ios-pin'} size={26} color={Colors.appWhite} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this._onCall(customerPhone)}
              style={styles.button}>
              <AntIcon name={'phone'} size={20} color={Colors.appWhite} />
            </TouchableOpacity>
          </View>
        </View>
        <Divider height={0.8} color={Colors.overlay3} width={'100%'} />
        <View style={styles.body}>
          {ref ? <AppText text={ref} size={Fonts.size.large} /> : null}
          <AppText
            text={`${customerName} ${
              customerPhone ? '- ' + customerPhone : ''
            }`}
            size={Fonts.size.large}
            bold
          />
          <AppText text={customerAddress} size={Fonts.size.large} />
          <Divider
            height={1}
            style={{marginVertical: Metrics.margin.regular}}
            width={'100%'}
          />
          <View style={styles.row}>
            <AppText text={'Ghi chú'} size={Fonts.size.large} />
            <AppText
              text={note ?? 'Không có ghi chú'}
              size={Fonts.size.large}
              style={{flex: 1}}
              align={'right'}
            />
          </View>
          {classify == 2 && type == 0 ? (
            <View>
              <View style={styles.row}>
                <AppText text={'Tổng COD'} size={Fonts.size.large} />
                <AppText
                  text={`${this.formatAmount(totalAmount)} VNĐ`}
                  size={Fonts.size.large}
                  style={{flex: 1}}
                  align={'right'}
                />
              </View>
              <View
                style={[
                  styles.row,
                  {
                    paddingVertical: Metrics.margin.tiny,
                  },
                ]}>
                <AppText text={'Đã thu'} size={Fonts.size.large} />
                <AppText
                  text={`${this.formatAmount(
                    item['codRemainAmountActual'],
                  )} VNĐ`}
                  size={Fonts.size.large}
                  style={{flex: 1}}
                  align={'right'}
                />
              </View>
              <View style={styles.row}>
                <AppText text={'Còn lại'} size={Fonts.size.large} />
                <AppText
                  text={`${this.formatAmount(amount)} VNĐ`}
                  size={Fonts.size.large}
                  style={{flex: 1}}
                  align={'right'}
                />
              </View>
            </View>
          ) : (
            <View style={styles.row}>
              <AppText text={title} size={Fonts.size.large} />
              <AppText
                text={`${this.formatAmount(amount)} VNĐ`}
                size={Fonts.size.large}
                style={{flex: 1}}
                align={'right'}
              />
            </View>
          )}
        </View>
        {true ? (
          <Modal
            onBackdropPress={() => this.setState({visible: false})}
            isVisible={this.state.visible}
            backdropOpacity={0}
            style={[Styles.modal, {justifyContent: 'flex-end'}]}>
            <View style={styles.container_modal}>
              <View style={styles.modal_header}>
                <AppText
                  text={'Danh sách điện thoại'}
                  bold
                  size={Fonts.size.h6}
                />
                <TouchableOpacity
                  onPress={() =>
                    this.setState({
                      visible: false,
                    })
                  }>
                  <IonIcon name={'ios-close'} size={35} />
                </TouchableOpacity>
              </View>
              <FlatList
                data={[1, 2, 3, 4, 5]}
                keyExtractor={(item, index) => index}
                renderItem={({item, index}) => (
                  <TouchableOpacity
                    key={'phone-' + item}
                    onPress={() => this._onCall(item)}
                    style={styles.item_phone}>
                    <AppText size={Fonts.size.h5} text={item} />
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
                )}
              />
            </View>
          </Modal>
        ) : null}
      </TouchableOpacity>
    );
  }
}
