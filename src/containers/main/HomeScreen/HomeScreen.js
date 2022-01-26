import React, {Component} from 'react';
import {connect} from 'react-redux';
import {View} from 'react-native';

import Render from './components/Render';
import {replaceScreen} from '../../../redux/navigation';
import {typeMenu, adminOrder} from '../../../helpers/Constants';
import {
  flagTextMessage,
  showFlagMessage,
  hideFlagMessage,
  changeCompany,
} from '../../../redux/app';
import {loginUser} from '../../../redux/user/redux/loginUser';
import {trafficJam} from '../../../redux/car/redux/trafficJam';

export class HomeScreen extends Component {
  state = {
    ketXe: false,
    visible: false,
  };

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
      case typeMenu.SCAN_BILL:
        return this.props.replaceScreen('ScanOrderScreen', {
          company: 'sbs',
        });

      case typeMenu.SCAN_DISPATCH:
        return this.props.replaceScreen('DispatchOrderScreen');

      case typeMenu.BILL_LIST:
        return this.props.replaceScreen('ListOrderScreen', {
          isTab: true,
        });

      case typeMenu.PUD_POD:
        return this.props.replaceScreen('ListOrderDispatchScreen', {
          isTab: true,
        });

      case typeMenu.COLLECT_ORDER:
        return this.props.replaceScreen('CollectOrderScreen', {
          orderType: adminOrder.COLLECT,
          title: 'Gom hàng',
        });

      case typeMenu.SCAN_ORDER:
        return this.props.replaceScreen('CollectOrderScreen', {
          orderType: adminOrder.SCAN,
          title: 'Scan hàng',
        });

      case typeMenu.TRANSFER_ORDER:
        return this.props.replaceScreen('CollectOrderScreen', {
          orderType: adminOrder.TRANSFER,
          title: 'Chuyển kho',
        });

      case typeMenu.POUR_FUEL:
        return this.props.car['stateCar']
          ? // return true
            this.props.replaceScreen('PourFuelScreen')
          : this.props.flagTextMessage({
              message: 'Chức năng hiện cần nhận xe trước khi thực hiện',
            });

      case typeMenu.CAR_ATTACH:
        return this.props.replaceScreen('HandleCarScreen', {
          action: typeMenu.CAR_ATTACH,
        });

      case typeMenu.CAR_DETACH:
        return !this.props.isTraffic
          ? this.props.replaceScreen('HandleCarScreen', {
              action: typeMenu.CAR_DETACH,
            })
          : this.props.flagTextMessage({
              message: 'Huỷ kẹt xe trước khi trả xe',
            });

      case typeMenu.TRAFFIC_JAM:
        return this.props.car['stateCar']
          ? this.props.showFlagMessage({
              message: 'Bạn muốn thông báo tình hình kẹt xe hiện tại',
              buttons: [
                {
                  title: 'Hủy bỏ',
                  onPress: this.props.hideFlagMessage,
                },
                {
                  title: 'Đồng ý',
                  onPress: () => this._onTrafficJam(true),
                },
              ],
            })
          : this.props.flagTextMessage({
              message: 'Chức năng hiện cần nhận xe trước khi thực hiện',
            });

      case typeMenu.CANCEL_TRAFFIC_JAM:
        return this.props.showFlagMessage({
          message: 'Bạn muốn hủy thông báo tình hình kẹt xe hiện tại',
          buttons: [
            {
              title: 'Hủy bỏ',
              onPress: this.props.hideFlagMessage,
            },
            {
              title: 'Đồng ý',
              onPress: () => this._onTrafficJam(false),
            },
          ],
        });

      case typeMenu.REPORT_PROBLEM:
        return this.props.car['stateCar']
          ? this.props.replaceScreen('ReportIncidentScreen')
          : this.props.flagTextMessage({
              message: 'Chức năng hiện cần nhận xe trước khi thực hiện',
            });

      case typeMenu.DECLARATION_TABLE:
        return this.props.replaceScreen('ReportScreen');

      case typeMenu.MORE:
        return this.setState({
          visible: !this.state.visible,
        });

      default:
        return this.props.flagTextMessage({
          message: 'Chức năng hiện đang trong quá trình phát triển',
        });
    }
  };

  _onTrafficJam = status => {
    this.props.hideFlagMessage();

    console.log(
      this.props.user,
      this.props.car.licensePlates,
      !this.props.isTraffic,
      status,
    );

    setTimeout(() => {
      this.props.trafficJam(
        this.props.user,
        this.props.car.licensePlates,
        !this.props.isTraffic,
        status,
      );
    }, 200);
  };

  _onSearchScreen = () => {
    this.props.replaceScreen('SearchOrderScreen');
  };

  UNSAFE_componentWillReceiveProps = nextProps => {
    if (!nextProps.user) {
      this.setState({visibleFlag: 0});
    }
  };

  render() {
    const {user, car, isTraffic} = this.props;
    const {visible} = this.state;

    return user ? (
      <Render
        user={user}
        car={car}
        visible={visible}
        trafficJam={isTraffic}
        onPressMenu={this._onPressMenu}
        onRefresh={this._onRefresh}
        onSearchScreen={this._onSearchScreen}
        changeCompany={this.props.changeCompany}
      />
    ) : null;
  }
}

const mapStateToProp = state => ({
  user: state.loginUser.user,
  car: state.carHandle,
  isTraffic: state.trafficJam.isTraffic,
});

const mapDispatchToProp = {
  replaceScreen,
  flagTextMessage,
  loginUser,
  trafficJam,
  showFlagMessage,
  hideFlagMessage,
  changeCompany,
};

export default connect(
  mapStateToProp,
  mapDispatchToProp,
)(HomeScreen);
