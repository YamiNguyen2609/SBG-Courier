import AsyncStorage from '@react-native-community/async-storage';
import moment from 'moment';

const LIST_LICENSE_PLATES = '@LIST_LICENSE_PLATTES';
const TOKEN = '@TOKEN';

export const _saveToken = async (token, secret, access_token, config) => {
  let exp = moment()
    .add(6, 'day')
    .format('YYYY-MM-DD');
  try {
    return await AsyncStorage.setItem(
      TOKEN,
      JSON.stringify({
        token,
        exp,
        secret,
        access_token,
        config,
      }),
    );
  } catch (error) {}
};

export const _getToken = async () => {
  try {
    const value = await AsyncStorage.getItem(TOKEN, '');
    if (value) {
      return value;
    } else {
      return '';
    }
  } catch (error) {
    return '';
  }
};

export const _setLicensePlates = async licensePlates => {
  try {
    const value = await AsyncStorage.getItem(LIST_LICENSE_PLATES, '');

    return await AsyncStorage.setItem(
      LIST_LICENSE_PLATES,
      value + ',' + licensePlates,
    );
  } catch (error) {}
};

export const _getLicensePlates = async () => {
  try {
    const value = await AsyncStorage.getItem(LIST_LICENSE_PLATES, '');
    if (value) {
      const data = value.split(',').reverse();
      return [...new Set(data)].filter(e => {
        return e !== 'null';
      });
    } else {
      return [];
    }
  } catch (error) {
    return [];
  }
};
