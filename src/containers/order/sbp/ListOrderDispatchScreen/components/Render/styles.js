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
  container_animate: {
    width: Metrics.screenWidth * 2,
    flex: 1,
    flexDirection: 'row',
  },
  header: {
    paddingTop: Metrics.statusBarHeight,
    paddingBottom: Metrics.margin.regular,
    alignItems: 'center',
    backgroundColor: Colors.appColor,
  },
});

export default styles;
