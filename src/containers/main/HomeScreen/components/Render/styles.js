import {StyleSheet} from 'react-native';
import {Styles, Colors, Metrics} from '../../../../../themes';
import {isTablet} from '../../../../../themes/iPhoneXHelper';

let height = Metrics.screenHeight - (Metrics.screenWidth * 860) / 1500;
let listHeight = isTablet()
  ? Metrics.screenWidth - Metrics.margin.huge * 10 + 1.6
  : Metrics.screenWidth - Metrics.margin.regular * 2 + 1.6;

const styles = StyleSheet.create({
  container: {
    ...Styles.container,
  },
  tmp_view: {
    flex: 1,
  },
});

export default styles;
