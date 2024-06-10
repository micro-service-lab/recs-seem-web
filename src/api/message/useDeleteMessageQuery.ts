import { useMutation } from "@tanstack/react-query";
import axios from "@/utils/axios";
import { CHAT_ROOM_ENDPOINTS } from "@/constants/endpoints";
import { EmptySuccessResponse } from "@/types/response/empty-success-response";

type Response = EmptySuccessResponse;

export const useDeleteMessageQuery = (chatRoomId: string, messageId: string) => {
  const { data, error, mutate, isPending } = useMutation({
    mutationFn: () => {
      return axios.delete<Response>(
        CHAT_ROOM_ENDPOINTS.chatRoom.message.delete(chatRoomId, messageId)
      );
    },
  });

  return { data, error, isPending, mutate };
};
