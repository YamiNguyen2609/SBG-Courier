import {StyleSheet, Platform} from 'react-native';
import {Styles, Colors, Metrics} from '../../../../../../themes';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.appLightGrayColor,
  },
  container_header: {
    backgroundColor: Colors.appPrimaryColor,
    paddingVertical: Metrics.margin.regular,
    paddingLeft: Metrics.margin.regular,
  },
  item: {
    width: Metrics.screenWidth - Metrics.margin.regular * 2,
    marginHorizontal: Metrics.margin.regular,
    backgroundColor: Colors.appWhite,
    borderRadius: Metrics.borderRadius.small,
  },
  icon: {
    width: 40,
    height: 40,
  },
  header: {
    paddingVertical: Metrics.margin.regular,
    justifyContent: 'center',
    borderBottomColor: Colors.overlay2,
    borderBottomWidth: 0.8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingRight: Metrics.margin.regular,
  },
  form: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: Metrics.margin.regular,
  },
});

export default styles;
