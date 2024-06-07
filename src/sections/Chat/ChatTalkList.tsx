import PerfectScrollbar from "react-perfect-scrollbar";
import ChatScrollList from "./ChatScrollList";
import { useTranslation } from "react-i18next";
import { PracticalChatRoomOnMember } from "@/types/entity/chat-room-belonging";
import IconMenu from "@/components/Icon/IconMenu";
import IconPhoneCall from "@/components/Icon/IconPhoneCall";
import IconVideo from "@/components/Icon/IconVideo";
import Dropdown from "@/components/Dropdown";
import IconHorizontalDots from "@/components/Icon/IconHorizontalDots";
import IconSearch from "@/components/Icon/IconSearch";
import IconCopy from "@/components/Icon/IconCopy";
import IconTrashLines from "@/components/Icon/IconTrashLines";
import IconShare from "@/components/Icon/IconShare";
import IconSettings from "@/components/Icon/IconSettings";
import { fDateTime } from "@/utils/format-time";
import { Suspense, useState } from "react";
import { IRootState } from "@/store";
import { useSelector } from "react-redux";
import ChatMessageInput from "./ChatMessageInput";

type Props = {
  chatRoom: PracticalChatRoomOnMember;
  onClose: () => void;
  toggleChatMenu: () => void;
  scrollToBottom: () => void;
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
const ChatTalkList = ({ chatRoom, toggleChatMenu, scrollToBottom }: Props) => {
  const { t } = useTranslation("chat");
  const themeConfig = useSelector((state: IRootState) => state.themeConfig);

  const handleSendMessage = (_: string) => {
    scrollToBottom();
  };

  return (
    <>
      <PerfectScrollbar className="chat-users relative h-full min-h-[100px] sm:h-[calc(100vh_-_357px)] space-y-0.5 ltr:pr-3.5 rtl:pl-3.5 ltr:-mr-3.5 rtl:-ml-3.5">
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
                  chatRoom.chatRoom.companion?.member.profileImage ? (
                    <img
                      src={
                        chatRoom.chatRoom.companion?.member.profileImage
                          .attachableItem.url
                      }
                      className="rounded-full w-10 h-10 sm:h-12 sm:w-12 object-cover"
                      alt=""
                    />
                  ) : (
                    <span className="flex items-center justify-center rounded-full w-10 h-10 sm:h-12 sm:w-12 object-cover bg-success text-2xl">
                      {(chatRoom.chatRoom.companion?.member.name || "")[0]}
                    </span>
                  )
                ) : chatRoom.chatRoom.coverImage ? (
                  <img
                    src={chatRoom.chatRoom.coverImage.attachableItem.url}
                    className="rounded-full w-10 h-10 sm:h-12 sm:w-12 object-cover"
                    alt=""
                  />
                ) : (
                  <span className="flex items-center justify-center rounded-full w-10 h-10 sm:h-12 sm:w-12 object-cover bg-success text-2xl">
                    {(chatRoom.chatRoom.name || "")[0]}
                  </span>
                )}
                <div className="absolute bottom-0 ltr:right-0 rtl:left-0">
                  <div className="w-4 h-4 bg-success rounded-full"></div>
                </div>
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
                      chatRoom.chatRoom.latestAction?.actedAt,
                      undefined,
                      themeConfig.locale
                    )}
                </p>
              </div>
            </div>
            <div className="flex sm:gap-5 gap-3">
              <button type="button">
                <IconPhoneCall className="hover:text-primary" />
              </button>

              <button type="button">
                <IconVideo className="w-5 h-5 hover:text-primary" />
              </button>
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
                        <IconSearch className="ltr:mr-2 rtl:ml-2 shrink-0" />
                        Search
                      </button>
                    </li>
                    <li>
                      <button type="button">
                        <IconCopy className="w-4.5 h-4.5 ltr:mr-2 rtl:ml-2 shrink-0" />
                        Copy
                      </button>
                    </li>
                    <li>
                      <button type="button">
                        <IconTrashLines className="w-4.5 h-4.5 ltr:mr-2 rtl:ml-2 shrink-0" />
                        Delete
                      </button>
                    </li>
                    <li>
                      <button type="button">
                        <IconShare className="w-4.5 h-4.5 ltr:mr-2 rtl:ml-2 shrink-0" />
                        Share
                      </button>
                    </li>
                    <li>
                      <button type="button">
                        <IconSettings className="w-4.5 h-4.5 ltr:mr-2 rtl:ml-2 shrink-0" />
                        Settings
                      </button>
                    </li>
                  </ul>
                </Dropdown>
              </div>
            </div>
          </div>
          <div className="h-px w-full border-b border-white-light dark:border-[#1b2e4b]"></div>

          <div className="h-full min-h-[100px] sm:h-[calc(100vh_-_300px)]">
            <Suspense
              fallback={
                <PerfectScrollbar className="relative h-full sm:h-[calc(100vh_-_300px)] chat-conversation-box">
                  <div className="space-y-5 p-4 sm:pb-0 pb-[68px] sm:min-h-[300px] min-h-[400px]">
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
