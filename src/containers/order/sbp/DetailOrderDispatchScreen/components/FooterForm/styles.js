import {StyleSheet} from 'react-native';
import {Styles, Colors, Metrics} from '../../../../../../themes';

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.appWhite,
    elevation: 10,
    alignItems: 'center',
    paddingHorizontal: Metrics.margin.small,
  },
  button_confirm: {
    paddingHorizontal: Metrics.margin.huge,
  },
  box: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    paddingVertical: Metrics.margin.regular,
  },
  buttonAdd: {
    flex: 1,
    flexDirection: 'row',
    ...Styles.center,
  },
});

export default styles;
