import {StyleSheet} from 'react-native';
import {Styles, Colors, Metrics} from '../../../../../../themes';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F6F6F6',
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.appColor,
    paddingTop: Metrics.margin.small,
    paddingBottom: Metrics.margin.large,
  },
  body: {
    flex: 1,
  },
  footer: {
    flexDirection: 'row',
    paddingVertical: Metrics.margin.regular,
    paddingHorizontal: Metrics.margin.regular,
    backgroundColor: Colors.appWhite,
    justifyContent: 'space-between',
  },
  title: {
    paddingVertical: Metrics.margin.regular,
    paddingLeft: Metrics.margin.small,
  },
  card: {
    borderRadius: Metrics.borderRadius.small,
    backgroundColor: Colors.appWhite,
    padding: Metrics.margin.regular,
    marginHorizontal: Metrics.margin.regular,
  },
  containerSearch: {
    backgroundColor: Colors.appWhite,
    marginHorizontal: Metrics.margin.large,
    borderRadius: Metrics.borderRadius.small,
    overflow: 'hidden',
  },
  containerInput: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  input: {
    borderRadius: 0,
    backgroundColor: 'transparent',
    flex: 1,
    marginLeft: Metrics.margin.small,
  },
  cameraIcon: {
    marginHorizontal: Metrics.margin.regular,
  },
  btnAdd: {
    width: 35,
    height: 35,
    ...Styles.center,
    backgroundColor: Colors.appColor,
    borderRadius: Metrics.borderRadius.small,
  },
});

export default styles;
