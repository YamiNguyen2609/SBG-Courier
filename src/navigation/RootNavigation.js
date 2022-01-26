import React, {Component} from 'react';
import {BackHandler} from 'react-native';
import {NavigationContainer, CommonActions} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {connect} from 'react-redux';
import r from 'reactotron-react-native';
import {TransitionSpecs} from '@react-navigation/stack';

import {getRouteFocus} from '../redux/app';
import Home from '../containers/main/Home';
import LauncherScreen from '../containers/main/LauncherScreen';
import LoginScreen from '../containers/main/LoginScreen';

import ScanOrderScreen from '../containers/order/sbg/ScanOrderScreen';
import UserScreen from '../containers/user/UserScreen';
import ListOrderScreen from '../containers/order/sbg/ListOrderScreen';
import HistoryScreen from '../containers/user/HistoryScreen';
import PourFuelScreen from '../containers/car/PourFuelScreen';
import HandleCarScreen from '../containers/car/HandleCarScreen';
import MapOrderScreen from '../containers/order/sbp/MapOrderScreen';
import DispatchOrderScreen from '../containers/order/sbp/DispatchOrderScreen';
import ListOrderDispatchScreen from '../containers/order/sbp/ListOrderDispatchScreen';
import ReportIncidentScreen from '../containers/car/ReportIncidentScreen';
import DetailOrderScreenSBG from '../containers/order/sbg/DetailOrderScreen';
import SearchManifestScreen from '../containers/order/sbg/SearchOrderScreen';
import DetailOrderDispatchScreen from '../containers/order/sbp/DetailOrderDispatchScreen';
import ConfirmOrderScreen from '../containers/order/sbp/ConfirmOrderScreen';
// import SearchOrderScreen from '../containers/order/sbp/SearchOrderScreen';
import CollectOrderScreen from '../containers/order/sbp/CollectOrderScreen';
import HistoryCollectScreen from '../containers/order/sbp/HistoryCollectScreen';
import StationScreen from '../containers/order/sbp/StationScreen';
import ReportScreen from '../containers/order/sbp/ReportScreen';
import RexScanScreen from '../containers/order/sbp/RexScanScreen';
import CheckInScreen from '../containers/order/sbp/CheckInScreen';
import TransferScreen from '../containers/order/sbp/TransferScreen';

const screens = [
  {
    name: 'LauncherScreen',
    component: LauncherScreen,
    company: '',
  },
  {
    name: 'Home',
    component: Home,
    company: '',
  },
  {
    name: 'LoginScreen',
    component: LoginScreen,
    company: '',
  },
  {
    name: 'ScanOrderScreen',
    component: ScanOrderScreen,
    company: '',
  },
  {
    name: 'DispatchOrderScreen',
    component: DispatchOrderScreen,
    company: 'sbp',
  },
  {
    name: 'ListOrderScreen',
    component: ListOrderScreen,
    company: 'sbs',
  },
  {
    name: 'ListOrderDispatchScreen',
    component: ListOrderDispatchScreen,
    company: 'sbp',
  },
  {
    name: 'UserScreen',
    component: UserScreen,
    company: '',
  },
  {
    name: 'HistoryScreen',
    component: HistoryScreen,
    company: '',
  },
  {
    name: 'PourFuelScreen',
    component: PourFuelScreen,
    company: '',
  },
  {
    name: 'HandleCarScreen',
    component: HandleCarScreen,
    company: '',
  },
  {
    name: 'ReportIncidentScreen',
    component: ReportIncidentScreen,
    company: '',
  },
  {
    name: 'DetailOrderScreen',
    component: DetailOrderScreenSBG,
    company: '',
  },
  {
    name: 'DetailOrderDispatchScreen',
    component: DetailOrderDispatchScreen,
    company: 'sbp',
  },
  {
    name: 'SearchOrderScreen',
    component: SearchManifestScreen,
    company: 'sbs',
  },
  {
    name: 'MapOrderScreen',
    component: MapOrderScreen,
    company: 'sbp',
  },
  {
    name: 'ConfirmOrderScreen',
    component: ConfirmOrderScreen,
    company: 'sbp',
  },
  {
    name: 'CollectOrderScreen',
    component: CollectOrderScreen,
    company: 'sbp',
  },
  {
    name: 'HistoryCollectScreen',
    component: HistoryCollectScreen,
    company: 'sbp',
  },
  {
    name: 'StationScreen',
    component: StationScreen,
    company: 'sbp',
  },
  {
    name: 'ReportScreen',
    component: ReportScreen,
    company: 'sbp',
  },
  {
    name: 'RexScanScreen',
    component: RexScanScreen,
    company: 'sbp',
  },
  {
    name: 'CheckInScreen',
    component: CheckInScreen,
    company: 'sbp',
  },
  {
    name: 'TransferScreen',
    component: TransferScreen,
    company: 'sbp',
  },
];

const config = {
  animation: 'spring',
  config: {
    stiffness: 2000,
    damping: 5,
    mass: 1,
    overshootClamping: true,
    restDisplacementThreshold: 0.005,
    restSpeedThreshold: 0.005,
  },
};

const Stack = createStackNavigator();

export class RootNavigation extends Component {
  UNSAFE_componentWillReceiveProps = nextProps => {
    if (this.props.stack != nextProps.stack) {
      var routeName = nextProps.screen;
      var data = nextProps.data;
      this.props.getRouteFocus(routeName);
      this.navigator.navigate(routeName, data ? {...data} : {});
    }

    if (this.props.resetStack != nextProps.resetStack) {
      routeName = nextProps.screen;
      data = nextProps.data;
      this.props.getRouteFocus(routeName);
      this.navigator.reset({
        index: 0,
        routes: [{name: routeName, data}],
      });
    }

    if (this.props.removeStack != nextProps.removeStack) {
      var routeName = nextProps.screen;
      var data = nextProps.data;
      this.props.getRouteFocus(routeName);
      this.navigator.dispatch(
        CommonActions.navigate({
          name: routeName,
          params: data,
        }),
      );
    }
  };

  render() {
    const {user} = this.props;

    let company = user ? user.companyId : '';

    return (
      <NavigationContainer
        ref={nav => {
          this.navigator = nav;
        }}>
        <Stack.Navigator
          headerMode={'none'}
          initialRouteName={'LauncherScreen'}>
          {screens.map(e => {
            return (
              <Stack.Screen
                name={e.name}
                component={e.component}
                key={e.name}
                options={{
                  transitionSpec: {
                    open: config,
                    close: config,
                  },
                }}
              />
            );
          })}
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

function mapStateToProps(state) {
  return {
    screen: state.navigation.screen,
    data: state.navigation.data,
    stack: state.navigation.stack,
    resetStack: state.navigation.resetStack,
    removeStack: state.navigation.removeStack,
    user: state.loginUser.user,
  };
}

const mapDispatchToProp = {
  getRouteFocus,
};

export default connect(
  mapStateToProps,
  mapDispatchToProp,
)(RootNavigation);
