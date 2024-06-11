import {
  GetMembersWithCrewAndProfileImageAndAttendStatusResponse,
  useGetMembersQuery,
} from "@/api/member/useGetMembersQuery";
import { AttendStatusKeys } from "@/types/attend-status";
import IconRemove from "@/components/Icon/IconRemove";
import IconClose from "@/components/Icon/IconClose";
import IconEmpty from "@/components/Icon/IconEmpty";
import Tippy from "@tippyjs/react";
import { Dispatch, Fragment, SetStateAction, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Dialog, Transition } from "@headlessui/react";
import { useRemoveMemberOnChatRoomQuery } from "@/api/chatRoom/useRemoveMemberOnChatRoom";
import IconTrashLines from "@/components/Icon/IconTrashLines";
import { MemberWithCrewAndProfileImageAndAttendStatus } from "@/types/entity/member";

type Props = {
  chatRoomId: string;
  perPage: number;
  page: number;
  searchName: string;
  setTotalCount: Dispatch<SetStateAction<number>>;
};

export const BelongingMemberList = ({
  chatRoomId,
  perPage,
  page,
  searchName,
  setTotalCount,
}: Props) => {
  const [removeModal, setRemoveModal] = useState(false);
  const [selectedMember, setSelectedMember] = useState<
    {
      name: string;
      memberId: string;
    }[]
  >([]);
  const [checkedValues, setCheckedValues] = useState<
    {
      memberId: string;
      name: string;
    }[]
  >([]);
  const { mutate: removeMemberOnChatRoom } =
    useRemoveMemberOnChatRoomQuery(chatRoomId);
  const { data } =
    useGetMembersQuery<GetMembersWithCrewAndProfileImageAndAttendStatusResponse>(
      {
        searchName: searchName,
        searchHasPolicies: [],
        searchAttendStatuses: [],
        searchGrades: [],
        searchGroups: [],
        searchBelongingOrganizationId: "",
        searchNotBelongingOrganizationId: "",
        searchBelongingChatRoomId: chatRoomId,
        searchNotBelongingChatRoomId: "",
        order: "default",
        limit: perPage,
        offset: (page - 1) * perPage,
        pagination: "numbered",
        cursor: "",
        withCount: true,
        with: ["crew", "profile_image", "attend_status"],
      }
    );
  const { t } = useTranslation();
  const { t: chatT } = useTranslation("chat");
  const { t: tableT } = useTranslation("table");

  const handleCheck = (
    member: MemberWithCrewAndProfileImageAndAttendStatus
  ) => {
    if (!checkedValues.some((m) => m.memberId === member.memberId)) {
      setCheckedValues([
        ...checkedValues,
        { memberId: member.memberId, name: member.name },
      ]);
    } else {
      setCheckedValues(
        checkedValues.filter((m) => m.memberId !== member.memberId)
      );
    }
  };

  useEffect(() => {
    if (data) {
      setTotalCount(data.data.withCount.count);
    }
  }, [data.data.withCount.count]);

  return (
    <div className="table-responsive mb-5">
      <table>
        <thead>
          <tr>
            <th className="flex justify-around items-center">
              <Tippy content={tableT("delete-selected")}>
                <button
                  className="text-red-500 hover:text-red-700"
                  onClick={() => {
                    if (checkedValues.length === 0) return;
                    setSelectedMember(checkedValues);
                    setRemoveModal(true);
                  }}
                >
                  <IconTrashLines className="w-7 h-7" />
                </button>
              </Tippy>
              <Tippy content={tableT("select-cancel")}>
                <button
                  className="text-secondary hover:text-primary"
                  onClick={() => setCheckedValues([])}
                >
                  <IconEmpty className="w-7 h-7" />
                </button>
              </Tippy>
            </th>
            <th className="w-1/4 text-center">{t("name")}</th>
            <th>{t("email")}</th>
            <th>{t("grade")}</th>
            <th>{t("group")}</th>
            <th>{t("attend-status")}</th>
            <th className="text-center">{t("action")}</th>
          </tr>
        </thead>
        <tbody>
          {data.data.withCount.count > 0 && (
            data.data.data.map((member) => {
              return (
                <tr
                  key={member.memberId}
                  className="h-10 dark:bg-gray-800 hover:bg-gray-100 cursor-pointer"
                  onClick={() => handleCheck(member)}
                >
                  <td className="text-center">
                    <input
                      type="checkbox"
                      className="form-checkbox text-red-500 outline-primary"
                      onChange={() => handleCheck(member)}
                      checked={checkedValues.some(
                        (m) => m.memberId === member.memberId
                      )}
                    />
                  </td>
                  <td className="flex justify-center">
                    <div className="flex items-center justify-start w-full md:w-2/3">
                      {member.profileImage ? (
                        <img
                          src={member.profileImage.attachableItem.url}
                          className="h-7 w-7 rounded-full object-cover"
                          alt=""
                        />
                      ) : (
                        <span className="flex justify-center items-center w-7 h-7 text-center rounded-full object-cover bg-gray-300 dark:bg-gray-100 text-md">
                          {member.name[0]}
                        </span>
                      )}
                      <div className="whitespace-nowrap text-lg ltr:pl-4 rtl:pr-4 truncate text-white-dark: dark:text-white-light/90">
                        {member.name}
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="whitespace-nowrap">{member.email}</div>
                  </td>
                  <td className={`text-[${member.grade.organization.color}]`}>
                    {member.grade.organization.name}
                  </td>
                  <td className={`text-[${member.group.organization.color}]`}>
                    {member.group.organization.name}
                  </td>
                  <td>
                    <div
                      className={`whitespace-nowrap 
                        ${
                          member.attendStatus.key ===
                            AttendStatusKeys.PRESENT && "text-green-500"
                        }
                        ${
                          member.attendStatus.key === AttendStatusKeys.ABSENT &&
                          "text-red-500"
                        }
                        ${
                          member.attendStatus.key ===
                            AttendStatusKeys.TEMPORARILY_ABSENT &&
                          "text-yellow-500"
                        }
                        ${
                          member.attendStatus.key ===
                            AttendStatusKeys.GO_HOME && "text-blue-500"
                        }
                        ${
                          member.attendStatus.key ===
                            AttendStatusKeys.NOT_ATTEND && "text-gray-500"
                        }
                        `}
                    >
                      {member.attendStatus.name}
                    </div>
                  </td>
                  <td className="text-center">
                    <Tippy content="Remove">
                      <button
                        type="button"
                        className="text-red-500 hover:text-red-700"
                        onClick={() => {
                          setSelectedMember([
                            {
                              name: member.name,
                              memberId: member.memberId,
                            },
                          ]);
                          setRemoveModal(true);
                        }}
                      >
                        <IconRemove className="w-7 h-7" />
                      </button>
                    </Tippy>
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
      {data.data.withCount.count === 0 && (
        <div className="flex items-center justify-center h-40 rounded-b-lg bg-gray-200 dark:bg-gray-800">
          <span className="text-gray-400 font-semibold">{tableT("no-data")}</span>
        </div>
      )}
      <Transition appear show={removeModal} as={Fragment}>
        <Dialog
          as="div"
          open={removeModal}
          onClose={() => setRemoveModal(false)}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0" />
          </Transition.Child>
          <div className="fixed inset-0 bg-[black]/10 z-[999] overflow-y-auto">
            <div className="flex items-center justify-center min-h-screen px-4">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel
                  as="div"
                  className="panel border-0 p-0 rounded-lg overflow-hidden w-full max-w-lg my-1 text-black dark:text-white-dark"
                >
                  <div className="flex bg-[#fbfbfb] dark:bg-[#121c2c] items-center justify-between px-5 py-2">
                    <h5 className="font-bold text-lg">
                      {chatT("chat-room-remove-member-title")}
                    </h5>
                    <button
                      type="button"
                      className="text-white-dark hover:text-dark rounded-full p-1"
                      onClick={() => setRemoveModal(false)}
                    >
                      <IconClose className="w-6 h-6" />
                    </button>
                  </div>
                  <div className="p-3">
                    <p className="text-sm mb-4">
                      {chatT("chat-room-remove-member-message-confirm", {
                        Number: selectedMember.length,
                      })}
                    </p>
                    <div className="grid grid-cols-2 gap-2 mb-2">
                      {selectedMember.map((member) => (
                        <Tippy key={member.memberId} content={member.memberId}>
                          <div className="flex items-center p-2 bg-[#f7f7f7] dark:bg-[#1a1a1a] rounded-lg h-full">
                            <span className="whitespace-nowrap truncate ltr:pl-2 rtl:pr-2">
                              {member.name}
                              <span className="text-gray-500 text-sm">
                                ({member.memberId})
                              </span>
                            </span>
                          </div>
                        </Tippy>
                      ))}
                    </div>
                    <div className="flex justify-between items-center">
                      <button
                        type="button"
                        className="btn btn-outline-dark"
                        onClick={() => setRemoveModal(false)}
                      >
                        {chatT("cancel")}
                      </button>
                      <button
                        type="button"
                        className="btn btn-danger"
                        onClick={() => {
                          removeMemberOnChatRoom({
                            memberIds: selectedMember.map(
                              (member) => member.memberId
                            ),
                          });
                          setCheckedValues([]);
                          setRemoveModal(false);
                        }}
                      >
                        {chatT("remove")}
                      </button>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
};
