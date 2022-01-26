import React, {Component} from 'react';
import {connect} from 'react-redux';
import Orientation from 'react-native-orientation-locker';

import Render from './components/Render';
import {getListIncident} from '../../../redux/car/redux/getListIncident';
import {reportIncident} from '../../../redux/car/redux/reportIncident';

export class ReportIncidentScreen extends Component {
  componentDidMount() {
    Orientation.lockToPortrait();
    this.props.getListIncident();
  }

  _onPressReport = (id, title, note) => {
    this.props.reportIncident(
      this.props.vehicle,
      id,
      title,
      note,
      this.props.location,
    );
  };

  UNSAFE_componentWillReceiveProps = nextProps => {
    if (this.props.refreshFlag !== nextProps.refreshFlag) {
      this.props.navigation.goBack();
    }
  };
  render() {
    const {data} = this.props;

    return (
      <Render
        back={this.props.navigation.goBack}
        data={data}
        onPressReport={this._onPressReport}
      />
    );
  }
}

const mapStateToProp = state => ({
  data: state.getListIncident.incidents,
  refreshFlag: state.reportIncident.refreshFlag,
  vehicle: state.carHandle.licensePlates,
  location: state.listenLocation.location,
});

const mapDispatchToProp = {
  getListIncident,
  reportIncident,
};

export default connect(
  mapStateToProp,
  mapDispatchToProp,
)(ReportIncidentScreen);
