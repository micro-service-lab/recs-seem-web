import { ErrorMessage } from '../handleError';

export const transitionToLogin = async (message: ErrorMessage) => {
  console.log('transitionToLogin: ' + message);
};
