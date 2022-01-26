import React, {Component} from 'react';
import {connect} from 'react-redux';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import FastImage from 'react-native-fast-image';

import {store} from '../redux/ConfigureStore';
import {getRouteFocus} from '../redux/app';
import {Images, Colors} from '../themes';
import AdminHomeScreen from '../containers/main/AdminHomeScreen';
import SettingAdminScreen from '../containers/user/SettingAdminScreen';
import {isTablet} from '../themes/iPhoneXHelper';

const screens = [
  {
    name: 'Trang chủ',
    id: 'AdminHomeScreen',
    component: AdminHomeScreen,
    company: '',
  },
  {
    name: 'Tài Khoản',
    id: 'SettingAdminScreen',
    component: SettingAdminScreen,
    company: '',
  },
];

const Tab = createBottomTabNavigator();

export class HomeAdminTabNavigation extends Component {
  render() {
    const {user} = this.props;

    let company = user ? user.companyId : '';

    return (
      <Tab.Navigator
        initialRouteName={'Trang chủ'}
        screenOptions={({route}) => ({
          tabBarIcon: ({focused, color, size}) => {
            let iconName;
            switch (route.params.id) {
              case 'AdminHomeScreen':
                iconName = focused ? Images.icHomesbpActive : Images.icHome;
                break;
              case 'SettingAdminScreen':
                iconName = focused ? Images.icUsersbpActive : Images.icUser;
                break;
            }

            return (
              <FastImage
                source={iconName}
                style={
                  isTablet() ? {width: 50, height: 50} : {width: 40, height: 40}
                }
              />
            );
          },
        })}
        tabBarOptions={{
          // showLabel: false,
          activeTintColor: Colors.appColor,
          inactiveTintColor: '#878787',
          style: {
            height: isTablet() ? 80 : 60,
            elevation: 50,
            borderTopWidth: 0,
          },
        }}>
        {screens
          .filter(e => e.company == '' || e.company == company)
          .map(e => {
            return (
              <Tab.Screen
                key={e.id}
                name={e.name}
                component={e.component}
                initialParams={{id: e.id}}
                listeners={{
                  tabPress: el => {
                    store.dispatch(getRouteFocus(e.id));
                  },
                }}
              />
            );
          })}
      </Tab.Navigator>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.loginUser.user,
  };
}

const mapDispatchToProp = {};

export default connect(
  mapStateToProps,
  mapDispatchToProp,
)(HomeAdminTabNavigation);
