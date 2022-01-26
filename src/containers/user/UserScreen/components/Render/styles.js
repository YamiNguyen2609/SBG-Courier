import {StyleSheet} from 'react-native';
import {Metrics, Colors, Styles} from '../../../../../themes';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.appWhite,
  },
  backgroundHeader: {
    height: (720 * Metrics.screenWidth) / 1280,
    marginTop: -Metrics.margin.huge * 5,
    paddingTop: Metrics.margin.huge * 5 + Metrics.statusBarHeight + 13,
    alignItems: 'center',
  },
  logoBack: {
    position: 'absolute',
    top: Metrics.statusBarHeight,
    right: 10,
    zIndex: 999,
    ...Styles.center,
  },
  container_animate: {
    flex: 1,
    width: Metrics.screenWidth * 2,
    flexDirection: 'row',
  },
});

export default styles;
