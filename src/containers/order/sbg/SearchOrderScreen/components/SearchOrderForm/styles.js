import {StyleSheet} from 'react-native';
import {Metrics, Colors, Styles} from '../../../../../../themes';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: Metrics.statusBarHeight,
    paddingBottom: Metrics.margin.regular,
    alignItems: 'center',
    backgroundColor: Colors.appColor,
    paddingHorizontal: Metrics.margin.regular,
  },
  search: {
    width: 30,
    height: 30,
  },
  container_input: {
    backgroundColor: Colors.appBackgroundGrayColor,
    borderRadius: Metrics.borderRadius.regular,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: Metrics.margin.regular,
    paddingVertical: Metrics.margin.tiny,
    alignItems: 'center',
  },
  back: {
    backgroundColor: 'transparent',
    marginLeft: Metrics.margin.regular,
  },
});

export default styles;
