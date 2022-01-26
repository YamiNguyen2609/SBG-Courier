import {StyleSheet} from 'react-native';
import {Styles, Colors, Metrics} from '../../../../../../themes';

const styles = StyleSheet.create({
  container: {
    ...Styles.center,
    marginHorizontal: Metrics.margin.huge,
    borderWidth: 0.8,
    borderColor: Colors.overlay2,
    borderRadius: Metrics.borderRadius.small,
    width: Metrics.screenWidth - (Metrics.margin.huge - 1) * 2,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 50,
    borderBottomColor: Colors.overlay2,
    borderBottomWidth: 0.8,
    width: '100%',
    alignItems: 'center',
  },
  body: {
    width: '100%',
  },
  form: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: Metrics.margin.small,
  },
});

export default styles;
