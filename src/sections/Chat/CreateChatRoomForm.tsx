import { LoadingButton } from "@/components/Button/LoadingButton";
import FormProvider from "@/components/HookForm/form-provider";
import RHFTextField from "@/components/HookForm/rhf-text-field";
import { RHFUploadAvatar } from "@/components/HookForm/rhf-upload";
import { useToast } from "@/hooks/use-toast";
import { yupResolver } from "@hookform/resolvers/yup";
import { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import * as Yup from "yup";
import { NewChatRoomMemberCheckbox } from "./NewChatRoomMemberCheckbox";
import { useCreateChatRoomQuery } from "@/api/chatRoom/useCreateChatRoom";
import { useUploadImageQuery } from "@/api/image/useUploadImageQuery";
import { AxiosError } from "axios";
import { formErrorHandle } from "@/utils/errorHandle/formErrorHandle";
import { ErrorResponse } from "@/types/response/error-response";

type Props = {
  onSuccess: () => void;
};

export const CreateChatRoomForm = ({ onSuccess }: Props) => {
  const { data, error, isPending, mutate } = useCreateChatRoomQuery();
  const {
    error: uploadError,
    data: uploadedData,
    isPending: uploadIsPending,
    mutate: uploadMutate,
  } = useUploadImageQuery();
  const { t } = useTranslation();
  const toast = useToast();
  const CreateChatRoomSchema = Yup.object().shape({
    name: Yup.string().required(t("Name is required")),
    coverImage: Yup.mixed<any>().nullable(),
    memberIds: Yup.array(),
  });

  const defaultValues = {
    name: "",
    coverImage: null,
    memberIds: [],
  };

  const methods = useForm({
    resolver: yupResolver(CreateChatRoomSchema),
    defaultValues,
  });

  const {
    reset,
    watch,
    setValue,
    setError,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const createFormData = () => {
    const formData = new FormData();
    formData.append("files[]", methods.getValues("coverImage"));
    return formData;
  };

  const onSubmit = handleSubmit(async (data) => {
    if (typeof data.coverImage !== "string" && !!data.coverImage) {
      const formData = await createFormData();
      uploadMutate(formData);
    } else {
      mutate({
        name: data.name,
        memberIds: data.memberIds || [],
      });
    }
  });

  useEffect(() => {
    if (uploadedData) {
      mutate({
        name: methods.getValues("name"),
        coverImageId: uploadedData.data[0].attachableItem.imageId,
        memberIds: methods.getValues("memberIds") || [],
      });
    }
  }, [uploadedData]);

  useEffect(() => {
    if (error && error instanceof AxiosError) {
      const errorResponse = error.response?.data as ErrorResponse;
      formErrorHandle(errorResponse, setError);
    }
  }, [error]);

  useEffect(() => {
    if (data) {
      toast.fire({
        icon: "success",
        title: t("chat-room-created"),
        padding: "10px 20px",
      });
      reset();
      onSuccess();
    }
  }, [data]);

  const handleDropFile = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];

      const newFile = Object.assign(file, {
        preview: URL.createObjectURL(file),
      });

      if (newFile) {
        setValue("coverImage", newFile, { shouldValidate: true });
      }
    },
    [setValue]
  );

  useEffect(() => {
    if (uploadError && uploadError instanceof AxiosError) {
      if (uploadError.response?.data) {
        const errors = uploadError.response.data.errorAttributes || {};
        for (const key of Object.keys(errors)) {
          setError("coverImage", {
            type: "manual",
            message:
              uploadError.response.data.errorAttributes[key as string][0],
          });
        }
      }
    }
  }, [uploadError]);

  return (
    <FormProvider
      methods={methods}
      onSubmit={onSubmit}
      className="w-full flex flex-col space-y-2 items-center mb-2"
    >
      <div className="flex flex-col space-y-2 w-full items-center">
        <div className="flex flex-col items-center">
          <RHFUploadAvatar
            name="coverImage"
            maxSize={10485760}
            onDrop={handleDropFile}
            onDelete={() =>
              setValue("coverImage", null, { shouldValidate: true })
            }
          />
          <button
            className="btn !mt-2 border border-dashed border-red-500 text-xs"
            type="button"
            onClick={() =>
              setValue("coverImage", null, { shouldValidate: true })
            }
            disabled={watch("coverImage") === null}
          >
            {t("remove-image")}
          </button>
        </div>
        <div className="flex flex-col w-1/2 mb-2">
          <label
            htmlFor="Name"
            className="text-lg font-semibold text-white-dark"
          >
            {t("name")}
            <span className="text-danger">*</span>
          </label>
          <RHFTextField
            name="name"
            id="Name"
            type="text"
            className="form-input ps-4 placeholder:text-white-dark"
            errorClassName="text-xs"
          />
        </div>

        <div className="flex flex-col">
          <div className="text-lg font-semibold text-white-dark">
            {t("members")}
          </div>
          <NewChatRoomMemberCheckbox name="memberIds" />
        </div>
      </div>
      <LoadingButton
        loading={isSubmitting || isPending || uploadIsPending}
        type="submit"
        className="btn btn-success !mt-6 border-0"
        loadingChildren={<>{t("creating")}</>}
      >
        {t("create-chat-room")}
      </LoadingButton>
    </FormProvider>
  );
};
