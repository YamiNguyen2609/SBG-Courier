import React, {Component} from 'react';
import {connect} from 'react-redux';
import Sound from 'react-native-sound';

import Render from './components/Render';
import {checkInOrder} from '../../../../redux/order/redux/checkInOrder';
import {getListCheckin} from '../../../../redux/order/redux/getListCheckin';
import {checkinFinish} from '../../../../redux/order/redux/checkinFinish';

export class CheckInScreen extends Component {
  state = {};

  _onCheckIn = code =>
    this.props.checkInOrder(code, this.props.route.params.station);

  _onGetListCheckIn = () =>
    this.props.getListCheckin(this.props.route.params.station);

  _onFinishCheckIn = data =>
    this.props.checkinFinish({
      HAWBs: data,
      stationId: this.props.route.params.station,
    });

  render() {
    return (
      <Render
        {...this.props}
        getListScan={this._onGetListCheckIn}
        onFinishScan={this._onFinishCheckIn}
        onScan={this._onCheckIn}
        back={this.props.navigation.goBack}
      />
    );
  }
}

const mapStateToProp = state => ({
  flagScan: state.checkInOrder.flag,
  flag: state.getListCheckin.flag,
  data: state.getListCheckin.data,
});

const mapDispatchToProp = {
  checkInOrder,
  getListCheckin,
  checkinFinish,
};

export default connect(
  mapStateToProp,
  mapDispatchToProp,
)(CheckInScreen);
