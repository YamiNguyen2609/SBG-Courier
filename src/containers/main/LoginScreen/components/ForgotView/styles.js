import {StyleSheet} from 'react-native';
import {Styles, Colors, Metrics} from '../../../../../themes';
import {isTablet} from '../../../../../themes/iPhoneXHelper';

const styles = StyleSheet.create({
  container: {
    flex: 0.9,
    backgroundColor: Colors.appWhite,
    borderTopLeftRadius: Metrics.borderRadius.regular,
    borderTopRightRadius: Metrics.borderRadius.regular,
  },
  container_animate: {
    flex: 1,
    width: Metrics.screenWidth * 2,
    flexDirection: 'row',
  },
  header: {
    paddingVertical: Metrics.margin.large,
    backgroundColor: Colors.appColor,
    borderTopLeftRadius: Metrics.borderRadius.regular,
    borderTopRightRadius: Metrics.borderRadius.regular,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  container_input: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: Metrics.margin.large,
    paddingHorizontal: Metrics.margin.regular,
    borderWidth: 0.8,
    borderColor: Colors.overlay2,
    borderRadius: Metrics.borderRadius.small,
    width: Metrics.screenWidth - Metrics.margin.large * 2,
  },
});

export default styles;
