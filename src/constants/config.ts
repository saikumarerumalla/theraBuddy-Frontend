import Constants from 'expo-constants';

const ENV = {
  dev: {
    API_URL: 'http://localhost:8000/api/v1',
    WS_URL: 'ws://localhost:8000',
  },
  staging: {
    API_URL: 'https://staging-api.aitherapy.jp/api/v1',
    WS_URL: 'wss://staging-api.aitherapy.jp',
  },
  prod: {
    API_URL: 'https://api.aitherapy.jp/api/v1',
    WS_URL: 'wss://api.aitherapy.jp',
  },
};

const getEnvVars = () => {
  if (__DEV__) {
    return ENV.dev;
  } else if (Constants.expoConfig?.extra?.environment === 'staging') {
    return ENV.staging;
  } else {
    return ENV.prod;
  }
};

export default getEnvVars();
