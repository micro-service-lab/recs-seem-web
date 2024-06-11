import { useCreateChatRoomQuery } from "@/api/chatRoom/useCreateChatRoom";
import { useUploadImageQuery } from "@/api/image/useUploadImageQuery";
import FormProvider from "@/components/HookForm/form-provider";
import { RHFMultiCheckbox } from "@/components/HookForm/rhf-checkbox";
import RHFTextField from "@/components/HookForm/rhf-text-field";
import { RHFUpload, RHFUploadAvatar } from "@/components/HookForm/rhf-upload";
import { useToast } from "@/hooks/use-toast";
import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Stack, StackProps, Typography } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import * as Yup from "yup";

export const CreateChatRoomForm = () => {
  // const { isPending, mutate } = useCreateChatRoomQuery();
  // const {
  //   data: uploadedData,
  //   isPending: uploadIsPending,
  //   mutate: uploadMutate,
  // } = useUploadImageQuery();
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
    watch,
    reset,
    control,
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const values = watch();

  const onSubmit = handleSubmit(async (data) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 3000));
      reset();
      console.info("DATA", data);
    } catch (error) {
      console.error(error);
    }
  });

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

  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      <div>
        <div className="flex flex-col space-y-4">
          <RHFUploadAvatar
            name="coverImage"
            maxSize={3145728}
            onDrop={handleDropFile}
            onDelete={() =>
              setValue("coverImage", null, { shouldValidate: true })
            }
          />
        </div>
        <div className="flex flex-col space-y-4">
          <label htmlFor="Name">
            {t("Name")}
            <span className="text-danger">*</span>
          </label>
          <RHFTextField
            name="name"
            id="Name"
            type="text"
            className="form-input ps-4 placeholder:text-white-dark"
          />
        </div>

        <div className="flex flex-col space-y-4">
          <RHFMultiCheckbox
            row
            name="memberIds"
            label="Members"
            spacing={4}
            options={[
              { value: "option 1", label: "Checkbox 1" },
              { value: "option 2", label: "Checkbox 2" },
              { value: "option 3", label: "Checkbox 3" },
            ]}
          />
        </div>
      </div>
      <LoadingButton
        fullWidth
        color="info"
        size="large"
        type="submit"
        variant="soft"
        loading={isSubmitting}
      >
        Submit to Check
      </LoadingButton>
    </FormProvider>
  );
};

interface BlockProps extends StackProps {
  label?: string;
  children: React.ReactNode;
}

function Block({ label = "RHFTextField", sx, children }: BlockProps) {
  return (
    <Stack spacing={1} sx={{ width: 1, ...sx }}>
      <Typography
        variant="caption"
        sx={{
          textAlign: "right",
          fontStyle: "italic",
          color: "text.disabled",
        }}
      >
        {label}
      </Typography>
      {children}
    </Stack>
  );
}
