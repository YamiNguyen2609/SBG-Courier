import {StyleSheet} from 'react-native';
import {Metrics, Colors, Styles} from '../../themes';

const styles = StyleSheet.create({
  container: {
    ...Styles.center,
    // paddingHorizontal: 40,
    // backgroundColor: Colors.appWhite,
    flex: 1,
  },
  icon: {
    width: 100,
    height: 100,
    marginBottom: Metrics.margin.large,
  },
  title: {
    marginBottom: Metrics.margin.large,
  },
  content: {
    textAlign: 'center',
  },
});

export default styles;
