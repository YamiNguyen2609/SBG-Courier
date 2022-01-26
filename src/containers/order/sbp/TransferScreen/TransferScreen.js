import React, {Component} from 'react';
import {connect} from 'react-redux';

import Render from './components/Render';
import {transferOrder} from '../../../../redux/order/redux/transferOrder';

export class TransferScreen extends Component {
  _onScan = code => this.props.transferOrder(code);

  render() {
    return (
      <Render
        {...this.props}
        onScan={this._onScan}
        back={this.props.navigation.goBack}
      />
    );
  }
}

const mapStateToProp = state => ({
  flagScan: state.transferOrder.flag,
});

const mapDispatchToProp = {
  transferOrder,
};

export default connect(
  mapStateToProp,
  mapDispatchToProp,
)(TransferScreen);
