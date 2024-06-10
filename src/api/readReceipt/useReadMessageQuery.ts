import { useMutation } from "@tanstack/react-query";
import axios from "@/utils/axios";
import { CHAT_ROOM_ENDPOINTS } from "@/constants/endpoints";
import { ApplicationResponse } from "@/types/response/application-response";

type MutateProps = {
  chatRoomId: string;
  messageId: string;
};

type Response = ApplicationResponse<{
  read: boolean;
}>;

export const useReadMessageQuery = () => {
  const { data, error, mutate, isPending } = useMutation({
    mutationFn: ({
      chatRoomId,
      messageId,
    }: MutateProps) => {
      return axios.post<Response>(
        CHAT_ROOM_ENDPOINTS.chatRoom.message.readReceipt.read(
          chatRoomId,
          messageId
        )
      );
    },
  });

  return { data, error, isPending, mutate };
};
