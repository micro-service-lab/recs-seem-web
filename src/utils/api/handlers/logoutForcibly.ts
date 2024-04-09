import { ErrorMessage } from "../handleError";

export const logoutForcibly = async (message: ErrorMessage) => {
  console.log('logoutForcibly: ' + message);
};
