import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { IRootState } from "@/store";
import { setPageTitle, toggleLocale } from "@/store/themeConfigSlice";
import { Suspense, useEffect, useState } from "react";
import Dropdown from "@/components/Dropdown";
import IconCaretDown from "@/components/Icon/IconCaretDown";
import { useTranslation } from "react-i18next";
import FormProvider from "@/components/HookForm/form-provider";
import { useToast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { AxiosError } from "axios";
import {
  ErrorResponse,
  isApplicationErrorResponse,
} from "@/types/response/error-response";
import { useBoolean } from "@/hooks/use-boolean";
import { LoadingButton } from "@/components/Button/LoadingButton";
import RHFTextField from "@/components/HookForm/rhf-text-field";
import IconInfoHexagon from "@/components/Icon/IconInfoHexagon";
import IconX from "@/components/Icon/IconX";
import { useRegisterQuery } from "@/api/auth/RegisterQuery";
import GradeRadio from "@/sections/Form/GradeRadio";
import GroupRadio from "@/sections/Form/GroupRadio";
import { formErrorHandle } from "@/utils/errorHandle/formErrorHandle";
import { API_RESPONSE_TYPES } from "@/constants/backend-response";

/* eslint-disable @typescript-eslint/no-explicit-any */
const RegisterBoxed = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setPageTitle(t("sign-up")));
  });
  const { isPending, mutate } = useRegisterQuery();
  const { t } = useTranslation("auth");
  const { t: tT } = useTranslation();
  const showAlert = useBoolean();
  const navigate = useNavigate();
  const themeConfig = useSelector((state: IRootState) => state.themeConfig);
  const toast = useToast();
  const [errorMsg, setErrorMsg] = useState("");

  const RegisterSchema = Yup.object().shape({
    loginId: Yup.string().required(tT("Login ID is required")),
    password: Yup.string().required(tT("Password is required")),
    passwordConfirmation: Yup.string()
      .required(tT("Password Confirm is required"))
      .oneOf([Yup.ref("password")], tT("Must match 'password' field value")),
    name: Yup.string().required(tT("Name is required")),
    email: Yup.string()
      .required(tT("Email is required"))
      .email(tT("Invalid email")),
    firstName: Yup.string(),
    lastName: Yup.string(),
    gradeId: Yup.string().required(tT("Grade is required")),
    groupId: Yup.string().required(tT("Group is required")),
  });

  const defaultValues = {
    loginId: "",
    password: "",
    passwordConfirmation: "",
    email: "",
    name: "",
    firstName: "",
    lastName: "",
    gradeId: "",
    groupId: "",
  };

  const methods = useForm({
    resolver: yupResolver(RegisterSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    setValue,
    setError,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    showAlert.onTrue();
    mutate(data, {
      onSuccess: () => {
        toast.fire({
          icon: "success",
          title: tT("Register successfully"),
          padding: "10px 20px",
        });
        navigate("/login");
      },
      onError(error) {
        setValue("password", "");
        setValue("passwordConfirmation", "");
        let msg = tT("unknown-error");
        if (error instanceof AxiosError) {
          error.response?.data &&
            formErrorHandle(error.response.data as ErrorResponse, setError);
          toast.fire({
            icon: "error",
            title: tT("Register failed"),
            padding: "10px 20px",
          });
          if (
            isApplicationErrorResponse(error.response?.data) &&
            error.response?.data.code === API_RESPONSE_TYPES.Validation
          ) {
            msg = tT("input-error");
          }
        }
        setErrorMsg(msg);
      },
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
                  placement="bottom-end"
                  btnClassName="flex items-center gap-2.5 rounded-lg border border-white-dark/30 bg-white px-2 py-1.5 text-white-dark hover:border-primary hover:text-primary dark:bg-black"
                  button={
                    <>
                      <div>
                        <img
                          src={`/assets/images/flags/${themeConfig.locale.toUpperCase()}.svg`}
                          alt="image"
                          className="h-5 w-5 rounded-full object-cover"
                        />
                      </div>
                      <div className="text-base font-bold uppercase">
                        {themeConfig.locale}
                      </div>
                      <span className="shrink-0">
                        <IconCaretDown />
                      </span>
                    </>
                  }
                >
                  <ul className="!px-2 text-dark dark:text-white-dark grid grid-cols-2 gap-2 font-semibold dark:text-white-light/90 w-[280px]">
                    {themeConfig.languageList.map((item: any) => {
                      return (
                        <li key={item.code}>
                          <button
                            type="button"
                            className={`flex w-full hover:text-primary rounded-lg ${
                              themeConfig.locale === item.code
                                ? "bg-primary/10 text-primary"
                                : ""
                            }`}
                            onClick={() => {
                              dispatch(toggleLocale(item.code));
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
                    })}
                  </ul>
                </Dropdown>
              </div>
            </div>
            <div className="mx-auto w-full max-w-[440px]">
              <div className="mb-10">
                <h1 className="text-3xl font-extrabold uppercase !leading-snug text-primary md:text-4xl">
                  {t("sign-up")}
                </h1>
                <p className="text-base font-bold leading-normal text-white-dark">
                  {t("sign-up-description")}
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
                  <label htmlFor="LoginId">
                    {t("login-id")}
                    <span className="text-danger">*</span>
                  </label>
                  <RHFTextField
                    name="loginId"
                    id="LoginId"
                    type="text"
                    className="form-input ps-4 placeholder:text-white-dark"
                  />
                </div>
                <div>
                  <label htmlFor="Password">
                    {t("password")}
                    <span className="text-danger">*</span>
                  </label>
                  <RHFTextField
                    name="password"
                    id="Password"
                    type="password"
                    className="form-input ps-4 placeholder:text-white-dark"
                  />
                </div>

                <div>
                  <label htmlFor="PasswordConfirmation">
                    {t("password-confirmation")}
                    <span className="text-danger">*</span>
                  </label>
                  <RHFTextField
                    name="passwordConfirmation"
                    id="PasswordConfirmation"
                    type="password"
                    className="form-input ps-4 placeholder:text-white-dark"
                  />
                </div>

                <div>
                  <label htmlFor="email">
                    {t("email")}
                    <span className="text-danger">*</span>
                  </label>
                  <RHFTextField
                    name="email"
                    id="email"
                    type="text"
                    className="form-input ps-4 placeholder:text-white-dark"
                  />
                </div>

                <div>
                  <label htmlFor="name">
                    {t("name")}
                    <span className="text-danger">*</span>
                  </label>
                  <RHFTextField
                    name="name"
                    id="name"
                    type="text"
                    className="form-input ps-4 placeholder:text-white-dark"
                  />
                </div>

                <div
                  className={`flex gap-2 ${
                    themeConfig.locale === "ja"
                      ? "flex-row-reverse"
                      : "flex-row"
                  }`}
                >
                  <div className="w-1/2">
                    <label htmlFor="firstName">{t("first-name")}</label>
                    <RHFTextField
                      name="firstName"
                      id="firstName"
                      type="text"
                      className="form-input ps-4 placeholder:text-white-dark"
                    />
                  </div>
                  <div className="w-1/2">
                    <label htmlFor="lastName">{t("last-name")}</label>
                    <RHFTextField
                      name="lastName"
                      id="lastName"
                      type="text"
                      className="form-input ps-4 placeholder:text-white-dark"
                    />
                  </div>
                </div>

                <Suspense
                  fallback={
                    <div>
                      <div role="status" className="animate-pulse">
                        <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 max-w-[640px] mb-2.5 mx-auto"></div>
                        <div className="h-2.5 mx-auto bg-gray-300 rounded-full dark:bg-gray-700 max-w-[540px]"></div>
                        <div className="flex items-center justify-center mt-4">
                          <svg
                            className="w-8 h-8 text-gray-200 dark:text-gray-700 me-4"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
                          </svg>
                          <div className="w-20 h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 me-3"></div>
                          <div className="w-24 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                        </div>
                        <span className="sr-only">Loading...</span>
                      </div>
                    </div>
                  }
                >
                  <GradeRadio name="gradeId" label={tT("grade")} required />
                  <GroupRadio name="groupId" label={tT("group")} required />
                </Suspense>

                <LoadingButton
                  loading={isSubmitting || isPending}
                  type="submit"
                  className="btn btn-gradient !mt-6 w-full border-0 uppercase shadow-[0_10px_20px_-10px_rgba(67,97,238,0.44)]"
                  loadingChildren={<>{t("sign-up-loading")}</>}
                >
                  {t("sign-up")}
                </LoadingButton>
              </FormProvider>
              <div className="text-center dark:text-white my-8 md:mb-9">
                {t("already-have-an-account")}&nbsp;
                <Link
                  to="/login"
                  className="uppercase text-primary underline transition hover:text-black dark:hover:text-white"
                >
                  {t("sign-in")}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterBoxed;
