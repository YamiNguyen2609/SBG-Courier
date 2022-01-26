import {StyleSheet} from 'react-native';
import {Styles, Colors, Metrics} from '../../../../../../themes';

const styles = StyleSheet.create({
  container: {
    ...Styles.container,
  },
  logoBack: {
    position: 'absolute',
    top: Metrics.statusBarHeight,
    right: 10,
    zIndex: 999,
    ...Styles.center,
  },
  logoCube: {
    position: 'absolute',
    bottom: Metrics.margin.huge * 4 + 15,
    left: 10,
    zIndex: 999,
    ...Styles.center,
    borderRadius: Metrics.borderRadius.small,
    backgroundColor: Colors.whiteOverlay3,
    padding: Metrics.margin.small + 2,
  },
  textCount: {
    borderRadius: Metrics.screenWidth,
    backgroundColor: Colors.appRed,
    ...Styles.center,
    position: 'absolute',
    top: -Metrics.margin.regular,
    right: -Metrics.margin.large,
  },
});

export default styles;
