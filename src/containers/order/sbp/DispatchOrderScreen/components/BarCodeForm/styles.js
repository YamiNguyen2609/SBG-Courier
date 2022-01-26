import {StyleSheet} from 'react-native';
import {Styles, Colors, Metrics} from '../../../../../../themes';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: Metrics.margin.regular,
    paddingHorizontal: Metrics.margin.small,
    backgroundColor: Colors.appBackgroundGrayColor,
    position: 'absolute',
    bottom: 0,
    width: Metrics.screenWidth,
  },
});

export default styles;
