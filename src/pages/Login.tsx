import { useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { IRootState } from "@/store";
import { useEffect, useState } from "react";
import { setPageTitle, toggleRTL } from "@/store/themeConfigSlice";
import Dropdown from "@/components/Dropdown";
import i18next from "i18next";
import IconCaretDown from "@/components/Icon/IconCaretDown";
import IconLockDots from "@/components/Icon/IconLockDots";
import IconLoginId from "@/components/Icon/IconLoginId";
import { useTranslation } from "react-i18next";
import { useAuthContext } from "@/auth/hooks";
import { useToast } from "@/hooks/use-toast";
import { useBoolean } from "@/hooks/use-boolean";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { AxiosError } from "axios";
import { ErrorResponse } from "@/types/response/error-response";
import RHFTextField from "@/components/HookForm/rhf-text-field";
import FormProvider from "@/components/HookForm/form-provider";
import { LoadingButton } from "@/components/Button/LoadingButton";
import IconX from "@/components/Icon/IconX";
import IconInfoHexagon from "@/components/Icon/IconInfoHexagon";

const Login = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setPageTitle(t("sign-in")));
  });
  const { t } = useTranslation("auth");
  const { t: tT } = useTranslation();
  const { t: rT } = useTranslation("response");
  const showAlert = useBoolean();

  const navigate = useNavigate();
  const isRtl =
    useSelector((state: IRootState) => state.themeConfig.rtlClass) === "rtl"
      ? true
      : false;
  const themeConfig = useSelector((state: IRootState) => state.themeConfig);
  const setLocale = (flag: string) => {
    setFlag(flag);
    if (flag.toLowerCase() === "ae") {
      dispatch(toggleRTL("rtl"));
    } else {
      dispatch(toggleRTL("ltr"));
    }
  };
  const [flag, setFlag] = useState(themeConfig.locale);

  const { login } = useAuthContext();
  const toast = useToast();
  const [errorMsg, setErrorMsg] = useState("");
  const [searchParams] = useSearchParams();
  const returnTo = searchParams.get("returnTo");

  const LoginSchema = Yup.object().shape({
    loginId: Yup.string().required(tT("Login ID is required")),
    password: Yup.string().required(tT("Password is required")),
  });

  const defaultValues = {
    loginId: "",
    password: "",
  };

  const methods = useForm({
    resolver: yupResolver(LoginSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    setValue,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    showAlert.onTrue();
    await login?.(data.loginId, data.password)
      .then(() => {
        toast.fire({
          icon: "success",
          title: tT("Login successfully"),
          padding: "10px 20px",
        });
        navigate(returnTo || "/");
      })
      .catch((error: AxiosError<ErrorResponse>) => {
        setValue("password", "");
        const msg = rT(
          error.response?.errorMessage || "",
          error.response?.errorMessageParam
        )
        typeof msg === "string" ? setErrorMsg(msg) : setErrorMsg(rT("Unknown error"));
      });
  });

  return (
    <div>
      <div className="absolute inset-0">
        <img
          src="/assets/images/auth/bg-gradient.png"
          alt="image"
          className="h-full w-full object-cover"
        />
      </div>

      <div className="relative flex min-h-screen items-center justify-center bg-[url(/assets/images/auth/map.png)] bg-cover bg-center bg-no-repeat px-6 py-10 dark:bg-[#060818] sm:px-16">
        <img
          src="/assets/images/auth/coming-soon-object1.png"
          alt="image"
          className="absolute left-0 top-1/2 h-full max-h-[893px] -translate-y-1/2"
        />
        <img
          src="/assets/images/auth/coming-soon-object2.png"
          alt="image"
          className="absolute left-24 top-0 h-40 md:left-[30%]"
        />
        <img
          src="/assets/images/auth/coming-soon-object3.png"
          alt="image"
          className="absolute right-0 top-0 h-[300px]"
        />
        <img
          src="/assets/images/auth/polygon-object.svg"
          alt="image"
          className="absolute bottom-0 end-[28%]"
        />
        <div className="relative w-full max-w-[870px] rounded-md bg-[linear-gradient(45deg,#fff9f9_0%,rgba(255,255,255,0)_25%,rgba(255,255,255,0)_75%,_#fff9f9_100%)] p-2 dark:bg-[linear-gradient(52.22deg,#0E1726_0%,rgba(14,23,38,0)_18.66%,rgba(14,23,38,0)_51.04%,rgba(14,23,38,0)_80.07%,#0E1726_100%)]">
          <div className="relative flex flex-col justify-center rounded-md bg-white/60 backdrop-blur-lg dark:bg-black/50 px-6 lg:min-h-[758px] py-20">
            <div className="absolute top-6 end-6">
              <div className="dropdown">
                <Dropdown
                  offset={[0, 8]}
                  placement={`${isRtl ? "bottom-start" : "bottom-end"}`}
                  btnClassName="flex items-center gap-2.5 rounded-lg border border-white-dark/30 bg-white px-2 py-1.5 text-white-dark hover:border-primary hover:text-primary dark:bg-black"
                  button={
                    <>
                      <div>
                        <img
                          src={`/assets/images/flags/${flag.toUpperCase()}.svg`}
                          alt="image"
                          className="h-5 w-5 rounded-full object-cover"
                        />
                      </div>
                      <div className="text-base font-bold uppercase">
                        {flag}
                      </div>
                      <span className="shrink-0">
                        <IconCaretDown />
                      </span>
                    </>
                  }
                >
                  <ul className="!px-2 text-dark dark:text-white-dark grid grid-cols-2 gap-2 font-semibold dark:text-white-light/90 w-[280px]">
                    {
                      /* eslint-disable @typescript-eslint/no-explicit-any */
                      themeConfig.languageList.map((item: any) => {
                        return (
                          <li key={item.code}>
                            <button
                              type="button"
                              className={`flex w-full hover:text-primary rounded-lg ${
                                flag === item.code
                                  ? "bg-primary/10 text-primary"
                                  : ""
                              }`}
                              onClick={() => {
                                i18next.changeLanguage(item.code);
                                // setFlag(item.code);
                                setLocale(item.code);
                              }}
                            >
                              <img
                                src={`/assets/images/flags/${item.code.toUpperCase()}.svg`}
                                alt="flag"
                                className="w-5 h-5 object-cover rounded-full"
                              />
                              <span className="ltr:ml-3 rtl:mr-3">
                                {item.name}
                              </span>
                            </button>
                          </li>
                        );
                      })
                    }
                  </ul>
                </Dropdown>
              </div>
            </div>
            <div className="mx-auto w-full max-w-[440px]">
              <div className="mb-16">
                <h1 className="text-3xl font-extrabold uppercase !leading-snug text-primary md:text-4xl">
                  {t("sign-in")}
                </h1>
                <p className="text-base font-bold leading-normal text-white-dark">
                  {t("sign-in-description")}
                </p>
              </div>
              <FormProvider
                methods={methods}
                onSubmit={onSubmit}
                className="space-y-5 dark:text-white"
              >
                {!!errorMsg && showAlert.value && (
                  <div className="relative flex items-center border p-3.5 rounded before:absolute before:top-1/2 ltr:before:left-0 rtl:before:right-0 rtl:before:rotate-180 before:-mt-2 before:border-l-8 before:border-t-8 before:border-b-8 before:border-t-transparent before:border-b-transparent before:border-l-inherit text-danger bg-danger-light !border-danger ltr:border-l-[64px] rtl:border-r-[64px] dark:bg-danger-dark-light">
                    <span className="absolute ltr:-left-11 rtl:-right-11 inset-y-0 text-white w-6 h-6 m-auto flex items-center">
                      <IconInfoHexagon className="w-12 h-12" />
                    </span>
                    <span className="ltr:pr-2 rtl:pl-2 whitespace-pre-wrap">
                      {errorMsg}
                    </span>
                    <button
                      type="button"
                      className="ltr:ml-auto rtl:mr-auto hover:opacity-80"
                      onClick={() => showAlert.onFalse()}
                    >
                      <IconX />
                    </button>
                  </div>
                )}
                <div>
                  <label htmlFor="LoginId">{t("login-id")}</label>
                  <RHFTextField
                    name="loginId"
                    id="LoginId"
                    type="text"
                    placeholder={t("enter-login-id")}
                    className="form-input ps-10 placeholder:text-white-dark"
                    startProps={
                      <span className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                        <IconLoginId fill={true} />
                      </span>
                    }
                  />
                </div>
                <div>
                  <label htmlFor="Password">{t("password")}</label>
                  <RHFTextField
                    name="password"
                    id="Password"
                    type="password"
                    placeholder={t("enter-password")}
                    className="form-input ps-10 placeholder:text-white-dark"
                    startProps={
                      <span className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                        <IconLockDots fill={true} />
                      </span>
                    }
                  />
                </div>

                <LoadingButton
                  loading={isSubmitting}
                  type="submit"
                  className="btn btn-gradient !mt-6 w-full border-0 uppercase shadow-[0_10px_20px_-10px_rgba(67,97,238,0.44)]"
                  loadingChildren={<>{t("sign-in-loading")}</>}
                >
                  {t("sign-in")}
                </LoadingButton>
              </FormProvider>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
