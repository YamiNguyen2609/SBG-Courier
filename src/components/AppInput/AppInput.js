import React, {Component} from 'react';
import {TextInput, Platform} from 'react-native';
import PropTypes from 'prop-types';

import {Colors, Fonts, Metrics} from '../../themes';

export default class AppInput extends React.Component {
  state = {
    value: '',
  };

  clear = () => {
    this.input.clear();
  };

  blur = () => {
    this.input.blur();
  };

  focus = () => {
    this.input.focus();
  };

  value = val => {
    if (val !== undefined)
      this.setState({value: this.props.format ? this.props.format(val) : val});
    else return this.state.value;
  };

  render() {
    const {
      height,
      width = '100%',
      textColor = Colors.appTextBlack,
      style,
      bgColor = Colors.appWhite,
      font = Fonts.type.regular,
      borderRadius = Metrics.borderRadius.small,
      border = 0,
      borderColor = 'transparent',
      size = Platform.OS == 'ios' ? Fonts.size.regular : Fonts.size.small,
      format,
      bold,
    } = this.props;

    return (
      <TextInput
        value={this.state.value.toString()}
        ref={input => (this.input = input)}
        clearButtonMode="while-editing"
        placeholderTextColor={Colors.appLightGrayColor}
        allowFontScaling={false}
        onChangeText={value => {
          if (this.props.maxValue) {
            if (
              Number(value.replace(/[.]/g, '')) <= Number(this.props.maxValue)
            )
              this.setState({value: format ? format(value) : value});
          } else {
            this.setState({value: format ? format(value) : value});
          }
        }}
        {...this.props}
        style={[
          {
            color: textColor,
            //paddingLeft: Metrics.margin.regular,
            fontWeight: bold ? 'bold' : 'normal',
            fontSize: size,
            fontFamily: font,
            height: height,
            width: width,
            backgroundColor: bgColor,
            borderRadius: borderRadius,
            borderWidth: border,
            borderColor: borderColor,
          },
          style,
        ]}
      />
    );
  }
}

AppInput.propTypes = {
  style: PropTypes.array,
  font: PropTypes.string,
  size: PropTypes.number,
  textColor: PropTypes.string,
};
