import React, {Component} from 'react';
import {View} from 'react-native';
import {RNCamera} from 'react-native-camera';

import styles from './styles';
import strings from '../../../../../../languages';
import {Metrics} from '../../../../../../themes';

export default class CameraForm extends Component {
  render() {
    return (
      <View style={{flex: 1, overflow: 'hidden'}}>
        <RNCamera
          // ref={(camera) => (this.camera = camera)}
          style={styles.container}
          type={RNCamera.Constants.Type.back}
          androidCameraPermissionOptions={{
            title: 'Quyền truy cập máy ảnh',
            message: strings.common.app_name + ' muốn truy cập máy ảnh',
            buttonPositive: 'Ok',
            buttonNegative: 'Cancel',
          }}
          {...this.props}>
          <View style={styles.container_barCode}>
            <View style={[styles.container_background, {flex: 1}]} />
            <View style={styles.barCode}>
              <View style={styles.container_background} />
              <View
                style={{
                  width: Metrics.screenWidth - Metrics.margin.huge * 2,
                  borderRadius: Metrics.borderRadius.regular,
                }}>
                <View style={styles.barCode_topLeft} />
                <View style={styles.barCode_topRight} />
                <View style={styles.barCode_bottomLeft} />
                <View style={styles.barCode_bottomRight} />
              </View>
              <View style={[styles.container_background, {height: 100}]} />
            </View>
            <View style={styles.container_background} />
          </View>
        </RNCamera>
      </View>
    );
  }
}
