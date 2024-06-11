import PerfectScrollbar from "react-perfect-scrollbar";
import ChatScrollList from "./ChatScrollList";
import { useTranslation } from "react-i18next";
import { PracticalChatRoomOnMember } from "@/types/entity/chat-room-belonging";
import IconExit from "@/components/Icon/IconExit";
import IconMember from "@/components/Icon/IconMember";
import IconEdit from "@/components/Icon/IconEdit";
import IconMenu from "@/components/Icon/IconMenu";
import IconClose from "@/components/Icon/IconClose";
import Dropdown from "@/components/Dropdown";
import IconHorizontalDots from "@/components/Icon/IconHorizontalDots";
import IconTrashLines from "@/components/Icon/IconTrashLines";
import { fDateTime } from "@/utils/format-time";
import { Fragment, Suspense, useState } from "react";
import { IRootState } from "@/store";
import { useSelector } from "react-redux";
import ChatMessageInput from "./ChatMessageInput";
import { Dialog, Tab, Transition } from "@headlessui/react";
import { useDeleteChatRoomQuery } from "@/api/chatRoom/useDeleteChatRoom";
import { useWithdrawChatRoomQuery } from "@/api/chatRoom/useWithdrawChatRoom";
import { useRecoilValue } from "recoil";
import { onlineMembersState } from "@/store/onlineMembers";
import { BelongingMemberTable } from "./BelongingMemberTable";
import { InviteMemberTable } from "./InviteMemberTable";

type Props = {
  chatRoom: PracticalChatRoomOnMember;
  onClose: () => void;
  toggleChatMenu: () => void;
  scrollToBottom: () => void;
  latestActedAt: string | null;
};

const ChatTalkSkeleton = ({ reverse = false }: { reverse?: boolean }) => {
  return (
    <div
      className={`animate-pulse flex items-center space-x-2 ${
        reverse ? "flex-row-reverse" : ""
      }`}
    >
      <div className={`relative flex-none`}>
        <span
          className={`block text-center rounded-full w-10 h-10 sm:h-12 sm:w-12 object-cover bg-gray-300 dark:bg-gray-700 text-2xl`}
        ></span>
        <div className={`absolute bottom-0 ${reverse ? "right-0" : "left-0"}`}>
          <div className="w-4 h-4 bg-gray-300 dark:bg-gray-700 rounded-full"></div>
        </div>
      </div>
      <div
        className={`mx-3 flex flex-col space-y-2 ${reverse ? "items-end" : ""}`}
      >
        <div className="w-40 h-4 bg-gray-300 dark:bg-gray-700 rounded-full"></div>
        <div className="w-20 h-3 bg-gray-300 dark:bg-gray-700 rounded-full"></div>
      </div>
    </div>
  );
};

/* eslint-disable @typescript-eslint/no-explicit-any */
const ChatTalkList = ({
  chatRoom,
  toggleChatMenu,
  scrollToBottom,
  latestActedAt,
}: Props) => {
  const { t } = useTranslation("chat");
  const themeConfig = useSelector((state: IRootState) => state.themeConfig);
  const onlineMembers = useRecoilValue(onlineMembersState);
  const { mutate: deleteChatRoom } = useDeleteChatRoomQuery(
    chatRoom.chatRoom.chatRoomId
  );
  const { mutate: exitChatRoom } = useWithdrawChatRoomQuery(
    chatRoom.chatRoom.chatRoomId
  );

  const handleSendMessage = () => {
    scrollToBottom();
  };
  const [memberModal, setMemberModal] = useState(false);
  const [exitModal, setExitModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);

  return (
    <>
      <PerfectScrollbar className="chat-users relative min-h-[100px] h-[calc(100vh_-_357px)] space-y-0.5 ltr:pr-3.5 rtl:pl-3.5 ltr:-mr-3.5 rtl:-ml-3.5">
        <div className="relative h-full">
          <div className="flex justify-between items-center p-4">
            <div className="flex items-center space-x-2 rtl:space-x-reverse">
              <button
                type="button"
                className="xl:hidden hover:text-primary"
                onClick={toggleChatMenu}
              >
                <IconMenu />
              </button>
              <div className="relative flex-none">
                {chatRoom.chatRoom.isPrivate ? (
                  <>
                    {chatRoom.chatRoom.companion?.member.profileImage ? (
                      <img
                        src={
                          chatRoom.chatRoom.companion?.member.profileImage
                            .attachableItem.url
                        }
                        className="rounded-full w-10 h-10 sm:h-12 sm:w-12 object-cover"
                        alt=""
                      />
                    ) : (
                      <span className="flex items-center justify-center rounded-full w-10 h-10 sm:h-12 sm:w-12 object-cover bg-gray-300 dark:bg-gray-100 text-2xl">
                        {(chatRoom.chatRoom.companion?.member.name || "")[0]}
                      </span>
                    )}
                    {chatRoom.chatRoom.companion &&
                      onlineMembers[
                        chatRoom.chatRoom.companion.member.memberId
                      ] && (
                        <div className="absolute bottom-0 ltr:right-0 rtl:left-0">
                          <div className="w-4 h-4 bg-success rounded-full animate-pulse" />
                        </div>
                      )}
                  </>
                ) : chatRoom.chatRoom.coverImage ? (
                  <img
                    src={chatRoom.chatRoom.coverImage.attachableItem.url}
                    className="rounded-full w-10 h-10 sm:h-12 sm:w-12 object-cover"
                    alt=""
                  />
                ) : (
                  <span className="flex items-center justify-center rounded-full w-10 h-10 sm:h-12 sm:w-12 object-cover bg-gray-300 dark:bg-gray-100 text-2xl">
                    {(chatRoom.chatRoom.name || "")[0]}
                  </span>
                )}
              </div>
              <div className="mx-3">
                <p className="font-semibold">
                  {chatRoom.chatRoom.isPrivate
                    ? chatRoom.chatRoom.companion?.member.name || ""
                    : chatRoom.chatRoom.name || ""}
                </p>
                <p className="text-white-dark text-xs">
                  {"Last acted at " +
                    fDateTime(
                      latestActedAt || chatRoom.chatRoom.latestAction?.actedAt,
                      undefined,
                      themeConfig.locale
                    )}
                </p>
              </div>
            </div>
            <div className="flex sm:gap-5 gap-3">
              <button type="button" onClick={() => setMemberModal(true)}>
                <IconMember className="w-5 h-5 hover:text-primary" />
              </button>
              <Transition appear show={memberModal} as={Fragment}>
                <Dialog
                  as="div"
                  open={memberModal}
                  onClose={() => setMemberModal(false)}
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
                  <div
                    id="tabs_modal"
                    className="fixed inset-0 bg-[black]/60 z-[999] overflow-y-auto"
                  >
                    <div className="flex items-start justify-center min-h-screen px-4">
                      <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 scale-95"
                        enterTo="opacity-100 scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 scale-100"
                        leaveTo="opacity-0 scale-95"
                      >
                        <Dialog.Panel className="panel border-0 p-0 rounded-lg overflow-hidden w-full max-w-7xl my-8 text-black dark:text-white-dark">
                          <div className="flex bg-[#fbfbfb] dark:bg-[#121c2c] items-center justify-between px-5 py-3 w-full">
                            <h5 className="font-bold text-lg">{t("member")}</h5>
                            <button
                              onClick={() => setMemberModal(false)}
                              type="button"
                              className="text-white-dark hover:text-dark"
                            >
                              <IconClose className="w-6 h-6" />
                            </button>
                          </div>
                          <div className="p-5">
                            <Tab.Group>
                              <Tab.List className="flex flex-wrap mt-3 border-b border-white-light dark:border-[#191e3a]">
                                <Tab as={Fragment}>
                                  {({ selected }) => (
                                    <button
                                      type="button"
                                      className={`${
                                        selected
                                          ? "!border-white-light !border-b-white  text-primary dark:!border-[#191e3a] dark:!border-b-black !outline-none "
                                          : ""
                                      } p-3.5 py-2 -mb-[1px] block border border-transparent hover:text-primary dark:hover:border-b-black`}
                                    >
                                      {t("belonging-members")}
                                    </button>
                                  )}
                                </Tab>
                                <Tab as={Fragment}>
                                  {({ selected }) => (
                                    <button
                                      type="button"
                                      className={`${
                                        selected
                                          ? "!border-white-light !border-b-white  text-primary dark:!border-[#191e3a] dark:!border-b-black !outline-none "
                                          : ""
                                      } p-3.5 py-2 -mb-[1px] block border border-transparent hover:text-primary dark:hover:border-b-black`}
                                    >
                                      {t("invite-members")}
                                    </button>
                                  )}
                                </Tab>
                              </Tab.List>
                              <Tab.Panels>
                                <Tab.Panel>
                                  <div className="active pt-5">
                                    <h4 className="font-semibold text-2xl mb-4">
                                      {t("belonging-members-description")}
                                    </h4>
                                    <BelongingMemberTable
                                      chatRoomId={chatRoom.chatRoom.chatRoomId}
                                    />
                                  </div>
                                </Tab.Panel>
                                <Tab.Panel>
                                  <div className="active pt-5">
                                    <h4 className="font-semibold text-2xl mb-4">
                                      {t("invite-members-description")}
                                    </h4>
                                    <InviteMemberTable
                                      chatRoomId={chatRoom.chatRoom.chatRoomId}
                                    />
                                  </div>
                                </Tab.Panel>
                              </Tab.Panels>
                            </Tab.Group>
                          </div>
                        </Dialog.Panel>
                      </Transition.Child>
                    </div>
                  </div>
                </Dialog>
              </Transition>

              <button type="button" onClick={() => setExitModal(true)}>
                <IconExit className="w-5 h-5 hover:text-primary" />
              </button>
              <Transition appear show={exitModal} as={Fragment}>
                <Dialog
                  as="div"
                  open={exitModal}
                  onClose={() => setExitModal(false)}
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
                  <div className="fixed inset-0 bg-[black]/60 z-[900] overflow-y-auto">
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
                              {t("chat-room-exit-title")}
                            </h5>
                            <button
                              type="button"
                              className="text-white-dark hover:text-dark rounded-full p-1"
                              onClick={() => setExitModal(false)}
                            >
                              <IconClose className="w-6 h-6" />
                            </button>
                          </div>
                          <div className="p-3">
                            <p className="text-sm mb-4">
                              {t("chat-room-exit-message-confirm")}
                            </p>
                            <div className="flex justify-between items-center">
                              <button
                                type="button"
                                className="btn btn-outline-dark"
                                onClick={() => setExitModal(false)}
                              >
                                {t("cancel")}
                              </button>
                              <button
                                type="button"
                                className="btn btn-success"
                                onClick={() => {
                                  exitChatRoom();
                                  setExitModal(false);
                                }}
                              >
                                {t("exit")}
                              </button>
                            </div>
                          </div>
                        </Dialog.Panel>
                      </Transition.Child>
                    </div>
                  </div>
                </Dialog>
              </Transition>

              <div className="dropdown">
                <Dropdown
                  placement="bottom-end"
                  btnClassName="bg-[#f4f4f4] dark:bg-[#1b2e4b] hover:bg-primary-light w-8 h-8 rounded-full !flex justify-center items-center"
                  button={
                    <IconHorizontalDots className="hover:text-primary rotate-90 opacity-70" />
                  }
                >
                  <ul className="text-black dark:text-white-dark">
                    <li>
                      <button type="button">
                        <IconEdit className="w-4.5 h-4.5 ltr:mr-2 rtl:ml-2 shrink-0" />
                        {t("edit")}
                      </button>
                    </li>
                    <li>
                      <button
                        type="button"
                        onClick={() => setDeleteModal(true)}
                      >
                        <IconTrashLines className="w-4.5 h-4.5 ltr:mr-2 rtl:ml-2 shrink-0" />
                        {t("delete")}
                      </button>
                    </li>
                  </ul>
                </Dropdown>
              </div>
              <Transition appear show={deleteModal} as={Fragment}>
                <Dialog
                  as="div"
                  open={deleteModal}
                  onClose={() => setDeleteModal(false)}
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
                  <div className="fixed inset-0 bg-[black]/60 z-[999] overflow-y-auto">
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
                              {t("chat-room-delete-title")}
                            </h5>
                            <button
                              type="button"
                              className="text-white-dark hover:text-dark rounded-full p-1"
                              onClick={() => setDeleteModal(false)}
                            >
                              <IconClose className="w-6 h-6" />
                            </button>
                          </div>
                          <div className="p-3">
                            <p className="text-sm mb-4">
                              {t("chat-room-delete-message-confirm")}
                            </p>
                            <div className="flex justify-between items-center">
                              <button
                                type="button"
                                className="btn btn-outline-dark"
                                onClick={() => setDeleteModal(false)}
                              >
                                {t("cancel")}
                              </button>
                              <button
                                type="button"
                                className="btn btn-danger"
                                onClick={() => {
                                  deleteChatRoom();
                                  setDeleteModal(false);
                                }}
                              >
                                {t("delete")}
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
          </div>
          <div className="h-px w-full border-b border-white-light dark:border-[#1b2e4b]"></div>

          <div className="min-h-[100px] h-[calc(100vh_-_300px)]">
            <Suspense
              fallback={
                <PerfectScrollbar className="relative h-[calc(100vh_-_300px)] chat-conversation-box">
                  <div className="space-y-5 p-4 pb-0 min-h-[400px]">
                    {...Array(10)
                      .fill(0)
                      .map((_, i) => (
                        <ChatTalkSkeleton key={i} reverse={i % 2 === 0} />
                      ))}
                  </div>
                </PerfectScrollbar>
              }
            >
              <ChatScrollList chatRoom={chatRoom} />
            </Suspense>
          </div>
          <ChatMessageInput
            onSendMessage={handleSendMessage}
            chatRoom={chatRoom}
          />
        </div>
      </PerfectScrollbar>
    </>
  );
};

export default ChatTalkList;
