import {StyleSheet} from 'react-native';
import {Styles, Colors, Metrics} from '../../../../../../themes';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6F6F6',
  },
  container_box: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingRight: Metrics.margin.regular,
    paddingVertical: Metrics.margin.regular,
  },
  item: {
    backgroundColor: Colors.appWhite,
    elevation: 5,
    paddingVertical: Metrics.margin.regular,
    marginHorizontal: Metrics.margin.small,
    borderRadius: Metrics.margin.small,
    paddingRight: Metrics.margin.tiny,
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
  icon: {
    width: 25,
    height: 25,
  },
  box: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Metrics.margin.regular,
    paddingBottom: Metrics.margin.tiny,
  },
  container_button: {
    width: 100,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Metrics.margin.small,
    position: 'absolute',
    right: Metrics.margin.regular,
  },
  container_search: {
    flexDirection: 'row',
    margin: Metrics.margin.regular,
    alignItems: 'center',
    justifyContent: 'space-around',
    borderWidth: 0.8,
    borderColor: Colors.overlay2,
    borderRadius: Metrics.borderRadius.small,
  },
  camera: {
    width: 50,
    height: 50,
    backgroundColor: Colors.appColor,
    ...Styles.center,
    borderBottomRightRadius: Metrics.borderRadius.small,
    borderTopRightRadius: Metrics.borderRadius.small,
    marginRight: -0.08,
  },
  headerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
    borderBottomColor: Colors.overlay2,
    borderBottomWidth: 0.8,
    width: '100%',
    marginTop: -Metrics.margin.regular,
    paddingVertical: Metrics.margin.regular - 2,
  },
  button: {
    ...Styles.center,
    paddingVertical: Metrics.margin.regular,
    flex: 1,
    backgroundColor: Colors.appWhite,
  },
});

export default styles;
