import React, {Component} from 'react';
import {View} from 'react-native';
import {MaterialIndicator} from 'react-native-indicators';
import PropTypes from 'prop-types';

import {Styles, Colors} from '../../themes';

export default class AppIndicator extends Component {
  state = {};
  render() {
    const {
      visible,
      backdropColor = 'transparent',
      color = Colors.appColor,
      style,
      size = 50,
    } = this.props;

    return visible ? (
      <View
        style={[
          style,
          {
            ...Styles.center,
            backgroundColor: backdropColor,
            position: 'absolute',
            zIndex: 999,
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
          },
        ]}>
        <View
          style={{
            backgroundColor: Colors.overlay2,
            width: 70,
            height: 70,
            borderRadius: 8,
          }}>
          <MaterialIndicator color={color} size={size} />
        </View>
      </View>
    ) : null;
  }
}

AppIndicator.propTypes = {
  visible: PropTypes.bool,
  backdropColor: PropTypes.string,
  color: PropTypes.string,
  size: PropTypes.number,
};
