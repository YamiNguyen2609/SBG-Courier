import {StyleSheet} from 'react-native';
import {Styles, Colors, Metrics} from '../../../../../../themes';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    backgroundColor: Colors.appWhite,
    elevation: 5,
    marginHorizontal: Metrics.margin.large,
    paddingVertical: Metrics.margin.regular,
    paddingHorizontal: Metrics.margin.huge,
    borderRadius: Metrics.borderRadius.regular,
    marginVertical: Metrics.margin.regular,
  },
  item_title: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: Metrics.margin.regular,
  },
  image: {
    marginRight: Metrics.margin.regular,
  },
  item_list: {
    paddingTop: Metrics.margin.regular,
  },
  container_image: {
    paddingTop: Metrics.margin.regular,
    paddingBottom: Metrics.margin.small,
  },
});

export default styles;
