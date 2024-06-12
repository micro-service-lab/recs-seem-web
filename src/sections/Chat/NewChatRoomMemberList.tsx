import {
  GetMembersWithCrewResponse,
  useGetMembersQuery,
} from "@/api/member/useGetMembersQuery";
import PerfectScrollbar from "react-perfect-scrollbar";
import IconEmpty from "@/components/Icon/IconEmpty";
import Tippy from "@tippyjs/react";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { MemberWithCrew } from "@/types/entity/member";
import { ControllerRenderProps, FieldValues } from "react-hook-form";
import { useAuthContext } from "@/auth/hooks";

type Props = {
  perPage: number;
  page: number;
  searchName: string;
  setTotalCount: Dispatch<SetStateAction<number>>;
  field: ControllerRenderProps<FieldValues, string>;
};

export const NewChatRoomMemberList = ({
  perPage,
  page,
  searchName,
  setTotalCount,
  field,
}: Props) => {
  const [checkedValues, setCheckedValues] = useState<string[]>([]);
  const { data } = useGetMembersQuery<GetMembersWithCrewResponse>({
    searchName: searchName,
    searchHasPolicies: [],
    searchAttendStatuses: [],
    searchGrades: [],
    searchGroups: [],
    searchBelongingOrganizationId: "",
    searchNotBelongingOrganizationId: "",
    searchBelongingChatRoomId: "",
    searchNotBelongingChatRoomId: "",
    order: "default",
    limit: perPage,
    offset: (page - 1) * perPage,
    pagination: "numbered",
    cursor: "",
    withCount: true,
    with: ["crew"],
  });
  const { t } = useTranslation();
  const { t: tableT } = useTranslation("table");
  const {user} = useAuthContext();

  const handleCheck = (member: MemberWithCrew) => {
    if (checkedValues.includes(member.memberId)) {
      setCheckedValues(checkedValues.filter((m) => m !== member.memberId));
    } else {
      setCheckedValues([...checkedValues, member.memberId]);
    }
  };

  useEffect(() => {
    field.onChange(checkedValues);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [checkedValues]);

  useEffect(() => {
    if (data) {
      setTotalCount(data.data.withCount.count);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data.data.withCount.count]);

  return (
    <div className="table-responsive mb-5">
      <PerfectScrollbar className="max-h-[12rem]">
        <table>
          <thead>
            <tr>
              <th className="flex justify-center items-center">
                <Tippy content={tableT("select-cancel")}>
                  <button
                    type="button"
                    className="text-secondary hover:text-primary"
                    onClick={() => {
                      setCheckedValues([]);
                    }}
                    disabled={checkedValues.length === 0}
                  >
                    <IconEmpty className="w-6 h-6" />
                  </button>
                </Tippy>
              </th>
              <th>{t("name")}</th>
              <th>{t("grade")}</th>
              <th>{t("group")}</th>
            </tr>
          </thead>
          <tbody>
            {data.data.withCount.count > 0 &&
              data.data.data.map((member) => {
                return (
                  <tr
                    key={member.memberId}
                    className={`h-6 dark:bg-gray-800 hover:bg-gray-100 ${member.memberId === user?.memberId ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                    onClick={() =>{
                      if(member.memberId !== user?.memberId){
                        handleCheck(member)
                      }
                    }}
                  >
                    <td className="text-center">
                      <input
                        type="checkbox"
                        className="form-checkbox text-red-500 outline-primary"
                        onChange={() => handleCheck(member)}
                        checked={checkedValues.includes(member.memberId)}
                        disabled={member.memberId === user?.memberId}
                      />
                    </td>
                    <td>
                      <div className="whitespace-nowrap text-sm truncate text-white-dark: dark:text-white-light/90">
                        {member.name}
                      </div>
                    </td>
                    <td className={`text-[${member.grade.organization.color}]`}>
                      {member.grade.organization.name}
                    </td>
                    <td className={`text-[${member.group.organization.color}]`}>
                      {member.group.organization.name}
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
        {data.data.withCount.count === 0 && (
          <div className="flex items-center justify-center h-40 rounded-b-lg bg-gray-200 dark:bg-gray-800">
            <span className="text-gray-400 font-semibold">
              {tableT("no-data")}
            </span>
          </div>
        )}
      </PerfectScrollbar>
    </div>
  );
};
