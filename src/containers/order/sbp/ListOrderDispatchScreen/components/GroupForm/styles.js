import {StyleSheet} from 'react-native';
import {Styles, Colors, Metrics} from '../../../../../../themes';

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.appBackgroundGrayColor,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: Metrics.margin.regular,
  },
});

export default styles;
