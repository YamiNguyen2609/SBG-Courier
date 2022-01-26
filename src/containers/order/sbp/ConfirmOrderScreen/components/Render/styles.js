import {StyleSheet} from 'react-native';
import {Styles, Colors, Metrics} from '../../../../../../themes';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.appWhite,
  },
  header: {
    backgroundColor: Colors.appColor,
    paddingVertical: Metrics.margin.huge,
    paddingTop: Metrics.margin.huge + Metrics.margin.regular + 0.5,
    ...Styles.center,
  },
  logoBack: {
    position: 'absolute',
    top: Metrics.statusBarHeight,
    right: 10,
    zIndex: 10000000000,
    ...Styles.center,
  },
  container_animate: {
    flex: 1,
    width: Metrics.screenWidth * 2,
    flexDirection: 'row',
  },
  header: {
    backgroundColor: Colors.appColor,
    paddingVertical: Metrics.margin.huge,
    paddingTop: Metrics.margin.huge + Metrics.margin.regular + 0.5,
    ...Styles.center,
  },
});

export default styles;
