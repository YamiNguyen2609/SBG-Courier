import {StyleSheet} from 'react-native';
import {Styles, Colors, Metrics} from '../../../../../themes';
import {isTablet} from '../../../../../themes/iPhoneXHelper';

const styles = StyleSheet.create({
  view_tmp: {
    marginTop: isTablet()
      ? -Metrics.margin.huge * 4
      : -Metrics.margin.huge * 2.5,
    height: Metrics.margin.huge * 5,
    width: Metrics.screenWidth,
  },
  image: {
    height: isTablet()
      ? Metrics.screenHeight / 1.3
      : Metrics.screenHeight / 1.7,
  },
  logoBack: {
    position: 'absolute',
    top: Metrics.statusBarHeight,
    right: 10,
    zIndex: 999,
    ...Styles.center,
  },
});

export default styles;
