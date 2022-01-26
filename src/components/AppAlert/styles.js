import {StyleSheet} from 'react-native';
import {Metrics, Colors, Styles} from '../../themes';

const styles = StyleSheet.create({
  modal: {
    margin: 0,
    padding: 0,
    paddingHorizontal: Metrics.margin.large,
  },
  container: {
    backgroundColor: Colors.appBackgroundGrayColor,
    borderRadius: Metrics.borderRadius.small,
    paddingTop: Metrics.margin.large,
  },
  button: {
    paddingVertical: Metrics.margin.regular,
    borderTopColor: Colors.overlay2,
    borderTopWidth: 0.8,
  },
  description: {
    marginBottom: Metrics.margin.regular,
  },
});

export default styles;
