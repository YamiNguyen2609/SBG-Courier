import {StyleSheet} from 'react-native';
import {Styles, Colors, Metrics} from '../../../../../themes';
import {isTablet} from '../../../../../themes/iPhoneXHelper';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    flexDirection: 'column',
  },
  container_form: {
    alignItems: 'center',
    paddingTop: Metrics.margin.huge * 1.5,
  },
  container_button: {
    flexDirection: 'row',
    paddingHorizontal: Metrics.margin.huge * 3,
    paddingVertical: Metrics.margin.huge,
  },
  input_password: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoPassword: {
    position: 'absolute',
    right: Metrics.margin.regular,
    top: 16,
  },
  container_input: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: isTablet()
      ? Metrics.margin.huge * 3
      : Metrics.margin.huge * 1.5,
    marginBottom: isTablet() ? Metrics.margin.huge * 1.5 : Metrics.margin.huge,
    paddingHorizontal: Metrics.margin.regular,
    backgroundColor: Colors.appWhite,
    borderRadius: Metrics.borderRadius.small,
  },
  button: {
    marginTop: Metrics.margin.huge,
  },
});

export default styles;
