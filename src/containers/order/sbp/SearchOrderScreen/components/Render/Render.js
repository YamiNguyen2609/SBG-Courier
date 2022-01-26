import React, {Component} from 'react';
import {View} from 'react-native';

import styles from './styles';
import CameraForm from '../CameraForm';
import BarCodeForm from '../BarCodeForm';
import {Colors} from '../../../../../../themes';
import {IconBack} from '../../../../../../components';

export default class Render extends Component {
  state = {};
  render() {
    const {refreshFlag} = this.props;
    return (
      <View style={styles.container}>
        <IconBack
          style={styles.logoBack}
          onPress={this.props.back}
          color={Colors.appWhite}
        />
        <CameraForm
          onBarCodeRead={e => {
            const {width, height, origin} = e.bounds;

            let minX = (260 * width) / 1600;
            let maxX = (964 * width) / 1600;
            let minY = (800 * height) / 1200;
            let maxY = (900 * height) / 1200;

            if (
              //origin[0].x >= minX &&
              //origin[1].x <= maxX &&
              origin[0].y >= minY &&
              origin[1].y <= maxY
            ) {
              if (e.type !== 'QR_CODE') {
                this.props.dispatchOrder(String(e.data), true);
              }
            }
          }}
        />
        <BarCodeForm
          searchOrder={this.props.dispatchOrder}
          refreshFlag={refreshFlag}
        />
      </View>
    );
  }
}
