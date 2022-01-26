import React, {Component} from 'react';
import {View} from 'react-native';
import {RNCamera} from 'react-native-camera';
import AntIcon from 'react-native-vector-icons/AntDesign';

import styles from './styles';
import {AppButton} from '../../../../../components';
import strings from '../../../../../languages';
import {Colors, Styles} from '../../../../../themes';
import {isTablet} from '../../../../../themes/iPhoneXHelper';
import {TouchableOpacity} from 'react-native-gesture-handler';

export default class CameraForm extends Component {
  state = {};
  render() {
    return (
      <RNCamera
        ref={camera => (this.camera = camera)}
        style={styles.container}
        type={RNCamera.Constants.Type.back}
        androidCameraPermissionOptions={{
          title: 'Quyền truy cập máy ảnh',
          message: strings.common.app_name + ' muốn truy cập máy ảnh',
          buttonPositive: 'Ok',
          buttonNegative: 'Cancel',
        }}
        return
        {...this.props}>
        <View style={styles.container_button}>
          <View style={styles.button_tmp} />
          <TouchableOpacity
            style={styles.button_camera}
            onPress={() => this.props.takePicture(this.camera)}>
            <AntIcon
              name={'camerao'}
              size={isTablet() ? 45 : 30}
              color={Colors.appWhite}
            />
          </TouchableOpacity>
          <View style={styles.button_tmp} />
        </View>
      </RNCamera>
    );
  }
}
