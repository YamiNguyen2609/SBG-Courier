import {StyleSheet} from 'react-native';
import {Styles, Colors, Metrics} from '../../../../../../themes';

const styles = StyleSheet.create({
  // container: {
  //   height: 145,
  // },
  barCode: {
    padding: Metrics.margin.regular,
  },
  button_image: {
    marginHorizontal: Metrics.margin.small,
    marginVertical: Metrics.margin.small,
  },
  image: {
    width: (Metrics.screenWidth - Metrics.margin.small * 10) / 3,
    height: 100,
    borderRadius: Metrics.borderRadius.regular,
  },
  img_remove: {
    backgroundColor: Colors.overlay2,
    flex: 1,
    ...Styles.center,
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
  listImage: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: Metrics.margin.regular,
    paddingTop: Metrics.margin.small,
  },
  button: {
    ...Styles.center,
    paddingHorizontal: Metrics.margin.small,
  },
});

export default styles;
