import {StyleSheet} from 'react-native';
import {Styles, Colors, Metrics} from '../../../../../themes';
import {isTablet} from '../../../../../themes/iPhoneXHelper';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingBottom: Metrics.margin.huge * 9.5,
  },
  container_button: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: Metrics.margin.small,
    alignItems: 'flex-end',
    paddingBottom: isTablet() ? Metrics.margin.huge * 4 : 0,
  },
  button_tmp: {
    width: 60,
    height: 50,
  },
  button_camera: {
    padding: Metrics.margin.regular,
    borderWidth: isTablet() ? 2 : 0.8,
    borderColor: Colors.appWhite,
    borderRadius: Metrics.borderRadius.small,
  },
});

export default styles;
