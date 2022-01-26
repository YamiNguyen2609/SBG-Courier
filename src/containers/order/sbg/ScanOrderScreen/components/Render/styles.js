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
  logoFlash: {
    position: 'absolute',
    top: Metrics.statusBarHeight,
    left: 10,
    zIndex: 999,
    ...Styles.center,
    borderRadius: Metrics.borderRadius.small,
    backgroundColor: Colors.whiteOverlay3,
    paddingVertical: Metrics.margin.small,
    paddingHorizontal: Metrics.margin.small,
  },
  indicator: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    zIndex: 999,
    backgroundColor: Colors.overlay2,
  },
  button_upload: {
    position: 'absolute',
    bottom: 190 + Metrics.margin.huge,
    right: 10,
  },
});

export default styles;
