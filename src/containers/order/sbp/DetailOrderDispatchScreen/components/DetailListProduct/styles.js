import {StyleSheet} from 'react-native';
import {Styles, Colors, Metrics} from '../../../../../../themes';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F6F6F6',
    flex: 1,
  },
  card: {
    flex: 1,
    borderWidth: 0.8,
    borderColor: Colors.overlay2,
    marginHorizontal: Metrics.margin.small,
    marginBottom: Metrics.margin.huge,
    paddingVertical: Metrics.margin.small,
    borderRadius: Metrics.borderRadius.small,
    backgroundColor: Colors.appWhite,
  },
  form: {
    flexDirection: 'row',
  },
  title: {
    width: 120,
  },
});

export default styles;
