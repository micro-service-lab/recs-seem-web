import {
  InfiniteData,
  UseInfiniteQueryOptions,
  UseSuspenseInfiniteQueryResult,
  useSuspenseInfiniteQuery,
  useSuspenseQuery,
} from "@tanstack/react-query";
import axios from "@/utils/axios";
import { chatRoomQueryKey } from "@/query-keys/chat-room-query-key";
import { CHAT_ROOM_ENDPOINTS } from "@/constants/endpoints";
import { ApplicationResponse } from "@/types/response/application-response";
import { ApplicationListData } from "@/types/response/application-list-data";
import { AxiosError } from "axios";
import { ChatRoomActionPractical } from "@/types/entity/chat-room-action";

export type ChatRoomActionOnChatRoomQueryParam = {
  order:
    | "default"
    | "acted_at"
    | "r_acted_at"
  limit: number;
  offset: number;
  pagination: "none" | "numbered" | "cursor";
  cursor: string;
  withCount: boolean;
  searchTypes: string[];
};

type DefaultResponse = ApplicationResponse<ApplicationListData<ChatRoomActionPractical>>;

const getChatRoomActionsOnChatRoom = async (chatRoomId: string, params: ChatRoomActionOnChatRoomQueryParam) => {
  return axios
    .get<DefaultResponse>(CHAT_ROOM_ENDPOINTS.chatRoom.action.get(chatRoomId), {
      params,
    })
    .then((res) => res.data);
};

export const useGetChatRoomActionsOnChatRoomQuery = (chatRoomId: string, params: ChatRoomActionOnChatRoomQueryParam) => {
  const { data, status, isPending } = useSuspenseQuery({
    queryKey: [chatRoomQueryKey.action.list(chatRoomId), params],
    queryFn: () => getChatRoomActionsOnChatRoom(chatRoomId, params),
    select: (data) => {
      return data.data;
    },
    staleTime: 1000 * 60 * 2,
    gcTime: 1000 * 60 * 10,
  });

  return { data, status, isPending };
};

export const useGetInfinityChatRoomActionsOnChatRoomQuery = <TData = InfiniteData<DefaultResponse>>(
  chatRoomId: string,
  params: ChatRoomActionOnChatRoomQueryParam,
  options?: UseInfiniteQueryOptions<DefaultResponse, AxiosError, TData>
): UseSuspenseInfiniteQueryResult<TData, AxiosError> => {
  return useSuspenseInfiniteQuery({
    queryKey: [chatRoomQueryKey.action.list(chatRoomId), params],
    queryFn: (pageParam) => {
      const cur = pageParam.pageParam as string;
      return getChatRoomActionsOnChatRoom(chatRoomId, { ...params, cursor: cur });
    },
    initialPageParam: "",
    getNextPageParam: (lastPage) => lastPage.data.cursorPagination.nextCursor === "" ? undefined : lastPage.data.cursorPagination.nextCursor,
    getPreviousPageParam: (firstPage) =>
      firstPage.data.cursorPagination.prevCursor === "" ? undefined : firstPage.data.cursorPagination.prevCursor,
    ...options,
  });
};
