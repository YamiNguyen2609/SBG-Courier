import {StyleSheet} from 'react-native';
import {Metrics, Colors, Styles} from '../../../../../../themes';

const styles = StyleSheet.create({
  item: {
    padding: Metrics.margin.huge,
  },
  empty_container: {
    height: Metrics.screenHeight - 60,
    backgroundColor: Colors.appWhite,
    paddingVertical: Metrics.screenHeight - 60,
  },
});

export default styles;
