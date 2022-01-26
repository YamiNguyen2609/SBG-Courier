import {StyleSheet} from 'react-native';
import {Styles, Colors, Metrics} from '../../../../../themes';

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: Metrics.margin.huge,
    width: Metrics.screenWidth,
    ...Styles.center,
    backgroundColor: Colors.appWhite,
  },
  container_input: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 0.8,
    borderBottomColor: Colors.overlay2,
    // paddingHorizontal: Metrics.margin.regular,
    marginHorizontal: Metrics.margin.large,
    marginBottom: Metrics.margin.huge,
  },
  logoPassword: {
    position: 'absolute',
    right: Metrics.margin.regular,
    top: 16,
  },
  button: {
    elevation: 10,
  },
  container_button: {
    flexDirection: 'row',
    marginTop: Metrics.margin.large,
    justifyContent: 'space-between',
    width: Metrics.screenWidth - Metrics.margin.large * 2,
    paddingHorizontal: Metrics.margin.regular,
  },
});

export default styles;
