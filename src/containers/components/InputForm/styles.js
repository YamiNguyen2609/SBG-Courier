import {StyleSheet} from 'react-native';
import {Styles, Colors, Metrics} from '../../../themes';
import {isTablet} from '../../../themes/iPhoneXHelper';

const styles = StyleSheet.create({
  container: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: Colors.appWhite,
    flex: 1,
    zIndex: 999,
    elevation: 30,
    padding: isTablet() ? Metrics.margin.large * 1.5 : Metrics.margin.large,
    position: 'absolute',
    bottom: 0,
    width: Metrics.screenWidth,
    backgroundColor: Colors.appWhite,
  },
  container_input: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderWidth: 0.8,
    borderColor: Colors.appLightGrayColor,
    borderRadius: Metrics.borderRadius.small,
    paddingVertical: isTablet() ? Metrics.margin.regular : Metrics.margin.small,
    backgroundColor: '#f6f7f9',
    paddingHorizontal: Metrics.margin.small,
    alignItems: 'center',
  },
  image_mini: {
    width: 30,
    marginLeft: Metrics.margin.small,
    height: 20,
  },
  image_tab_mini: {
    width: 60,
    height: 60,
    marginLeft: Metrics.margin.small,
  },
  container_button: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: Metrics.margin.huge,
  },
});

export default styles;
