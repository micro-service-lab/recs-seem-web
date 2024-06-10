import { useMutation } from "@tanstack/react-query";
import axios from "@/utils/axios";
import { CHAT_ROOM_ENDPOINTS } from "@/constants/endpoints";
import { ApplicationResponse } from "@/types/response/application-response";
import { MemberWithDetail } from "@/types/entity/member";

type MutateProps = {
  content: string;
  attachableItemIds: string[];
};

type Response = ApplicationResponse<MemberWithDetail>;

export const useCreateMessageQuery = (chatRoomId: string) => {
  const { data, error, mutate, isPending } = useMutation({
    mutationFn: (mutateProps: MutateProps) => {
      return axios.post<Response>(
        CHAT_ROOM_ENDPOINTS.chatRoom.message.create(chatRoomId),
        mutateProps
      );
    },
  });

  return { data, error, isPending, mutate };
};
