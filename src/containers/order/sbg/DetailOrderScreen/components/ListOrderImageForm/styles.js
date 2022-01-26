import {StyleSheet} from 'react-native';
import {Styles, Colors, Metrics} from '../../../../../../themes';

const imageSize = Metrics.screenWidth;

const styles = StyleSheet.create({
  container: {
    height: 100,
  },
  imagePagination: {
    width: 100,
    height: 80,
    borderRadius: Metrics.borderRadius.small,
    marginLeft: Metrics.margin.small,
    marginRight: Metrics.margin.tiny + 0.5,
    marginVertical: Metrics.margin.regular,
  },
  image: {
    width: imageSize,
    height: imageSize,
  },
});

export default styles;
