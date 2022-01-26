import React, {Component} from 'react';
import {connect} from 'react-redux';

import Render from './components/Render';
import {getListStations} from '../../../../redux/order/redux/getListStations';
import {replaceScreen} from '../../../../redux/navigation';
import {showMessage} from 'react-native-flash-message';

export class StationScreen extends Component {
  state = {
    selected: undefined,
  };

  componentDidMount() {
    this.props.getListStations();
  }

  _onPressScan = () => {
    if (this.state.selected !== undefined) {
      const station = this.props.data.filter(
        (e, idx) => idx == this.state.selected,
      )[0].id;
      this.props.replaceScreen('CheckInScreen', {
        station,
        ...this.props.route.params,
      });
    } else {
      showMessage({
        message: 'Lỗi chọn trạm',
        description: 'Bạn chưa chọn trạm',
        type: 'warning',
      });
    }
  };

  render() {
    return (
      <Render
        back={this.props.navigation.goBack}
        onPressScan={this._onPressScan}
        onPressSelect={selected => this.setState({selected})}
        data={this.props.data.map((e, index) => {
          return {
            ...e,
            selected: this.state.selected == index,
          };
        })}
      />
    );
  }
}
const mapStateToProp = state => ({
  data: state.getListStations.data,
});

const mapDispatchToProp = {
  getListStations,
  replaceScreen,
};

export default connect(
  mapStateToProp,
  mapDispatchToProp,
)(StationScreen);
