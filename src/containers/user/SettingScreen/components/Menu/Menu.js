import React, {Component} from 'react';
import {View, TouchableOpacity, Text} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import styles from './styles';
import {AppText, Divider, AppAlert} from '../../../../../components';
import strings from '../../../../../languages';
import {Colors, Fonts, Images, Metrics} from '../../../../../themes';
import FastImage from 'react-native-fast-image';
import {isTablet} from '../../../../../themes/iPhoneXHelper';

class ItemOption extends Component {
  state = {
    visible: false,
  };
  onPress = status => {
    this.setState({visible: false}, () => {
      if (status) {
        this.props.onPress();
      }
    });
  };

  render() {
    const {visible} = this.state;
    const {icon, title, ShowBottom, popupDescription, disabled} = this.props;
    return (
      <View style={styles.container_item}>
        <TouchableOpacity
          disabled={disabled}
          style={styles.container_option}
          onPress={() =>
            popupDescription
              ? this.setState({visible: true})
              : this.props.onPress()
          }>
          <FastImage
            source={icon}
            style={isTablet() ? styles.iconTab : styles.icon}
          />
          <AppText
            text={title}
            size={isTablet() ? Fonts.size.h3 : Fonts.size.h6}
            style={{flex: 1}}
          />
        </TouchableOpacity>
        {ShowBottom ? (
          <Divider
            style={styles.divider}
            height={0.8}
            color={Colors.overlay2}
          />
        ) : null}
        <AppAlert
          horizontal={true}
          visible={visible}
          title={'Xác nhận'}
          align={'center'}
          description={popupDescription}
          renderButton={[
            {
              title: 'Hủy',
              onPress: () => this.onPress(false),
            },
            {
              title: 'Đồng ý',
              onPress: () => this.onPress(true),
            },
          ]}
        />
      </View>
    );
  }
}

export default class Menu extends Component {
  render() {
    console.log(this.props.company);
    return (
      <View style={styles.container}>
        <ItemOption
          icon={Images['icRescueCenter' + this.props.company]}
          title={strings.setting_screen.rescue_center_title}
          //onPress={this.props.onPressLogout}
          ShowBottom={true}
          disabled={true}
        />
        <ItemOption
          icon={Images['icNotification' + this.props.company + 'Mini']}
          title={strings.setting_screen.notification_title}
          //onPress={() => this.props.onPressReplaceScreen('NotificationScreen')}
          disabled={true}
          ShowBottom={true}
        />
        <ItemOption
          icon={Images['icHistory' + this.props.company]}
          title={strings.setting_screen.history_title}
          onPress={() => this.props.onPressReplaceScreen('HistoryScreen')}
          // disabled={true}
        />
        <Divider height={Metrics.margin.huge} color={Colors.overlay1} />
        <ItemOption
          icon={Images.icAccount}
          title={strings.setting_screen.account_title}
          onPress={() => this.props.onPressReplaceScreen('UserScreen')}
          ShowBottom={true}
        />
        <ItemOption
          icon={Images.icLogout}
          title={strings.setting_screen.logout_title}
          onPress={this.props.onPressLogout}
          popupDescription={'Bạn muốn đăng xuất khỏi tài khoản này'}
        />
      </View>
    );
  }
}
