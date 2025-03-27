import { useMutation } from "@tanstack/react-query";
import axios from "@/utils/axios";
import { CHAT_ROOM_ENDPOINTS } from "@/constants/endpoints";
import { EmptySuccessResponse } from "@/types/response/empty-success-response";

type Response = EmptySuccessResponse;

export const useWithdrawChatRoomQuery = (chatRoomId: string) => {
  const { data, error, mutate, isPending } = useMutation({
    mutationFn: () => {
      return axios.post<Response>(
        CHAT_ROOM_ENDPOINTS.chatRoom.member.withdraw(chatRoomId)
      );
    },
  });

  return { data, error, isPending, mutate };
};
