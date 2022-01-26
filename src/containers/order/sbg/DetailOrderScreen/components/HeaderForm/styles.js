import {StyleSheet} from 'react-native';
import {Styles, Colors, Metrics} from '../../../../../../themes';

const styles = StyleSheet.create({
  container: {
    paddingTop: Metrics.statusBarHeight * 1.2,
    paddingBottom: Metrics.margin.huge,
    backgroundColor: Colors.appColorFd,
    paddingLeft: Metrics.margin.regular,
    ...Styles.center,
  },
});

export default styles;
