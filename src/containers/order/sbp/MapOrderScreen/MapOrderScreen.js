import React, {Component} from 'react';
import axios from 'axios';
import r from 'reactotron-react-native';

import Render from './components/Render';
import {
  SCREEN_TRANSITION_TIME,
  GOOGLE_API_KEY,
} from '../../../../helpers/Constants';
import {showMessage} from 'react-native-flash-message';

export default class MapOrderScreen extends Component {
  state = {
    location: {
      lng: 106.66102,
      lat: 10.80439,
    },
    address: undefined,
    showMap: false,
  };

  componentDidMount() {
    setTimeout(() => {
      this.setState({showMap: true});
    }, SCREEN_TRANSITION_TIME);

    // if (this.props.route.params) {
    //   const {address} = this.props.route.params;
    //   this._getLatLongAddress(address).then((res) => {
    //     if (res.status == 200) {
    //       const {geometry} = res.data.results[0];
    //       this.setState({address: geometry.location});
    //     } else {
    //       showMessage({
    //         message: 'Thông báo lỗi địa điểm',
    //         description: 'Không định vị được địa chỉ trên',
    //         type: 'warning',
    //       });
    //     }
    //   });
    // }
  }

  _getLatLongAddress = async address => {
    return await axios.get(
      'https://maps.googleapis.com/maps/api/geocode/json?&address=' +
        address +
        '&key=' +
        GOOGLE_API_KEY,
    );
  };

  render() {
    const {location, showMap, address} = this.state;
    const {isTab} = this.props.route.params;

    return showMap ? (
      <Render
        address={address}
        isTab={isTab}
        back={this.props.navigation.goBack}
        location={location}
      />
    ) : null;
  }
}
