import {StyleSheet} from 'react-native';
import {Styles, Colors, Metrics} from '../../../../../themes';
import {isTablet} from '../../../../../themes/iPhoneXHelper';

const styles = StyleSheet.create({
  container: {
    width: Metrics.screenWidth,
    height: (Metrics.screenWidth * 860) / 1500,
    // paddingHorizontal: Metrics.margin.large - 1,
    zIndex: -1,
  },
  background: {
    width: Metrics.screenWidth,
    height: (Metrics.screenWidth * 860) / 1500,
    paddingHorizontal: Metrics.margin.large - 1,
  },
  logoMini: {
    width: 80,
    height: 50,
    marginTop: Metrics.margin.regular * 2.5 - 1,
  },
  logoTabMini: {
    width: 135,
    height: 135,
    marginTop: Metrics.margin.small,
    marginBottom: -Metrics.margin.huge * 1.5,
  },
  title: {
    marginBottom: isTablet() ? Metrics.margin.regular : Metrics.margin.tiny,
  },
  circle: {
    width: 20,
    height: 20,
    borderRadius: Metrics.screenWidth,
    borderColor: Colors.appWhite,
    ...Styles.center,
    borderWidth: 0.8,
  },
  circleTab: {
    width: 30,
    height: 30,
    borderRadius: Metrics.screenWidth,
    borderColor: Colors.appWhite,
    ...Styles.center,
    borderWidth: 0.8,
  },
  circleChild: {
    width: 13,
    height: 13,
    borderRadius: Metrics.borderRadius.large,
  },
  circleTabChild: {
    width: 20,
    height: 20,
    borderRadius: Metrics.borderRadius.large,
  },
  search_form: {
    position: 'absolute',
    bottom: 0,
    paddingHorizontal: Metrics.margin.large,
    backgroundColor: Colors.appBackgroundGrayColor,
    borderRadius: Metrics.borderRadius.regular,
    width: Metrics.screenWidth - Metrics.margin.huge * 2,
    marginHorizontal: Metrics.margin.huge,
    elevation: 10,
    flexDirection: 'row',
    alignItems: 'center',
    left: 0,
    right: 0,
  },
  search_tab_form: {
    position: 'absolute',
    bottom: 15,
    paddingHorizontal: Metrics.margin.large,
    backgroundColor: Colors.appBackgroundGrayColor,
    borderRadius: Metrics.borderRadius.regular,
    width: Metrics.screenWidth - Metrics.margin.huge * 2,
    marginHorizontal: Metrics.margin.huge,
    elevation: 10,
    flexDirection: 'row',
    alignItems: 'center',
    left: 0,
    right: 0,
  },
  icon: {
    height: 30,
    width: 30,
  },
  iconTab: {
    width: 35,
    height: 35,
  },
});

export default styles;
