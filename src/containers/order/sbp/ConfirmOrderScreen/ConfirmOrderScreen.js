import React, {Component} from 'react';
import {Keyboard} from 'react-native';
import {connect} from 'react-redux';
import r from 'reactotron-react-native';

import Render from './components/Render';
import {uploadOrder} from '../../../../redux/order/redux/uploadOrder';
import {cancelOrder} from '../../../../redux/order/redux/cancelOrder';
import {clearPaymentOrder} from '../../../../redux/order/redux/updateOrder';
import {
  replaceScreenWithRemoveStack,
  replaceScreen,
} from '../../../../redux/navigation';
import {getListPayments} from '../../../../redux/order/redux/getListPaymentMethod';
import {getListReasonCancelOrder} from '../../../../redux/order/redux/getListReasonCancelOrder';
import {
  uploadPrice,
  clearUpload,
} from '../../../../redux/order/redux/uploadPrice';

import {getListDispatchOrder} from '../../../../redux/order/redux/getListDispatchOrder';
import {getListDispatchOrderComplete} from '../../../../redux/order/redux/getListDispatchOrderComplete';
import {getListDispatchOrderDismiss} from '../../../../redux/order/redux/getListDispatchOrderDismiss';

let confirm = true;

export class ConfirmOrderScreen extends Component {
  state = {
    success: false,
    barCode: '',
    data: undefined,
  };

  componentDidMount() {
    let {status, codAmount, screen, typeOrder} = this.props.route.params;

    this.setState({data: this.props.route.params}, () => {
      if (!status) {
        this.props.getListReasonCancelOrder(typeOrder ? 1 : 2);
      }
    });
  }

  UNSAFE_componentWillReceiveProps = nextProps => {
    confirm = true;
    const {
      orderId,
      status,
      HAWBs,
      codAmount,
      orderNumber,
      typeOrder,
      screen,
      bookingId,
    } = this.props.route.params;
    if (this.props.flagPayment !== nextProps.flagPayment) {
      let res = this.Render._getData();
      delete res['payment'];
      res['orderId'] = orderId;
      res['HAWBs'] = HAWBs;
      res['orderNumber'] = orderNumber;
      res['bookingId'] = bookingId;
      res['typeOrder'] = typeOrder;
      this.props.uploadOrder(res, status);
    }
    if (
      this.props.flag !== nextProps.flag ||
      this.props.flagCancel !== nextProps.flagCancel
    ) {
      this.props.clearUpload();
      this.props.getListDispatchOrder(typeOrder, 1, true);
      this.props.getListDispatchOrderComplete(typeOrder, 1, true);
      this.props.getListDispatchOrderDismiss(typeOrder, 1, true);
      this.props.clearPaymentOrder();
      this.props.replaceScreenWithRemoveStack(screen, {});
    }
  };

  _onPressConfirm = () => {
    console.log('vo ne', confirm);
    if (confirm) {
      confirm = false;
      const {
        orderId,
        status,
        HAWBs,
        codAmount,
        orderNumber,
        typeOrder,
        bookingId,
        currency,
      } = this.props.route.params;
      let res = this.Render._getData();
      Keyboard.dismiss();
      res['orderId'] = orderId;
      res['typeOrder'] = typeOrder;
      res['bookingId'] = bookingId;
      if (status) {
        r.log('res', res);
        if (res['payment'].length > 0) {
          res['transactionTypeId'] = codAmount > 0 ? 1 : 2;
          this.props.uploadPrice(res);
        } else {
          res['HAWBs'] = HAWBs;
          res['orderNumber'] = orderNumber;
          this.props.uploadOrder(res, true);
        }
      } else {
        delete res['data'];
        delete res['dataChild'];
        res['HAWBs'] = HAWBs;
        res['orderNumber'] = orderNumber;

        //r.log('res', res);

        this.props.uploadOrder(res, false);
      }
    }
  };

  _onReadImage = (index, images) => {
    this.props.replaceScreen('DetailOrderScreen', {
      code: this.state.data.orderNumber,
      index,
      images: images.map(e => {
        return {
          uri: e.base64,
        };
      }),
    });
  };

  render() {
    return (
      <Render
        {...this.props}
        {...this.props.route.params}
        ref={render => (this.Render = render)}
        back={this.props.navigation.goBack}
        onPressConfirm={this._onPressConfirm}
        onReadImage={this._onReadImage}
      />
    );
  }
}

const mapStateToProps = state => ({
  flag: state.uploadOrder.flag,
  flagPayment: state.uploadPrice.flag,
  flagCancel: state.cancelOrder.flag,
  payments: state.getListPaymentMethod.payments,
  listReason: state.getListReasonCancelOrder.data,
  uploadPayment: state.uploadPrice.isUpload,
});

const mapDispatchToProps = {
  uploadOrder,
  replaceScreenWithRemoveStack,
  cancelOrder,
  clearPaymentOrder,
  getListPayments,
  getListReasonCancelOrder,
  uploadPrice,
  clearUpload,
  getListDispatchOrder,
  getListDispatchOrderComplete,
  getListDispatchOrderDismiss,
  replaceScreen,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ConfirmOrderScreen);
