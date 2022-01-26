import {StyleSheet} from 'react-native';
import {Styles, Colors, Metrics} from '../../../../../../themes';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F6F6F6',
  },
  header: {
    backgroundColor: Colors.appColor,
    paddingVertical: Metrics.margin.huge,
    paddingTop: Metrics.margin.huge + Metrics.margin.regular + 0.5,
    ...Styles.center,
  },
  logoBack: {
    position: 'absolute',
    top: Metrics.statusBarHeight,
    right: 10,
    zIndex: 10000000000,
    ...Styles.center,
  },
  form: {
    width: Metrics.screenWidth - Metrics.margin.regular * 2,
    backgroundColor: Colors.appWhite,
    marginHorizontal: Metrics.margin.regular,
  },
  containerButton: {
    elevation: 10,
    alignItems: 'center',
    paddingHorizontal: Metrics.margin.regular,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: Metrics.margin.regular,
    backgroundColor: Colors.appWhite,
  },
  titleInput: {
    width: Metrics.screenWidth - Metrics.margin.regular * 2,
    height: 55,
    borderWidth: 0.8,
    borderColor: Colors.overlay2,
    backgroundColor: Colors.appWhite,
    marginHorizontal: Metrics.margin.regular,
    marginTop: Metrics.margin.large,
    justifyContent: 'center',
    borderRadius: Metrics.borderRadius.small,
  },
  addPackage: {
    width: Metrics.screenWidth - Metrics.margin.regular * 2,
    height: 55,
    backgroundColor: Colors.appColor,
    marginVertical: Metrics.margin.large,
    marginHorizontal: Metrics.margin.regular,
    borderRadius: Metrics.margin.small,
    ...Styles.center,
  },
});

export default styles;
