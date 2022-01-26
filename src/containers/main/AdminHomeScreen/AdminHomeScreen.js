import React, {Component} from 'react';
import {connect} from 'react-redux';

import Render from './components/Render';
import {replaceScreen} from '../../../redux/navigation';
import {typeMenu, adminOrder} from '../../../helpers/Constants';
import {loginUser} from '../../../redux/user/redux/loginUser';
import {flagTextMessage} from '../../../redux/app';

export class AdminHomeScreen extends Component {
  _onRefresh = () => {
    this.props.loginUser(
      this.props.user['username'],
      this.props.user['password'],
      true,
      true,
    );
  };

  _onPressMenu = item => {
    switch (item) {
      case typeMenu.COLLECT_ORDER:
        return this.props.replaceScreen('CollectOrderScreen', {
          orderType: adminOrder.COLLECT,
          title: 'Gom hàng',
        });

      case typeMenu.SCAN_ORDER:
        return this.props.replaceScreen('StationScreen');

      case typeMenu.TRANSFER_ORDER:
        return this.props.replaceScreen('TransferScreen');
      case typeMenu.REX_SCAN:
        return this.props.replaceScreen('RexScanScreen');

      default:
        return this.props.flagTextMessage({
          message: 'Chức năng hiện đang trong quá trình phát triển',
        });
    }
  };

  render() {
    const {user} = this.props;

    return user ? (
      <Render
        user={user}
        onPressMenu={this._onPressMenu}
        onRefresh={this._onRefresh}
      />
    ) : null;
  }
}

const mapStateToProp = state => ({
  user: state.loginUser.user,
});

const mapDispatchToProp = {
  replaceScreen,
  loginUser,
  flagTextMessage,
};

export default connect(
  mapStateToProp,
  mapDispatchToProp,
)(AdminHomeScreen);
