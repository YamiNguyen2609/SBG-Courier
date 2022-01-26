import React, {Component} from 'react';
import {connect} from 'react-redux';

import Render from './components/Render';
import {logoutUser} from '../../../redux/user/redux/loginUser';
import {
  replaceScreen,
  replaceScreenWithResetStack,
} from '../../../redux/navigation';
import {onCleanData} from '../../../redux/order/redux/getListOrder';
import {onClear} from '../../../redux/order/redux/getListBillId';

export class SettingAdminScreen extends Component {
  _onPressLogout = () => {
    this.props.onClear();
    this.props.onCleanData();
    this.props.logoutUser();
  };

  _onPressReplaceScreen = screen => {
    this.props.replaceScreen(screen);
  };

  render() {
    const {user, licensePlates, stateCar} = this.props;
    return (
      <Render
        user={user}
        onPressLogout={this._onPressLogout}
        onPressReplaceScreen={this._onPressReplaceScreen}
      />
    );
  }
}

const mapStateToProps = state => ({
  user: state.loginUser.user,
  licensePlates: state.carHandle.licensePlates,
  stateCar: state.carHandle.stateCar,
});

const mapDispatchToProps = {
  logoutUser,
  replaceScreen,
  replaceScreenWithResetStack,
  onCleanData,
  onClear,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SettingAdminScreen);
