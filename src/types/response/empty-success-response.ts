import { ApplicationResponse } from './application-response';

type ResponseData = Record<string, never>;

export type EmptySuccessResponse = ApplicationResponse<ResponseData>;
