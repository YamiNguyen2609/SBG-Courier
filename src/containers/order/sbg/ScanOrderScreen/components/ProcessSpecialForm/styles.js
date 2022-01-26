import {StyleSheet} from 'react-native';
import {Styles, Colors, Metrics} from '../../../../../../themes';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: Metrics.screenWidth,
    marginHorizontal: Metrics.margin.small,
    flexDirection: 'row',
    paddingTop: Metrics.margin.regular,
  },
  item: {
    paddingHorizontal: Metrics.margin.regular,
    paddingVertical: Metrics.margin.tiny,
    borderRadius: Metrics.screenWidth,
    marginRight: Metrics.margin.regular,
    flexDirection: 'row',
    borderColor: Colors.appColor,
    borderWidth: 2,
  },
});

export default styles;
