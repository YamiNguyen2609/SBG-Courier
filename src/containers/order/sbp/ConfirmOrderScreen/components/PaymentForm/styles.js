import {StyleSheet} from 'react-native';
import {Styles, Colors, Metrics} from '../../../../../../themes';

const styles = StyleSheet.create({
  container_item: {
    backgroundColor: Colors.appWhite,
    borderRadius: Metrics.borderRadius.small,
    marginHorizontal: Metrics.margin.large,
    marginTop: Metrics.margin.regular,
    paddingVertical: Metrics.margin.regular,
  },
  header_item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingRight: Metrics.margin.regular,
    borderBottomWidth: 0.8,
    borderBottomColor: Colors.appLightGrayColor,
    paddingBottom: Metrics.margin.regular,
  },
  container_button_item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: 100,
  },
  button_item: {
    width: 40,
    height: 40,
    ...Styles.center,
    borderRadius: Metrics.borderRadius.large * 2,
  },
  item_form: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: Metrics.margin.regular,
    paddingHorizontal: Metrics.margin.small,
    paddingRight: 0,
  },
  container_form: {
    backgroundColor: Colors.appWhite,
    marginHorizontal: Metrics.margin.large,
    borderRadius: Metrics.borderRadius.small,
    paddingLeft: Metrics.margin.small,
    paddingRight: Metrics.margin.regular,
    paddingBottom: Metrics.margin.regular,
  },
  header_form: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: Metrics.margin.regular,
    alignItems: 'center',
  },
  row_form: {
    marginTop: Metrics.margin.regular,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  container_payments: {
    borderWidth: 0.8,
    borderRadius: Metrics.borderRadius.small,
    borderColor: Colors.appLightGrayColor,
    flex: 1,
    position: 'relative',
  },
  payment_header: {
    height: 55,
    justifyContent: 'center',
    width: '100%',
  },
  payment_item: {
    height: 55,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingRight: Metrics.margin.regular,
  },
  circle: {
    borderWidth: 2,
    borderRadius: Metrics.borderRadius.large,
    width: Metrics.borderRadius.large * 1.2,
    height: Metrics.borderRadius.large * 1.2,
    borderColor: Colors.appLightGrayColor,
    ...Styles.center,
  },
  selected: {
    borderRadius: Metrics.borderRadius.large,
    width: Metrics.borderRadius.large - 2,
    height: Metrics.borderRadius.large - 2,
    backgroundColor: Colors.appColor,
  },
});

export default styles;
