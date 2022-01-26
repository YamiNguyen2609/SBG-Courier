import React, {Component} from 'react';
import {View, FlatList, TouchableOpacity, Keyboard} from 'react-native';
import IonIcon from 'react-native-vector-icons/Ionicons';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import FastImage from 'react-native-fast-image';
import Modal from 'react-native-modal';
import {RNCamera} from 'react-native-camera';
import r from 'reactotron-react-native';
import {MaterialIndicator} from 'react-native-indicators';
import AsyncStorage from '@react-native-community/async-storage';

import styles from './styles';
import {
  AppText,
  AppButton,
  AppInput,
  Divider,
} from '../../../../../../components';
import {Styles, Fonts, Colors, Metrics, Images} from '../../../../../../themes';
import {formatPrice} from '../../../../../../helpers/Utils';
import CameraForm from '../CameraForm';
import strings from '../../../../../../languages';
import {showMessage} from 'react-native-flash-message';
import {payments} from '../../../../../../helpers/Constants';

export default class ReceiveForm extends Component {
  state = {
    localData: [],
    flagError: 0,
    flagSuccess: 0,
    visible: false,
    data: [],
    amount: '0',
    payment: payments[0],
    visiblePayment: false,
    orderNumber: '',
    pcs: 0,
    weight: 0,
    isProcess: true,
    currentIndex: 0,
    statePayment: true,
  };

  async componentDidMount() {
    let data = [];

    let localData = await AsyncStorage.getItem(
      this.props['route']['params']['item']['bookingNumber'],
    );
    const {orderNumbers, orderNumberPUPs, statusId} = this.props['route'][
      'params'
    ]['item'];

    if (localData) data = localData.split(';');

    if (orderNumbers) data = data.concat(orderNumbers);

    if (orderNumberPUPs) data = data.concat(orderNumberPUPs);

    data = [...new Set(data)];

    this.setState(
      {
        localData: data,
        isProcess: statusId != 16,
      },
      () => {
        this.state.localData.forEach((e, index) =>
          this.props.getOrderNumber({
            index,
            value: e,
          }),
        );
      },
    );
  }

  async componentWillUnmount() {
    await AsyncStorage.setItem(
      this.props['route']['params']['item']['bookingNumber'],
      this.state.data
        .map(e => e.orderNumber)
        .reverse()
        .join(';'),
    );
  }

  UNSAFE_componentWillReceiveProps = nextProps => {
    if (this.state.flagSuccess != nextProps.flagSuccess) {
      if (
        !this.state.data.find(e => e.orderNumber == nextProps.data.orderNumber)
      ) {
        if (this.state.localData.indexOf(nextProps.data.orderNumber) > -1)
          nextProps.data['selected'] = false;

        let data = [nextProps.data].concat(this.state.data);
        let amount = data.map(e => e['senderFee']).reduce((a, b) => a + b);
        let pcs = data.map(e => e['pcs']).reduce((a, b) => a + b);
        let weight = data.map(e => e['orderWeightKg']).reduce((a, b) => a + b);

        this.setState({
          data,
          amount,
          pcs,
          weight,
          flagSuccess: nextProps.flagSuccess,
          currentIndex: this.state.currentIndex + 1,
        });
      }
      if (
        this.state.localData.indexOf(nextProps.data.orderNumber) == -1 ||
        this.state.data.filter(
          x =>
            x.orderNumber == nextProps.data.orderNumber && x.selected == false,
        ).length > 0
      )
        showMessage({
          type: 'success',
          message: 'Scan mã đơn hàng',
          description: 'Scan mã đơn hàng thành công',
        });
    }
    if (this.modalForm) this.modalForm.clearValue();
  };

  _onPressConfirm = () => {
    let data = {};
    data['bookingId'] = this.props['item']['bookingId'];
    data['orderNumberPUPs'] = this.state.data.map(e => e.orderNumber);
    data['senderFeeCollect'] = this.state.statePayment ? this.state.amount : 0;
    data['paymentMethodId'] = this.state.payment.id;
    data['typeOrder'] = 1;
    //console.log('vo ne');
    this.props.onPressConfirm(null, 1, data);
  };

  _onBarCodeRead = (data, isPopUp) => {
    let code = data;
    this.setState({orderNumber: code}, () => {
      let item = this.state.data.find(
        x =>
          x.orderNumber == data.toUpperCase() ||
          x.orderNumberClient == data.toUpperCase(),
      );
      if (item) {
        if (item['selected'])
          return showMessage({
            type: 'warning',
            message: 'Scan mã đơn hàng',
            description: 'Đơn hàng đã được scan',
          });
      }
      if (isPopUp) {
        this.props.showFlagMessage({
          message: 'Đã tìm thấy bill ' + code,
          buttons: [
            {
              title: 'Quét lại',
              onPress: () => {
                this.props.hideFlagMessage();
                this.modalForm.clearValue();
              },
            },
            {
              title: 'Tiếp tục',
              onPress: () => {
                this.props.hideFlagMessage();
                setTimeout(() => {
                  this.props.getOrderNumber({
                    index: this.state.currentIndex,
                    value: code,
                  });
                }, 250);
              },
            },
          ],
        });
      } else {
        this.props.getOrderNumber({
          index: this.state.currentIndex,
          value: code,
        });
      }
    });
  };

  _onPress = item => {
    let index = this.state.data.findIndex(x => x == item);
    this.state.data[index].selected = !item['selected'];
    let data = this.state.data.filter(x => x['selected']);
    let amount =
      data.length == 0
        ? '0'
        : data.map(e => e['senderFee']).reduce((a, b) => a + b);
    let pcs =
      data.length == 0 ? '0' : data.map(e => e['pcs']).reduce((a, b) => a + b);
    let weight =
      data.length == 0
        ? '0'
        : data.map(e => e['orderWeightKg']).reduce((a, b) => a + b);
    this.setState({
      data: this.state.data,
      amount,
      pcs,
      weight,
    });
  };

  _onSelectAll = selected => {
    let items = this.state.data.map(x => {
      return {
        ...x,
        selected,
      };
    });
    let data = items.filter(x => x['selected']);
    let amount =
      data.length == 0
        ? '0'
        : data.map(e => e['senderFee']).reduce((a, b) => a + b);
    let pcs =
      data.length == 0 ? '0' : data.map(e => e['pcs']).reduce((a, b) => a + b);
    let weight =
      data.length == 0
        ? '0'
        : data.map(e => e['orderWeightKg']).reduce((a, b) => a + b);
    this.setState({
      data: items,
      amount,
      pcs,
      weight,
    });
  };

  _onPressConfirmValidate = state => {
    this.setState({statePayment: state}, () => {
      if (this.state.amount == 0) return this._onPressConfirm();
      if (state) {
        this.setState({visiblePayment: true});
      } else {
        this.props.showFlagMessage({
          message: `Đơn hàng còn ${formatPrice(
            this.state.amount,
          )} VNĐ chưa thu\nBạn có muốn tiếp tục ?`,
          buttons: [
            {
              title: 'Huỷ',
              onPress: this.props.hideFlagMessage,
            },
            {
              title: 'Xác nhận',
              onPress: () => {
                this.props.hideFlagMessage();
                setTimeout(this._onPressConfirm, 250);
              },
            },
          ],
        });
      }
    });
  };

  Item = ({item, index}) => (
    <TouchableOpacity
      key={index}
      onPress={() => this._onPress(item)}
      activeOpacity={0.8}
      style={[
        styles.item,

        item['selected']
          ? {
              backgroundColor: Colors.appLightGrayColor,
            }
          : null,
        !item['isExist'] && item['selected']
          ? {backgroundColor: '#ffec88'}
          : null,
      ]}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <View
          style={[
            styles.circle,
            item['selected'] ? {backgroundColor: Colors.appGreen} : null,
          ]}>
          <IonIcon name="ios-checkmark" color={Colors.appWhite} size={20} />
        </View>
        <View
          style={
            !item['isExist']
              ? {
                  width: Metrics.screenWidth - Metrics.margin.regular * 5.5,
                  overflow: 'hidden',
                }
              : null
          }>
          <AppText style={{flexWrap: 'wrap'}} text={item['orderNumber']} bold />
          {item['orderNumberClient'] ? (
            <AppText
              text={item['orderNumberClient']}
              italic
              color={Colors.overlay3}
              size={Fonts.size.small}
            />
          ) : null}
        </View>
      </View>
      {item['isExist'] ? (
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-end',
            alignItems: 'center',
          }}>
          <AppText
            style={{
              marginHorizontal: Metrics.margin.tiny,
            }}
            bold
            text={`${String(item['pcs'])} kiện`}
          />
          <EntypoIcon name={'dot-single'} size={12} />
          <AppText
            style={{
              marginHorizontal: Metrics.margin.tiny,
            }}
            bold
            text={`${String(item['orderWeightKg'])} kg`}
          />
        </View>
      ) : null}
    </TouchableOpacity>
  );

  render() {
    const {
      data,
      visible,
      amount,
      pcs,
      weight,
      visiblePayment,
      payment,
      isProcess,
    } = this.state;

    let selected = data.filter(x => x['selected']).length;
    let total = data.length;

    return !visible ? (
      <View style={styles.container}>
        {isProcess ? (
          <TouchableOpacity
            style={styles.button_add}
            onPress={() => this.setState({visible: true})}>
            <IonIcon
              name={'ios-barcode'}
              size={Fonts.size.large}
              color={Colors.appWhite}
            />
            <AppText text={' Scan đơn hàng'} color={Colors.appWhite} />
          </TouchableOpacity>
        ) : (
          <View
            style={{
              marginVertical: Metrics.margin.regular,
            }}
          />
        )}
        <View style={styles.container_button_action}>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={() => this._onSelectAll(true)}
              style={[
                styles.button_action,
                selected == total
                  ? {
                      backgroundColor: Colors.appGreen,
                      borderColor: Colors.appGreen,
                    }
                  : null,
              ]}>
              <AppText
                text={`Chọn tất cả (${total})`}
                color={
                  selected == total ? Colors.appWhite : Colors.appGrayColor
                }
              />
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={() => this._onSelectAll(false)}
              style={[
                styles.button_action,
                selected == 0
                  ? {
                      backgroundColor: Colors.appRed,
                      borderColor: Colors.appRed,
                    }
                  : null,
              ]}>
              <AppText
                text={'Bỏ chọn'}
                color={selected == 0 ? Colors.appWhite : Colors.appGrayColor}
              />
            </TouchableOpacity>
          </View>
          <View
            style={{
              flex: 1,
              justifyContent: 'flex-end',
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <AppText color={Colors.appGrayColor} text={'Đã chọn'} />
            <AppText
              bold
              style={{
                backgroundColor: '#d3edfb',
                paddingHorizontal: Metrics.margin.regular,
                paddingVertical: Metrics.margin.small,
                marginLeft: 0,
                borderRadius: Metrics.borderRadius.small,
              }}
              text={`${selected}/${total}`}
            />
          </View>
        </View>
        <FlatList
          style={{flex: 1}}
          key={'booking-list'}
          keyExtractor={(item, index) => index}
          showsVerticalScrollIndicator={false}
          data={data.sort((a, b) => b['index'] - a['index'])}
          ItemSeparatorComponent={() => (
            <View
              style={{
                height: Metrics.margin.small,
              }}
            />
          )}
          renderItem={this.Item}
        />
        <View style={styles.container_table}>
          <View style={styles.square}>
            {/* <FastImage source={Images.icBill} style={styles.icon} /> */}
            <AppText text={`${total} ĐH`} />
          </View>
          <View style={styles.square}>
            {/* <FastImage source={Images.icPcs} style={styles.icon} /> */}
            <AppText text={`${pcs} pcs`} />
          </View>
          <View style={styles.square}>
            {/* <FastImage source={Images.icWeight} style={styles.icon} /> */}
            <AppText text={`${weight} Kg`} />
          </View>
          <View
            style={[
              styles.square,
              {
                backgroundColor: '#fff1e5',
                width:
                  ((Metrics.screenWidth - Metrics.margin.large * 2) * 2) / 5,
              },
            ]}>
            <AppText text={'Phải thu'} />
            <AppText
              color={Colors.appOrange}
              text={`${formatPrice(amount)} VNĐ`}
            />
          </View>
        </View>
        {isProcess ? (
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              width: Metrics.screenWidth - Metrics.margin.regular * 2,
              marginBottom: Metrics.margin.regular,
            }}>
            <AppButton
              onPress={() => this._onPressConfirmValidate(true)}
              text={'Thu tiền'}
              bgColor={Colors.appGreen}
              color={Colors.appWhite}
              width={(Metrics.screenWidth - Metrics.margin.regular * 4) / 2}
            />
            <AppButton
              onPress={() => this._onPressConfirmValidate(false)}
              text={'Xác nhận'}
              bgColor={Colors.appPrimaryColor}
              color={Colors.appWhite}
              width={(Metrics.screenWidth - Metrics.margin.regular * 4) / 2}
            />
          </View>
        ) : null}
        <Modal
          onBackdropPress={() => this.setState({visiblePayment: false})}
          backdropOpacity={0}
          style={[Styles.modal]}
          isVisible={visiblePayment}>
          <View
            style={{
              flex: 1,
              elevation: 10,
              borderTopLeftRadius: Metrics.borderRadius.small,
              borderTopRightRadius: Metrics.borderRadius.small,
              backgroundColor: Colors.appWhite,
            }}>
            <View
              style={{
                backgroundColor: Colors.appColor,
                ...Styles.center,
                paddingVertical: Metrics.margin.small,
              }}>
              <AppText
                align={'center'}
                size={Fonts.size.large}
                text={'Xác nhận thanh toán'}
                color={Colors.appWhite}
                bold
              />
            </View>
            <View style={styles.container_payment}>
              <View style={styles.footer}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <AppText text={'Tổng Tiền'} bold />
                  <AppText
                    bold
                    text={`${formatPrice(String(amount))} VNĐ`}
                    color={Colors.appGreen}
                  />
                </View>
              </View>
              <AppText
                text={'Phương thức thanh toán'}
                style={{
                  marginVertical: Metrics.margin.large,
                }}
                bold
                size={Fonts.size.regular + 2}
              />
              {payments.map(e => (
                <TouchableOpacity
                  activeOpacity={1}
                  onPress={() =>
                    this.setState({
                      payment: e,
                    })
                  }
                  style={styles.payment_item}>
                  <View
                    style={[
                      styles.circle,
                      e == payment
                        ? {
                            backgroundColor: Colors.appGreen,
                          }
                        : null,
                    ]}>
                    <IonIcon
                      name="ios-checkmark"
                      color={Colors.appWhite}
                      size={20}
                    />
                  </View>
                  <AppText text={e['name']} />
                </TouchableOpacity>
              ))}
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                width: Metrics.screenWidth,
                marginBottom: Metrics.margin.regular,
                paddingHorizontal: Metrics.margin.regular,
              }}>
              <AppButton
                onPress={() =>
                  this.setState({
                    visiblePayment: false,
                  })
                }
                text={'Huỷ'}
                bgColor={Colors.appLightGrayColor}
                color={Colors.appWhite}
                width={(Metrics.screenWidth - Metrics.margin.regular * 4) / 2}
              />
              <AppButton
                onPress={() =>
                  this.setState({visiblePayment: false}, this._onPressConfirm)
                }
                text={'Xác nhận'}
                bgColor={Colors.appColor}
                color={Colors.appWhite}
                width={(Metrics.screenWidth - Metrics.margin.regular * 4) / 2}
              />
            </View>
          </View>
        </Modal>
      </View>
    ) : (
      <ModalForm
        ref={mf => (this.modalForm = mf)}
        visible={true}
        onBarCodeRead={this._onBarCodeRead}
        onClose={() => this.setState({visible: false})}
      />
    );
  }
}

class ModalForm extends Component {
  state = {
    isFlash: false,
    marginBottom: Metrics.margin.huge * 4.3,
    isShowIndicator: false,
  };

  clearValue = () => this.setState({isShowIndicator: false}, this.input.clear);

  componentDidMount() {
    this.keyboardDidShowSubscription = Keyboard.addListener(
      'keyboardDidShow',
      e => {
        this.setState({
          marginBottom:
            e.endCoordinates.height +
            Metrics.margin.huge * 5 +
            Metrics.margin.regular,
        });
      },
    );
    this.keyboardDidHideSubscription = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        this.setState({
          marginBottom: Metrics.margin.huge * 4.3,
        });
      },
    );
  }

  render() {
    const {visible} = this.props;
    return visible ? (
      <View style={styles.container_camera}>
        <RNCamera
          // ref={(camera) => (this.camera = camera)}
          style={{flex: 1, overflow: 'hidden'}}
          type={RNCamera.Constants.Type.back}
          flashMode={this.state.isFlash ? 'torch' : 'off'}
          androidCameraPermissionOptions={{
            title: 'Quyền truy cập máy ảnh',
            message: strings.common.app_name + ' muốn truy cập máy ảnh',
            buttonPositive: 'Ok',
            buttonNegative: 'Cancel',
          }}
          onBarCodeRead={e => {
            const {width, height, origin} = e.bounds;

            let minX = (260 * width) / 1600;
            let maxX = (964 * width) / 1600;
            let minY = (800 * height) / 1200;
            let maxY = (900 * height) / 1200;

            if (
              //origin[0].x >= minX &&
              //origin[1].x <= maxX &&
              origin[0].y >= minY &&
              origin[1].y <= maxY
            ) {
              if (e.type !== 'QR_CODE') {
                this.setState({isShowIndicator: true}, () =>
                  this.props.onBarCodeRead(String(e.data), true),
                );
              }
            }
          }}>
          <View style={styles.container_barCode}>
            <View style={[styles.container_background]} />
            <View style={styles.barCode}>
              <View style={styles.container_background} />
              <View style={styles.barCode_scan}>
                <View style={styles.barCode_border} />
              </View>
              <View style={styles.container_background} />
            </View>
            <View style={styles.container_background} />
          </View>
        </RNCamera>
        <View
          style={[
            styles.container_search,
            {paddingBottom: this.state.marginBottom},
          ]}>
          <AppInput
            placeholder={'Nhập mã đơn hàng'}
            height={50}
            border={0.8}
            size={Fonts.size.large}
            borderColor={Colors.appLightGrayColor}
            width={Metrics.screenWidth - Metrics.margin.huge * 4}
            style={{
              paddingLeft: Metrics.margin.regular,
            }}
            ref={ip => (this.input = ip)}
          />
          <AppButton
            text={'Thêm'}
            onPress={() =>
              this.setState({isShowIndicator: true}, () =>
                this.props.onBarCodeRead(String(this.input.value()), false),
              )
            }
          />
        </View>
        <View style={styles.container_button}>
          <TouchableOpacity
            onPress={() => this.setState({isFlash: !this.state.isFlash})}>
            <MaterialIcon
              name={!this.state.isFlash ? 'flashlight' : 'flashlight-off'}
              color={Colors.appWhite}
              size={30}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={this.props.onClose}>
            <IonIcon name={'ios-close'} color={Colors.appWhite} size={50} />
          </TouchableOpacity>
        </View>
        {this.state.isShowIndicator ? (
          <View style={styles.indicator}>
            <MaterialIndicator color={Colors.appColor} size={50} />
          </View>
        ) : null}
      </View>
    ) : null;
  }
}
