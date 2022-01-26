import {StyleSheet} from 'react-native';
import {Styles, Colors, Metrics} from '../../../../../../themes';

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    marginTop: Metrics.margin.regular,
  },
  select: {
    borderRadius: Metrics.borderRadius.small,
    borderWidth: 0.8,
    borderColor: Colors.overlay2,
    marginHorizontal: Metrics.margin.small,
  },
});

export default styles;
