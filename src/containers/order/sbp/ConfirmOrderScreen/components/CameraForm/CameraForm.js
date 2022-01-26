import React, {Component} from 'react';
import {View, FlatList, TouchableOpacity} from 'react-native';
import {RNCamera} from 'react-native-camera';
import AntIcon from 'react-native-vector-icons/AntDesign';
import IonIcon from 'react-native-vector-icons/Ionicons';
import FastImage from 'react-native-fast-image';
import r from 'reactotron-react-native';

import styles from './styles';
import strings from '../../../../../../languages';
import {AppButton, IconBack} from '../../../../../../components';
import {Colors, Styles} from '../../../../../../themes';

export default class CameraForm extends Component {
  state = {
    isCamera: false,
  };

  componentDidMount() {
    setTimeout(() => this.setState({isCamera: true}), 200);
  }

  takePicture = async () => {
    if (this.camera) {
      const options = {quality: 1, base64: true};
      const data = await this.camera.takePictureAsync(options);
      const {uri, base64} = data;
      this.props.imageHandle(true, uri, base64);
    }
  };

  _renderItem = ({item, index}) => {
    return (
      <TouchableOpacity onPress={() => this.props.targetItem(item['id'])}>
        <FastImage
          key={index}
          style={styles.item}
          source={{
            uri: item.base64,
          }}>
          {item.isCheck ? (
            <View style={styles.img_check}>
              <View style={styles.icon_check}>
                <AntIcon name="check" size={20} color={Colors.appWhite} />
              </View>
            </View>
          ) : null}
        </FastImage>
      </TouchableOpacity>
    );
  };

  render() {
    const {images} = this.props;
    return this.state.isCamera ? (
      <View style={styles.container}>
        <RNCamera
          ref={camera => (this.camera = camera)}
          style={styles.camera}
          type={RNCamera.Constants.Type.back}
          androidCameraPermissionOptions={{
            title: 'Quyền truy cập máy ảnh',
            message: strings.common.app_name + ' muốn truy cập máy ảnh',
            buttonPositive: 'Ok',
            buttonNegative: 'Cancel',
          }}
          {...this.props}>
          <View style={styles.button}>
            <AppButton
              onPress={this.takePicture}
              border={0.8}
              height={60}
              width={60}
              borderColor={Colors.appWhite}
              renderItem={
                <View style={[{flex: 1}, Styles.center]}>
                  <AntIcon name={'camerao'} size={40} color={Colors.appWhite} />
                </View>
              }
            />
          </View>
        </RNCamera>
        {images.length > 0 ? (
          <View style={styles.listImage}>
            <FlatList
              horizontal={true}
              data={images}
              renderItem={this._renderItem}
              keyExtractor={(item, index) => index}
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}
              key={images.length}
              // numColumns={3}
            />
            <View style={styles.icon_trash}>
              <AppButton
                onPress={() => this.props.imageHandle(false)}
                width={45}
                height={45}
                border={0.8}
                borderColor={Colors.appRed}
                renderItem={
                  <View style={[Styles.center, {flex: 1}]}>
                    <IonIcon
                      name={'ios-trash'}
                      size={30}
                      color={Colors.appRed}
                    />
                  </View>
                }
              />
            </View>
          </View>
        ) : null}
      </View>
    ) : null;
  }
}
