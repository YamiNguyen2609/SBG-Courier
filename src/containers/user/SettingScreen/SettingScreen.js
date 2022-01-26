import React, {Component} from 'react';
import {connect} from 'react-redux';
import {showMessage} from 'react-native-flash-message';

import Render from './components/Render';
import {logoutUser} from '../../../redux/user/redux/loginUser';
import {
  replaceScreen,
  replaceScreenWithResetStack,
} from '../../../redux/navigation';
import {onCleanData} from '../../../redux/order/redux/getListOrder';
import {onClear} from '../../../redux/order/redux/getListBillId';

export class SettingScreen extends Component {
  _onPressLogout = () => {
    if (!this.props.stateCar) {
      this.props.onClear();
      this.props.onCleanData();
      this.props.logoutUser();
    } else {
      showMessage({
        message: 'Thông báo lỗi',
        description: 'Yêu cầu trả xe trước khi đăng xuất',
        type: 'warning',
      });
    }
  };

  _onPressReplaceScreen = screen => {
    this.props.replaceScreen(screen);
  };

  render() {
    const {user, licensePlates, stateCar, company} = this.props;
    return (
      <Render
        company={
          user['multi'] && user['companyId'] == 'sbp'
            ? company
            : user['companyId']
        }
        licensePlates={licensePlates}
        stateCar={stateCar}
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
  company: state.app.company,
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
)(SettingScreen);
