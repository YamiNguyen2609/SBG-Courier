import {StyleSheet} from 'react-native';
import {Metrics, Colors, Styles} from '../../../../../themes';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    paddingHorizontal: Metrics.margin.regular,
    paddingVertical: Metrics.margin.large,
    backgroundColor: Colors.overlay4,
  },
  // container_item: {
  //   paddingHorizontal: Metrics.margin.regular,
  // },
  container_option: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-between',
    paddingVertical: Metrics.margin.large,
    alignItems: 'center',
    paddingHorizontal: Metrics.margin.regular,
  },
  option: {
    flexDirection: 'row',
    paddingVertical: 25,
    justifyContent: 'space-between',
    paddingRight: Metrics.margin.regular,
    alignItems: 'center',
  },
  icon: {
    width: 30,
    height: 30,
    marginRight: Metrics.margin.regular,
  },
  iconTab: {
    width: 40,
    height: 40,
    // marginRight: Metrics.margin.regular,
  },
  icon_forward: {
    backgroundColor: Colors.overlay1,
    width: 35,
    height: 35,
    ...Styles.center,
    borderRadius: Metrics.borderRadius.regular,
  },
  header: {
    ...Styles.center,
    paddingVertical: Metrics.margin.large,
  },
  status: {
    paddingBottom: Metrics.margin.regular,
  },
  version: {
    justifyContent: 'flex-end',
  },
});

export default styles;
