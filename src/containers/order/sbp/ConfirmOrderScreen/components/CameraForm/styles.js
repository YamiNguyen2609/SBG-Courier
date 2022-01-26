import {StyleSheet} from 'react-native';
import {Styles, Colors, Metrics} from '../../../../../../themes';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // marginTop: -Metrics.margin.huge * 2.5,
  },
  logoBack: {
    position: 'absolute',
    top: Metrics.statusBarHeight,
    right: 10,
    zIndex: 999,
    ...Styles.center,
  },
  camera: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    flex: 1,
    position: 'relative',
    zIndex: 991,
    overflow: 'hidden',
  },
  button: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    alignItems: 'center',
    width: Metrics.screenWidth,
    flexDirection: 'row',
    justifyContent: 'center',
    paddingHorizontal: Metrics.margin.regular,
  },
  listImage: {
    justifyContent: 'center',
    height: 100,
    paddingHorizontal: Metrics.margin.regular,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: Colors.appWhite,
  },
  icon_trash: {
    ...Styles.center,
    paddingLeft: Metrics.margin.large - 2,
  },
  img_check: {
    backgroundColor: Colors.overlay3,
    flex: 1,
    ...Styles.center,
  },
  icon_check: {
    borderRadius: 40,
    backgroundColor: Colors.appColor,
    width: 30,
    height: 30,
    ...Styles.center,
  },
  item: {
    width: 100,
    height: 80,
    marginVertical: Metrics.margin.regular,
    marginRight: Metrics.margin.regular,
    borderRadius: Metrics.margin.small,
  },
});

export default styles;
