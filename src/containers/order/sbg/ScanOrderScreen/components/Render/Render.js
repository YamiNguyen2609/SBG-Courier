import React, {Component} from 'react';
import {View, TouchableOpacity} from 'react-native';
import RNFS from 'react-native-fs';
import ResizeImage from 'react-native-image-resizer';
import {MaterialIndicator} from 'react-native-indicators';
import AntIcon from 'react-native-vector-icons/AntDesign';

import styles from './styles';
import {AppButton, IconBack} from '../../../../../../components';
import CameraForm from '../../../../../components/CameraForm';
import ListImageForm from '../ListImageForm';
import {Colors, Styles} from '../../../../../../themes';

export default class Render extends Component {
  state = {
    images: [],
    isShowIndicator: false,
    showCamera: false,
    isFlash: false,
    barCode: '',
  };

  componentDidMount() {
    setTimeout(() => this.setState({showCamera: true}), 200);
  }

  UNSAFE_componentWillReceiveProps = nextProps => {
    if (this.state.images !== nextProps.images) {
      this.setState({images: nextProps.images, barCode: nextProps.barCode});
    }
  };

  imageHandle = async (status, uri, base64) => {
    let images = [];
    if (!status) {
      images = this.state.images.filter(e => {
        return e.isCheck !== true;
      });
      this.setState({images});
    } else {
      const path = RNFS.ExternalDirectoryPath + '/' + this.state.barCode + '/';
      const isExists = await RNFS.exists(path);
      if (!isExists) await RNFS.mkdir(path);

      let resize = await ResizeImage.createResizedImage(
        uri,
        2048,
        2048,
        'JPEG',
        100,
        0,
        path,
      );

      this.state.images = [
        {
          id:
            this.state.images.length == 0
              ? 1
              : Math.max(
                  ...this.state.images.map(e => {
                    return e.id;
                  }),
                ) + 1,
          uri: resize.uri.toLowerCase(),
          name: resize.name.toLowerCase(),
          base64: `data:image/jpg;base64,${base64}`,
          isUpload: false,
          isCheck: false,
        },
      ].concat(this.state.images);
    }

    this.setState({isShowIndicator: false});
  };

  onTargetImage = id => {
    console.log(id);
    this.setState({
      images: this.state.images.map(e => {
        return {
          ...e,
          isCheck: e.id == id ? !e.isCheck : e.isCheck,
        };
      }),
    });
  };

  _onBarCodeRead = (data, isPopup) => {
    let code = data;
    code =
      code.length == 34
        ? code.substring(22, 34)
        : code.length == 32
        ? code.substring(16, 32).substring(0, 12)
        : code.substring(0, 12);
    if (isPopup) {
      this.props.showFlagMessage({
        message: 'Đã tìm thấy bill ' + code,
        buttons: [
          {
            title: 'Quét lại',
            onPress: () => {
              this.props.hideFlagMessage();
            },
          },
          {
            title: 'Tiếp tục',
            onPress: () => {
              this.setState({barCode: code}, () => {
                this.props.hideFlagMessage();
              });
            },
          },
        ],
      });
    } else {
      this.setState({barCode: code});
    }
  };

  render() {
    const {isShowIndicator, images, showCamera, barCode} = this.state;

    return (
      <View style={styles.container}>
        <IconBack
          style={styles.logoBack}
          onPress={this.props.back}
          color={Colors.appWhite}
        />
        {isShowIndicator ? (
          <View style={styles.indicator}>
            <MaterialIndicator color={Colors.appColor} />
          </View>
        ) : null}
        <View style={{flex: 1, justifyContent: 'flex-end'}}>
          {showCamera ? (
            <CameraForm
              isInput={!barCode}
              isScan={!barCode}
              onIndicator={() => this.setState({isShowIndicator: true})}
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
                  if (e.type !== 'QR_CODE' && !barCode) {
                    this._onBarCodeRead(String(e.data), true);
                  }
                }
              }}
              onSearchBill={this._onBarCodeRead}
              takePhoto={this.imageHandle}
            />
          ) : null}
          {barCode ? (
            <ListImageForm
              imageHandle={this.imageHandle}
              barCode={barCode}
              images={images}
              barCode={barCode}
              onTargetImage={this.onTargetImage}
            />
          ) : null}
          {images.length > 0 ? (
            <AppButton
              style={styles.button_upload}
              width={50}
              height={50}
              border={0.8}
              borderColor={Colors.appColor}
              onPress={() => this.props.onUpload(images)}
              renderItem={
                <View style={[Styles.center, {flex: 1}]}>
                  <AntIcon name={'upload'} size={30} color={Colors.appColor} />
                </View>
              }
            />
          ) : null}
        </View>
      </View>
    );
  }
}
