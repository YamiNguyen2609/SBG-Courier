import React, {Component} from 'react';
import {View, Animated} from 'react-native';

import styles from './styles';
import {IconBack} from '../../../../../components';

import {Colors, Metrics} from '../../../../../themes';
import HeaderForm from '../../../../components/HeaderForm';
import InfoForm from '../InfoForm';
import PasswordChangeForm from '../PasswordChangeForm';

const formAnimation = new Animated.ValueXY({x: 0, y: 0});

export default class Render extends Component {
  changeStep = step => {
    Animated.spring(formAnimation, {
      toValue: {x: -Metrics.screenWidth * step, y: 0},
      speed: 100,
    }).start();
  };

  render() {
    const {data} = this.props;
    return (
      <View style={styles.container}>
        <IconBack
          style={styles.logoBack}
          onPress={this.props.back}
          color={Colors.appWhite}
        />
        <HeaderForm title={'Thông tin nhân viên'} />
        <Animated.View
          style={[styles.container_animate, formAnimation.getLayout()]}>
          <InfoForm changeStep={this.changeStep} data={data} />
          <PasswordChangeForm
            changeStep={this.changeStep}
            onChangePassword={this.props.onChangePassword}
          />
        </Animated.View>
      </View>
    );
  }
}
