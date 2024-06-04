import { AxiosError } from "axios";
import { ApplicationResponse } from "./application-response";

export type ErrorResponse = ApplicationResponse<null>;

/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-prototype-builtins */
export const isApplicationErrorResponse = (obj: any): obj is AxiosError<ErrorResponse> => {
  return obj.hasOwnProperty('response') 
  && obj.response.data.hasOwnProperty('success')
  && obj.response.data.hasOwnProperty('error_attributes')
};