import { useGetInfinityChatRoomActionsOnChatRoomQuery } from "@/api/chatRoomAction/useGetChatRoomActionsOnChatRoom";
import { PracticalChatRoomOnMember } from "@/types/entity/chat-room-belonging";
import PerfectScrollbar from "react-perfect-scrollbar";
import React, { useEffect, useState } from "react";
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
import { TFunction } from "i18next";
import {
  openChatRoomAdditionalActionState,
  openChatRoomReadReceiptState,
} from "@/store/openChatRoom";
import { useRecoilValue } from "recoil";

const ACTION_PER_PAGE = 30;

type Props = {
  chatRoom: PracticalChatRoomOnMember;
};

const ChatRoomCreateAction = ({
  action,
  actedAt,
  locale,
  t,
}: {
  action: ChatRoomCreateActionWithCreatedBy;
  actedAt: string;
  locale: string;
  t: TFunction<"chat", undefined>;
}) => {
  const msg = action.createdBy
    ? t("chat-chat-room-create-action", {
        createdByName: action.createdBy?.name,
      })
    : t("chat-chat-room-create-action-no-created-by");
  return (
    <div className="block mx-6 my-4">
      <h4 className="text-sm text-center relative rounded-xl bg-[#f4f4f4] dark:bg-gray-800 p-2">
        <span className="block text-slate-500 dark:text-white px-3">{msg}</span>
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
  t,
}: {
  action: ChatRoomUpdateNameActionWithUpdatedBy;
  actedAt: string;
  locale: string;
  t: TFunction<"chat", undefined>;
}) => {
  const msg = action.updatedBy
    ? t("chat-chat-room-update-name-action", {
        updatedByName: action.updatedBy?.name,
        name: action.name,
      })
    : t("chat-chat-room-update-name-action-no-updated-by", {
        name: action.name,
      });
  return (
    <div className="block mx-6 my-4">
      <h4 className="text-sm text-center relative rounded-xl bg-[#f4f4f4] dark:bg-gray-800 p-2">
        <span className="block text-slate-500 dark:text-white px-3">{msg}</span>
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
  t,
}: {
  action: ChatRoomAddMemberActionWithAddedByAndAddMembers;
  actedAt: string;
  locale: string;
  t: TFunction<"chat", undefined>;
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

  const memberStr = t("members");

  const msg = action.addedBy
    ? t("chat-chat-room-add-member-action", {
        addedByName: action.addedBy?.name,
        addedMembers: memberString !== "" ? memberString : memberStr,
      })
    : t("chat-chat-room-add-member-action-no-added-by", {
        addedMembers: memberString !== "" ? memberString : memberStr,
      });
  return (
    <div className="block mx-6 my-4">
      <h4 className="text-sm text-center relative rounded-xl bg-[#f4f4f4] dark:bg-gray-800 p-2">
        <span className="block text-slate-500 dark:text-white px-3">{msg}</span>
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
  t,
}: {
  action: ChatRoomRemoveMemberActionWithRemovedByAndRemoveMembers;
  actedAt: string;
  locale: string;
  t: TFunction<"chat", undefined>;
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

  const memberStr = t("members");

  const msg = action.removedBy
    ? t("chat-chat-room-remove-member-action", {
        removedByName: action.removedBy?.name,
        removedMembers: memberString !== "" ? memberString : memberStr,
      })
    : t("chat-chat-room-remove-member-action-no-removed-by", {
        removedMembers: memberString !== "" ? memberString : memberStr,
      });

  return (
    <div className="block mx-6 my-4">
      <h4 className="text-sm text-center relative rounded-xl bg-[#f4f4f4] dark:bg-gray-800 p-2">
        <span className="block text-slate-500 dark:text-white px-3">{msg}</span>
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
  t,
}: {
  action: ChatRoomWithdrawActionWithMember;
  actedAt: string;
  locale: string;
  t: TFunction<"chat", undefined>;
}) => {
  const msg = action.member
    ? t("chat-chat-room-withdraw-action", { memberName: action.member?.name })
    : t("chat-chat-room-withdraw-action-no-member");
  return (
    <div className="block mx-6 my-4">
      <h4 className="text-sm text-center relative rounded-xl bg-[#f4f4f4] dark:bg-gray-800 p-2">
        <span className="block text-slate-500 dark:text-white px-3">{msg}</span>
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
  t,
}: {
  action: ChatRoomDeleteMessageActionWithDeletedBy;
  actedAt: string;
  locale: string;
  t: TFunction<"chat", undefined>;
}) => {
  const msg = action.deletedBy
    ? t("chat-chat-room-delete-message-action", {
        deletedByName: action.deletedBy?.name,
      })
    : t("chat-chat-room-delete-message-action-no-deleted-by");
  return (
    <div className="block mx-6 my-4">
      <h4 className="text-sm text-center relative rounded-xl bg-[#f4f4f4] dark:bg-gray-800 p-2">
        <span className="block text-slate-500 dark:text-white px-3">{msg}</span>
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
  t,
}: {
  auth: AuthUserType;
  chatRoom: PracticalChatRoomOnMember;
  action: MessageWithSenderAndReadReceiptCountAndAttachments;
  actedAt: string;
  locale: string;
  t: TFunction<"chat", undefined>;
}) => {
  const openChatRoomReadReceipt = useRecoilValue(openChatRoomReadReceiptState);
  const readReceiptCount =
    (openChatRoomReadReceipt[action.messageId] || 0) + action.readReceiptCount;
  const readCountStr = t("read-count");
  const readCount =
    readReceiptCount > 0
      ? chatRoom.chatRoom.isPrivate
        ? readCountStr
        : `${readCountStr} ${readReceiptCount}`
      : "";
  return (
    <div
      className={`flex items-start gap-3 my-4 ${
        action.sender?.memberId === auth?.memberId ? "justify-end" : ""
      }`}
    >
      <div
        className={`flex-none ${
          action.sender?.memberId === auth?.memberId ? "order-2" : ""
        }`}
      >
        {action.sender?.profileImage ? (
          <img
            src={action.sender.profileImage.attachableItem.url}
            className="h-9 w-9 rounded-full object-cover"
            alt=""
          />
        ) : (
          <span className="flex justify-center items-center w-9 h-9 text-center rounded-full object-cover bg-success text-2xl">
            {(action.sender?.name || "")[0]}
          </span>
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
          <div>
            <>
              {action.sender?.memberId !== auth?.memberId && (
                <div className="text-xs text-gray-400 dark:text-dark-light/60">
                  {action.sender?.name}
                </div>
              )}
            </>
            <div
              className={`dark:bg-gray-800 p-4 py-2 rounded-md bg-black/10 max-w-48 sm:max-w-72 md:max-w-96 overflow-wrap break-words
              ${
                action.sender?.memberId === auth?.memberId
                  ? "ltr:rounded-br-none rtl:rounded-bl-none !bg-cyan-500 text-white"
                  : "ltr:rounded-bl-none rtl:rounded-br-none"
              }`}
            >
              {action.body}
            </div>
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
      order: "r_acted_at",
      limit: ACTION_PER_PAGE,
      offset: 0,
      pagination: "cursor",
      cursor: "",
      withCount: false,
      searchTypes: [],
    });
  const { ref, inView } = useInView();

  const [topElement, setTopElement] = useState<{
    current: HTMLElement | null;
    prev: HTMLElement | null;
    dispatch: boolean;
  }>({ current: null, prev: null, dispatch: false});
  const openChatRoomAdditionalAction = useRecoilValue(
    openChatRoomAdditionalActionState
  );

  useEffect(() => {
    const element: any = document.querySelector(".chat-conversation-box");
    element.behavior = "smooth";
    element.scrollTop = element.scrollHeight;
  }, [openChatRoomAdditionalAction]);

  useEffect(() => {
    const element: any = document.querySelector(".chat-conversation-box");
    const lastElement = element.querySelector(".chat-action:last-child");
    if (lastElement) {
      setTopElement(p => ({ current: lastElement, prev: p.current, dispatch: !p.dispatch }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  useEffect(() => {
    if (topElement.prev) {
      const element: any = document.querySelector(".chat-conversation-box");
      topElement.prev.scrollIntoView();
      element.behavior = "smooth";
      element.scrollTop =
        topElement.prev.offsetTop - topElement.prev.clientHeight;
    }
  }, [topElement.dispatch]);

  useEffect(() => {
    setTopElement(p => ({ current: p.current, prev: null, dispatch: p.dispatch }));
    const element: any = document.querySelector(".chat-conversation-box");
    element.behavior = "smooth";
    element.scrollTop = element.scrollHeight;
  }, [chatRoom]);

  useEffect(() => {
    if (hasNextPage && inView) {
      // ユーザーが上にスクロールしようとした時に次のページを読み込む
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  return (
    <PerfectScrollbar className="relative sm:h-[calc(100vh_-_300px)] chat-conversation-box">
      <div style={{ visibility: "hidden", height: 0 }} ref={ref}>
        <div />
      </div>
      {isFetchingNextPage && (
        <div className="flex justify-center p-4">
          <svg
            aria-hidden="true"
            className="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
        </div>
      )}
      <div className="p-4 pb-0 sm:min-h-[300px] flex flex-col-reverse justify-end sm:max-h-[calc(100vh-_300px)]">
        {data.pages.map((page, i) => (
          <React.Fragment key={i}>
            {[...openChatRoomAdditionalAction, ...page.data.data].map((act) => (
              <div key={act.chatRoomActionId} className="chat-action">
                {act.chatRoomCreateAction && (
                  <ChatRoomCreateAction
                    action={act.chatRoomCreateAction}
                    actedAt={act.actedAt}
                    locale={themeConfig.locale}
                    t={t}
                  />
                )}
                {act.chatRoomUpdateNameAction && (
                  <ChatRoomUpdateNameAction
                    action={act.chatRoomUpdateNameAction}
                    actedAt={act.actedAt}
                    locale={themeConfig.locale}
                    t={t}
                  />
                )}
                {act.chatRoomAddMemberAction && (
                  <ChatRoomAddMemberAction
                    action={act.chatRoomAddMemberAction}
                    actedAt={act.actedAt}
                    locale={themeConfig.locale}
                    t={t}
                  />
                )}
                {act.chatRoomRemoveMemberAction && (
                  <ChatRoomRemoveMemberAction
                    action={act.chatRoomRemoveMemberAction}
                    actedAt={act.actedAt}
                    locale={themeConfig.locale}
                    t={t}
                  />
                )}
                {act.chatRoomWithdrawAction && (
                  <ChatRoomWithdrawAction
                    action={act.chatRoomWithdrawAction}
                    actedAt={act.actedAt}
                    locale={themeConfig.locale}
                    t={t}
                  />
                )}
                {act.chatRoomDeleteMessageAction && (
                  <ChatRoomDeleteMessageAction
                    action={act.chatRoomDeleteMessageAction}
                    actedAt={act.actedAt}
                    locale={themeConfig.locale}
                    t={t}
                  />
                )}
                {act.message && (
                  <ChatRoomMessageAction
                    auth={user}
                    chatRoom={chatRoom}
                    action={act.message}
                    actedAt={act.actedAt}
                    locale={themeConfig.locale}
                    t={t}
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
