import {StyleSheet} from 'react-native';
import {Styles, Colors, Metrics} from '../../../../../../themes';
import {isTablet} from '../../../../../../themes/iPhoneXHelper';

const styles = StyleSheet.create({
  container: {
    padding: Metrics.margin.regular,
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    borderRadius: Metrics.borderRadius.small,
    borderWidth: 0.8,
    borderColor: Colors.overlay2,
    flex: 1,
    marginRight: Metrics.margin.regular,
  },
});

export default styles;
