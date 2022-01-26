import {StyleSheet} from 'react-native';
import {Styles, Colors, Metrics} from '../../../../../../themes';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6F6F6',
  },
  input: {
    borderBottomWidth: 0.8,
    marginLeft: Metrics.margin.regular,
  },
  image: {
    width: 100,
    height: 80,
    borderRadius: Metrics.margin.regular,
  },
  container_button: {
    ...Styles.center,
    paddingVertical: Metrics.margin.huge,
  },
  header: {
    padding: Metrics.margin.large,
    paddingLeft: Metrics.margin.small,
  },
  body: {
    marginHorizontal: Metrics.margin.large,
    backgroundColor: Colors.appWhite,
    paddingVertical: Metrics.margin.regular,
    borderRadius: Metrics.borderRadius.small,
    alignItems: 'center',
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: Metrics.margin.large,
    width: '100%',
    alignItems: 'center',
  },
  modal: {
    margin: 0,
    padding: 0,
    zIndex: 999,
  },
  logoBack: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 999,
    ...Styles.center,
  },
  indicator: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    backgroundColor: Colors.overlay2,
    zIndex: 999,
  },
});

export default styles;
