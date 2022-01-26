import React, {Component} from 'react';
import {View, Keyboard} from 'react-native';

import styles from './styles';
import HeaderForm from '../../../../components/HeaderForm';
import {Images, Colors, Fonts, Styles, Metrics} from '../../../../../themes';
import FastImage from 'react-native-fast-image';

import {IconBack} from '../../../../../components';
import InputForm from '../../../../components/InputForm';

export default class Render extends Component {
  _onPressSuccess = value => {
    this.props.onUpdateFuel(value);
  };

  render() {
    const {user} = this.props;

    return (
      <View
        style={[
          Styles.container,
          {
            backgroundColor:
              user['multi'] && user['companyId'] == 'sbp'
                ? '#efeafd'
                : user['companyId'] == 'sbp'
                ? '#ffffff'
                : '#efeafd',
          },
        ]}>
        <IconBack
          style={styles.logoBack}
          onPress={this.props.back}
          color={Colors.appWhite}
        />
        <HeaderForm
          company={
            user['multi'] && user['companyId'] == 'sbp'
              ? 'sbs'
              : user['companyId']
          }
          title={'Đỗ nhiên liệu'}
        />
        <View style={styles.view_tmp} />
        <FastImage
          source={
            Images['img' + (user['multi'] ? 'sbs' : user['companyId']) + 'Fuel']
          }
          style={styles.image}
        />
        <InputForm
          onPressBack={this.props.back}
          onPressSuccess={this._onPressSuccess}
          renderImage={
            <FastImage
              source={
                Images[
                  'icFuelMini' +
                    (user['multi'] && user['companyId'] == 'sbp'
                      ? 'sbs'
                      : user['companyId'])
                ]
              }
              style={{
                width: 20,
                height: 25,
                marginLeft: Metrics.margin.small,
              }}
            />
          }
          company={
            user['multi'] && user['companyId'] == 'sbp'
              ? 'sbs'
              : user['companyId']
          }
          keyboardType={'decimal-pad'}
          placeholder={'Nhập số lít'}
        />
      </View>
    );
  }
}
