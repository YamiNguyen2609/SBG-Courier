import {StyleSheet} from 'react-native';
import {Styles, Colors, Metrics} from '../../../../../../themes';

const styles = StyleSheet.create({
  container: {
    paddingBottom: 10,
  },
  title: {
    backgroundColor: Colors.appColorFd,
    width: Metrics.screenWidth + Metrics.screenWidth / 2,
    height: Metrics.screenWidth,
    marginTop: -Metrics.screenWidth / 1.5,
    marginLeft: -Metrics.screenWidth / 4,
    borderRadius: Metrics.screenWidth / 2,
    justifyContent: 'flex-end',
    paddingBottom: Metrics.screenWidth / 6.5,
  },
  totalForm: {
    backgroundColor: Colors.appWhite,
    marginHorizontal: Metrics.margin.large,
    borderRadius: Metrics.borderRadius.regular,
    padding: Metrics.margin.large,
    width: Metrics.screenWidth - (Metrics.screenWidth * 8) / 100,
    elevation: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: -Metrics.margin.huge * 2,
  },
});

export default styles;
