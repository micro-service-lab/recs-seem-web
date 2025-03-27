import { useMutation } from "@tanstack/react-query";
import axios from "@/utils/axios";
import { CHAT_ROOM_ENDPOINTS } from "@/constants/endpoints";
import { ApplicationResponse } from "@/types/response/application-response";

type MutateProps = {
  chatRoomId: string;
};

type Response = ApplicationResponse<{
  read: number;
}>;

export const useReadMessagesOnChatRoomQuery = () => {
  const { data, error, mutate, isPending } = useMutation({
    mutationFn: ({
      chatRoomId
    }: MutateProps) => {
      return axios.post<Response>(
        CHAT_ROOM_ENDPOINTS.chatRoom.message.read(chatRoomId)
      );
    },
  });

  return { data, error, isPending, mutate };
};
