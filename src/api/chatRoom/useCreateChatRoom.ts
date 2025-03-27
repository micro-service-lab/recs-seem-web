import { useMutation } from "@tanstack/react-query";
import axios from "@/utils/axios";
import { CHAT_ROOM_ENDPOINTS } from "@/constants/endpoints";
import { EmptySuccessResponse } from "@/types/response/empty-success-response";

type Response = EmptySuccessResponse;

type MutateProps = {
  name: string;
  coverImageId?: string | null;
  memberIds: string[];
};

export const useCreateChatRoomQuery = () => {
  const { data, error, mutate, isPending } = useMutation({
    mutationFn: (mutateProps: MutateProps) => {
      return axios.post<Response>(
        CHAT_ROOM_ENDPOINTS.chatRoom.create,
        mutateProps,
      );
    },
  });

  return { data, error, isPending, mutate };
};
