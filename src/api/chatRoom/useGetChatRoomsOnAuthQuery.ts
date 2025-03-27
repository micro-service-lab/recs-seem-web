import {
  InfiniteData,
  UseInfiniteQueryOptions,
  UseSuspenseInfiniteQueryResult,
  useSuspenseInfiniteQuery,
  useSuspenseQuery,
} from "@tanstack/react-query";
import axios from "@/utils/axios";
import { chatRoomQueryKey } from "@/query-keys/chat-room-query-key";
import { AUTH_ENDPOINTS } from "@/constants/endpoints";
import { ApplicationResponse } from "@/types/response/application-response";
import { ApplicationListData } from "@/types/response/application-list-data";
import { PracticalChatRoomOnMember } from "@/types/entity/chat-room-belonging";
import { AxiosError } from "axios";

export type ChatRoomOnAuthQueryParam = {
  searchName: string;
  order:
    | "default"
    | "name"
    | "r_name"
    | "old_add"
    | "late_add"
    | "old_chat"
    | "late_chat"
    | "old_act"
    | "late_act";
  limit: number;
  offset: number;
  pagination: "none" | "numbered" | "cursor";
  cursor: string;
  withCount: boolean;
};

type DefaultResponse = ApplicationResponse<ApplicationListData<PracticalChatRoomOnMember>>;

const getChatRoomOnAuth = async (params: ChatRoomOnAuthQueryParam) => {
  return axios
    .get<DefaultResponse>(AUTH_ENDPOINTS.confidential.chatRooms, {
      params,
    })
    .then((res) => res.data);
};

export const useGetChatRoomsOnAuthQuery = (params: ChatRoomOnAuthQueryParam) => {
  const { data, status, isPending } = useSuspenseQuery({
    queryKey: [chatRoomQueryKey.onAuth.list, params],
    queryFn: () => getChatRoomOnAuth(params),
    select: (data) => {
      return data.data;
    },
    staleTime: 1000 * 60 * 2,
    gcTime: 1000 * 60 * 10,
  });

  return { data, status, isPending };
};

export const useGetInfinityChatRoomsOnAuthQuery = <TData = InfiniteData<DefaultResponse>>(
  params: ChatRoomOnAuthQueryParam,
  options?: UseInfiniteQueryOptions<DefaultResponse, AxiosError, TData>
): UseSuspenseInfiniteQueryResult<TData, AxiosError> => {
  return useSuspenseInfiniteQuery({
    queryKey: [chatRoomQueryKey.onAuth.list, params],
    queryFn: (pageParam) => {
      const cur = pageParam.pageParam as string;
      return getChatRoomOnAuth({ ...params, cursor: cur });
    },
    initialPageParam: "",
    getNextPageParam: (lastPage) => lastPage.data.cursorPagination.nextCursor === "" ? undefined : lastPage.data.cursorPagination.nextCursor,
    getPreviousPageParam: (firstPage) =>
      firstPage.data.cursorPagination.prevCursor === "" ? undefined : firstPage.data.cursorPagination.prevCursor,
    ...options,
  });
};
