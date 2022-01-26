import React, {Component} from 'react';
import {connect} from 'react-redux';
import {showMessage} from 'react-native-flash-message';

import Render from './components/Render';
import {hideFlagMessage, showFlagMessage} from '../../../../redux/app';
import {getUnit} from '../../../../redux/order/redux/getUnit';
import {
  getSelling,
  clearSelling,
} from '../../../../redux/order/redux/getSelling';
import {updateSelling} from '../../../../redux/order/redux/updateSelling';

export class RexScanScreen extends Component {
  onSubmit = params => {
    const {orderId} = this.props.data.data;
    if (params.length > 0) this.props.updateSelling(params, orderId);
    else {
      showMessage({
        message: 'Lỗi cập nhật đơn hàng',
        description: 'Trọng lượng và kích thước không đồng thời bằng 0',
        type: 'warning',
      });
    }
  };

  render() {
    return (
      <Render
        back={this.props.navigation.goBack}
        {...this.props}
        onSubmit={this.onSubmit}
      />
    );
  }
}

const mapStateToProp = state => ({
  unit: state.getUnit,
  data: state.getSelling,
});

const mapDispatchToProp = {
  hideFlagMessage,
  showFlagMessage,
  getUnit,
  getSelling,
  updateSelling,
  clearSelling,
};

export default connect(
  mapStateToProp,
  mapDispatchToProp,
)(RexScanScreen);
