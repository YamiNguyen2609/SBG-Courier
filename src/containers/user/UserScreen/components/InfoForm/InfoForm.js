import React, {Component} from 'react';
import {View, ScrollView} from 'react-native';
import FastImage from 'react-native-fast-image';
import moment from 'moment';

import styles from './styles';
import {Images, Colors, Fonts, Styles, Metrics} from '../../../../../themes';
import {AppText, IconBack, AppButton} from '../../../../../components';
import {isTablet} from '../../../../../themes/iPhoneXHelper';

export default class InfoForm extends Component {
  render() {
    const {data} = this.props;
    return data ? (
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <FastImage
            source={data.avatar ? {uri: data.avatar} : Images.icAvatarNone}
            style={isTablet() ? styles.imageTab : styles.image}
          />
          <View style={styles.container_info}>
            <View style={styles.container_form}>
              <AppText
                text="Mã nhân viên"
                style={{width: Metrics.screenWidth / 3}}
                size={isTablet() ? Fonts.size.h4 : Fonts.size.h6}
              />
              <AppText text=":" />
              <AppText
                text={data.odooBarCode.toUpperCase()}
                bold
                size={isTablet() ? Fonts.size.h4 : Fonts.size.h6}
              />
            </View>
            <View style={styles.container_form}>
              <AppText
                text="Họ tên"
                style={{width: Metrics.screenWidth / 3}}
                size={isTablet() ? Fonts.size.h4 : Fonts.size.h6}
              />
              <AppText text=":" />
              <AppText
                text={data.firstname + ' ' + data.lastname}
                bold
                size={isTablet() ? Fonts.size.h4 : Fonts.size.h6}
              />
            </View>
            <View style={styles.container_form}>
              <AppText
                text="Điện thoại"
                style={{width: Metrics.screenWidth / 3}}
                size={isTablet() ? Fonts.size.h4 : Fonts.size.h6}
              />
              <AppText text=":" />
              <AppText
                text={data.phone}
                bold
                size={isTablet() ? Fonts.size.h4 : Fonts.size.h6}
              />
            </View>
            <View style={styles.container_form}>
              <AppText
                text="Bằng lái xe"
                style={{width: Metrics.screenWidth / 3}}
                size={isTablet() ? Fonts.size.h4 : Fonts.size.h6}
              />
              <AppText text=":" />
              <AppText
                text={data.licenseNumber}
                bold
                size={isTablet() ? Fonts.size.h4 : Fonts.size.h6}
              />
            </View>
            <View style={styles.container_form}>
              <AppText
                text="Ngày hết hạn"
                style={{width: Metrics.screenWidth / 3}}
                size={isTablet() ? Fonts.size.h4 : Fonts.size.h6}
              />
              <AppText text=":" />
              <AppText
                text={moment(data.licenseExpire).format('DD-MM-YYYY')}
                bold
                size={isTablet() ? Fonts.size.h4 : Fonts.size.h6}
              />
            </View>
            {data.shippingTeam ? (
              <View style={styles.container_form}>
                <AppText
                  text="Đội shipping"
                  style={{width: Metrics.screenWidth / 3}}
                  size={isTablet() ? Fonts.size.h4 : Fonts.size.h6}
                />
                <AppText text=":" />
                <AppText
                  text={data.shippingTeam}
                  bold
                  size={isTablet() ? Fonts.size.h4 : Fonts.size.h6}
                />
              </View>
            ) : null}
          </View>
          <AppButton
            text="Đổi mật khẩu"
            color={Colors.appWhite}
            bgColor={Colors.appColor}
            width={'70%'}
            // borderRadius={30}
            size={isTablet() ? Fonts.size.h4 : Fonts.size.h6}
            onPress={() => this.props.changeStep(1)}
          />
        </View>
      </ScrollView>
    ) : (
      <View style={{width: Metrics.screenWidth}} />
    );
  }
}
