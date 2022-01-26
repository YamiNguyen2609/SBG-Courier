import React, {Component} from 'react';
import {connect} from 'react-redux';
import Orientation from 'react-native-orientation-locker';
import r from 'reactotron-react-native';

import Render from './components/Render';
import {
  uploadManifest,
  addManifest,
} from '../../../../redux/order/redux/uploadManifest';
import {showFlagMessage, hideFlagMessage} from '../../../../redux/app';
import {showMessage} from 'react-native-flash-message';
import {onAddImageOrder} from '../../../../redux/order/redux/addImageOrder';
import {onLogOrder} from '../../../../redux/order/redux/orderLog';
import {getOrders} from '../../../../redux/order/redux/getListOrder';
import {getListBillId} from '../../../../redux/order/redux/getListBillId';
import {getManifestNotes} from '../../../../redux/order/redux/getManifestNotes';
import {getProcessSpecial} from '../../../../redux/order/redux/getProcessSpecials';

export class ScanOrderScreen extends Component {
  state = {
    barCode: '',
    images: [],
    isOrder: false,
  };

  componentDidMount() {
    Orientation.lockToPortrait();
    const {code, images} = this.props.route.params;
    this.props.getManifestNotes();
    this.props.getProcessSpecial();
    if (code) {
      this.setState({
        barCode: code,
        images: images,
        isOrder: true,
      });
    }
  }

  UNSAFE_componentWillReceiveProps = nextProps => {
    if (
      this.props.flagSuccess != nextProps.flagSuccess ||
      this.props.flagOrderSuccess !== nextProps.flagOrderSuccess
    ) {
      this._onClearBarCode();
      if (this.props.user.isOrder) {
        this.props.onLogOrder();
      } else {
        this.props.getOrders(1, true);
        this.props.getListBillId();
      }
      if (this.state.isOrder) {
        this.props.navigation.goBack();
      }
    }
  };

  _onUpload = data => {
    if (this.state.isOrder) {
      this.props.uploadManifest(
        this.rd.state.barCode,
        data.filter(e => e.isUpload == false),
        true,
        false,
      );
    } else {
      this.props.showFlagMessage({
        message: 'Bill có tờ khai ?',
        buttons: [
          {
            title: 'Không',
            onPress: () => {
              this.props.hideFlagMessage();

              setTimeout(() => {
                this._onSubmit(data, 'false');
              }, 250);
            },
          },
          {
            title: 'có',
            onPress: () => {
              this.props.hideFlagMessage();

              setTimeout(() => {
                this._onSubmit(data, 'true');
              }, 250);
            },
          },
        ],
      });
    }
  };

  _onSubmit = (data, status) => {
    this.props.uploadManifest(
      this.rd.state.barCode,
      data.filter(e => e.isUpload == false),
      false,
      status,
    );
  };

  _onClearBarCode = () => {
    this.setState(
      {
        barCode: '',
        images: [],
      },
      () => this.rd.setState({barCode: '', images: []}),
    );
  };

  _goBack = () => {
    if (this.rd.state.barCode) {
      this.props.showFlagMessage({
        message: 'Bạn muốn thoát khỏi màn hình scan',
        buttons: [
          {
            title: 'Huỷ bỏ',
            onPress: () => {
              this.props.hideFlagMessage();
            },
          },
          {
            title: 'Đồng ý',
            onPress: () => {
              this.setState({barCode: ''}, () => {
                this.props.hideFlagMessage();
                this.props.navigation.goBack();
              });
            },
          },
        ],
      });
    } else {
      this.props.navigation.goBack();
    }
  };

  render() {
    const {barCode, images} = this.state;

    return (
      <Render
        ref={rd => (this.rd = rd)}
        back={this._goBack}
        images={images}
        barCode={barCode}
        onBarCodeRead={this._onBarCodeRead}
        onUpload={this._onUpload}
        {...this.props}
      />
    );
  }
}

const mapStateToProps = state => ({
  user: state.loginUser.user,
  flagSuccess: state.uploadManifest.flagSuccess,
  flagOrderSuccess: state.addImageOrder.flag,
});

const mapDispatchToProps = {
  uploadManifest,
  showFlagMessage,
  hideFlagMessage,
  addManifest,
  onAddImageOrder,
  onLogOrder,
  getOrders,
  getListBillId,
  getManifestNotes,
  getProcessSpecial,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ScanOrderScreen);
