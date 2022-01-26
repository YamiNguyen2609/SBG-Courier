import React, {Component} from 'react';
import {BackHandler, View} from 'react-native';
import {connect} from 'react-redux';
import r from 'reactotron-react-native';
import AsyncStorage from '@react-native-community/async-storage';

import Render from './components/Render';
import {
  showFlagMessage,
  hideFlagMessage,
  getRouteFocus,
} from '../../../../redux/app';
import {replaceScreen} from '../../../../redux/navigation';
import {
  updateOrder,
  clearPaymentOrder,
} from '../../../../redux/order/redux/updateOrder';
import {getListDispatchOrder} from '../../../../redux/order/redux/getListDispatchOrder';
import {getListDispatchOrderComplete} from '../../../../redux/order/redux/getListDispatchOrderComplete';
import {onLogOrder} from '../../../../redux/order/redux/orderLog';
import {getOrderNumber} from '../../../../redux/order/redux/getOrderNumber';
import {uploadOrder} from '../../../../redux/order/redux/uploadOrder';

export class DetailOrderDispatchScreen extends Component {
  state = {
    bookingNumber: '',
  };
  UNSAFE_componentWillReceiveProps = async nextProps => {
    if (!this.state.bookingNumber)
      this.setState({
        bookingNumber: nextProps['route']['params']['item']['bookingNumber'],
      });
    if (this.props.flagUploadSuccess != nextProps.flagUploadSuccess) {
      AsyncStorage.removeItem(this.state.bookingNumber);
      this.props.getListDispatchOrder(1, 1, true);
      this.props.getListDispatchOrderComplete(1, 1, true);
      nextProps.navigation.goBack();
    }
  };

  _onPressConfirm = (status, type, data) => {
    const {item, typeOrder, screen} = this.props.route.params;
    if (!type) {
      if (status) {
        this.props.replaceScreen('ConfirmOrderScreen', {
          typeOrder: 0,
          status,
          HAWBs: item.HAWBs,
          orderId: item.orderId,
          codAmount: item.codRemainAmountActual,
          currency: 'VNĐ',
          reff: item.originalOrderNumberClient,
          orderNumber:
            item.orderNumber ?? item.bookingNumber ?? item.orderNumberClient,
          screen,
          remark: item.remark,
        });
      } else {
        let res = {
          typeOrder,
          status,
          orderId: item.orderId,
          bookingId: item.bookingId,
          HAWBs: item.HAWBs,
          orderNumber:
            item.orderNumber ?? item.bookingNumber ?? item.orderNumberClient,
          isBooking: item.isBooking,
          remark: item.remark,
          screen,
        };

        this.props.replaceScreen('ConfirmOrderScreen', res);
      }
    } else {
      //console.log('data', data);
      this.props.uploadOrder(data, true);
    }
  };

  _onPressAddImage = () => {
    this.props.replaceScreen('ScanOrderScreen', {
      isOrder: true,
      code:
        this.state.data.orderNumber ??
        this.state.data.bookingNumber ??
        this.state.data.orderNumberClient,
      orderId: this.state.data.orderId ?? this.state.data.bookingId,
      images: [],
    });
  };

  _onReadImage = (index, images) => {
    this.props.replaceScreen('DetailOrderScreen', {
      code:
        this.state.data.orderNumber ??
        this.state.data.bookingNumber ??
        this.state.data.orderNumberClient,
      index,
      images: images.map(e => {
        return {
          uri: e,
        };
      }),
    });
  };

  render() {
    const {typeOrder, classify, item} = this.props.route.params;
    const {histories} = this.props;

    let images = [];

    if (histories) {
      var files = histories.map(e => e.files).filter(e => e != undefined);
      if (files.length > 0) images = files.reduce((a, b) => a.concat(b));
    }

    return item ? (
      <Render
        onBarCodeRead={this._onBarCodeRead}
        onPressConfirm={this._onPressConfirm}
        back={this.props.navigation.goBack}
        item={item}
        histories={histories.reverse()}
        images={images}
        classify={classify}
        type={typeOrder}
        onPressAddImage={this._onPressAddImage}
        onReadImage={this._onReadImage}
        {...this.props}
      />
    ) : null;
  }
}

const mapStateToProps = state => ({
  flagUploadSuccess: state.uploadOrder.flag,
  histories: state.logOrder.data,
  data: state.getOrderNumber.data,
  flagSuccess: state.getOrderNumber.flagSuccess,
  flagError: state.getOrderNumber.flagError,
});

const mapDispatchToProps = {
  showFlagMessage,
  hideFlagMessage,
  getRouteFocus,
  replaceScreen,
  updateOrder,
  clearPaymentOrder,
  getListDispatchOrder,
  onLogOrder,
  getOrderNumber,
  uploadOrder,
  getListDispatchOrderComplete,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DetailOrderDispatchScreen);
