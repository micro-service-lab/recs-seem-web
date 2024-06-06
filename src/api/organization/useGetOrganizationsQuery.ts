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

export type OrganizationQueryParam = {
  searchName: string;
  order: "default" | "name" | "r_name";
  limit: number;
  offset: number;
  pagination: "none" | "numbered" | "cursor";
  cursor: string;
  withCount: boolean;
  organizationType: "default" | "personal" | "whole" | "group" | "grade";
  personalMemberId: string;
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

export const useGetOrganizationsQuery = (params: OrganizationQueryParam) => {
  const { data, status, isPending } = useSuspenseQuery({
    queryKey: [organizationQueryKey.list, params],
    queryFn: async () => {
      return axios
        .get<
          | DefaultResponse
          | WithDetailResponse
          | WithChatRoomResponse
          | WithChatRoomAndDetailResponse
        >(ORGANIZATION_ENDPOINTS.organization.get, {
          params,
        })
        .then((res) => res.data);
    },
    select: (data) => {
      return data.data;
    },
    staleTime: 1000 * 60 * 2,
    gcTime: 1000 * 60 * 10,
    refetchOnWindowFocus: false,
  });

  return { data, status, isPending };
};
