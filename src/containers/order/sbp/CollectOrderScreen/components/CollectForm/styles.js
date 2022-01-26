import {StyleSheet} from 'react-native';
import {Styles, Colors, Metrics} from '../../../../../../themes';
import {isTablet} from '../../../../../../themes/iPhoneXHelper';

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    backgroundColor: Colors.appWhite,
    margin: 0,
    padding: 0,
  },
  header: {
    ...Styles.center,
    backgroundColor: Colors.appColor,
    paddingVertical: Metrics.margin.huge,
  },
  body: {
    flex: 1,
  },
  logoBack: {
    position: 'absolute',
    top: Metrics.margin.huge,
    right: 10,
    zIndex: 10000000000,
    ...Styles.center,
  },
  containerItem: {
    marginHorizontal: Metrics.margin.regular,
    width: Metrics.screenWidth - Metrics.margin.regular * 2,
    backgroundColor: Colors.appWhite,
    borderRadius: Metrics.borderRadius.small,
  },
  headerItem: {
    paddingVertical: Metrics.margin.small,
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
  close: {
    paddingRight: Metrics.margin.regular,
  },
  container_button: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: Metrics.margin.regular,
  },
});

export default styles;
