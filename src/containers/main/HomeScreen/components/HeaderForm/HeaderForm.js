import React, {Component} from 'react';
import {View, Text} from 'react-native';
import FastImage from 'react-native-fast-image';

import {Images, Colors, Fonts, Metrics} from '../../../../../themes';
import styles from './styles';
import {AppText, AppButton} from '../../../../../components';
import {isTablet} from '../../../../../themes/iPhoneXHelper';

export default class HeaderForm extends Component {
  state = {};
  render() {
    const {user, car, company} = this.props;
    return (
      <View style={styles.container}>
        <FastImage
          source={Images['background' + company]}
          style={styles.background}>
          <FastImage
            source={Images.logoAppTrans}
            style={isTablet() ? styles.logoTabMini : styles.logoMini}
          />
          <Text style={styles.title}>
            <AppText
              text={'Chào '}
              color={Colors.appWhite}
              size={isTablet() ? Fonts.size.h3 : Fonts.size.h6}
            />
            <AppText
              text={user.full_name}
              color={Colors.appWhite}
              bold
              size={isTablet() ? Fonts.size.h2 : Fonts.size.h5}
            />
          </Text>
          <View
            style={[
              styles.title,
              {flexDirection: 'row', alignItems: 'center'},
            ]}>
            <View style={isTablet() ? styles.circleTab : styles.circle}>
              <View
                style={[
                  isTablet() ? styles.circleTabChild : styles.circleChild,
                  {
                    backgroundColor: car.status
                      ? Colors.appGreen
                      : Colors.appRed,
                  },
                ]}
              />
            </View>
            {car.licensePlates ? (
              <Text
                style={{
                  marginLeft: Metrics.margin.small,
                }}>
                <AppText
                  text={'Biển số xe: '}
                  color={Colors.appWhite}
                  size={isTablet() ? Fonts.size.h3 : Fonts.size.h6}
                />
                <AppText
                  text={car.licensePlates}
                  color={Colors.appWhite}
                  bold
                  size={isTablet() ? Fonts.size.h3 : Fonts.size.h6}
                />
              </Text>
            ) : (
              <AppText
                text={'Chưa nhận xe'}
                color={Colors.appWhite}
                size={isTablet() ? Fonts.size.h3 : Fonts.size.h6}
              />
            )}
          </View>
          {car.status ? (
            <Text
              style={{
                marginLeft: isTablet()
                  ? Metrics.margin.huge * 1.8
                  : Metrics.margin.huge * 1.3,
              }}>
              <AppText
                text={'Số km: '}
                color={Colors.appWhite}
                size={isTablet() ? Fonts.size.h3 : Fonts.size.h6}
              />
              <AppText
                text={car.congTorMet}
                color={Colors.appWhite}
                bold
                size={isTablet() ? Fonts.size.h3 : Fonts.size.h6}
              />
            </Text>
          ) : null}
        </FastImage>
        {company == 'sbs' ? (
          <View
            style={isTablet() ? styles.search_tab_form : styles.search_form}>
            <FastImage
              source={Images.icSearch}
              style={isTablet() ? styles.iconTab : styles.icon}
            />
            <AppButton
              align={'left'}
              height={isTablet() ? 60 : 50}
              onPress={this.props.onSearchScreen}
              text={'Tìm kiếm bill'}
              color={'#999999'}
              width={'100%'}
              size={isTablet() ? Fonts.size.h4 : Fonts.size.h6}
            />
          </View>
        ) : null}
      </View>
    );
  }
}
