import {StyleSheet} from 'react-native';
import {Styles, Colors, Metrics} from '../../../themes';

const styles = StyleSheet.create({
  title: {
    width: Metrics.screenWidth + Metrics.screenWidth / 2,
    height: Metrics.screenWidth + Metrics.screenWidth / 4,
    marginTop: -Metrics.screenWidth / 1.1,
    marginLeft: -Metrics.screenWidth / 4,
    borderRadius: Metrics.screenWidth,
    justifyContent: 'flex-end',
    paddingBottom: Metrics.screenWidth / 6.2,
    alignItems: 'center',
    zIndex: 990,
  },
  titleTab: {
    width: Metrics.screenWidth + Metrics.screenWidth / 2,
    height: Metrics.screenWidth + Metrics.screenWidth / 4,
    marginTop: -Metrics.screenWidth / 1.04,
    marginLeft: -Metrics.screenWidth / 4,
    borderRadius: Metrics.screenWidth,
    justifyContent: 'flex-end',
    paddingBottom: Metrics.screenWidth / 7.8,
    alignItems: 'center',
    zIndex: 990,
  },
  image: {
    width: 130,
    height: 130,
    position: 'absolute',
    bottom: -Metrics.margin.huge * 3,
  },
});

export default styles;
