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
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  item: {
    ...Styles.center,
    height: listHeight / 2,
    width: listHeight / 2,
  },
  itemTab: {
    ...Styles.center,
    height: listHeight / 2.4,
    width: listHeight / 2,
  },
  logo: {
    width: ((listHeight / 2) * 60) / 100,
    height: ((listHeight / 2) * 60) / 100,
    marginBottom: Metrics.margin.regular,
  },
  logoTab: {
    width: ((listHeight / 2) * 60) / 100,
    height: ((listHeight / 2) * 60) / 100,
    marginVertical: Metrics.margin.regular,
  },
});

export default styles;
