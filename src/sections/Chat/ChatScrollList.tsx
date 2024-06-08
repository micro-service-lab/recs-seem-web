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
import IconMoodSmile from "@/components/Icon/IconMoodSmile";
import { TFunction } from "i18next";
import { chatRoomAdditionalActionState } from "@/store/openChatRoom";
import { useRecoilState } from "recoil";

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
  const readCountStr = t("read-count");
  const readCount =
    action.readReceiptCount > 0
      ? chatRoom.chatRoom.isPrivate
        ? readCountStr
        : `${readCountStr} ${action.readReceiptCount}`
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
            className={`dark:bg-gray-800 p-4 py-2 rounded-md bg-black/10 max-w-48 sm:max-w-72 md:max-w-96 overflow-wrap break-words
              ${
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
      order: "r_acted_at",
      limit: ACTION_PER_PAGE,
      offset: 0,
      pagination: "cursor",
      cursor: "",
      withCount: false,
      searchTypes: [],
    });
  const { ref, inView } = useInView();

  const [prevTopElement, setPrevTopElement] = useState<any>(null);
  const [pageOffset, setPageOffset] = useState(true);
  const [additionalActions, setAdditionalActions] = useRecoilState(
    chatRoomAdditionalActionState
  );

  useEffect(() => {
    const element: any = document.querySelector(".chat-conversation-box");
    const lastElement = element.querySelector(".chat-action:last-child");
    if (lastElement) {
      setPrevTopElement(lastElement);
    }
    element.behavior = "smooth";
    if (!prevTopElement) {
      element.scrollTop = element.scrollHeight;
    } else {
      const offset = pageOffset ? prevTopElement.clientHeight : 0;
      element.scrollTop =
        prevTopElement.scrollHeight + prevTopElement.clientHeight + offset;
      setPageOffset(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  useEffect(() => {
    if (chatRoom.chatRoom.chatRoomId in additionalActions) {
      setAdditionalActions((prev) => {
        const newActions = { ...prev };
        delete newActions[chatRoom.chatRoom.chatRoomId];
        return newActions;
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chatRoom]);

  useEffect(() => {
    setPageOffset(true);
    setPrevTopElement(null);
  }, [chatRoom]);

  useEffect(() => {
    const element: any = document.querySelector(".chat-conversation-box");
    element.behavior = "smooth";
    element.scrollTop = element.scrollHeight;
  }, [additionalActions]);

  useEffect(() => {
    if (hasNextPage && inView) {
      // ユーザーが上にスクロールしようとした時に次のページを読み込む
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  return (
    <PerfectScrollbar className="relative h-full sm:h-[calc(100vh_-_300px)] chat-conversation-box">
      <div style={{ visibility: "hidden", height: 0 }} ref={ref}>
        <div />
      </div>
      {isFetchingNextPage && <div>Loading...</div>}
      <div className="p-4 sm:pb-0 pb-[68px] sm:min-h-[300px] min-h-[400px] flex flex-col-reverse justify-end">
        {data.pages.map((page, i) => (
          <React.Fragment key={i}>
            {/* page.data.dataとadditionalActionsをマージして表示 */}
            {[
              ...(additionalActions[chatRoom.chatRoom.chatRoomId] || []),
              ...page.data.data,
            ].map((act) => (
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
