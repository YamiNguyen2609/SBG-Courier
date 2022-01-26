import {StyleSheet} from 'react-native';
import {Styles, Colors, Metrics} from '../../../../../../themes';

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.appWhite,
    flexDirection: 'row',
  },
  tab: {
    flexDirection: 'row',
    flex: 1,
  },
  value: {
    backgroundColor: '#d5e3ff',
    ...Styles.center,
    position: 'absolute',
    right: 0,
  },
});

export default styles;
