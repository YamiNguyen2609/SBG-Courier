import {StyleSheet} from 'react-native';
import {Styles, Colors, Metrics} from '../../../../../../themes';

const styles = StyleSheet.create({
  container: Styles.container,
  logoBack: {
    position: 'absolute',
    top: Metrics.statusBarHeight,
    right: 10,
    zIndex: 999,
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
