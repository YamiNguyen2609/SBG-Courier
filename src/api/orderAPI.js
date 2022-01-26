import axios from './AxiosConfig';
import AxiosOMM from './AxiosOMMConfig';
import AxiosTMM from './AxiosTMMConfig';
import {length, typeDispatch, order} from '../helpers/Constants';
import FormData from 'form-data';
import r from 'reactotron-react-native';
import moment from 'moment';

const SEARCH_BILL = '/manifest/search';
const GET_MANIFEST_NOTES = '';
const GET_MANIFESTS = '/driver/my_manifest';
const UPDATE_MANIFEST = '/manifest/upload';
const GET_IMAGE = '/manifest/image';
const ADD_IMAGE = '/manifest/add_image';
const GET_PAYMENTS = '/payment-methods';
const GET_PRICE_ORDER = '/orders/express/shipping-charge';
const UPDATE_ORDER = '/orders/express/delivery/';
const UPDATE_BOOKING = '/bookings/info/';
const GET_DELIVERY_INCOMPLETE = '/transport_logs/mobile/deliveries';
const GET_DELIVERY_DISMISS = '/transport_logs/mobile/cancelDeliveries';
const GET_DELIVERY_COMPLETE = '/transport_logs/mobile/deliveried';
const GET_RECEIVE = '/orders/pick-up/assign';
const DISPATCH_ORDER = '/manifests/scanDelivery';
const GET_REASON = '/reason_details';
const CANCEL_DELIVERY = '/transport_logs/mobile/failDelivery';
const CANCEL_RECEIVE = '/orders/pick-up/cancel';
const UPDATE_PRICE = '/orders/transaction';
const UPLOAD_ORDER = '/transport_logs/mobile/successDelivery';
const UPLOAD_RECEIVER = '/orders/pick-up/complete';
const CONSOLIDATE_ORDER = '/manifests/consolidate';
const SCAN_HAWB = '/manifests/checkConsolidate';
const SCAN_ORDER_TRANSFER = '/orders/scanSendTransport';
const CHECK_IN_SAVE_LOG = '/checkin_logs/scanCheckin';
const CHECK_IN_DELETE_LOG = '/checkin_logs/checkin';
const CHECK_IN_HAWB = '/manifests/scan';
const COLLECT_HISTORY = '/manifests/consolidateLog';
const LIST_STATION = '/stations';
const ADD_IMAGE_ORDER = 'orders/pick-up/complete/upload';
const LOG_ORDER = '/transport_logs/mobile/dispathLog';
const DECLARATION_TABLE_ORDER = '/transport_logs/mobile/codCourier';
const LOG_ACCOUNTING_ORDER = '/accounting/cod/courier/order/';
const GET_CHECK_IN = '/checkin_logs';
const FINISH_CHECK_IN = '/checkin_logs/finishCheckin';
const CHECK_SELLING_ORDER = '/orders/express/selling';
const UPDATE_SELLING_ORDER = '/orders/express/selling/rescan';
const GET_UNIT_LENGTH = '/constant/unitOfLenght';
const GET_UNIT_WEIGHT = '/constant/unitOfMass';
const GET_BOOKING_NUMBER = '/orders/info';

const uploadManifest = data => {
  const {bill_id, images, status} = data;

  let api = UPDATE_MANIFEST + '?tkr=' + status;

  const dataReq = new FormData();

  dataReq.append('bill_id', bill_id);

  images.map(async (e, idx) => {
    dataReq.append('image' + (idx + 1), {
      uri: e.uri,
      type: 'image/jpeg',
      name: e.name,
    });
  });

  return axios.post(api, dataReq, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return {
    success: true,
  };
};

const addImageManifest = data => {
  const {bill_id, images} = data;

  const dataReq = new FormData();

  dataReq.append('bill_id', bill_id);

  images.map(async (e, idx) => {
    dataReq.append('image' + (idx + 1), {
      uri: e.uri,
      type: 'image/jpeg',
      name: e.name,
    });
  });

  return axios.put(ADD_IMAGE, dataReq, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

const getOrders = (get_thumbs, page_number, page_length = length) => {
  return axios.get(GET_MANIFESTS, {
    params: {get_thumbs, page_number, page_length},
  });
};

const searchBill = bill_id => {
  return axios.get(SEARCH_BILL, {params: {bill_id}});
};

const getImage = img_name => {
  return axios.get(GET_IMAGE, {
    responseType: 'arraybuffer',
    params: {img_name},
  });
};

const getManifestNotes = () => {
  //return axios.get(GET_MANIFEST_NOTES);
  return {
    success: true,
    data: [
      {
        id: 1,
        title: 'lý do 1',
      },
      {
        id: 2,
        title: 'lý do 2',
      },
      {
        id: 3,
        title: 'lý do 3',
      },
      {
        id: 4,
        title: 'lý do 4',
      },
      {
        id: 5,
        title: 'lý do 5',
      },
      {
        id: 6,
        title: 'lý do 6',
      },
    ],
  };
};
//sbp

const dispatchOrder = orderNumber => {
  return AxiosTMM.put(DISPATCH_ORDER, {ids: [orderNumber]});
};

const updateOrder = data => {
  const {
    packages,
    orderId,
    shippingFee,
    weightExchange,
    weightCharge,
    updateOrder,
    codAmount,
    orderClient,
  } = data;

  switch (updateOrder) {
    case order.UPDATE_FEE:
      return AxiosOMM.post(GET_PRICE_ORDER, {
        orderId: String(orderId),
        packageDetails: packages.filter(
          e =>
            e.width !== '' &&
            e.height !== '' &&
            e.long !== '' &&
            e.weight !== '',
        ),
      });

    case order.UPDATE_ORDER:
      return AxiosOMM.put(UPDATE_ORDER + String(orderId), {
        packageDetails: packages.packages.filter(
          e =>
            e.width !== '' &&
            e.height !== '' &&
            e.long !== '' &&
            e.weight !== '',
        ),
        shippingFee,
        weightCharge,
        weightExchange,
      });

    case order.UPDATE_BOOKING:
      return AxiosOMM.put(UPDATE_BOOKING + String(orderId), {
        packageDetails: packages.filter(
          e =>
            e.width !== '' &&
            e.height !== '' &&
            e.long !== '' &&
            e.weight !== '',
        ),
        codAmount,
        orderNumberClient: orderClient,
      });
  }
};

const cancelOrder = data => {
  const {reasonId, note, images, typeOrder, HAWBs, orderId, bookingId} = data;

  let req = new FormData();

  if (!typeOrder) {
    req.append('HAWBs', HAWBs);
    req.append('reasonDetailId', reasonId);
    images.forEach(e => {
      req.append('images', {
        uri: e.uri,
        type: 'image/jpeg',
        name: e.name,
      });
    });
    if (note) req.append('reasonNote', note);

    return AxiosTMM.put(CANCEL_DELIVERY, req);
  } else {
    req.append('reasonDetailId', reasonId);
    images.forEach(e => {
      req.append('files', {
        uri: e.uri,
        type: 'image/jpeg',
        name: e.name,
      });
    });
    if (note) req.append('note', note);

    if (bookingId) {
      req.append('bookingId', bookingId);
      req.append('orderId', '');
    } else {
      req.append('bookingId', '');
      req.append('orderId', orderId);
    }

    r.log('cancel start', req);

    return AxiosOMM.put(CANCEL_RECEIVE, req);
  }
};

const getListDispatchOrder = (
  type,
  pageNumber,
  keyword,
  pageLength = length,
) => {
  if (type == typeDispatch.DELIVERY) {
    let params = {
      offset: pageNumber,
      limit: pageLength,
      sort: 'dateAssigned|DESC',
    };
    if (keyword) {
      params['orderNumber|or'] = 'ilike|' + keyword;
      params['orderNumberClient|or'] = 'ilike|' + keyword;
    }

    // params[''] = 'ilike|' + keyword;

    return AxiosTMM.get(GET_DELIVERY_INCOMPLETE, {
      params,
    });
  } else {
    let params = {
      offset: pageNumber,
      limit: pageLength,
      sort: 'assignedDate_desc',
      statusId: 13,
    };
    if (keyword) {
      params['bookingNumber'] = keyword;
    }
    return AxiosOMM.get(GET_RECEIVE, {
      params,
    });
  }
};

const getListDispatchOrderComplete = (
  type,
  pageNumber,
  keyword,
  pageLength = length,
  params = {},
) => {
  (params['offset'] = pageNumber), (params['limit'] = pageLength);

  if (type == typeDispatch.DELIVERY) {
    if (keyword) {
      params['orderNumber|or'] = 'ilike|' + keyword;
      params['orderNumberClient|or'] = 'ilike|' + keyword;
    }

    return AxiosTMM.get(GET_DELIVERY_COMPLETE, {
      params,
    });
  } else {
    params = {};
    params['statusId'] = 16;
    params['assignedReceivedDate'] = moment().format('YYYY-MM-DD');
    if (keyword) {
      params['bookingNumber'] = keyword;
    }
    return AxiosOMM.get(GET_RECEIVE, {
      params,
    });
  }
};

const getListDispatchOrderDismiss = (
  type,
  pageNumber,
  keyword,
  pageLength = length,
) => {
  if (type == typeDispatch.DELIVERY) {
    let params = {
      offset: pageNumber,
      limit: pageLength,
      sort: 'dateAssigned|DESC',
    };
    if (keyword) {
      params['orderNumber|or'] = 'ilike|' + keyword;
      params['orderNumberClient|or'] = 'ilike|' + keyword;
    }

    return AxiosTMM.get(GET_DELIVERY_DISMISS, {
      params,
    });
  } else {
    let params = {
      offset: pageNumber,
      limit: pageLength,
      sort: 'assignedDate_desc',
      statusId: 102,
    };

    if (keyword) {
      params['bookingNumber'] = keyword;
    }

    return AxiosOMM.get(GET_RECEIVE, {
      params,
    });
  }
};

const getListDispatchOrderReturn = (
  type,
  pageNumber,
  keyword,
  pageLength = length,
) => {
  if (type == typeDispatch.DELIVERY) {
    let params = {
      offset: pageNumber,
      limit: pageLength,
      sort: 'dateAssigned|DESC',
    };
    if (keyword) {
      params['orderNumber|or'] = 'ilike|' + keyword;
      params['orderNumberClient|or'] = 'ilike|' + keyword;
    }

    return AxiosTMM.get(GET_DELIVERY_INCOMPLETE, {
      params,
    });
  } else {
    let params = {
      offset: pageNumber,
      limit: pageLength,
      sort: 'assignedDate_desc',
      statusId: 102,
    };

    if (keyword) {
      params['bookingNumber'] = keyword;
    }
    return AxiosOMM.get(GET_RECEIVE, {
      params,
    });
  }
};

const UploadOrder = data => {
  const {
    images,
    typeOrder,
    HAWBs,
    orderNumberPUPs,
    senderFeeCollect,
    paymentMethodId,
    bookingId,
    receiver,
  } = data;

  let req = new FormData();

  if (!typeOrder) {
    if (receiver) {
      req.append('senderOrReceiver', receiver);
    }

    req.append('HAWBs', HAWBs);
    req.append('reasonDetailId', 53);
    images.forEach(e => {
      req.append('images', {
        uri: e.uri,
        type: 'image/jpeg',
        name: e.name,
      });
    });

    return AxiosTMM.put(UPLOAD_ORDER, req);
  } else {
    let data = {};
    data['bookingId'] = bookingId;
    data['orderNumberPUPs'] = orderNumberPUPs;
    data['senderFeeCollect'] = senderFeeCollect;
    data['paymentMethodId'] = paymentMethodId;

    return AxiosOMM.put(UPLOAD_RECEIVER, data);
  }
};

const UploadPrice = data => {
  const {transactionTypeId, orderId, payment, bookingId, typeOrder} = data;

  var params = {
    transactionTypeId,
    payment,
    payerTypeId: typeOrder ? 2 : 1,
  };

  if (orderId) params['orderId'] = orderId;
  else params['bookingId'] = bookingId;

  r.log('params', params);

  return AxiosOMM.post(UPDATE_PRICE, params);
};

const getListReasonCancelOrder = type => {
  return AxiosTMM.get(GET_REASON, {
    params: {
      isDeleted: false,
      reasonId: 'in|' + type,
      limit: -1,
    },
  });
};

const getListPayments = () => {
  return AxiosOMM.get(GET_PAYMENTS);
};

const scanOrder = orderNumber => {
  return AxiosTMM.get(GET_DELIVERY_INCOMPLETE, {
    params: {
      'orderNumber|or': 'ilike|' + orderNumber,
      'orderNumberClient|or': 'ilike|' + orderNumber,
    },
  });
};

const consolidateOrder = HAWBs => {
  return AxiosTMM.put(CONSOLIDATE_ORDER, {
    HAWBs: HAWBs,
  });
};

const checkExistHAWBs = Hawb => {
  return AxiosTMM.get(SCAN_HAWB, {
    params: {
      HAWBClearance: Hawb,
      sort: 'createdAt|DESC',
    },
  });
};

const transferOrder = orderNumber => {
  return AxiosTMM.put(SCAN_ORDER_TRANSFER, {orderNumber});
};

const createLogCheckIn = (code, stationId) => {
  return AxiosTMM.post(CHECK_IN_SAVE_LOG, {
    HAWB: code,
    stationId,
    isSendTransport: true,
  });
};

const removeLogCheckIn = (code, stationId) => {
  return AxiosTMM.delete(CHECK_IN_DELETE_LOG, {
    data: {
      HAWBs: [code],
      stationId,
    },
  });
};

const checkInOrder = (code, stationId) => {
  return AxiosTMM.put(CHECK_IN_HAWB, {
    ids: code,
  });
};

const getHistoryCollect = (offset, limit = length) => {
  return AxiosTMM.get(COLLECT_HISTORY, {
    params: {offset, limit, sort: 'createdAt|desc'},
  });
};

const getListStations = () => {
  return AxiosTMM.get(LIST_STATION, {
    params: {
      limit: -1,
      sort: 'name|asc',
    },
  });
};

const updateImageOrder = data => {
  const {images, orderId, bookingId, type} = data;

  let req = new FormData();
  images.forEach(e => {
    req.append('files', {
      uri: e.uri,
      type: 'image/jpeg',
      name: e.name,
    });
  });

  if (bookingId) {
    req.append('bookingId', bookingId);
    req.append('orderId', '');
  } else {
    req.append('bookingId', '');
    req.append('orderId', orderId);
  }

  req.append('note', 'Thêm ảnh vào đơn hàng');

  return AxiosOMM.put(ADD_IMAGE_ORDER, req);
};

const logOrder = (orderId, bookingId) => {
  let params = {
    relation: 'order,reason,reasonDetail',
    limit: -1,
  };

  if (orderId) {
    params['orderId|or'] = orderId;
  } else {
    params['bookingId|or'] = bookingId;
  }

  return AxiosTMM.get(LOG_ORDER, {params});
};

const logAccountingOrder = orderId => {
  return AxiosOMM.get(LOG_ACCOUNTING_ORDER + orderId);
};

const orderTable = (pageNumber, pageLength = length) => {
  return AxiosTMM.get(DECLARATION_TABLE_ORDER, {
    params: {
      relation: 'order,employee',
    },
  });
};

const getCheckin = stationId => {
  return AxiosTMM.get(GET_CHECK_IN, {
    params: {
      limit: -1,
      isCheckin: true,
      isDeleted: false,
      status: false,
      isOrder: false,
      stationId,
    },
  });
};

const finishCheckin = data => {
  return AxiosTMM.put(FINISH_CHECK_IN, data);
};

const checkSellingOrder = orderNumber => {
  return AxiosOMM.get(CHECK_SELLING_ORDER, {
    params: {
      relation: 'service,partner,customerBusiness,customerPersonal',
      orderNumber,
    },
  });
};

const updateSelling = (params, orderId) => {
  return AxiosOMM.put(UPDATE_SELLING_ORDER + '/' + orderId, {
    packageDetails: params,
  });
};

const getUnitLength = () => {
  return AxiosTMM.get(GET_UNIT_LENGTH, {
    params: {
      limit: -1,
    },
  });
};

const getUnitWeight = () => {
  return AxiosTMM.get(GET_UNIT_WEIGHT, {
    params: {
      limit: -1,
    },
  });
};

const getOrderNumber = data => {
  return AxiosOMM.post(GET_BOOKING_NUMBER, {
    orderNumbers: [data],
    attributes: [
      'orderNumber',
      'senderFee',
      'unitFee',
      'pcs',
      'orderWeightKg',
      'orderNumberClient',
    ],
  });
};

export default {
  dispatchOrder,
  getOrders,
  uploadManifest,
  searchBill,
  getImage,
  addImageManifest,
  getListDispatchOrder,
  UploadOrder,
  updateOrder,
  cancelOrder,
  getListPayments,
  UploadPrice,
  getListReasonCancelOrder,
  scanOrder,
  consolidateOrder,
  checkExistHAWBs,
  transferOrder,
  checkInOrder,
  getHistoryCollect,
  getListDispatchOrderComplete,
  getListStations,
  updateImageOrder,
  logOrder,
  getManifestNotes,
  getListDispatchOrderDismiss,
  getListDispatchOrderReturn,
  orderTable,
  logAccountingOrder,
  createLogCheckIn,
  removeLogCheckIn,
  getCheckin,
  finishCheckin,
  getUnitLength,
  getUnitWeight,
  checkSellingOrder,
  updateSelling,
  getOrderNumber,
};
