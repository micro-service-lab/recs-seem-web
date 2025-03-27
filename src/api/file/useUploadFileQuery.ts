import { useMutation } from "@tanstack/react-query";
import axios from "@/utils/axios";
import { ApplicationResponse } from "@/types/response/application-response";
import { FileWithAttachableItem } from "@/types/entity/file";
import { ATTACHABLE_ITEM_ENDPOINTS } from "@/constants/endpoints/attachable-item-endpoint";

type Response = ApplicationResponse<FileWithAttachableItem[]>;

export const useUploadFileQuery = () => {
  const { data, error, mutate, isPending } = useMutation({
    mutationFn: (mutateProps: FormData) => {
      return axios.post<Response>(
        ATTACHABLE_ITEM_ENDPOINTS.file.upload,
        mutateProps,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      ).then((res) => res.data);
    },
  });

  return { data, error, isPending, mutate };
};
