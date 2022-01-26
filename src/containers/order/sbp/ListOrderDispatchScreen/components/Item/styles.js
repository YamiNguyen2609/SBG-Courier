import {StyleSheet} from 'react-native';
import {Styles, Colors, Metrics} from '../../../../../../themes';

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.appWhite,
    elevation: 3,
    borderRadius: Metrics.borderRadius.small,
    marginHorizontal: Metrics.margin.regular,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: Metrics.margin.regular,
    paddingLeft: 0,
  },
  container_button: {
    width: 100,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    ...Styles.center,
    width: 40,
    height: 40,
    backgroundColor: Colors.appPrimaryColor,
    borderRadius: Metrics.borderRadius.large * 2,
  },
  body: {
    paddingVertical: Metrics.margin.regular,
  },
  row: {flexDirection: 'row', justifyContent: 'space-between'},
  container_modal: {
    width: Metrics.screenWidth,
    backgroundColor: Colors.appWhite,
    elevation: 10,
    borderBottomWidth: 0.8,
    borderBottomColor: Colors.appLightGrayColor,
  },
  modal_header: {
    paddingLeft: Metrics.margin.small,
    paddingRight: Metrics.margin.large,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: Metrics.margin.large,
    alignItems: 'center',
    borderBottomWidth: 1.6,
    borderBottomColor: Colors.appLightGrayColor,
  },
  item_phone: {
    height: 65,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: Metrics.margin.small,
    paddingRight: Metrics.margin.regular,
  },
});

export default styles;
