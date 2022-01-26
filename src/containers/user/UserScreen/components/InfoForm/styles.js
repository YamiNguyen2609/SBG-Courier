import {StyleSheet} from 'react-native';
import {Metrics, Colors, Styles} from '../../../../../themes';
import {isTablet} from '../../../../../themes/iPhoneXHelper';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  container_form: {
    flexDirection: 'row',
    marginVertical: Metrics.margin.regular,
    alignItems: 'center',
    paddingHorizontal: isTablet() ? Metrics.margin.huge : Metrics.margin.small,
  },
  image: {
    width: (100 * 392) / Metrics.screenWidth,
    height: (100 * 392) / Metrics.screenWidth,
    borderRadius: Metrics.borderRadius.regular * 10,
    marginTop: Metrics.margin.regular,
  },
  imageTab: {
    width: ((100 * 392) / Metrics.screenWidth) * 3,
    height: ((100 * 392) / Metrics.screenWidth) * 3,
    borderRadius: Metrics.borderRadius.regular * 10,
    marginTop: Metrics.margin.regular,
  },
  container_info: {
    width: Metrics.screenWidth,
    marginBottom: isTablet() ? Metrics.margin.huge : Metrics.margin.small,
  },
});

export default styles;
