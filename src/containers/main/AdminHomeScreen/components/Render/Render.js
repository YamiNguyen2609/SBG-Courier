import React, {Component} from 'react';
import {View, ScrollView, RefreshControl} from 'react-native';
import {sbgMenu} from '../../../../../helpers/Constants';
import r from 'reactotron-react-native';

import styles from './styles';
import HeaderForm from '../HeaderForm';
import {Colors, Styles, Metrics} from '../../../../../themes';
import ListMenu from '../ListMenu/';

export default class Render extends Component {
  state = {};
  render() {
    const {user} = this.props;

    let data = sbgMenu.filter(e => e.role == 1);

    return (
      <View style={styles.container}>
        {user ? <HeaderForm user={user} /> : null}
        <ScrollView
          contentContainerStyle={{flex: 1, marginTop: Metrics.margin.large}}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={false}
              onRefresh={this.props.onRefresh}
              size={30}
              colors={[Colors.appColor]}
            />
          }>
          <View style={[Styles.container, Styles.center]}>
            <View style={styles.tmp_view} />
            <View style={styles.menu}>
              <ListMenu data={data} onPressMenu={this.props.onPressMenu} />
            </View>
            <View style={styles.tmp_view} />
          </View>
        </ScrollView>
      </View>
    );
  }
}
