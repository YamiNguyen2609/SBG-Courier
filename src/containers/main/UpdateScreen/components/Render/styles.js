import {StyleSheet} from 'react-native';
import {Styles, Colors, Metrics} from '../../../../../themes';

const styles = StyleSheet.create({
  container: {
    ...Styles.container,
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.appBackgroundGrayColor,
  },
  logo: {
    width: 250,
    height: 80,
  },
  processBar: {
    justifyContent: 'flex-end',
    width: Metrics.screenWidth - Metrics.margin.huge * 4,
    flex: 1,
  },
});

export default styles;
