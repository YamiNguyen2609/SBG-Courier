import React, {Component} from 'react';
import {View, TouchableOpacity} from 'react-native';
import FastImage from 'react-native-fast-image';
import Icon from 'react-native-vector-icons/Ionicons';

import styles from './styles';
import {Images, Colors, Fonts} from '../../../../../themes';
import {AppText, IconBack, Divider, AppButton} from '../../../../../components';
import {isTablet} from '../../../../../themes/iPhoneXHelper';

export default class InfoForm extends Component {
  render() {
    const {user, licensePlates, stateCar} = this.props;
    const {avatar, full_name} = user;

    return (
      <View style={styles.container}>
        <View style={isTablet() ? styles.infoFormTab : styles.infoForm}>
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
      </View>
    );
  }
}
