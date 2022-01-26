import React, {Component} from 'react';
import {connect} from 'react-redux';

import Render from './components/Render';
import {replaceScreen} from '../../../../redux/navigation';

import {showFlagMessage, hideFlagMessage} from '../../../../redux/app';

export class SearchOrderScreen extends Component {
  _dispatchOrder = (data, popup) => {
    let code = data;
    if (popup) {
      this.props.showFlagMessage({
        message: 'Đã tìm thấy mã đơn hàng ' + code,
        buttons: [
          {
            title: 'Quét lại',
            onPress: () => {
              this.props.hideFlagMessage();
            },
          },
          {
            title: 'Tiếp tục',
            onPress: () => {
              this.props.hideFlagMessage();
              this.props.replaceScreen('DetailOrderScreen');
            },
          },
        ],
      });
    } else {
      this.props.replaceScreen('DetailOrderScreen');
    }
  };

  UNSAFE_componentWillReceiveProps = nextProps => {};

  render() {
    const {refreshFlag} = this.props;
    return (
      <Render
        dispatchOrder={this._dispatchOrder}
        refreshFlag={refreshFlag}
        back={this.props.navigation.goBack}
      />
    );
  }
}

const mapStateToProp = state => ({
  refreshFlag: state.dispatchOrder.refreshFlag,
});

const mapDispatchToProp = {
  showFlagMessage,
  hideFlagMessage,
  replaceScreen,
};

export default connect(
  mapStateToProp,
  mapDispatchToProp,
)(SearchOrderScreen);
