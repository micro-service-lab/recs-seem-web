import { useSuspenseQuery } from "@tanstack/react-query";
import axios from "@/utils/axios";
import { ApplicationResponse } from "@/types/response/application-response";
import { ApplicationListData } from "@/types/response/application-list-data";
import {
  Member,
  MemberWithAttendStatus,
  MemberWithCrew,
  MemberWithCrewAndProfileImageAndAttendStatus,
  MemberWithDetail,
  MemberWithPersonalOrganization,
  MemberWithProfileImage,
  MemberWithRole,
} from "@/types/entity/member";
import { memberQueryKey } from "@/query-keys/member-query-key";
import { MEMBER_ENDPOINTS } from "@/constants/endpoints/member-endpoint";
import { chatRoomQueryKey } from "@/query-keys/chat-room-query-key";

type WithType =
  | "detail"
  | "profile_image"
  | "personal_organization"
  | "crew"
  | "attend_status"
  | "role";

export type MemberQueryParam = {
  searchName: string;
  searchHasPolicies: string[];
  searchAttendStatuses: string[];
  searchGrades: string[];
  searchGroups: string[];
  searchBelongingOrganizationId: string;
  searchNotBelongingOrganizationId: string;
  searchBelongingChatRoomId: string;
  searchNotBelongingChatRoomId: string;
  order: "default" | "name" | "r_name";
  limit: number;
  offset: number;
  pagination: "none" | "numbered" | "cursor";
  cursor: string;
  withCount: boolean;
  with: WithType[];
};

export type GetMembersDefaultResponse = ApplicationResponse<ApplicationListData<Member>>;

export type GetMembersWithDetailResponse = ApplicationResponse<
  ApplicationListData<MemberWithDetail>
>;
export type GetMembersWithProfileImageResponse = ApplicationResponse<
  ApplicationListData<MemberWithProfileImage>
>;
export type GetMembersWithPersonalOrganizationResponse = ApplicationResponse<
  ApplicationListData<MemberWithPersonalOrganization>
>;
export type GetMembersWithCrewResponse = ApplicationResponse<
  ApplicationListData<MemberWithCrew>
>;
export type GetMembersWithAttendStatusResponse = ApplicationResponse<
  ApplicationListData<MemberWithAttendStatus>
>;
export type GetMembersWithRoleResponse = ApplicationResponse<
  ApplicationListData<MemberWithRole>
>;
export type GetMembersWithCrewAndProfileImageAndAttendStatusResponse = ApplicationResponse<
  ApplicationListData<MemberWithCrewAndProfileImageAndAttendStatus>
>;

export const useGetMembersQuery = <
  T =
    | GetMembersDefaultResponse
    | GetMembersWithDetailResponse
    | GetMembersWithProfileImageResponse
    | GetMembersWithPersonalOrganizationResponse
    | GetMembersWithCrewResponse
    | GetMembersWithAttendStatusResponse
    | GetMembersWithRoleResponse
    | GetMembersWithCrewAndProfileImageAndAttendStatusResponse
>(
  params: MemberQueryParam
) => {
  let queryKey: any = memberQueryKey.list;
  if(params.searchBelongingChatRoomId !== '') {
    queryKey = chatRoomQueryKey.members.belongingList(params.searchBelongingChatRoomId);
  }else if(params.searchNotBelongingChatRoomId !== '') {
    queryKey = chatRoomQueryKey.members.unBelongingList(params.searchNotBelongingChatRoomId);
  }
  const { data, status, isPending } = useSuspenseQuery({
    queryKey: [queryKey, params],
    queryFn: async () => {
      return axios
        .get<T>(MEMBER_ENDPOINTS.member.get, {
          params,
        })
        .then((res) => res.data);
    },
    refetchOnWindowFocus: false,
  });

  return { data, status, isPending };
};
