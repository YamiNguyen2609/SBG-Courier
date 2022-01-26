import React, {Component} from 'react';
import {View, TouchableOpacity} from 'react-native';
import FastImage from 'react-native-fast-image';
import Icon from 'react-native-vector-icons/Ionicons';

import styles from './styles';
import {Images, Colors, Fonts, Metrics, Styles} from '../../../../../themes';
import {AppText, IconBack, Divider, AppButton} from '../../../../../components';
import {isTablet} from '../../../../../themes/iPhoneXHelper';

export default class InfoForm extends Component {
  render() {
    const {user, licensePlates, stateCar, company} = this.props;
    const {avatar, full_name} = user;

    return (
      <View style={styles.container}>
        <View
          style={[
            isTablet() ? styles.infoFormTab : styles.infoForm,
            {
              backgroundColor:
                company !== 'sbs' ? Colors.appColor : Colors.appColorFd,
            },
          ]}>
          <View style={styles.container_avatar}>
            <View style={styles.avatar}>
              <FastImage
                source={avatar ? {uri: avatar} : Images.icAvatarNone}
                style={styles.image}
              />
            </View>
            <View style={styles.info}>
              <AppText
                text={full_name.toUpperCase()}
                color={Colors.appWhite}
                size={isTablet() ? Fonts.size.h3 : Fonts.size.h6}
                bold
              />
              <AppButton
                height={30}
                text={'Thông tin hồ sơ'}
                size={13}
                align={'left'}
                color={Colors.appLightGrayColor}
                size={isTablet() ? Fonts.size.h5 : Fonts.size.large}
                onPress={() => this.props.onPressReplaceScreen('UserScreen')}
              />
            </View>
          </View>
        </View>
        <View
          style={isTablet() ? styles.container_tab_car : styles.container_car}>
          <View style={styles.container_title}>
            <View style={styles.container_text}>
              <AppText
                text={'Biển số xe'}
                size={isTablet() ? Fonts.size.h4 : Fonts.size.large}
              />
              <AppText
                text={licensePlates ? licensePlates : 'Chưa nhận xe'}
                bold
                size={isTablet() ? Fonts.size.h4 : Fonts.size.large - 2}
              />
            </View>
            <View style={{width: 50}} />
            <View style={styles.container_text}>
              <AppText
                text={'Trạng thái'}
                size={isTablet() ? Fonts.size.h4 : Fonts.size.large}
              />
              <AppText
                text={stateCar ? 'Đã nhận xe' : 'Chưa Nhận xe'}
                bold
                size={isTablet() ? Fonts.size.h4 : Fonts.size.large - 2}
                color={stateCar ? Colors.appGreen : Colors.appRed}
              />
            </View>
          </View>
          <View style={styles.container_image}>
            <View
              style={[
                styles.image_mini_view,
                {
                  backgroundColor:
                    company !== 'sbs' ? Colors.appColor : Colors.appColorFd,
                },
              ]}>
              <View
                style={{
                  backgroundColor: Colors.appWhite,
                  borderRadius: Metrics.screenWidth,
                  flex: 1,
                  ...Styles.center,
                }}>
                <FastImage
                  source={Images.icTruckMini}
                  style={styles.image_mini}
                />
              </View>
            </View>
            <Divider
              height={isTablet() ? '20%' : '25%'}
              width={0.8}
              color={Colors.appLightGrayColor}
            />
          </View>
        </View>
      </View>
    );
  }
}
