import axios from './AxiosTMMConfig';
import AxiosSBG from './AxiosConfig';
import AxiosDefault from 'axios';
import AxiosSBGBackground from './AxiosBackgroundSBGConfig';
import AxiosBackground from './AxiosBackgroundTMMConfig';
import {GOOGLE_API_KEY} from '../helpers/Constants';

// const DETACH_CAR = '/drivers/detach';
// const ATTACH_CAR = '/drivers/attach';
const DETACH_CAR = '/driver/detach';
const ATTACH_CAR = '/driver/attach';
// const INCIDENT_CAR = '/drivers/incidentLog';
const INCIDENT_CAR = '/driver/report/incident';
const INCIDENT_LIST = '/incidents';
// const INCIDENT_LIST = '/driver/report/incident_list';
// const ODOMETER = '/drivers/fuel';
const ODOMETER = '/driver/report/gas_pump';
const UPDATE_LOCATION = '/tracking_locations';
const UPDATE_LOCATION_SBG = '/driver/pushLocation';

const detachCar = (vehicle, odometer) => {
  // return {
  //   success: true,
  // };
  return AxiosSBG.put(DETACH_CAR, {
    // vehicle,
    odometer,
  });
};

const attachCar = vehicle => {
  // return {
  //   success: true,
  //   odometer: 100,
  // };
  return AxiosSBG.put(ATTACH_CAR, {vehicle});
};

const gasPump = (vehicle, liter) => {
  return AxiosSBG.post(ODOMETER, {liter});
};

const incidentCar = (
  licensePlate,
  incidentCode,
  latitude,
  longitude,
  description,
) => {
  let params = {
    // licensePlate,
    incident_code: incidentCode,
    lat: latitude,
    long: longitude,
  };

  if (description) params['comment'] = description;
  return AxiosSBG.post(INCIDENT_CAR, params);
};

const incidentList = () => {
  return axios.get(INCIDENT_LIST);
};

const DetectTextFromImage = async pathImg => {
  return AxiosDefault.post(
    'https://vision.googleapis.com/v1/images:annotate?key=' + GOOGLE_API_KEY,
    {
      requests: [
        {
          features: [{type: 'TEXT_DETECTION', maxResults: 1}],
          image: {
            content: pathImg,
          },
        },
      ],
    },
  );
};

const updateLocation = (lat, lng) => {
  return AxiosBackground.post(UPDATE_LOCATION, {
    latitude: lat,
    longitude: lng,
  });
};

const updateLocationSBG = (lat, long) => {
  return AxiosSBGBackground.post(UPDATE_LOCATION_SBG, {lat, long});
};

export default {
  detachCar,
  attachCar,
  incidentCar,
  gasPump,
  incidentList,
  DetectTextFromImage,
  updateLocation,
  updateLocationSBG,
};
