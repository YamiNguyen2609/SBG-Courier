import React, {Component} from 'react';
import {View, ScrollView} from 'react-native';

import styles from './styles';
import InfoForm from '../InfoForm';
import Menu from '../Menu';
import {Styles, Fonts, Colors} from '../../../../../themes';
import {AppText} from '../../../../../components';
import {version} from '../../../../../helpers/Constants';
import {isTablet} from '../../../../../themes/iPhoneXHelper';

export default class Render extends Component {
  render() {
    const {user, licensePlates, stateCar, company} = this.props;
    return (
      <View style={Styles.container}>
        {user ? (
          <InfoForm
            company={company}
            user={user}
            licensePlates={licensePlates}
            stateCar={stateCar}
            onPressReplaceScreen={this.props.onPressReplaceScreen}
          />
        ) : null}
        <ScrollView showsVerticalScrollIndicator={false} style={{flex: 1}}>
          <Menu
            company={company}
            onPressLogout={this.props.onPressLogout}
            onPressReplaceScreen={this.props.onPressReplaceScreen}
          />
          <AppText
            text={version}
            italic
            size={isTablet() ? Fonts.size.h4 : Fonts.size.large}
            color={Colors.appLightGrayColor}
            align="center"
            style={styles.version}
          />
        </ScrollView>
      </View>
    );
  }
}
