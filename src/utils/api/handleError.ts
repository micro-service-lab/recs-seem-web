import { ErrorResponse } from '@/types/response/error-response';
import { displayErrorModal, displayErrorToast, logoutForcibly, requestRefreshToken, transitionToLogin } from './handlers';
import { API_RESPONSE_HANDLING, RESPONSE_LEVEL } from '@/constants/response-code';
import { API_RESPONSE_TYPES } from '@/constants/backend-response';

export type ErrorMessage = {
  message: string;
  messageParam: {
    [key in string]: string;
  };
};

type ErrorHandling = {
  logoutForcibly?: (message: ErrorMessage) => Promise<void>;
  transitionToLogin?: (message: ErrorMessage) => Promise<void>;
  requestRefreshToken?: (message: ErrorMessage) => Promise<void>;
  displayErrorModal?: (message: ErrorMessage) => Promise<void>;
  displayErrorToast?: (message: ErrorMessage) => Promise<void>;
};

const handleMessageGenerator = (error: ErrorResponse) => {
  const message: string = API_RESPONSE_HANDLING[error.code].message;
  let messageParam: {
    [key in string]: string;
  } = {};
  switch (error.code) {
    case API_RESPONSE_TYPES.ThrottleLoginRequests:
      messageParam = error.errorAttributes;
      break;
  }
  return { message, messageParam };
};

export const handleError = async (error?: ErrorResponse, errorHandling?: ErrorHandling) => {
  let message = {
    message: 'An unexpected error has occurred',
    messageParam: {},
  };
  let handler = async (msg: ErrorMessage) => {
    console.error(msg);
  };

  if (!error) return message;

  /* eslint-disable no-prototype-builtins */
  if (API_RESPONSE_HANDLING.hasOwnProperty(error.code)) {
    const errorType = API_RESPONSE_HANDLING[error.code];
    message = handleMessageGenerator(error);
    switch (errorType.level) {
      case RESPONSE_LEVEL.Logout:
        handler = errorHandling?.logoutForcibly || logoutForcibly;
        break;
      case RESPONSE_LEVEL.Transition:
        handler = errorHandling?.transitionToLogin || transitionToLogin;
        break;
      case RESPONSE_LEVEL.RequestRefreshToken:
        handler = errorHandling?.requestRefreshToken || requestRefreshToken;
        break;
      case RESPONSE_LEVEL.Modal:
        handler = errorHandling?.displayErrorModal || displayErrorModal;
        break;
      case RESPONSE_LEVEL.Toast:
        handler = errorHandling?.displayErrorToast || displayErrorToast;
        break;
      case RESPONSE_LEVEL.None:
      default:
        break;
    }
  }

  await handler(message);

  return message;
};
