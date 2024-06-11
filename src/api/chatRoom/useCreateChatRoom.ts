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

export const useCreateChatRoomQuery = (chatRoomId: string) => {
  const { data, error, mutate, isPending } = useMutation({
    mutationFn: ({ memberIds }: MutateProps) => {
      return axios.post<Response>(
        CHAT_ROOM_ENDPOINTS.chatRoom.member.add(chatRoomId),
        { memberIds }
      );
    },
  });

  return { data, error, isPending, mutate };
};
