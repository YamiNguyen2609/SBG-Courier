import {StyleSheet} from 'react-native';
import {Styles, Colors, Metrics} from '../../../../../../themes';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.appWhite,
  },
  // logoBack: {
  //   position: 'absolute',
  //   top: Metrics.statusBarHeight,
  //   right: 10,
  //   zIndex: 999,
  //   ...Styles.center,
  // },
  header: {
    backgroundColor: Colors.appColor,
    paddingVertical: Metrics.margin.huge,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Metrics.margin.regular,
    paddingTop: Metrics.margin.huge * 2,
  },
  modal: {
    position: 'absolute',
    backgroundColor: Colors.overlay6,
    width: Metrics.screenWidth,
    height: Metrics.screenHeight,
  },
  indicator: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    backgroundColor: Colors.overlay2,
  },
  tmp: {
    width: 40,
    height: 40,
    borderRadius: Metrics.margin.small,
    ...Styles.center,
  },
});

export default styles;
