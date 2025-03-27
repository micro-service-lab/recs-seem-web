import { useSuspenseQuery } from "@tanstack/react-query";
import axios from "@/utils/axios";
import { organizationQueryKey } from "@/query-keys/organization-query-key";
import { ORGANIZATION_ENDPOINTS } from "@/constants/endpoints";
import { ApplicationResponse } from "@/types/response/application-response";
import { ApplicationListData } from "@/types/response/application-list-data";
import {
  Organization,
  OrganizationWithChatRoom,
  OrganizationWithChatRoomAndDetail,
  OrganizationWithDetail,
} from "@/types/entity/organization";

type WithType = "detail" | "chat_room";

export type GroupQueryParam = {
  searchName: string;
  order: "default" | "name" | "r_name";
  limit: number;
  offset: number;
  pagination: "none" | "numbered" | "cursor";
  cursor: string;
  withCount: boolean;
  with: WithType[];
};

type DefaultResponse = ApplicationResponse<ApplicationListData<Organization>>;
type WithDetailResponse = ApplicationResponse<
  ApplicationListData<OrganizationWithDetail>
>;
type WithChatRoomResponse = ApplicationResponse<
  ApplicationListData<OrganizationWithChatRoom>
>;
type WithChatRoomAndDetailResponse = ApplicationResponse<
  ApplicationListData<OrganizationWithChatRoomAndDetail>
>;

export const useGetGroupsQuery = (params: GroupQueryParam) => {
  const { data, status, isPending } = useSuspenseQuery({
    queryKey: [organizationQueryKey.group.list, params],
    queryFn: async () => {
      return axios
        .get<
          | DefaultResponse
          | WithDetailResponse
          | WithChatRoomResponse
          | WithChatRoomAndDetailResponse
        >(ORGANIZATION_ENDPOINTS.group.get, {
          params,
        })
        .then((res) => res.data);
    },
    staleTime: 0,
    gcTime: Infinity,
    refetchOnWindowFocus: false,
  });

  return { data, status, isPending };
};
