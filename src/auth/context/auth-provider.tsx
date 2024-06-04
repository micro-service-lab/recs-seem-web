import { useEffect, useReducer, useCallback, useMemo } from 'react';
// utils
import axios, { rawAxiosInstance as axiosRaw } from '@/utils/axios';
//
import { AuthContext } from './auth-context';
import { ActionMapType, AuthStateType, AuthUserType } from '../types';
import { AUTH_ENDPOINTS } from '@/constants/endpoints/auth-endpoint';
import { AxiosResponse } from 'axios';
import { EmptySuccessResponse } from '@/types/response/empty-success-response';
import { ApplicationResponse } from '@/types/response/application-response';
import { AuthMember } from '@/types/entity/member';
import { AuthJwt } from '@/types/entity/auth-jwt';

// ----------------------------------------------------------------------

enum Types {
  INITIAL = 'INITIAL',
  RAW_INITIAL = 'RAW_INITIAL',
  LOGIN = 'LOGIN',
  REGISTER = 'REGISTER',
  LOGOUT = 'LOGOUT',
}

type Payload = {
  [Types.INITIAL]: {
    user: AuthUserType;
  };
  [Types.RAW_INITIAL]: {
    user: AuthUserType;
  };
  [Types.LOGIN]: {
    user: AuthUserType;
  };
  [Types.REGISTER]: {
    user: AuthUserType;
  };
  [Types.LOGOUT]: undefined;
};

type AuthUserResponse = ApplicationResponse<AuthMember>;

type ActionsType = ActionMapType<Payload>[keyof ActionMapType<Payload>];

// ----------------------------------------------------------------------

const initialState: AuthStateType = {
  user: null,
  loading: true,
};

const reducer = (state: AuthStateType, action: ActionsType) => {
  if (action.type === Types.INITIAL || action.type === Types.RAW_INITIAL) {
    return {
      loading: false,
      user: action.payload.user,
    };
  }
  if (action.type === Types.LOGIN) {
    return {
      ...state,
      user: action.payload.user,
    };
  }
  if (action.type === Types.REGISTER) {
    return {
      ...state,
      user: action.payload.user,
    };
  }
  if (action.type === Types.LOGOUT) {
    return {
      ...state,
      user: null,
    };
  }
  return state;
};

// ----------------------------------------------------------------------

type Props = {
  children: React.ReactNode;
};

export function AuthProvider({ children }: Props) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const initialize = useCallback(async (): Promise<
    AxiosResponse<AuthUserResponse>
  > => {
    try {
      const res = await axios.get<AuthUserResponse>(
        AUTH_ENDPOINTS.auth.me
      );

      const { data } = res.data;

      dispatch({
        type: Types.INITIAL,
        payload: {
          user: data,
        },
      });

      return res;
    } catch (error) {
      dispatch({
        type: Types.INITIAL,
        payload: {
          user: null,
        },
      });
      return Promise.reject(error);
    }
  }, []);

  const rawInitialize = useCallback(async (): Promise<
    AxiosResponse<AuthUserResponse>
  > => {
    try {
      const res = await axiosRaw.get<AuthUserResponse>(
        AUTH_ENDPOINTS.auth.me
      );

      const { data } = res.data;

      dispatch({
        type: Types.RAW_INITIAL,
        payload: {
          user: data,
        },
      });

      return res;
    } catch (error) {
      dispatch({
        type: Types.RAW_INITIAL,
        payload: {
          user: null,
        },
      });
      return Promise.reject(error);
    }
  }, []);

  useEffect(() => {
    initialize();
  }, [initialize]);

  /* eslint-disable @typescript-eslint/no-explicit-any */
  // LOGIN
  const login = useCallback(
    async (
      loginId: string,
      password: string
    ): Promise<AxiosResponse<AuthUserResponse, any>> => {
      const data = {
        loginId,
        password,
      };

      return await axios
        .post<ApplicationResponse<AuthJwt>>(AUTH_ENDPOINTS.auth.login, data)
        .then(async () => {
          return await initialize();
        })
        .catch((error) => {
          return Promise.reject(error);
        });
    },
    [initialize]
  );

  // LOGOUT
  const logout = useCallback(async (): Promise<
    AxiosResponse<EmptySuccessResponse, any>
  > => {
    return await axios
      .post<EmptySuccessResponse>(AUTH_ENDPOINTS.auth.logout)
      .then((data) => {
        dispatch({
          type: Types.LOGOUT,
        });
        return data;
      })
      .catch((error) => {
        dispatch({
          type: Types.LOGOUT,
        });
        return Promise.reject(error);
      });
  }, []);

  const reset = useCallback(() => {
    dispatch({
      type: Types.LOGOUT,
    });
  }, []);

  // ----------------------------------------------------------------------

  const checkAuthenticated = state.user ? 'authenticated' : 'unauthenticated';

  const status = state.loading ? 'loading' : checkAuthenticated;

  const memoizedValue = useMemo(
    () => ({
      user: state.user,
      method: 'jwt',
      loading: status === 'loading',
      authenticated: status === 'authenticated',
      unauthenticated: status === 'unauthenticated',
      //
      initialize,
      rawInitialize,
      login,
      logout,
      reset,
    }),
    [
      initialize,
      rawInitialize,
      login,
      logout,
      reset,
      state.user,
      status,
    ]
  );

  return (
    <AuthContext.Provider value={memoizedValue}>
      {children}
    </AuthContext.Provider>
  );
}
