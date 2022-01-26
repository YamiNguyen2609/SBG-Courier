import {StyleSheet} from 'react-native';
import {Styles, Colors, Metrics} from '../../../../../../themes';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F6F6F6',
    flex: 1,
    alignItems: 'center',
  },
  container_camera: {
    position: 'absolute',
    top: 0,
    width: Metrics.screenWidth,
    height: Metrics.screenHeight + Metrics.margin.huge * 5,
    zIndex: 999,
    backgroundColor: Colors.appWhite,
    flex: 1,
  },
  container_search: {
    width: Metrics.screenWidth,
    backgroundColor: Colors.appWhite,
    zIndex: 1000,
    paddingHorizontal: Metrics.margin.small,
    paddingRight: Metrics.margin.regular,
    paddingVertical: Metrics.margin.small + 2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  container_button: {
    position: 'absolute',
    top: Metrics.statusBarHeight,
    zIndex: 1000,
    paddingHorizontal: Metrics.margin.large,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: Metrics.screenWidth,
  },
  container_payment: {
    flex: 1,
    paddingVertical: Metrics.margin.regular,
    paddingHorizontal: Metrics.margin.regular,
  },
  button_add: {
    width: Metrics.screenWidth - Metrics.margin.regular * 2,
    marginVertical: Metrics.margin.large,
    flexDirection: 'row',
    ...Styles.center,
    backgroundColor: Colors.appPrimaryColor,
    height: 40,
    borderRadius: Metrics.borderRadius.small,
  },
  item: {
    paddingVertical: Metrics.margin.regular,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Metrics.margin.regular,
    backgroundColor: Colors.appWhite,
    width: Metrics.screenWidth - Metrics.margin.regular * 2,
    borderWidth: 1.5,
    borderRadius: Metrics.borderRadius.small,
    borderColor: Colors.appGrayColor,
  },
  circle: {
    width: Metrics.margin.huge,
    height: Metrics.margin.huge,
    borderWidth: 1.2,
    borderColor: Colors.appLightGrayColor,
    borderRadius: Metrics.margin.large,
    ...Styles.center,
  },
  payment_item: {
    paddingVertical: Metrics.margin.regular,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Metrics.margin.regular,
    borderWidth: 0.8,
    borderRadius: Metrics.borderRadius.small,
    borderColor: Colors.appLightGrayColor,
    marginBottom: Metrics.margin.regular,
  },
  footer: {
    marginTop: Metrics.margin.large,
    paddingVertical: Metrics.margin.regular,
    backgroundColor: Colors.appWhite,
    width: Metrics.screenWidth - Metrics.margin.regular * 2,
    borderWidth: 0.8,
    borderRadius: Metrics.borderRadius.small,
    borderColor: Colors.appLightGrayColor,
  },
  barCode_border: {
    position: 'absolute',
    top: -1,
    left: -1,
    width: Metrics.screenWidth - Metrics.margin.large * 2 + 2,
    borderWidth: 2,
    borderColor: Colors.appGreen,
    borderRadius: Metrics.borderRadius.small,
    height: 122,
    zIndex: 999,
  },
  container_barCode: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  },
  container_background: {
    flex: 1,
    backgroundColor: Colors.overlay6,
  },
  barCode: {
    flexDirection: 'row',
    width: '100%',
    height: 120,
  },
  barCode_scan: {
    width: Metrics.screenWidth - Metrics.margin.large * 2,
  },
  barCode_topLeft: {
    position: 'absolute',
    top: -4,
    left: -4,
    width: 40,
    height: 20,
    borderLeftWidth: 4,
    borderTopWidth: 4,
    borderTopColor: Colors.appColor,
    borderLeftColor: Colors.appColor,
    borderTopLeftRadius: Metrics.borderRadius.regular,
    zIndex: 999,
  },
  barCode_topRight: {
    position: 'absolute',
    top: -4,
    right: -4,
    width: 40,
    height: 20,
    borderRightWidth: 4,
    borderTopWidth: 4,
    borderTopColor: Colors.appColor,
    borderRightColor: Colors.appColor,
    borderTopRightRadius: Metrics.borderRadius.regular,
    zIndex: 999,
  },
  barCode_bottomLeft: {
    position: 'absolute',
    bottom: -4,
    left: -4,
    width: 40,
    height: 20,
    borderLeftWidth: 4,
    borderBottomWidth: 4,
    borderBottomColor: Colors.appColor,
    borderLeftColor: Colors.appColor,
    borderBottomLeftRadius: Metrics.borderRadius.regular,
    zIndex: 999,
  },
  barCode_bottomRight: {
    position: 'absolute',
    bottom: -4,
    right: -4,
    width: 40,
    height: 20,
    borderRightWidth: 4,
    borderBottomWidth: 4,
    borderBottomColor: Colors.appColor,
    borderRightColor: Colors.appColor,
    borderBottomRightRadius: Metrics.borderRadius.regular,
    zIndex: 999,
  },
  indicator: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    zIndex: 999,
    backgroundColor: Colors.overlay2,
  },
  container_button_action: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: Metrics.screenWidth - Metrics.margin.regular * 2,
    marginBottom: Metrics.margin.large,
  },
  button_action: {
    ...Styles.center,
    borderWidth: 1.5,
    paddingVertical: Metrics.margin.tiny,
    borderRadius: Metrics.margin.small,
    borderColor: Colors.appGrayColor,
    marginRight: Metrics.margin.regular,
  },
  container_table: {
    width: Metrics.screenWidth - Metrics.margin.regular * 2,
    marginVertical: Metrics.margin.large,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  icon: {
    width: 25,
    height: 25,
    marginTop: Metrics.margin.regular - 1,
  },
  square: {
    backgroundColor: Colors.appLightGrayColor,
    width: (Metrics.screenWidth - Metrics.margin.huge * 2) / 5,
    ...Styles.center,
    height: (Metrics.screenWidth - Metrics.margin.huge * 2) / 5,
    borderRadius: Metrics.borderRadius.small,
  },
});

export default styles;
