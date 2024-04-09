import { ErrorMessage } from '../handleError';

export const requestRefreshToken = async (message: ErrorMessage) => {
  console.log('refreshToken request: ' + message);
};
