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
    paddingVertical: Metrics.margin.regular,
  },
  body: {
    flex: 1,
  },
  logoBack: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 999,
    ...Styles.center,
  },
  containerItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: Colors.appWhite,
    paddingVertical: Metrics.margin.regular,
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
    paddingHorizontal: Metrics.margin.regular,
    paddingVertical: Metrics.margin.small,
  },
});

export default styles;
