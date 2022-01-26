import React, {Component} from 'react';
import {View} from 'react-native';
import PropTypes from 'prop-types';

import {Colors, Metrics} from '../../themes';

export default class Divider extends Component {
  render() {
    const {style, width, height, color} = this.props;

    return (
      <View
        style={[
          {
            width: width ? width : Metrics.screenWidth,
            height: height ? height : Metrics.screenHeight,
            backgroundColor: color ? color : Colors.appLightGrayColor,
          },
          style,
        ]}
      />
    );
  }
}

Divider.propTypes = {
  width: PropTypes.number || PropTypes.string,
  height: PropTypes.number || PropTypes.string,
  color: PropTypes.string,
};
