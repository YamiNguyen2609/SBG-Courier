import React, {Component} from 'react';
import {connect} from 'react-redux';
import Orientation from 'react-native-orientation-locker';
import {showMessage} from 'react-native-flash-message';
import r from 'reactotron-react-native';

import Render from './components/Render';
import {readImage, onClear, setData} from '../../../redux/car/redux/readImage';
import {actionCar} from '../../../redux/car/redux/carHandle';
import {onClearFuel} from '../../../redux/car/redux/updateFuel';
// import {_getLicensePlates} from '../../../helpers/LocalStorage';
import {typeMenu} from '../../../helpers/Constants';
import {showFlagMessage, hideFlagMessage} from '../../../redux/app';

export class HandleCarScreen extends Component {
  componentDidMount() {
    this.setState({type: this.props.route.params.action});
    Orientation.lockToPortrait();
  }

  UNSAFE_componentWillReceiveProps = nextProps => {
    if (
      nextProps.refreshFlag !== this.props.refreshFlag &&
      !nextProps.errorCar
    ) {
      this.props.onClear();
      this.props.navigation.goBack();
    }
  };

  _onReadImage = base64 => {
    this.props.onClear();
    this.props.readImage(this.props.route.params.action, base64);
  };

  _onCarHandle = value => {
    if (value) {
      if (
        this.state.type == typeMenu.CAR_ATTACH ||
        (this.state.type == typeMenu.CAR_DETACH && this.props.kilometer == 0)
      ) {
        this.props.onClearFuel();
        this.props.setData(value);
        this.props.actionCar(this.state.type, value, value);
      } else {
        if (value < this.props.kilometer)
          this.props.showFlagMessage({
            message: 'Số km bạn nhập nhỏ hơn km hiện tại, bạn có muốn tiếp tục',
            buttons: [
              {
                title: 'Hủy',
                onPress: () => this.props.hideFlagMessage(),
              },
              {
                title: 'Tiếp tục',
                onPress: () => {
                  this.props.hideFlagMessage();
                  setTimeout(() => {
                    this.props.onClearFuel();
                    this.props.setData(value);
                    this.props.actionCar(typeMenu.CAR_DETACH, '', value);
                  }, 300);
                },
              },
            ],
          });
        else if (Math.round(Number(value) / Number(this.props.kilometer)) >= 9)
          this.props.showFlagMessage({
            message:
              'Số km bạn nhập lớn gấp ' +
              Math.round(Number(value) / Number(this.props.kilometer)) +
              ' lần km hiện tại, bạn có muốn tiếp tục',
            buttons: [
              {
                title: 'Hủy',
                onPress: () => this.props.hideFlagMessage(),
              },
              {
                title: 'Tiếp tục',
                onPress: () => {
                  this.props.hideFlagMessage();
                  setTimeout(() => {
                    this.props.onClearFuel();
                    this.props.setData(value);
                    this.props.actionCar(typeMenu.CAR_DETACH, '', value);
                  }, 300);
                },
              },
            ],
          });
        else {
          this.props.onClearFuel();
          this.props.setData(value);
          this.props.actionCar(typeMenu.CAR_DETACH, '', value);
        }
      }
    }
  };

  render() {
    const {textImage, user, company} = this.props;

    return (
      <Render
        company={
          user['multi'] && user['companyId'] == 'sbp'
            ? company
            : user['companyId']
        }
        user={user}
        type={this.props.route.params.action}
        back={this.props.navigation.goBack}
        onCarHandle={this._onCarHandle}
        onReadImage={this._onReadImage}
        carData={textImage}
      />
    );
  }
}

const mapStateToProps = state => ({
  user: state.loginUser.user,
  kilometer: state.carHandle.odometer,
  textImage: state.readImage.data,
  errorCar: state.carHandle.error,
  refreshFlag: state.carHandle.refreshFlag,
  vehicle: state.carHandle.licensePlates,
  company: state.app.company,
});

const mapDispatchToProps = {
  actionCar,
  readImage,
  onClearFuel,
  onClear,
  setData,
  showFlagMessage,
  hideFlagMessage,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(HandleCarScreen);
