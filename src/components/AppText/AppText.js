import React from 'react';
import {Text} from 'react-native';
import PropTypes from 'prop-types';

import {Colors, Fonts, Metrics} from '../../themes';

export default class AppText extends React.Component {
  render() {
    const {
      text,
      style,
      color = Colors.appTextBlack,
      font = Fonts.type.regular,
      size = Fonts.size.regular,
      bold = false,
      italic = false,
      align = 'left',
      line = null,
    } = this.props;

    return (
      <Text
        numberOfLines={line}
        style={[
          {
            fontSize: size,
            color: color,
            fontFamily: font,
            fontWeight: bold ? 'bold' : 'normal',
            fontStyle: italic ? 'italic' : 'normal',
            textAlign: align,
            marginHorizontal: Metrics.margin.regular,
            marginVertical: Metrics.margin.small,
          },
          style,
        ]}
        allowFontScaling={false}>
        {text}
      </Text>
    );
  }
}

AppText.propTypes = {
  style: PropTypes.object,
  font: PropTypes.string,
  text: PropTypes.any,
  size: PropTypes.number,
  color: PropTypes.string,
};
