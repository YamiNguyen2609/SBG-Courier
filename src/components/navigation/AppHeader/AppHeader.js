import React, {Component} from 'react';
import {View, Platform} from 'react-native';
import {Metrics, Colors} from '../../../themes';

const RenderItem = ({data}) => {
  return data;
};

export default class AppHeader extends Component {
  render() {
    const {
      style,
      headerLeft = <View />,
      headerCenter = <View />,
      headerRight = <View />,
    } = this.props;

    return (
      <View
        style={[
          style,
          {
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingTop: Metrics.statusBarHeight,
            backgroundColor: Colors.appColor,
            alignItems: 'center',
            paddingHorizontal: Metrics.margin.large,
            height: Platform.isPad ? 120 : 80,
          },
        ]}>
        <RenderItem data={headerLeft} />
        <RenderItem data={headerCenter} />
        <RenderItem data={headerRight} />
      </View>
    );
  }
}
