import {StyleSheet} from 'react-native';
import {Styles, Colors, Metrics} from '../../../../../themes';

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.appColor,
    flex: 1,
  },
  logo: {
    flex: 0.7,
    marginHorizontal: Metrics.margin.huge * 2,
    marginTop: Metrics.margin.huge * 1.5,
    marginBottom: Metrics.margin.huge,
  },
});

export default styles;
