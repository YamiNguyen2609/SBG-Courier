import React, {Component} from 'react';
import {View, ScrollView, RefreshControl} from 'react-native';
import {sbgMenu} from '../../../../../helpers/Constants';
import r from 'reactotron-react-native';
import Swiper from 'react-native-swiper';

import styles from './styles';
import HeaderForm from '../HeaderForm';
import ListMenu from '../ListMenu';
import PanelOtherForm from '../PanelOtherForm';
import {Colors, Styles, Metrics} from '../../../../../themes';
import {AppText} from '../../../../../components';

export default class Render extends Component {
  state = {};
  render() {
    const {user, car, trafficJam, visible} = this.props;

    r.log(user);

    let modules = !car['stateCar']
      ? sbgMenu.filter(
          e =>
            (e.flag == 0 || e.flag == 1 || e.flag == 3 || e.flag == 5) &&
            (e.company == '' || e.company == user.companyId),
        )
      : trafficJam
      ? sbgMenu.filter(
          e =>
            (e.flag == 0 || e.flag == 2 || e.flag == 4 || e.flag == 5) &&
            (e.company == '' || e.company == user.companyId),
        )
      : sbgMenu.filter(
          e =>
            (e.flag == 0 || e.flag == 2 || e.flag == 3 || e.flag == 5) &&
            (e.company == '' || e.company == user.companyId),
        );

    let modulesOther = !car['stateCar']
      ? sbgMenu.filter(
          e =>
            (e.flag == 0 || e.flag == 1 || e.flag == 3 || e.flag == 6) &&
            (e.company == '' || e.company == user.companyId),
        )
      : trafficJam
      ? sbgMenu.filter(
          e =>
            (e.flag == 0 || e.flag == 2 || e.flag == 4 || e.flag == 6) &&
            (e.company == '' || e.company == user.companyId),
        )
      : sbgMenu.filter(
          e =>
            (e.flag == 0 || e.flag == 2 || e.flag == 3 || e.flag == 6) &&
            (e.company == '' || e.company == user.companyId),
        );

    if (user['role'] == 3) {
      modules = modules.filter(e => e.role === 3);
      modules.length = 6;
      modulesOther = modulesOther.filter(e => e.role === 3);
    }

    if (user['multi'] && user['companyId'] != 'sbs') {
      var multiModule = sbgMenu.filter(e => e.company == 'sbp' && e.role === 3);

      modules = !car['stateCar']
        ? sbgMenu.filter(
            e =>
              (e.flag == 0 || e.flag == 1 || e.flag == 3 || e.flag == 5) &&
              (e.company == '' || e.company == 'sbs'),
          )
        : trafficJam
        ? sbgMenu.filter(
            e =>
              (e.flag == 0 || e.flag == 2 || e.flag == 4 || e.flag == 5) &&
              (e.company == '' || e.company == 'sbs'),
          )
        : sbgMenu.filter(
            e =>
              (e.flag == 0 || e.flag == 2 || e.flag == 3 || e.flag == 5) &&
              (e.company == '' || e.company == 'sbs'),
          );

      modulesOther = !car['stateCar']
        ? sbgMenu.filter(
            e =>
              (e.flag == 0 || e.flag == 1 || e.flag == 3 || e.flag == 6) &&
              (e.company == '' || e.company == 'sbs'),
          )
        : trafficJam
        ? sbgMenu.filter(
            e =>
              (e.flag == 0 || e.flag == 2 || e.flag == 4 || e.flag == 6) &&
              (e.company == '' || e.company == 'sbs'),
          )
        : sbgMenu.filter(
            e =>
              (e.flag == 0 || e.flag == 2 || e.flag == 3 || e.flag == 6) &&
              (e.company == '' || e.company == 'sbs'),
          );
    }

    return (
      <View style={styles.container}>
        {user['multi'] ? (
          <Swiper
            showsButtons={false}
            loop={false}
            onIndexChanged={index => {
              this.props.changeCompany(index ? 'sbp' : 'sbs');
            }}>
            <View style={styles.container}>
              {user ? (
                <HeaderForm
                  company={'sbs'}
                  onSearchScreen={this.props.onSearchScreen}
                  user={user}
                  car={{
                    status: car['stateCar'],
                    licensePlates: car['licensePlates'],
                    congTorMet: car['odometer'],
                  }}
                />
              ) : null}
              <ScrollView
                contentContainerStyle={{
                  flex: 1,
                  marginTop: Metrics.margin.large,
                }}
                showsVerticalScrollIndicator={false}
                refreshControl={
                  <RefreshControl
                    refreshing={false}
                    onRefresh={this.props.onRefresh}
                    size={30}
                    colors={[Colors.appColor]}
                  />
                }>
                <View style={styles.tmp_view} />
                <View style={{height: 150 * Math.ceil(modules.length / 3)}}>
                  <ListMenu
                    company={'sbs'}
                    data={modules}
                    onPressMenu={this.props.onPressMenu}
                  />
                </View>
                <View style={styles.tmp_view} />
              </ScrollView>
            </View>
            <View style={styles.container}>
              {user ? (
                <HeaderForm
                  company={'sbp'}
                  onSearchScreen={this.props.onSearchScreen}
                  user={user}
                  car={{
                    status: car['stateCar'],
                    licensePlates: car['licensePlates'],
                    congTorMet: car['odometer'],
                  }}
                />
              ) : null}
              <ScrollView
                contentContainerStyle={{
                  flex: 1,
                  marginTop: Metrics.margin.large,
                }}
                showsVerticalScrollIndicator={false}
                refreshControl={
                  <RefreshControl
                    refreshing={false}
                    onRefresh={this.props.onRefresh}
                    size={30}
                    colors={[Colors.appColor]}
                  />
                }>
                <View style={styles.tmp_view} />
                <View
                  style={{
                    height: 70 * Math.ceil(modules.length / 3),
                  }}>
                  <ListMenu
                    company={'sbp'}
                    data={multiModule}
                    onPressMenu={this.props.onPressMenu}
                  />
                </View>
                <View style={styles.tmp_view} />
              </ScrollView>
            </View>
          </Swiper>
        ) : (
          <View style={styles.container}>
            {user ? (
              <HeaderForm
                company={user['companyId']}
                onSearchScreen={this.props.onSearchScreen}
                user={user}
                car={{
                  status: car['stateCar'],
                  licensePlates: car['licensePlates'],
                  congTorMet: car['odometer'],
                }}
              />
            ) : null}
            <ScrollView
              contentContainerStyle={{
                flex: 1,
                marginTop: Metrics.margin.large,
              }}
              showsVerticalScrollIndicator={false}
              refreshControl={
                <RefreshControl
                  refreshing={false}
                  onRefresh={this.props.onRefresh}
                  size={30}
                  colors={[Colors.appColor]}
                />
              }>
              <View style={styles.tmp_view} />
              <View
                style={{
                  marginHorizontal: Metrics.margin.large,
                  height:
                    ((Metrics.screenWidth - Metrics.margin.regular * 2 + 1.6) /
                      2.6) *
                    (modules.length / 3),
                }}>
                <ListMenu
                  company={user['companyId']}
                  data={modules}
                  onPressMenu={this.props.onPressMenu}
                />
              </View>
              <View style={styles.tmp_view} />
            </ScrollView>
          </View>
        )}
        <PanelOtherForm
          company={user['multi'] ? 'sbs' : user['companyId']}
          data={modulesOther}
          visible={visible}
          onPressMenu={this.props.onPressMenu}
        />
      </View>
    );
  }
}
