import {StyleSheet} from 'react-native';
import {Styles, Colors, Metrics} from '../../../../../../themes';

const styles = StyleSheet.create({
  container: Styles.container,
  header: {
    backgroundColor: Colors.appColor,
    paddingVertical: Metrics.margin.huge,
    ...Styles.center,
  },
  logoBack: {
    position: 'absolute',
    top: Metrics.margin.huge,
    right: 10,
    zIndex: 10000000000,
    ...Styles.center,
  },
  container_item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: Metrics.margin.large,
  },
});

export default styles;
