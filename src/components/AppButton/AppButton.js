import React, {Component} from 'react';
import {TouchableOpacity, Platform, View} from 'react-native';
import PropTypes from 'prop-types';

import {Metrics, Colors, Styles, Fonts} from '../../themes';
import AppText from '../AppText';
import {isTablet} from '../../themes/iPhoneXHelper';

const RenderItem = ({data}) => {
  return data;
};

export default class AppButton extends Component {
  static defaultProps = {
    onPress: () => {},
  };

  state = {
    isPress: true,
  };

  _onPress = data => {
    if (this.state.isPress)
      this.setState({isPress: false}, () => {
        this.props.onPress(data);
        setTimeout(() => {
          this.setState({isPress: true});
        }, 300);
      });
  };
  render() {
    const {
      text,
      style,
      border = 0,
      borderColor = 'transparent',
      borderRadius = Metrics.borderRadius.small,
      bgColor = 'transparent',
      disabled = false,
      color = Colors.appTextBlack,
      width,
      height = Platform.OS == 'ios'
        ? (60 * Metrics.screenHeight) / 667
        : isTablet()
        ? 70
        : 60,
      size = Platform.isPad || isTablet() ? Fonts.size.h4 : Fonts.size.regular,
      renderItem = <View />,
      bold,
      activeOpacity = 0.8,
      align = 'center',
      hitSlop = {left: 5, right: 5, bottom: 5, top: 5},
      textStyle,
      opacity = 1,
    } = this.props;
    return (
      <TouchableOpacity
        activeOpacity={activeOpacity}
        hitSlop={hitSlop}
        disabled={disabled}
        style={[
          text ? {justifyContent: 'center'} : null,
          {
            borderColor: borderColor,
            borderWidth: border,
            borderRadius: borderRadius,
            backgroundColor: bgColor,
            width: width,
            height: height,
            opacity: opacity,
          },
          style,
        ]}
        onPress={this._onPress}>
        {text !== undefined ? (
          <AppText
            text={text}
            size={size}
            color={color}
            align={align}
            bold={bold}
            style={textStyle}
          />
        ) : (
          <RenderItem data={renderItem} />
        )}
      </TouchableOpacity>
    );
  }
}

AppButton.propTypes = {
  renderItem: PropTypes.func,
  border: PropTypes.number,
  borderRadius: PropTypes.number,
  bgColor: PropTypes.string,
  disabled: PropTypes.bool,
  onPress: PropTypes.func,
};
