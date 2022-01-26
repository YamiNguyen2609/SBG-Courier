import {StyleSheet} from 'react-native';
import {Styles, Colors, Metrics} from '../../../../../../themes';

const styles = StyleSheet.create({
  logoBack: {
    position: 'absolute',
    top: Metrics.statusBarHeight,
    right: 10,
    zIndex: 999,
    ...Styles.center,
  },
  header: {
    paddingTop: Metrics.statusBarHeight,
    paddingBottom: Metrics.margin.huge,
    alignItems: 'center',
    backgroundColor: Colors.appColor,
  },
});

export default styles;
