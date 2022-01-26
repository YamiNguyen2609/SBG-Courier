import React, {Component} from 'react';
import {View, FlatList, Keyboard} from 'react-native';

import styles from './styles';
import {IconBack, AppButton, Divider} from '../../../../../components';
import {Colors, Images, Fonts, Metrics} from '../../../../../themes';
import CameraForm from '../CameraForm';
import InputForm from '../../../../components/InputForm';
import {typeMenu} from '../../../../../helpers/Constants';
import FastImage from 'react-native-fast-image';

export default class Render extends Component {
  state = {
    visible: false,
  };

  componentDidMount() {
    Keyboard.addListener('keyboardDidHide', () =>
      this.setState({visible: false}),
    );
  }

  UNSAFE_componentWillReceiveProps = nextProps => {
    this.inputForm._setValue(nextProps.carData);
  };

  _onPressSuccess = value => {
    this.props.onCarHandle(value);
  };

  _takePicture = async camera => {
    try {
      const options = {
        quality: 0.8,
        base64: true,
        skipProcessing: true,
      };
      this.inputForm._setValue('');
      const {uri, base64} = await camera.takePictureAsync(options);
      this.props.onReadImage(base64);
      console.log('done');
    } catch (e) {
      console.warn(e);
    }
  };

  render() {
    const {type, user, company} = this.props;

    return (
      <View style={styles.container}>
        <IconBack
          style={styles.logoBack}
          onPress={this.props.back}
          color={Colors.appWhite}
        />
        <CameraForm takePicture={this._takePicture} />
        <InputForm
          company={company}
          ref={inputForm => (this.inputForm = inputForm)}
          onPressSuccess={this._onPressSuccess}
          renderImage={
            typeMenu.CAR_ATTACH == type ? (
              <FastImage
                style={{
                  marginLeft: Metrics.margin.small,
                  width: 30,
                  height: 20,
                }}
                source={Images['icTruckMini']}
              />
            ) : (
              <FastImage
                style={{
                  marginLeft: Metrics.margin.small,
                  width: 25,
                  height: 25,
                }}
                source={
                  Images[
                    'icContermet' +
                      (user['multi'] ? 'sbs' : user['companyId']) +
                      'Mini'
                  ]
                }
              />
            )
          }
          onPressBack={this.props.back}
          keyboardType={typeMenu.CAR_DETACH == type ? 'decimal-pad' : null}
          maxLength={typeMenu.CAR_ATTACH == type ? 12 : 6}
          placeholder={
            typeMenu.CAR_ATTACH == type
              ? 'Nhập biển số xe'
              : 'Nhập công tơ mét của xe'
          }
        />
      </View>
    );
  }
}
