import {StyleSheet, Platform} from 'react-native';
import {Styles, Colors, Metrics} from '../../../../../themes';

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.appWhite,
    borderRadius: Metrics.borderRadius.small,
    borderWidth: 0.8,
    borderColor: Colors.overlay2,
    marginHorizontal: Metrics.margin.small,
    marginTop: Metrics.margin.regular,
  },
  item: {
    borderTopWidth: 0.8,
    borderTopColor: Colors.overlay2,
  },
});

export default styles;
