import React, {Component} from 'react';
import {View} from 'react-native';
import {RNCamera} from 'react-native-camera';
import AntIcon from 'react-native-vector-icons/AntDesign';

import styles from './styles';
import strings from '../../../../../../languages';
import {Metrics, Colors} from '../../../../../../themes';

import {AppButton} from '../../../../../../components';

export default class CameraForm extends Component {
  state = {};

  takePicture = async () => {
    if (this.camera) {
      this.setState({isShowIndicator: true});
      const options = {quality: 0.5, base64: true};
      const data = await this.camera.takePictureAsync(options);
      const {uri, base64} = data;
      this.props.imageHandle(true, uri, base64);
    }
  };

  render() {
    const {barCode, images} = this.props;
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
        {!barCode ? (
          <View style={styles.container_barCode}>
            <View style={styles.container_background} />
            <View style={styles.barCode} onLayout={this.getLayout}>
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
        ) : (
          <View style={styles.container_button}>
            <View style={styles.button_tmp} />
            <AppButton
              style={styles.button_camera}
              onPress={this.takePicture}
              width={70}
              height={50}
              border={0.8}
              borderColor={Colors.appWhite}
              renderItem={
                <AntIcon name={'camerao'} size={30} color={Colors.appWhite} />
              }
            />
            {images.length > 0 ? (
              <AppButton
                style={styles.button_upload}
                width={50}
                height={50}
                border={0.8}
                borderColor={Colors.appColor}
                onPress={this.props.onUpload}
                renderItem={
                  <AntIcon name={'upload'} size={30} color={Colors.appColor} />
                }
              />
            ) : (
              <View style={styles.button_tmp} />
            )}
          </View>
        )}
      </RNCamera>
    );
  }
}
