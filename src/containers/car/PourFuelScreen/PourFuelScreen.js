import React, {Component} from 'react';
import {connect} from 'react-redux';
import Orientation from 'react-native-orientation-locker';
import {showMessage} from 'react-native-flash-message';

import Render from './components/Render';
import {updateFuel} from '../../../redux/car/redux/updateFuel';

export class FuelScreen extends Component {
  _onUpdateFuel = value => {
    if (value) {
      this.props.updateFuel(this.props.carData, Number(value));
    } else {
      showMessage({
        message: 'Lỗi nhập',
        description: 'bạn chưa nhập dữ liệu',
        type: 'warning',
      });
    }
  };

  componentDidMount() {
    Orientation.lockToPortrait();
  }

  UNSAFE_componentWillReceiveProps = nextProps => {
    if (nextProps.refreshFlag)
      if (!nextProps.errorOdometer) this.props.navigation.goBack();
  };

  render() {
    const {user} = this.props;
    return (
      <Render
        user={user}
        back={this.props.navigation.goBack}
        onUpdateFuel={this._onUpdateFuel}
      />
    );
  }
}

const mapStateToProps = state => ({
  user: state.loginUser.user,
  odometer: state.carHandle.odometer,
  errorOdometer: state.updateFuel.error,
  refreshFlag: state.updateFuel.refreshFlag,
  fuelCar: state.updateFuel.fuel,
  carData: state.carHandle.licensePlates,
});

const mapDispatchToProps = {
  updateFuel,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(FuelScreen);
