import {StyleSheet, Platform} from 'react-native';
import {Styles, Colors, Metrics} from '../../../../../../themes';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6F6F6',
  },
  header: {
    paddingVertical: Metrics.margin.large,
    width: '100%',
  },
  body: {
    flex: 1,
  },
  form: {
    borderRadius: Metrics.borderRadius.small,
    width: Metrics.screenWidth - Metrics.margin.regular * 2,
    marginHorizontal: Metrics.margin.regular,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: Metrics.margin.large,
    width: '100%',
    alignItems: 'center',
  },
  input: {
    width: '100%',
    paddingHorizontal: Metrics.margin.small,
    borderRadius: Metrics.borderRadius.small,
    borderWidth: 1,
    borderColor: Colors.overlay2,
    paddingVertical: Metrics.margin.small,
    backgroundColor: Colors.appWhite,
    minHeight: 100,
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
  image: {
    width: 100,
    height: 80,
    borderRadius: Metrics.margin.regular,
  },
  container_button: {
    ...Styles.center,
    paddingVertical: Metrics.margin.huge,
  },
  container_reason: {
    borderRadius: Metrics.borderRadius.small,
    borderWidth: 0.8,
    borderColor: Colors.overlay2,
    marginBottom: Metrics.margin.regular,
    backgroundColor: Colors.appWhite,
  },
  // header_reason: {
  //   borderTopWidth: 0.8,
  //   borderTopColor: Colors.overlay2,
  //   height: 60,
  //   justifyContent: 'center',
  //   backgroundColor: '#f4f4f4',
  // },
  item_reason: {
    paddingVertical: Metrics.margin.regular,
  },
});

export default styles;
