import { loginClient } from '../../services/http';
import { apiKey, storeName } from '../../share/constants';

export const getToken = async () => {
  if (!storeName || !apiKey) {
    return null;
  }
  try {
    return null;
    // return await loginClient.getToken(storeName, apiKey);
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
};
