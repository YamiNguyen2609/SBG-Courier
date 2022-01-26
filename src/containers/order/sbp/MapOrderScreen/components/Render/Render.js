import React, {Component} from 'react';
import {View} from 'react-native';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';

import styles from './styles';
import {IconBack} from '../../../../../../components';
import {Colors} from '../../../../../../themes';

export default class Render extends Component {
  state = {};
  render() {
    const {location, isTab, address} = this.props;

    console.log(location);

    return (
      <View style={styles.container}>
        {isTab ? (
          <IconBack
            style={styles.logoBack}
            onPress={this.props.back}
            color={Colors.appWhite}
          />
        ) : null}
        <MapView
          ref={ref => {
            this.map = ref;
          }}
          style={{
            width: '100%',
            height: '100%',
          }}
          provider={PROVIDER_GOOGLE}
          region={{
            latitude: address
              ? parseFloat(address.lat)
              : parseFloat(location.lat),
            longitude: address
              ? parseFloat(address.lng)
              : parseFloat(location.lng),
            latitudeDelta: 0.008,
            longitudeDelta: 0.008,
          }}>
          {address ? (
            <Marker
              coordinate={{
                latitude: parseFloat(address.lat),
                longitude: parseFloat(address.lng),
                latitudeDelta: 0.008,
                longitudeDelta: 0.008,
              }}
            />
          ) : null}
        </MapView>
      </View>
    );
  }
}
