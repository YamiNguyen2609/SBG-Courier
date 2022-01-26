import {Images, Colors} from '../themes';
import {Platform} from 'react-native';
import Environment from '../config/BuildConfig';

const ApiResponseStatusCode = {
  SUCCESS: 200,
  TOKEN: 440,
  TOKEN_EXPIRED: 419,
  AUTHORIZED: 400,
  PERMISSION: 403,
  ERROR_SERVER: 500,
  FAIL_SERVER: 502,
};

const SCREEN_TRANSITION_TIME = Platform.OS == 'ios' ? 0 : 400;

const length = 10;

const GOOGLE_API_KEY = 'AIzaSyB6_PWjAdhdcsIUxCAVFFgStw60zE9WzYY';
// const GOOGLE_API_KEY = 'AIzaSyBKi-HKn-5lFMKxFkugVdAbV-9IX8mhFkQ';

const MQTT = {
  host: 'globex.vn',
  port: 1883,
  username: 'frontend',
  password: 'Gl0b3x2019!#@',
};

const TOKEN_TELEGRAM = '932827191:AAGWXL3R__j4kMxE-kuiN9dcWpPaqkmnYzY';

const groupId = '-471542895';

const mainScreen = 'HomeScreen';

const version =
  'Version' +
  (Environment !== 'PRODUCTION' ? '-test' : '') +
  ': 1.2.20 12/10/2021';

const statusOrder = {
  38: Colors.appRed, //cancel
  39: Colors.appGreen, //success delivery
  5: Colors.appGreen, //success receive
  16: Colors.appPrimaryColor, //thêm ảnh
  0: Colors.appColor,
};

const typeDispatch = {
  DELIVERY: 0,
  RECEIVE: 1,
};

const order = {
  UPDATE_FEE: 0,
  UPDATE_ORDER: 1,
  UPDATE_BOOKING: 2,
};

const adminOrder = {
  SCAN_HAWB: 0,
  SCAN_ORDER: 1,
  COLLECT: 2,
  TRANSFER: 3,
};

const typeMenu = {
  SCAN_BILL: 1,
  BILL_LIST: 2,
  CAR_ATTACH: 3,
  CAR_DETACH: 4,
  TRAFFIC_JAM: 5,
  CANCEL_TRAFFIC_JAM: 6,
  POUR_FUEL: 7,
  MORE: 8,
  REPORT_PROBLEM: 9,
  DECLARATION_TABLE: 10,
  HAND_OVER: 11,
  SCAN_DISPATCH: 12,
  PUD_POD: 13,
  MAP_ORDER: 14,
  COLLECT_ORDER: 15,
  TRANSFER_ORDER: 16,
  SCAN_ORDER: 17,
  REX_SCAN: 18,
};

const sbgMenu = [
  {
    title: 'Scan bill',
    iconsbs: Images.icScan,
    id: 1,
    flag: 0,
    company: 'sbs',
    role: 3,
    multi: true,
  },
  {
    title: 'Danh sách bill',
    iconsbs: Images.icHandOrderFd,
    id: 2,
    flag: 0,
    company: 'sbs',
    role: 3,
    multi: true,
  },
  {
    title: 'Scan đi phát',
    iconsbp: Images.icDispatch,
    id: 12,
    flag: 0,
    company: 'sbp',
    role: 3,
    multi: false,
  },
  {
    title: 'PUP/POD',
    iconsbp: Images.icPuPPoD,
    id: 13,
    flag: 0,
    company: 'sbp',
    role: 3,
    multi: false,
  },
  {
    title: 'Scan checkin',
    iconsbp: Images.icScanOrder,
    id: 17,
    flag: 0,
    company: 'sbp',
    role: 1,
    multi: false,
  },
  {
    title: 'Gom hàng',
    iconsbp: Images.icCollectOrder,
    id: 15,
    flag: 0,
    company: 'sbp',
    role: 1,
    multi: false,
  },
  {
    title: 'Chuyển giao nhận',
    iconsbp: Images.icTransferOrder,
    id: 16,
    flag: 0,
    company: 'sbp',
    role: 1,
    multi: false,
  },
  {
    title: 'Nhận xe',
    iconsbs: Images.icReturnFd,
    iconsbp: Images.icReturn,
    id: 3,
    flag: 1,
    company: '',
    role: 3,
    multi: false,
  },
  {
    title: 'Trả xe',
    iconsbs: Images.icReturnFd,
    iconsbp: Images.icReturn,
    id: 4,
    flag: 2,
    company: '',
    role: 3,
    multi: false,
  },
  {
    title: 'Kẹt xe',
    iconsbs: Images.icTruckJamFd,
    iconsbp: Images.icTruckJam,
    id: 5,
    flag: 3,
    company: '',
    role: 3,
    multi: false,
  },
  {
    title: 'Hủy kẹt xe',
    iconsbs: Images.icTruckJamFd,
    iconsbp: Images.icTruckJam,
    id: 6,
    flag: 4,
    company: '',
    role: 3,
    multi: false,
  },
  {
    title: 'Đổ xăng',
    iconsbs: Images.icRefuelFd,
    iconsbp: Images.icRefuel,
    id: 7,
    flag: 0,
    company: '',
    role: 3,
    multi: false,
  },
  {
    title: 'Khác',
    iconsbs: Images.icMoreFd,
    iconsbp: Images.icMore,
    id: 8,
    flag: 5,
    company: '',
    role: 3,
    multi: false,
  },
  {
    title: 'Báo Hỏng',
    iconsbs: Images.icTruckBrokenFd,
    iconsbp: Images.icTruckBroken,
    id: 9,
    flag: 6,
    company: '',
    role: 3,
    multi: false,
  },
  {
    title: 'Bảng kê',
    iconsbs: Images.icListOrderFd,
    iconsbp: Images.icListOrder,
    id: 10,
    flag: 6,
    company: 'sbp',
    role: 3,
    multi: false,
  },
  {
    title: 'Bàn giao',
    iconsbs: Images.icHandOverFd,
    iconsbp: Images.icHandOver,
    id: 11,
    flag: 6,
    company: '',
    role: 3,
    multi: false,
  },
  {
    title: 'Rex-Scan',
    iconsbp: Images.icDispatch,
    id: 18,
    flag: 0,
    company: 'sbp',
    role: 1,
    multi: false,
  },
];

const payments = [
  {
    id: 1,
    name: 'Tiền mặt',
  },
  {
    id: 3,
    name: 'thẻ ngân hàng',
  },
  {
    id: 5,
    name: 'Ví điện tử',
  },
];

export {
  sbgMenu,
  typeMenu,
  length,
  version,
  ApiResponseStatusCode,
  GOOGLE_API_KEY,
  MQTT,
  mainScreen,
  typeDispatch,
  SCREEN_TRANSITION_TIME,
  TOKEN_TELEGRAM,
  groupId,
  order,
  adminOrder,
  statusOrder,
  payments,
};
