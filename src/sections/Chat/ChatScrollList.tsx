import { useGetInfinityChatRoomActionsOnChatRoomQuery } from "@/api/chatRoomAction/useGetChatRoomActionsOnChatRoom";
import { PracticalChatRoomOnMember } from "@/types/entity/chat-room-belonging";
import PerfectScrollbar from "react-perfect-scrollbar";
import React, { Dispatch, SetStateAction, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useInView } from "react-intersection-observer";
import { ChatRoomCreateActionWithCreatedBy } from "@/types/entity/chat-room-create-action";
import { IRootState } from "@/store";
import { useSelector } from "react-redux";
import { fDateTime } from "@/utils/format-time";
import { ChatRoomUpdateNameActionWithUpdatedBy } from "@/types/entity/chat-room-update-name-action";
import { ChatRoomAddMemberActionWithAddedByAndAddMembers } from "@/types/entity/chat-room-add-member-action";
import { ChatRoomRemoveMemberActionWithRemovedByAndRemoveMembers } from "@/types/entity/chat-room-remove-member-action";
import { ChatRoomWithdrawActionWithMember } from "@/types/entity/chat-room-withdraw-action";
import { ChatRoomDeleteMessageActionWithDeletedBy } from "@/types/entity/chat-room-delete-message-action";
import { MessageWithSenderAndReadReceiptCountAndAttachments } from "@/types/entity/message";
import { useAuthContext } from "@/auth/hooks";
import { AuthUserType } from "@/auth/types";
import IconMoodSmile from "@/components/Icon/IconMoodSmile";

const ACTION_PER_PAGE = 30;

type Props = {
  chatRoom: PracticalChatRoomOnMember;
};

const ChatRoomCreateAction = ({
  action,
  actedAt,
  locale,
}: {
  action: ChatRoomCreateActionWithCreatedBy;
  actedAt: string;
  locale: string;
}) => {
  return (
    <div className="block mx-6 my-2">
      <h4 className="text-sm text-center relative rounded-xl bg-[#f4f4f4] dark:bg-gray-800 p-2">
        <span className="block text-slate-500 dark:text-white px-3">
          {action.createdBy
            ? `${action.createdBy.name}によりチャットルームが作成されました`
            : `チャットルームが作成されました`}
        </span>
        <span className="block text-xs text-slate-400 dark:text-gray-400 mt-2">
          {fDateTime(actedAt, "yyyy-MM-dd p", locale)}
        </span>
      </h4>
    </div>
  );
};

const ChatRoomUpdateNameAction = ({
  action,
  actedAt,
  locale,
}: {
  action: ChatRoomUpdateNameActionWithUpdatedBy;
  actedAt: string;
  locale: string;
}) => {
  return (
    <div className="block mx-6 my-2">
      <h4 className="text-sm text-center relative rounded-xl bg-[#f4f4f4] dark:bg-gray-800 p-2">
        <span className="block text-slate-500 dark:text-white px-3">
          {action.updatedBy
            ? `${action.updatedBy.name}によりチャットルーム名が${action.name}に変更されました`
            : `チャットルーム名が${action.name}に変更されました`}
        </span>
        <span className="block text-xs text-slate-400 dark:text-gray-400 mt-2">
          {fDateTime(actedAt, "yyyy-MM-dd p", locale)}
        </span>
      </h4>
    </div>
  );
};

const ChatRoomAddMemberAction = ({
  action,
  actedAt,
  locale,
}: {
  action: ChatRoomAddMemberActionWithAddedByAndAddMembers;
  actedAt: string;
  locale: string;
}) => {
  const filteredMembers = action.addMembers.filter((member) => member.member);
  const addedMembers = filteredMembers
    .map((member) => member.member?.name)
    .slice(0, 3)
    .join(", ");
  const otherMembersCount = filteredMembers.length - 3;
  const otherMembers =
    otherMembersCount > 0 ? `と他${otherMembersCount}名` : "";
  const memberString = `${addedMembers}${otherMembers}`;
  return (
    <div className="block mx-6 my-2">
      <h4 className="text-sm text-center relative rounded-xl bg-[#f4f4f4] dark:bg-gray-800 p-2">
        <span className="block text-slate-500 dark:text-white px-3">
          {action.addedBy
            ? `${action.addedBy.name}によりチャットルームに${
                memberString !== "" ? memberString : "メンバー"
              }が追加されました`
            : `チャットルームに${
                memberString !== "" ? memberString : "メンバー"
              }が追加されました`}
        </span>
        <span className="block text-xs text-slate-400 dark:text-gray-400 mt-2">
          {fDateTime(actedAt, "yyyy-MM-dd p", locale)}
        </span>
      </h4>
    </div>
  );
};

const ChatRoomRemoveMemberAction = ({
  action,
  actedAt,
  locale,
}: {
  action: ChatRoomRemoveMemberActionWithRemovedByAndRemoveMembers;
  actedAt: string;
  locale: string;
}) => {
  const filteredMembers = action.removeMembers.filter(
    (member) => member.member
  );
  const removedMembers = filteredMembers
    .map((member) => member.member?.name)
    .slice(0, 3)
    .join(", ");
  const otherMembersCount = filteredMembers.length - 3;
  const otherMembers =
    otherMembersCount > 0 ? `と他${otherMembersCount}名` : "";
  const memberString = `${removedMembers}${otherMembers}`;
  return (
    <div className="block mx-6 my-2">
      <h4 className="text-sm text-center relative rounded-xl bg-[#f4f4f4] dark:bg-gray-800 p-2">
        <span className="block text-slate-500 dark:text-white px-3">
          {action.removedBy
            ? `${action.removedBy.name}によりチャットルームから${
                memberString !== "" ? memberString : "メンバー"
              }が削除されました`
            : `チャットルームから${
                memberString !== "" ? memberString : "メンバー"
              }が削除されました`}
        </span>
        <span className="block text-xs text-slate-400 dark:text-gray-400 mt-2">
          {fDateTime(actedAt, "yyyy-MM-dd p", locale)}
        </span>
      </h4>
    </div>
  );
};

const ChatRoomWithdrawAction = ({
  action,
  actedAt,
  locale,
}: {
  action: ChatRoomWithdrawActionWithMember;
  actedAt: string;
  locale: string;
}) => {
  return (
    <div className="block mx-6 my-2">
      <h4 className="text-sm text-center relative rounded-xl bg-[#f4f4f4] dark:bg-gray-800 p-2">
        <span className="block text-slate-500 dark:text-white px-3">
          {`${
            action.member ? action.member.name : `メンバー`
          }がチャットルームから退室しました`}
        </span>
        <span className="block text-xs text-slate-400 dark:text-gray-400 mt-2">
          {fDateTime(actedAt, "yyyy-MM-dd p", locale)}
        </span>
      </h4>
    </div>
  );
};

const ChatRoomDeleteMessageAction = ({
  action,
  actedAt,
  locale,
}: {
  action: ChatRoomDeleteMessageActionWithDeletedBy;
  actedAt: string;
  locale: string;
}) => {
  return (
    <div className="block mx-6 my-2">
      <h4 className="text-sm text-center relative rounded-xl bg-[#f4f4f4] dark:bg-gray-800 p-2">
        <span className="block text-slate-500 dark:text-white px-3">
          {`${
            action.deletedBy ? action.deletedBy.name : `メンバー`
          }がメッセージを削除しました`}
        </span>
        <span className="block text-xs text-slate-400 dark:text-gray-400 mt-2">
          {fDateTime(actedAt, "yyyy-MM-dd p", locale)}
        </span>
      </h4>
    </div>
  );
};

const ChatRoomMessageAction = ({
  auth,
  chatRoom,
  action,
  locale,
}: {
  auth: AuthUserType;
  chatRoom: PracticalChatRoomOnMember;
  action: MessageWithSenderAndReadReceiptCountAndAttachments;
  actedAt: string;
  locale: string;
}) => {
  const readCount =
    action.readReceiptCount > 0
      ? chatRoom.chatRoom.isPrivate
        ? "既読"
        : `既読 ${action.readReceiptCount}`
      : "";
  return (
    <div
      className={`flex items-start gap-3 ${
        action.sender?.memberId === auth?.memberId ? "justify-end" : ""
      }`}
    >
      <div
        className={`flex-none ${
          action.sender?.memberId === auth?.memberId ? "order-2" : ""
        }`}
      >
        {action.sender?.memberId === auth?.memberId ? (
          action.sender?.profileImage ? (
            <img
              src={action.sender.profileImage.attachableItem.url}
              className="h-9 w-9 rounded-full object-cover"
              alt=""
            />
          ) : (
            <span className="flex justify-center items-center w-9 h-9 text-center rounded-full object-cover bg-success text-2xl">
              {(action.sender?.name || "")[0]}
            </span>
          )
        ) : (
          ""
        )}
      </div>
      <div className="space-y-2">
        <div className="flex items-center gap-3">
          <div
            className={`${
              action.sender?.memberId !== auth?.memberId
                ? "hidden"
                : "text-xs text-gray-400 dark:text-dark-light/60"
            }`}
          >
            {readCount}
          </div>
          <div
            className={`dark:bg-gray-800 p-4 py-2 rounded-md bg-black/10 ${
              action.sender?.memberId === auth?.memberId
                ? "ltr:rounded-br-none rtl:rounded-bl-none !bg-cyan-500 text-white"
                : "ltr:rounded-bl-none rtl:rounded-br-none"
            }`}
          >
            {action.body}
          </div>
          <div
            className={`${
              action.sender?.memberId === auth?.memberId ? "hidden" : ""
            }`}
          >
            <IconMoodSmile className="hover:text-primary" />
          </div>
        </div>
        <div
          className={`text-xs text-white-dark ${
            action.sender?.memberId === auth?.memberId
              ? "ltr:text-right rtl:text-left"
              : ""
          }`}
        >
          {action.postedAt
            ? fDateTime(action.postedAt, "yyyy-MM-dd p", locale)
            : ""}
        </div>
      </div>
    </div>
  );
};

/* eslint-disable @typescript-eslint/no-explicit-any */
const ChatScrollList = ({ chatRoom }: Props) => {
  const { t } = useTranslation("chat");
  const { user } = useAuthContext();
  const themeConfig = useSelector((state: IRootState) => state.themeConfig);
  const { data, hasNextPage, fetchNextPage, isFetchingNextPage } =
    useGetInfinityChatRoomActionsOnChatRoomQuery(chatRoom.chatRoom.chatRoomId, {
      order: "acted_at",
      limit: ACTION_PER_PAGE,
      offset: 0,
      pagination: "cursor",
      cursor: "",
      withCount: false,
      searchTypes: [],
    });
  const { ref, inView } = useInView();

  useEffect(() => {
    if (hasNextPage && inView) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  return (
    <PerfectScrollbar className="relative h-full sm:h-[calc(100vh_-_300px)] chat-conversation-box">
      <div style={{ visibility: "hidden", height: 0 }} ref={ref}>
        <div />
      </div>
      {isFetchingNextPage && <div>Loading...</div>}
      <div className="space-y-5 p-4 sm:pb-0 pb-[68px] sm:min-h-[300px] min-h-[400px]">
        {data.pages.map((page, i) => (
          <React.Fragment key={i}>
            {page.data.data.map((act) => (
              <div key={act.chatRoomActionId}>
                {act.chatRoomCreateAction && (
                  <ChatRoomCreateAction
                    action={act.chatRoomCreateAction}
                    actedAt={act.actedAt}
                    locale={themeConfig.locale}
                  />
                )}
                {act.chatRoomUpdateNameAction && (
                  <ChatRoomUpdateNameAction
                    action={act.chatRoomUpdateNameAction}
                    actedAt={act.actedAt}
                    locale={themeConfig.locale}
                  />
                )}
                {act.chatRoomAddMemberAction && (
                  <ChatRoomAddMemberAction
                    action={act.chatRoomAddMemberAction}
                    actedAt={act.actedAt}
                    locale={themeConfig.locale}
                  />
                )}
                {act.chatRoomRemoveMemberAction && (
                  <ChatRoomRemoveMemberAction
                    action={act.chatRoomRemoveMemberAction}
                    actedAt={act.actedAt}
                    locale={themeConfig.locale}
                  />
                )}
                {act.chatRoomWithdrawAction && (
                  <ChatRoomWithdrawAction
                    action={act.chatRoomWithdrawAction}
                    actedAt={act.actedAt}
                    locale={themeConfig.locale}
                  />
                )}
                {act.chatRoomDeleteMessageAction && (
                  <ChatRoomDeleteMessageAction
                    action={act.chatRoomDeleteMessageAction}
                    actedAt={act.actedAt}
                    locale={themeConfig.locale}
                  />
                )}
                {act.message && (
                  <ChatRoomMessageAction
                    auth={user}
                    chatRoom={chatRoom}
                    action={act.message}
                    actedAt={act.actedAt}
                    locale={themeConfig.locale}
                  />
                )}
              </div>
            ))}
          </React.Fragment>
        ))}
      </div>
    </PerfectScrollbar>
  );
};

export default ChatScrollList;
