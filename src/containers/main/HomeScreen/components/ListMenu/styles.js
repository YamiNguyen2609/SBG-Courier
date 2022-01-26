import {StyleSheet} from 'react-native';
import {Styles, Colors, Metrics} from '../../../../../themes';
import {isTablet} from '../../../../../themes/iPhoneXHelper';

let height = Metrics.screenHeight - (Metrics.screenWidth * 860) / 1500;
let listHeight = isTablet()
  ? Metrics.screenWidth - Metrics.margin.huge * 5 + 1.6
  : Metrics.screenWidth - Metrics.margin.regular * 2 + 1.6;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    ...Styles.center,
    height: listHeight / 2.5,
    width: Metrics.screenWidth / 3,
  },
  itemTab: {
    ...Styles.center,
    height: listHeight / 3.2,
    width: Metrics.screenWidth / 3,
  },
  logo: {
    width: ((listHeight / 3) * 60) / 100,
    height: ((listHeight / 3) * 60) / 100,
    marginBottom: Metrics.margin.regular,
  },
  logoTab: {
    width: ((listHeight / 3) * 50) / 100,
    height: ((listHeight / 3) * 50) / 100,
    marginVertical: Metrics.margin.regular,
  },
  tmp_view: {
    height: (height - listHeight) / 2,
  },
});

export default styles;
