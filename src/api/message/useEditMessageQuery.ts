import { useMutation } from "@tanstack/react-query";
import axios from "@/utils/axios";
import { CHAT_ROOM_ENDPOINTS } from "@/constants/endpoints";
import { ApplicationResponse } from "@/types/response/application-response";
import { Message } from "@/types/entity/message";

type Response = ApplicationResponse<Message>;

type MutateProps = {
  content: string;
};

export const useEditMessageQuery = (chatRoomId: string, messageId: string) => {
  const { data, error, mutate, isPending } = useMutation({
    mutationFn: ({ content }: MutateProps) => {
      return axios.put<Response>(
        CHAT_ROOM_ENDPOINTS.chatRoom.message.edit(chatRoomId, messageId),
        {
          content,
        }
      );
    },
  });

  return { data, error, isPending, mutate };
};
