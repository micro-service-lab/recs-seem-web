// ----------------------------------------------------------------------
import { AuthMember } from '@/types/entity/member';
import { ApplicationResponse } from '@/types/response/application-response';
import { EmptySuccessResponse } from '@/types/response/empty-success-response';
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

type AuthUserResponse = ApplicationResponse<AuthMember>;

export type AuthUserType = AuthMember | null;

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
