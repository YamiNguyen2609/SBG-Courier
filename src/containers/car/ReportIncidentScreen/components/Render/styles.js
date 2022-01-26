import {StyleSheet, Platform} from 'react-native';
import {Styles, Colors, Metrics} from '../../../../../themes';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.appWhite,
  },
  logoBack: {
    position: 'absolute',
    top: Metrics.statusBarHeight,
    right: 10,
    zIndex: 999,
    ...Styles.center,
  },
  header: {
    backgroundColor: Colors.appColor,
    paddingVertical: Metrics.margin.huge,
    paddingTop: Metrics.margin.huge + Metrics.margin.regular + 0.5,
    ...Styles.center,
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: Metrics.margin.small,
    marginVertical: Metrics.margin.huge,
    marginHorizontal: Metrics.margin.small,
    borderRadius: Metrics.borderRadius.small,
    borderWidth: 1,
    borderColor: Colors.overlay2,
  },
  button: {
    marginBottom: Metrics.margin.huge,
    ...Styles.center,
  },
});

export default styles;
