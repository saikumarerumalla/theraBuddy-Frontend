import CryptoJS from 'crypto-js';
import Constants from 'expo-constants';

const ENCRYPTION_KEY = Constants.expoConfig?.extra?.encryptionKey || 'default-key-change-in-production';

export const encryption = {
  encrypt: (data: string): string => {
    return CryptoJS.AES.encrypt(data, ENCRYPTION_KEY).toString();
  },

  decrypt: (encryptedData: string): string => {
    const bytes = CryptoJS.AES.decrypt(encryptedData, ENCRYPTION_KEY);
    return bytes.toString(CryptoJS.enc.Utf8);
  },
};
