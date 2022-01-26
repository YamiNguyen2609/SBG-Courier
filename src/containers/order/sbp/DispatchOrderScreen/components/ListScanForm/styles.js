import {StyleSheet} from 'react-native';
import {Styles, Colors, Metrics} from '../../../../../../themes';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.appWhite,
    borderTopLeftRadius: Metrics.borderRadius.large + 1,
    borderTopRightRadius: Metrics.borderRadius.large + 1,
  },
  header: {
    backgroundColor: Colors.appColor,
    paddingVertical: Metrics.margin.huge,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingHorizontal: Metrics.margin.regular,
    borderTopLeftRadius: Metrics.borderRadius.large,
    borderTopRightRadius: Metrics.borderRadius.large,
  },
  icon: {
    width: 40,
    height: 40,
    borderRadius: Metrics.borderRadius.small,
    backgroundColor: Colors.whiteOverlay3,
    ...Styles.center,
  },
  item: {
    paddingHorizontal: Metrics.margin.regular,
    paddingVertical: Metrics.margin.large,
  },
  indicator: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    backgroundColor: Colors.overlay2,
  },
});

export default styles;
