import {StyleSheet} from 'react-native';
import {Styles, Colors, Metrics} from '../../../../../../themes';
import {isTablet} from '../../../../../../themes/iPhoneXHelper';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.appWhite,
    position: 'relative',
  },
  logoBack: {
    position: 'absolute',
    top: Metrics.statusBarHeight,
    right: 10,
    zIndex: 10000000000,
    ...Styles.center,
  },
  header: {
    backgroundColor: Colors.appColor,
    paddingVertical: Metrics.margin.huge,
    paddingTop: Metrics.margin.huge + Metrics.margin.regular + 0.5,
    ...Styles.center,
  },
  menu: {
    position: 'absolute',
    bottom: Metrics.margin.huge * 4 + 15,
    left: 10,
    zIndex: 999,
    ...Styles.center,
    borderRadius: Metrics.borderRadius.small,
    backgroundColor: Colors.whiteOverlay3,
    padding: Metrics.margin.small + 2,
    paddingHorizontal: Metrics.margin.regular,
  },
});

export default styles;
