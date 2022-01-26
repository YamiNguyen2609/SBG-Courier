import {StyleSheet} from 'react-native';
import {Styles, Colors, Metrics} from '../../../../../../themes';

const styles = StyleSheet.create({
  container: {
    borderWidth: 0.8,
    borderColor: Colors.appLightGrayColor,
    borderRadius: Metrics.borderRadius.small,
    backgroundColor: Colors.appWhite,
  },
  header: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    margin: 0,
    padding: 0,
    justifyContent: 'flex-end',
  },
});

export default styles;
