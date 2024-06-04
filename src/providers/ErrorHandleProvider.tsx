import { ReactNode, useCallback, useEffect, useRef, useState } from "react";
import { AxiosError, AxiosResponse } from "axios";
import axios from "@/utils/axios";
import { ErrorMessage, handleError } from "@/utils/api/handleError";
import { useAuthContext } from "@/auth/hooks";
import { isApplicationErrorResponse } from "@/types/response/error-response";
import { LoadingScreen } from "@/components/LoadingScreen";
import { useTranslation } from "react-i18next";
import i18next from "i18next";
import { useToast } from "@/hooks/use-toast";
import { convertKeysToCamelCase } from "@/utils/change-case";

type Props = {
  children: ReactNode;
};

const REFRESH_SECOND = 3;

/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
export const ErrorHandleProvider = ({ children }: Props) => {
  const isRefreshingAccessToken = useRef<boolean>(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingInitially, setIsLoadingInitially] = useState(true);
  const { logout, reset, initialize, user } = useAuthContext();
  const { t } = useTranslation();
  const { t: responseT } = useTranslation("response");
  const toast = useToast();

  // 強制ログアウト
  const logoutForcibly = useCallback(async (msg: ErrorMessage) => {
    console.error(msg);
    await logout();
  }, [logout]);

  // ログイン画面へ遷移する
  // あくまでフロント側のログアウト処理のみで、サーバ側へのログアウトリクエストは行わない
  const transitionToLogin = useCallback(async (msg: ErrorMessage) => {
    console.error(msg);
    reset();
    setIsLoading(false);
  }, [reset, setIsLoading]);

  // リフレッシュトークンを元にアクセストークンの再発行をリクエストする
  // リクエストに失敗した場合(有効なリフレッシュトークンが無い場合)は、ログアウトさせる
  const requestRefreshToken = useCallback(async (msg: ErrorMessage) => {
    console.error(msg);
    if (isRefreshingAccessToken.current) return;
    isRefreshingAccessToken.current = true;
    setIsLoading(true);
    axios
      .post("auth/refresh")
      .then(() => {
        // 同時送信のレスポンスの返却の確認が難しいため、setTimeoutより時間をあけて行っている.
        // なおこの時間はaccessTokenの有効期限内であれば、どれだけ長くてもいいはず。ただこの時間だけloading時間が長い。
        setTimeout(async () => {
          isRefreshingAccessToken.current = false;
          await initialize();
          setIsLoading(false);

          toast.fire({
            icon: "success",
            title: t("Updated certification information"),
            padding: "10px 20px",
          });
        }, REFRESH_SECOND * 1000);
      })
      .catch(async () => {
        setIsLoading(false);
        setTimeout(async () => {
          isRefreshingAccessToken.current = false;
          // await initialize();
        }, REFRESH_SECOND * 1000);
      });
  }, [initialize, t, toast, setIsLoading, isRefreshingAccessToken]);

  // Toast でエラーメッセージを表示
  const displayErrorToast = useCallback(async (message: ErrorMessage) => {
    toast.fire({
      icon: "error",
      title: responseT(message.message, message.messageParam),
      padding: "10px 20px",
    });
  }, [toast, responseT]);

  useEffect(() => {
    // axiosの共通エラーハンドリング記述
    const responseInterceptors = axios.interceptors.response.use(
      (response: AxiosResponse) => {
        // 成功時(200代)のレスポンスハンドリング
        return response;
      },
      async (error: AxiosError<any>) => {
        if (!isApplicationErrorResponse(error)) {
          const message = {
            message: "An unexpected error has occurred",
            messageParam: {},
          };
          displayErrorToast(message);
          return Promise.reject(error);
        }
        if (error.response != undefined) {
          error.response.data = convertKeysToCamelCase(error.response.data);
        }
        // エラーハンドリング
        const message = await handleError(error.response?.data, {
          logoutForcibly,
          transitionToLogin,
          requestRefreshToken,
          displayErrorToast,
        });
        if (error.response) {
          error.response.errorMessage = message.message;
          error.response.errorMessageParam = message.messageParam;
        }

        return Promise.reject(error);
      }
    );

    setIsLoadingInitially(false);

    // クリーンアップ
    return () => {
      axios.interceptors.response.eject(responseInterceptors);
    };
  }, [
    displayErrorToast,
    logoutForcibly,
    requestRefreshToken,
    transitionToLogin,
  ]);

  useEffect(() => {
    axios.defaults.headers.common["Accept-Language"] = i18next.language;
  }, [i18next.language, user]);

  if (isLoadingInitially) return null;
  if (isLoading) return <LoadingScreen />;
  return <>{children}</>;
};
