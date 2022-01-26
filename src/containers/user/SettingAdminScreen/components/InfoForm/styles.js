import {StyleSheet} from 'react-native';
import {Metrics, Colors, Styles} from '../../../../../themes';

const styles = StyleSheet.create({
  container: {
    marginBottom: Metrics.margin.huge,
    paddingTop: Metrics.statusBarHeight + Metrics.margin.huge,
  },
  background_image: {
    position: 'absolute',
    width: '100%',
    top: -Metrics.margin.huge,
    left: 0,
    height: (720 * Metrics.screenWidth) / 1280,
  },
  infoForm: {
    backgroundColor: Colors.appColor,
    width: Metrics.screenWidth + Metrics.screenWidth / 1.5,
    height: Metrics.screenWidth,
    marginTop: -Metrics.screenWidth / 1.6,
    marginLeft: -Metrics.screenWidth / 3,
    paddingLeft: Metrics.screenWidth / 3,
    borderRadius: Metrics.screenWidth / 2,
    justifyContent: 'flex-end',
    paddingBottom: Metrics.screenWidth / 4,
  },
  infoFormTab: {
    backgroundColor: Colors.appColor,
    width: Metrics.screenWidth + Metrics.screenWidth / 3,
    height: Metrics.screenWidth,
    marginTop: -Metrics.screenWidth / 1.6,
    marginLeft: -Metrics.screenWidth / 6,
    paddingLeft: Metrics.screenWidth / 6,
    borderRadius: Metrics.screenWidth / 2,
    justifyContent: 'flex-end',
    paddingBottom: Metrics.screenWidth / 4,
  },
  container_avatar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Metrics.margin.huge,
  },
  avatar: {
    borderRadius: Metrics.screenWidth,
    marginRight: Metrics.margin.regular,
    padding: Metrics.margin.tiny,
    backgroundColor: Colors.appWhite,
  },
  image: {
    width: (60 * Metrics.screenWidth) / 392,
    height: (60 * Metrics.screenWidth) / 392,
    borderRadius: 30,
  },
  container_car: {
    marginTop: -Metrics.margin.huge * 2.8,
    justifyContent: 'flex-end',
    paddingHorizontal: Metrics.margin.regular,
    backgroundColor: Colors.appWhite,
    marginHorizontal: Metrics.margin.huge,
    borderRadius: Metrics.borderRadius.regular,
    elevation: 10,
  },
  container_tab_car: {
    marginTop: -Metrics.margin.huge * 5.8,
    justifyContent: 'flex-end',
    paddingHorizontal: Metrics.margin.regular,
    backgroundColor: Colors.appWhite,
    marginHorizontal: Metrics.margin.huge,
    borderRadius: Metrics.borderRadius.regular,
    elevation: 10,
  },
  container_image: {
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-between',
    paddingBottom: Metrics.margin.huge,
    paddingTop: Metrics.margin.regular,
    position: 'absolute',
    top: -45,
    left: 0,
    right: 0,
    bottom: 0,
  },
  image_mini: {
    width: (60 * Metrics.screenWidth) / 392,
    height: (60 * Metrics.screenWidth) / 392,
    backgroundColor: Colors.appWhite,
    borderRadius: Metrics.borderRadius.large * 10,
  },
  image_mini_view: {
    backgroundColor: Colors.appColor,
    padding: Metrics.margin.small,
    borderRadius: Metrics.borderRadius.large * 10,
  },
  container_title: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: Metrics.margin.huge * 1.2,
    paddingBottom: Metrics.margin.huge,
    borderRadius: Metrics.borderRadius.regular,
  },
  container_text: {
    ...Styles.center,
    flex: 1,
  },
});

export default styles;
