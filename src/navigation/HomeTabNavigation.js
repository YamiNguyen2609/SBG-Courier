import React, {Component} from 'react';
import {connect} from 'react-redux';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import FastImage from 'react-native-fast-image';

import {store} from '../redux/ConfigureStore';
import {getRouteFocus} from '../redux/app';
import {Images, Colors} from '../themes';
import HomeScreen from '../containers/main/HomeScreen';
import ListOrderScreen from '../containers/order/sbg/ListOrderScreen';
import ListOrderDispatchScreen from '../containers/order/sbp/ListOrderDispatchScreen';
import SettingScreen from '../containers/user/SettingScreen';
import MapOrderScreen from '../containers/order/sbp/MapOrderScreen';
import {isTablet} from '../themes/iPhoneXHelper';

const screens = [
  {
    name: 'Trang chủ',
    id: 'HomeScreen',
    component: HomeScreen,
    company: '',
  },
  {
    name: 'Danh sách bill',
    id: 'ListOrderScreen',
    component: ListOrderScreen,
    company: 'sbs',
  },
  {
    name: 'PUP/POD',
    id: 'ListOrderDispatchScreen',
    component: ListOrderDispatchScreen,
    company: 'sbp',
  },
  // {
  //   name: 'Bản đồ',
  //   id: 'MapOrderScreen',
  //   component: MapOrderScreen,
  //   company: 'sbp',
  // },
  {
    name: 'Tài Khoản',
    id: 'SettingScreen',
    component: SettingScreen,
    company: '',
  },
];

const Tab = createBottomTabNavigator();

export class HomeTabNavigation extends Component {
  render() {
    let {user, company} = this.props;

    company =
      user['multi'] && user['companyId'] == 'sbp' ? company : user['companyId'];

    return (
      <Tab.Navigator
        initialRouteName={'Trang chủ'}
        screenOptions={({route}) => ({
          tabBarIcon: ({focused, color, size}) => {
            let iconName;
            switch (route.params.id) {
              case 'HomeScreen':
                iconName = focused
                  ? Images['icHome' + company + 'Active']
                  : Images['icHome'];
                break;
              case 'ListOrderScreen':
                iconName = focused
                  ? Images['icOrder' + company + 'Active']
                  : Images['icOrder'];
                break;
              case 'ListOrderDispatchScreen':
                iconName = focused
                  ? Images['icOrder' + company + 'Active']
                  : Images['icOrder'];
                break;
              case 'MapOrderScreen':
                iconName = focused
                  ? Images['icOrder' + company + 'Active']
                  : Images['icOrder'];
                break;
              case 'SettingScreen':
                iconName = focused
                  ? Images['icUser' + company + 'Active']
                  : Images['icUser'];
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
          activeTintColor:
            company == 'sbp' ? Colors.appColor : Colors.appColorFd,
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
    company: state.app.company,
  };
}

const mapDispatchToProp = {};

export default connect(
  mapStateToProps,
  mapDispatchToProp,
)(HomeTabNavigation);
