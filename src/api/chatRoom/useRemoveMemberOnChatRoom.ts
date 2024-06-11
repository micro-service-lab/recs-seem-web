import { useMutation } from "@tanstack/react-query";
import axios from "@/utils/axios";
import { CHAT_ROOM_ENDPOINTS } from "@/constants/endpoints";
import { EmptySuccessResponse } from "@/types/response/empty-success-response";

type Response = EmptySuccessResponse;

type MutateProps = {
  memberIds: string[];
};

export const useRemoveMemberOnChatRoomQuery = (chatRoomId: string) => {
  const { data, error, mutate, isPending } = useMutation({
    mutationFn: ({ memberIds }: MutateProps) => {
      return axios.delete<Response>(CHAT_ROOM_ENDPOINTS.chatRoom.member.remove(chatRoomId),{
        data: { memberIds },
      });
    },
  });

  return { data, error, isPending, mutate };
};
