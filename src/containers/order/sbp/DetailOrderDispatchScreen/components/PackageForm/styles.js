import {StyleSheet} from 'react-native';
import {Styles, Colors, Metrics} from '../../../../../../themes';

const styles = StyleSheet.create({
  card: {
    // flex: 1,
    borderRadius: Metrics.borderRadius.small,
    paddingBottom: Metrics.margin.huge,
  },
  form: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    width: 140,
  },
  input: {
    borderBottomColor: Colors.overlay2,
    borderBottomWidth: 0.8,
    flex: 1,
  },
  container_input: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-around',
    paddingHorizontal: Metrics.margin.regular - 1,
    paddingBottom: Metrics.margin.regular,
  },
  iconBack: {
    marginRight: Metrics.margin.regular,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomColor: Colors.overlay1,
    borderBottomWidth: 0.8,
    paddingBottom: Metrics.margin.regular,
    marginBottom: Metrics.margin.regular,
  },
});

export default styles;
