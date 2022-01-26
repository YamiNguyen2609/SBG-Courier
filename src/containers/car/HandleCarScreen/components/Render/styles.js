import {StyleSheet} from 'react-native';
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
  autocomplete_container: {
    borderWidth: 0.8,
    marginTop: -7,
    borderTopColor: 'transparent',
    borderColor: Colors.appLightGrayColor,
    backgroundColor: Colors.appWhite,
    borderBottomLeftRadius: Metrics.borderRadius.regular,
    borderBottomRightRadius: Metrics.borderRadius.regular,
  },
});

export default styles;
