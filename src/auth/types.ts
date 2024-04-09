// ----------------------------------------------------------------------

import {
  AuthUserData,
  AuthUserResponse,
} from '@/types/response/auth/auth-user-response';
import { EmptySuccessResponse } from '@/types/response/empty-success-reponse';
import { AxiosResponse } from 'axios';

/* eslint-disable @typescript-eslint/no-explicit-any */
export type ActionMapType<M extends { [index: string]: any }> = {
  [Key in keyof M]: M[Key] extends undefined
    ? {
        type: Key;
      }
    : {
        type: Key;
        payload: M[Key];
      };
};

export type AuthUserType = AuthUserData | null;

export type AuthStateType = {
  status?: string;
  loading: boolean;
  user: AuthUserType;
};

export type JWTContextType = {
  user: AuthUserType;
  method: string;
  loading: boolean;
  authenticated: boolean;
  unauthenticated: boolean;
  initialize: () => Promise<AxiosResponse<AuthUserResponse>>;
  rawInitialize: () => Promise<AxiosResponse<AuthUserResponse>>;
  login: (
    loginId: string,
    password: string
  ) => Promise<AxiosResponse<AuthUserResponse, any>>;
  logout: () => Promise<AxiosResponse<EmptySuccessResponse, any>>;
  reset: () => void;
};
