import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeData = async (key, value) => {
  try {
    console.log('storing data', key, value);
    await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    // saving error
  }
};

export const getData = async key => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      //   return JSON.parse(value);
      return JSON.parse(value);
    }
  } catch (e) {
    // error reading value
  }
};

export const clearData = async key => {
  try {
    await AsyncStorage.clear();
  } catch (e) {
    console.log('error clearing asyncStorage', e);
  }
};
