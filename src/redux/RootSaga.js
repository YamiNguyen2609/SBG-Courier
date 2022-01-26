import {fork, all} from 'redux-saga/effects';

import loginUser from './user/sagas/loginUser';
import changePassword from './user/sagas/changePassword';
import getListHistory from './user/sagas/getListHistory';
import checkExistPhone from './user/sagas/checkExistPhone';
import getDetail from './user/sagas/getDetail';
import resetPassword from './user/sagas/resetPassword';

import trafficJam from './car/sagas/trafficJam';
import readImage from './car/sagas/readImage';
import updateFuel from './car/sagas/updateFuel';
import carHandle from './car/sagas/carHandle';
import reportIncident from './car/sagas/reportIncident';
import getListIncident from './car/sagas/getListIncident';
import updateLocation from './car/sagas/updateLocation';

import getListOrder from './order/sagas/getListOrder';
import uploadManifest from './order/sagas/uploadManifest';
import getListBillId from './order/sagas/getListBillId';
import searchBill from './order/sagas/searchBill';
import getImage from './order/sagas/getImage';
import dispatchOrder from './order/sagas/dispatchOrder';
import getListDispatchOrder from './order/sagas/getListDispatchOrder';
import getListDispatchOrderDismiss from './order/sagas/getListDispatchOrderDismiss';
import getListDispatchOrderComplete from './order/sagas/getListDispatchOrderComplete';
import uploadOrder from './order/sagas/uploadOrder';
import updateOrder from './order/sagas/updateOrder';
import cancelOrder from './order/sagas/cancelOrder';
import getListPaymentMethod from './order/sagas/getListPaymentMethod';
import getListReasonCancelOrder from './order/sagas/getListReasonCancelOrder';
import searchOrder from './order/sagas/searchOrder';
import uploadPrice from './order/sagas/uploadPrice';
import collectOrder from './order/sagas/collectOrder';
import checkExistHAWB from './order/sagas/checkExistHAWBs';
import checkTransfer from './order/sagas/checkTransfer';
import transferOrder from './order/sagas/transferOrder';
import checkInOrder from './order/sagas/checkInOrder';
import getHistoryCollect from './order/sagas/getListCollectHistory';
import getDetailOrder from './order/sagas/getDetail';
import getListStations from './order/sagas/getListStations';
import addImageOrder from './order/sagas/addImageOrder';
import logOrder from './order/sagas/orderLog';
import getManifestNotes from './order/sagas/getManifestNotes';
import getProcessSpecials from './order/sagas/getProcessSpecials';
import reportOrder from './order/sagas/reportOrder';
import getListCheckin from './order/sagas/getListCheckin';
import checkinFinish from './order/sagas/checkinFinish';
import getUnit from './order/sagas/getUnit';
import getSelling from './order/sagas/getSelling';
import updateSelling from './order/sagas/updateSelling';
import listenOrderDispatch from './order/sagas/listenOrderDispatch';
import getOrderNumber from './order/sagas/getOrderNumber';

export default function* rootSaga() {
  yield all([
    fork(loginUser),
    fork(changePassword),
    fork(getListOrder),
    fork(uploadManifest),
    fork(getListBillId),
    fork(searchBill),
    fork(getImage),
    fork(getListHistory),
    fork(readImage),
    fork(updateFuel),
    fork(carHandle),
    fork(reportIncident),
    fork(getListIncident),
    fork(updateLocation),
    fork(dispatchOrder),
    fork(checkExistPhone),
    fork(resetPassword),
    fork(trafficJam),
    fork(getListDispatchOrder),
    fork(uploadOrder),
    fork(updateOrder),
    fork(cancelOrder),
    fork(getListPaymentMethod),
    fork(getListReasonCancelOrder),
    fork(searchOrder),
    fork(uploadPrice),
    fork(getDetail),
    fork(collectOrder),
    fork(checkExistHAWB),
    fork(checkTransfer),
    fork(transferOrder),
    fork(checkInOrder),
    fork(getHistoryCollect),
    fork(getDetailOrder),
    fork(getListDispatchOrderDismiss),
    fork(getListDispatchOrderComplete),
    fork(getListStations),
    fork(addImageOrder),
    fork(logOrder),
    fork(getManifestNotes),
    fork(getProcessSpecials),
    fork(reportOrder),
    fork(getListCheckin),
    fork(checkinFinish),
    fork(getUnit),
    fork(getSelling),
    fork(updateSelling),
    fork(listenOrderDispatch),
    fork(getOrderNumber),
  ]);
}
