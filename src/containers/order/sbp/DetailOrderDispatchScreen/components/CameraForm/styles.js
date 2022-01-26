import {StyleSheet} from 'react-native';
import {Styles, Colors, Metrics} from '../../../../../../themes';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  container_barCode: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  },
  container_background: {
    flex: 1,
    backgroundColor: Colors.overlay6,
  },
  barCode: {
    flexDirection: 'row',
    width: '100%',
    height: 120,
  },
  barCode_topLeft: {
    position: 'absolute',
    top: -4,
    left: -4,
    width: 40,
    height: 20,
    borderLeftWidth: 4,
    borderTopWidth: 4,
    borderTopColor: Colors.appColor,
    borderLeftColor: Colors.appColor,
    borderTopLeftRadius: Metrics.borderRadius.regular,
    zIndex: 999,
  },
  barCode_topRight: {
    position: 'absolute',
    top: -4,
    right: -4,
    width: 40,
    height: 20,
    borderRightWidth: 4,
    borderTopWidth: 4,
    borderTopColor: Colors.appColor,
    borderRightColor: Colors.appColor,
    borderTopRightRadius: Metrics.borderRadius.regular,
    zIndex: 999,
  },
  barCode_bottomLeft: {
    position: 'absolute',
    bottom: -4,
    left: -4,
    width: 40,
    height: 20,
    borderLeftWidth: 4,
    borderBottomWidth: 4,
    borderBottomColor: Colors.appColor,
    borderLeftColor: Colors.appColor,
    borderBottomLeftRadius: Metrics.borderRadius.regular,
    zIndex: 999,
  },
  barCode_bottomRight: {
    position: 'absolute',
    bottom: -4,
    right: -4,
    width: 40,
    height: 20,
    borderRightWidth: 4,
    borderBottomWidth: 4,
    borderBottomColor: Colors.appColor,
    borderRightColor: Colors.appColor,
    borderBottomRightRadius: Metrics.borderRadius.regular,
    zIndex: 999,
  },
});

export default styles;
