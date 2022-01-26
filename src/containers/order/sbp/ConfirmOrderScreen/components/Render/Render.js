import React, {Component} from 'react';
import {View} from 'react-native';
import RNFS from 'react-native-fs';
import ResizeImage from 'react-native-image-resizer';
import r from 'reactotron-react-native';

import styles from './styles';
import {IconBack, AppText} from '../../../../../../components';
import {Colors, Metrics, Fonts} from '../../../../../../themes';
import ConfirmForm from '../ConfirmForm';
import ErrorForm from '../ErrorForm';
import ConfirmDelivery from '../ConfirmDelivery';
import ConfirmReceive from '../ConfirmReceive';

export default class Render extends Component {
  state = {
    images: [],
    isShowIndicator: false,
    showCamera: false,
  };

  imageHandle = async (status, uri, base64) => {
    this.setState({isShowIndicator: true});
    let images = [];
    if (!status) {
      images = this.state.images.filter(e => {
        return e.isCheck !== true;
      });
    } else {
      const path =
        RNFS.ExternalDirectoryPath +
        '/images/' +
        (this.props.orderId ?? this.props.HAWBs ?? this.props.bookingId) +
        '/';
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

      images = this.state.images
        .concat({
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
        })
        .sort((a, b) => b.id - a.id);
    }

    this.setState({isShowIndicator: false, images});
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

  _getData = () => {
    return {
      ...this.form._getData(),
      images: this.state.images.map(e => {
        return {
          uri: e.uri,
          name: e.name,
        };
      }),
    };
  };

  render() {
    const {status, payments, listReason, typeOrder} = this.props;
    const {images} = this.state;

    return (
      <View style={styles.container}>
        <IconBack
          style={styles.logoBack}
          onPress={this.props.back}
          color={Colors.appWhite}
        />
        <View style={styles.header}>
          <AppText
            text={'Xác nhận'}
            size={Fonts.size.h5}
            color={Colors.appWhite}
          />
        </View>
        {status ? (
          !typeOrder ? (
            <ConfirmDelivery
              ref={form => (this.form = form)}
              payments={payments}
              {...this.props}
              images={images}
              imageHandle={this.imageHandle}
              onPressConfirm={this.props.onPressConfirm}
              targetItem={this.onTargetImage}
              isShowIndicator={this.state.isShowIndicator}
              onReadImage={this.props.onReadImage}
            />
          ) : (
            <ConfirmReceive
              ref={form => (this.form = form)}
              payments={payments}
              {...this.props}
              images={images}
              imageHandle={this.imageHandle}
              onPressConfirm={this.props.onPressConfirm}
              targetItem={this.onTargetImage}
              isShowIndicator={this.state.isShowIndicator}
              onReadImage={this.props.onReadImage}
            />
          )
        ) : (
          <ErrorForm
            ref={form => (this.form = form)}
            data={listReason}
            images={images}
            {...this.props}
            imageHandle={this.imageHandle}
            onPressConfirm={this.props.onPressConfirm}
            targetItem={this.onTargetImage}
            isShowIndicator={this.state.isShowIndicator}
            onReadImage={this.props.onReadImage}
          />
        )}
      </View>
    );
  }
}
