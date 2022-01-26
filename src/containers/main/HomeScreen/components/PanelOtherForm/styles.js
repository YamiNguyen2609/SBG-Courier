import {StyleSheet} from 'react-native';
import {Styles, Colors, Metrics} from '../../../../../themes';

const styles = StyleSheet.create({
  modal: {
    margin: 0,
    justifyContent: 'flex-end',
  },
  container: {
    backgroundColor: Colors.appBackgroundGrayColor,
    alignItems: 'center',
    borderTopRightRadius: Metrics.margin.large,
    borderTopLeftRadius: Metrics.margin.large,
    // paddingBottom: (Metrics.screenHeight * 8) / 100,
  },
  divider: {
    borderRadius: 5,
    marginTop: Metrics.margin.regular,
  },
  menus: {
    marginTop: -Metrics.margin.huge * 1.7,
  },
  logoBack: {
    position: 'absolute',
    right: 10,
    zIndex: 999,
    ...Styles.center,
  },
});

export default styles;
