import React, {Component} from 'react';
import {View, TouchableOpacity} from 'react-native';
import {RNCamera} from 'react-native-camera';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import AntIcon from 'react-native-vector-icons/AntDesign';

import styles from './styles';
import strings from '../../../languages';
import {Metrics, Colors, Fonts, Styles} from '../../../themes';
import {AppButton, AppInput} from '../../../components';

export default class CameraForm extends Component {
  state = {
    isFlash: false,
  };

  _onSearch = () => this.props.onSearchBill(this.bill.value());

  _takePhoto = async () => {
    if (this.camera) {
      this.props.onIndicator();
      const options = {
        quality: 0.5,
        base64: true,
      };
      const data = await this.camera.takePictureAsync(options);
      const {uri, base64} = data;
      this.props.takePhoto(true, uri, base64);
    }
  };

  render() {
    const {isInput, containerStyle, isScan} = this.props;

    return (
      <View style={[{flex: 1, overflow: 'hidden'}, containerStyle]}>
        <TouchableOpacity
          onPress={() =>
            this.setState({
              isFlash: !this.state.isFlash,
            })
          }
          hitSlop={{
            top: 20,
            bottom: 20,
            left: 10,
            right: 10,
          }}
          activeOpacity={0.8}
          style={styles.logoFlash}>
          <MaterialIcon
            name={!this.state.isFlash ? 'flashlight' : 'flashlight-off'}
            color={Colors.appWhite}
            size={25}
          />
        </TouchableOpacity>
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
          flashMode={this.state.isFlash ? 'torch' : 'off'}
          {...this.props}>
          {isScan ? (
            <View style={styles.container_barCode}>
              <View style={styles.container_background} />
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
          ) : (
            <View style={styles.containerButton}>
              <AppButton
                style={styles.button_camera}
                onPress={this._takePhoto}
                width={50}
                height={50}
                border={0.8}
                borderColor={Colors.appWhite}
                renderItem={
                  <View style={[Styles.center, {flex: 1}]}>
                    <AntIcon
                      name={'camerao'}
                      size={30}
                      color={Colors.appWhite}
                    />
                  </View>
                }
              />
            </View>
          )}
        </RNCamera>
        {isInput ? (
          <View style={styles.containerInput}>
            <AppInput
              placeholder={'Nhập số bill'}
              size={Fonts.size.h5}
              border={0.8}
              borderColor={Colors.overlay2}
              width={'100%'}
              height={60}
              style={{
                paddingHorizontal: Metrics.margin.regular,
              }}
              ref={bill => (this.bill = bill)}
              onSubmitEditing={this._onSearch}
              returnKeyLabel={'send'}
            />
          </View>
        ) : null}
      </View>
    );
  }
}
