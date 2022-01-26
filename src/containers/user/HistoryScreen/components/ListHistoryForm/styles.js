import {StyleSheet, Platform} from 'react-native';
import {Styles, Colors, Metrics} from '../../../../../themes';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.appWhite,
  },
  container_header: {
    backgroundColor: Colors.overlay2,
    paddingVertical: Metrics.margin.regular,
    paddingLeft: Metrics.margin.regular,
  },
  item: {
    paddingVertical: Metrics.margin.regular,
    flexDirection: 'row',
    paddingHorizontal: Metrics.margin.small,
    alignItems: 'center',
  },
  icon: {
    width: 40,
    height: 40,
  },
});

export default styles;
