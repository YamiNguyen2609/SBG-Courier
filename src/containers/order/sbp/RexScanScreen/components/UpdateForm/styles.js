import {StyleSheet} from 'react-native';
import {Styles, Colors, Metrics} from '../../../../../../themes';

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.appWhite,
    borderWidth: 0.8,
    borderRadius: Metrics.borderRadius.small,
    borderColor: Colors.overlay2,
    width: Metrics.screenWidth - Metrics.margin.regular * 2,
    marginHorizontal: Metrics.margin.regular,
    paddingHorizontal: Metrics.margin.regular,
  },
  title: {
    padding: Metrics.margin.regular,
    paddingVertical: Metrics.margin.tiny,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 0,
    marginLeft: -Metrics.margin.regular,
  },
  titleInput: {
    width: '100%',
    height: 51,
    borderWidth: 0.8,
    borderColor: Colors.overlay2,
    backgroundColor: Colors.appWhite,
  },
  input: {
    width: (Metrics.screenWidth - Metrics.margin.huge * 3.5) / 3,
    height: 51,
    borderWidth: 0.8,
    borderColor: Colors.overlay2,
  },
  inputWeight: {
    width: '100%',
    height: 51,
    borderWidth: 0.8,
    borderColor: Colors.overlay2,
    paddingLeft: Metrics.margin.regular,
  },
  containerButton: {
    elevation: 10,
    alignItems: 'center',
    paddingHorizontal: Metrics.margin.regular,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: Metrics.margin.regular,
    backgroundColor: Colors.appWhite,
  },
  containerInput: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  addPackage: {
    width: Metrics.screenWidth - Metrics.margin.regular * 2,
    height: 55,
    backgroundColor: Colors.appColor,
    marginVertical: Metrics.margin.large,
    marginHorizontal: Metrics.margin.regular,
    borderRadius: Metrics.margin.small,
    ...Styles.center,
  },
});

export default styles;
