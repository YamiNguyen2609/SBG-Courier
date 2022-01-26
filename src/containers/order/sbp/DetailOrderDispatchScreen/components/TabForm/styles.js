import {StyleSheet} from 'react-native';
import {Styles, Colors, Metrics} from '../../../../../../themes';

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.appWhite,
    flexDirection: 'row',
  },
  button: {
    borderBottomColor: Colors.overlay1,
    borderBottomWidth: 5,
    flex: 1,
  },
});

export default styles;
