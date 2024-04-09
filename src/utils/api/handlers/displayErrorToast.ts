import { ErrorMessage } from '../handleError';

export const displayErrorToast = async (message: ErrorMessage) => {
  console.log('displayErrorToast: ' + message);
};
