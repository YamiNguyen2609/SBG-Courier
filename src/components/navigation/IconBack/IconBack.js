import React, {Component} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import IonIcons from 'react-native-vector-icons/Ionicons';
import PropTypes from 'prop-types';

import {Colors, Metrics} from '../../../themes';
import {isTablet} from '../../../themes/iPhoneXHelper';

export default class IconBack extends Component {
  state = {
    isPress: true,
  };

  static propTypes = {
    onPress: PropTypes.func,
  };

  static defaultProps = {
    onPress: () => {},
  };
  _onPress = () => {
    if (this.state.isPress)
      this.setState({isPress: false}, () => {
        this.props.onPress();
        setTimeout(() => {
          this.setState({isPress: true});
        }, 300);
      });
  };

  render() {
    const {name, size, color, style} = this.props;
    return (
      <TouchableOpacity
        style={[
          {
            backgroundColor: Colors.whiteOverlay3,
            paddingHorizontal: isTablet()
              ? Metrics.margin.huge - 1
              : Metrics.margin.regular + 2,
            borderRadius: Metrics.borderRadius.small,
          },
          style,
        ]}
        hitSlop={{top: 20, bottom: 20, left: 10, right: 10}}
        onPress={this._onPress}>
        <IonIcons
          size={size ? size : isTablet() ? 55 : 40}
          name={name ? name : 'ios-close'}
          color={color ? color : Colors.appTextBlack}
        />
      </TouchableOpacity>
    );
  }
}
