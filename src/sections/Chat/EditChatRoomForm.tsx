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
import { useUpdateChatRoomQuery } from "@/api/chatRoom/useUpdateChatRoom";
import { useUploadImageQuery } from "@/api/image/useUploadImageQuery";
import { AxiosError } from "axios";
import { formErrorHandle } from "@/utils/errorHandle/formErrorHandle";
import { ErrorResponse } from "@/types/response/error-response";
import { PracticalChatRoomOnMember } from "@/types/entity/chat-room-belonging";
import { useRecoilValue } from "recoil";
import { newNameChatRoomState } from "@/store/newNameChatRoom";

type Props = {
  chatRoom: PracticalChatRoomOnMember;
  onSuccess: () => void;
};

export const EditChatRoomForm = ({ chatRoom, onSuccess }: Props) => {
  const { data, error, isPending, mutate } = useUpdateChatRoomQuery(
    chatRoom.chatRoom.chatRoomId
  );
  const newNameChatRoom = useRecoilValue(newNameChatRoomState);
  const {
    error: uploadError,
    data: uploadedData,
    isPending: uploadIsPending,
    mutate: uploadMutate,
  } = useUploadImageQuery();
  const { t } = useTranslation();
  const toast = useToast();
  const UpdateChatRoomSchema = Yup.object().shape({
    name: Yup.string().required(t("Name is required")),
    coverImage: Yup.mixed<any>().nullable(),
    coverImageId: Yup.string().nullable(),
  });

  const defaultValues = {
    name: newNameChatRoom[chatRoom.chatRoom.chatRoomId] || chatRoom.chatRoom.name || "",
    coverImage: chatRoom.chatRoom.coverImage?.attachableItem.url || null,
    coverImageId: chatRoom.chatRoom.coverImage?.imageId || null,
  };

  const methods = useForm({
    resolver: yupResolver(UpdateChatRoomSchema),
    defaultValues,
  });

  const {
    reset,
    setValue,
    setError,
    watch,
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
      if (typeof data.coverImage === "string" && data.coverImageId) {
        mutate({
          name: data.name,
          coverImageId: data.coverImageId,
        });
      } else {
        mutate({
          name: data.name,
          coverImageId: null,
        });
      }
    }
  });

  useEffect(() => {
    if (uploadedData) {
      mutate({
        name: methods.getValues("name"),
        coverImageId: uploadedData.data[0].attachableItem.imageId,
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
        title: t("chat-room-updated"),
        padding: "10px 20px",
      });
      reset();
      onSuccess();
    }
  }, [data]);

  const handleDefaultSetImage = useCallback(() => {
    setValue("coverImage", chatRoom.chatRoom.coverImage?.attachableItem.url, {
      shouldValidate: true,
    });
  }, [setValue]);

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
          <div className="flex space-x-2">
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
            <button
              className="btn !mt-2 border-0 btn-primary text-xs"
              type="button"
              onClick={handleDefaultSetImage}
              disabled={!chatRoom.chatRoom.coverImage || watch("coverImage") === chatRoom.chatRoom.coverImage.attachableItem.url}
            >
              {t("restore-image")}
            </button>
          </div>
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
      </div>
      <LoadingButton
        loading={isSubmitting || isPending || uploadIsPending}
        type="submit"
        className="btn btn-gradient !mt-6 border-0 uppercase shadow-[0_10px_20px_-10px_rgba(67,97,238,0.44)]"
        loadingChildren={<>{t("updating")}</>}
      >
        {t("update-chat-room")}
      </LoadingButton>
    </FormProvider>
  );
};
