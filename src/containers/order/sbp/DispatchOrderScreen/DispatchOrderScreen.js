import React, {Component} from 'react';
import {connect} from 'react-redux';
import r from 'reactotron-react-native';

import Render from './components/Render';
import {dispatchOrder} from '../../../../redux/order/redux/dispatchOrder';
import {getListDispatchOrder} from '../../../../redux/order/redux/getListDispatchOrder';

import {showFlagMessage, hideFlagMessage} from '../../../../redux/app';

export class DispatchOrderScreen extends Component {
  state = {
    isScan: true,
  };

  UNSAFE_componentWillReceiveProps = nextProps => {
    if (this.props.refreshFlag !== nextProps.refreshFlag) {
      if (nextProps.success) {
        this.props.getListDispatchOrder(0, 1, true);
        this.props.getListDispatchOrder(1, 1, true);
      }

      setTimeout(() => {
        this.setState({isScan: true});
      }, 200);
    }
  };

  _dispatchOrder = data => this.props.dispatchOrder(data);

  render() {
    return (
      <Render
        dispatchOrder={this._dispatchOrder}
        {...this.props}
        back={this.props.navigation.goBack}
      />
    );
  }
}

const mapStateToProp = state => ({
  refreshFlag: state.dispatchOrder.refreshFlag,
  success: state.dispatchOrder.success,
  itemRes: state.dispatchOrder.item,
  isComplete: state.dispatchOrder.isComplete,
});

const mapDispatchToProp = {
  dispatchOrder,
  showFlagMessage,
  hideFlagMessage,
  getListDispatchOrder,
};

export default connect(
  mapStateToProp,
  mapDispatchToProp,
)(DispatchOrderScreen);
