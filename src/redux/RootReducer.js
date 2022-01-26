import {combineReducers} from 'redux';

import app from './app';
import navigation from './navigation';

import loginUser from './user/redux/loginUser';
import changePassword from './user/redux/changePassword';
import getListHistory from './user/redux/getListHistory';
import checkExistPhone from './user/redux/checkExistPhone';
import resetPassword from './user/redux/resetPassword';
import getDetail from './user/redux/getDetail';

import trafficJam from './car/redux/trafficJam';
import readImage from './car/redux/readImage';
import updateFuel from './car/redux/updateFuel';
import carHandle from './car/redux/carHandle';
import reportIncident from './car/redux/reportIncident';
import getListIncident from './car/redux/getListIncident';
import updateLocation from './car/redux/updateLocation';

import getListOrder from './order/redux/getListOrder';
import uploadManifest from './order/redux/uploadManifest';
import getListBillId from './order/redux/getListBillId';
import searchBill from './order/redux/searchBill';
import getImage from './order/redux/getImage';
import dispatchOrder from './order/redux/dispatchOrder';
import getListDispatchOrder from './order/redux/getListDispatchOrder';
import getListDispatchOrderDismiss from './order/redux/getListDispatchOrderDismiss';
import getListDispatchOrderComplete from './order/redux/getListDispatchOrderComplete';
import uploadOrder from './order/redux/uploadOrder';
import updateOrder from './order/redux/updateOrder';
import cancelOrder from './order/redux/cancelOrder';
import getListPaymentMethod from './order/redux/getListPaymentMethod';
import getListReasonCancelOrder from './order/redux/getListReasonCancelOrder';
import searchOrder from './order/redux/searchOrder';
import uploadPrice from './order/redux/uploadPrice';
import collectOrder from './order/redux/collectOrder';
import checkExistHAWB from './order/redux/checkExistHAWBs';
import checkTransfer from './order/redux/checkTransfer';
import transferOrder from './order/redux/transferOrder';
import checkInOrder from './order/redux/checkInOrder';
import getHistoryCollect from './order/redux/getListCollectHistory';
import getDetailOrder from './order/redux/getDetail';
import listenOrderDispatch from './order/redux/listenOrderDispatch';
import getListStations from './order/redux/getListStations';
import addImageOrder from './order/redux/addImageOrder';
import logOrder from './order/redux/orderLog';
import getManifestNotes from './order/redux/getManifestNotes';
import getProcessSpecials from './order/redux/getProcessSpecials';
import reportOrder from './order/redux/reportOrder';
import getListCheckin from './order/redux/getListCheckin';
import checkinFinish from './order/redux/checkinFinish';
import getUnit from './order/redux/getUnit';
import getSelling from './order/redux/getSelling';
import getOrderNumber from './order/redux/getOrderNumber';

const rootReducer = combineReducers({
  app,
  navigation,
  loginUser,
  trafficJam,
  readImage,
  updateFuel,
  carHandle,
  reportIncident,
  getListIncident,
  updateLocation,
  getListOrder,
  uploadManifest,
  getListBillId,
  searchBill,
  getImage,
  changePassword,
  getListHistory,
  dispatchOrder,
  checkExistPhone,
  resetPassword,
  getListDispatchOrder,
  uploadOrder,
  updateOrder,
  cancelOrder,
  getListPaymentMethod,
  getListReasonCancelOrder,
  searchOrder,
  uploadPrice,
  getDetail,
  collectOrder,
  checkExistHAWB,
  checkTransfer,
  transferOrder,
  checkInOrder,
  getHistoryCollect,
  getDetailOrder,
  getListDispatchOrderDismiss,
  getListDispatchOrderComplete,
  listenOrderDispatch,
  getListStations,
  addImageOrder,
  logOrder,
  getManifestNotes,
  getProcessSpecials,
  reportOrder,
  getListCheckin,
  checkinFinish,
  getUnit,
  getSelling,
  getOrderNumber,
});

export default rootReducer;
