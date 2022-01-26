import {StyleSheet} from 'react-native';
import {Styles, Colors, Metrics} from '../../../../../../themes';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F6F6F6',
    flex: 1,
    paddingHorizontal: Metrics.margin.regular,
  },
  title: {
    flexDirection: 'row',
  },
  item: {
    borderRadius: Metrics.borderRadius.small,
    borderWidth: 0.8,
    marginVertical: Metrics.margin.regular,
  },
});

export default styles;
