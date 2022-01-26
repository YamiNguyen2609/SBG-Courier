import {StyleSheet} from 'react-native';
import {Styles, Colors, Metrics} from '../../../../../../themes';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F6F6F6',
    flex: 1,
  },
  form: {
    flexDirection: 'row',
  },
  card: {
    backgroundColor: Colors.appWhite,
    marginHorizontal: Metrics.margin.large,
    paddingVertical: Metrics.margin.regular,
    borderRadius: Metrics.borderRadius.small,
  },
  container_button: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    position: 'absolute',
    right: Metrics.margin.small,
    width: 120,
  },
  title: {
    marginVertical: Metrics.margin.large,
    position: 'relative',
    justifyContent: 'center',
  },
  container_phone: {
    width: Metrics.screenWidth,
    backgroundColor: Colors.appWhite,
    elevation: 10,
    borderBottomWidth: 0.8,
    borderBottomColor: Colors.appLightGrayColor,
  },
  phone_header: {
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
