import { AsyncStorage } from 'react-native';
import _ from 'lodash';

const SETTINGS_KEY_PREFIX = '@Oikon2Store:settings';
const ARRAY_SEPARATOR = ',,,';

// Fetches everything into an in-memory object
let settings = {};

const SettingsDB = {
  async init() {

    try {
      const allKeys = await AsyncStorage.getAllKeys();
      let keysToFetch = [];

      // If it's part of settings, add it to be fetched
      _.each(allKeys, (key) => {
        if (key.indexOf(SETTINGS_KEY_PREFIX) !== -1) {
          keysToFetch.push(key);
        }
      });

      // Get all settings now
      const allSettings = await AsyncStorage.multiGet(keysToFetch);

      // Add them to our object
      _.each(allSettings, (item) => {
        const parsedKey = item[0].replace(`${SETTINGS_KEY_PREFIX}.`, '');
        settings[parsedKey] = item[1];

        // AsyncStorage.removeItem(item[0]);// TODO: test removal
      });
    } catch (e) {
      // Ignore
    }
  },

  // Will return a string or array of strings
  get(name, defaultValue = undefined, forceArrayOnSingle = false) {
    const value = _.get(settings, name, defaultValue);

    // If we find a "separator" in the value, convert it to an array
    if (value && value.indexOf(ARRAY_SEPARATOR) !== -1) {
      return value.split(ARRAY_SEPARATOR);
    }

    // If there's no separator, still allow fetching as an array
    if (forceArrayOnSingle) {
      if (value) {
        return [value];
      } else {
        return [];
      }
    }

    return value;
  },

  // Accepts strings or arrays of strings
  set(name, value) {
    // If the value is an array, convert it to a string with the separator
    if (_.isArray(value)) {
      value = value.join(ARRAY_SEPARATOR);
    }

    _.set(settings, name, value);

    try {
      AsyncStorage.setItem(`${SETTINGS_KEY_PREFIX}.${name}`, value);
    } catch (e) {
      // Ignore
    }
  }
};

export default SettingsDB;
