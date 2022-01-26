import Colors from './Colors';
import {Metrics} from '.';

const ApplicationStyles = {
  fullScreenContainer: {
    flex: 1,
    marginTop: Metrics.statusBarHeight,
  },
  container: {
    flex: 1,
    backgroundColor: Colors.appWhite,
    position: 'relative',
  },
  modal: {
    margin: 0,
    padding: 0,
  },
  radiusContainer: {
    flex: 1,
    backgroundColor: 'white',
    borderTopLeftRadius: Metrics.borderRadius.medium,
    borderTopRightRadius: Metrics.borderRadius.medium,
    marginTop: Metrics.margin.regular,
    marginHorizontal: Metrics.margin.regular,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  shadow: {
    shadowColor: 'black',
    shadowOffset: {width: 3, height: 3},
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  userImage: {
    width: 45,
    height: 45,
    backgroundColor: Colors.appBlack,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 22,
  },
};

export default ApplicationStyles;
