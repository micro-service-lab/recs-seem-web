import { useReadMessageQuery } from "@/api/readReceipt/useReadMessageQuery";
import { useAuthContext } from "@/auth/hooks";
import { useHandleWsPayload } from "@/hooks/use-handle-ws-payload";
import { chatRoomQueryKey } from "@/query-keys/chat-room-query-key";
import {
  DeleteMessageOnChatRoomState,
  EditMessageOnChatRoomState,
  latestActionOnChatRoomState,
} from "@/store/chatRoomLatestAction";
import { chatRoomRefetchDispatchState } from "@/store/chatRoomRefetch";
import { ignoreChatRoomState } from "@/store/ignoreChatRoom";
import { newNameChatRoomState } from "@/store/newNameChatRoom";
import { onlineMembersState } from "@/store/onlineMembers";
import {
  mountChatRoomState,
  openChatRoomAdditionalActionState,
  openChatRoomMessageDeleteState,
  openChatRoomMessageOverrideState,
  openChatRoomReadReceiptState,
  openChatRoomState,
} from "@/store/openChatRoom";
import {
  unreadMessageCountOnChatRoomState,
  unreadMessageCountState,
} from "@/store/unreadMessage";
import { websocketAtom } from "@/store/websocket";
import {
  wsChatRoomAddedMeEventDispatchState,
  wsChatRoomAddedMemberEventDispatchState,
  wsChatRoomDeletedEventDispatchState,
  wsChatRoomDeletedMessageEventDispatchState,
  wsChatRoomEditedMessageEventDispatchState,
  wsChatRoomReadMessageEventDispatchState,
  wsChatRoomRemovedMeEventDispatchState,
  wsChatRoomRemovedMemberEventDispatchState,
  wsChatRoomSentMessageEventDispatchState,
  wsChatRoomUpdatedNameEventDispatchState,
  wsChatRoomWithdrawnMeEventDispatchState,
  wsChatRoomWithdrawnMemberEventDispatchState,
  wsConnectedEventDispatchState,
  wsConnectingMembersEventDispatchState,
  wsDisconnectedEventDispatchState,
  wsDispatchChatRoomAddedMeEventState,
  wsDispatchChatRoomAddedMemberEventState,
  wsDispatchChatRoomDeletedEventState,
  wsDispatchChatRoomDeletedMessageEventState,
  wsDispatchChatRoomEditedMessageEventState,
  wsDispatchChatRoomReadMessageEventState,
  wsDispatchChatRoomRemovedMeEventState,
  wsDispatchChatRoomRemovedMemberEventState,
  wsDispatchChatRoomSentMessageEventState,
  wsDispatchChatRoomUpdatedNameEventState,
  wsDispatchChatRoomWithdrawnMeEventState,
  wsDispatchChatRoomWithdrawnMemberEventState,
  wsDispatchConnectedEventState,
  wsDispatchConnectingMembersEventState,
  wsDispatchDisconnectedEventState,
} from "@/store/wsDispatchEvent";
import { ChatRoomActionTypeKeys } from "@/types/chat-room-action";
import {
  ChatRoomActionPractical,
  ChatRoomActionWithActionType,
} from "@/types/entity/chat-room-action";
import { ChatRoomActionType } from "@/types/entity/chat-room-action-type";
import { MessageCard } from "@/types/entity/message";
import {
  WsChatRoomAddedMeEventData,
  WsChatRoomAddedMemberEventData,
  WsChatRoomDeletedEventData,
  WsChatRoomDeletedMessageEventData,
  WsChatRoomEditedMessageEventData,
  WsChatRoomReadMessageEventData,
  WsChatRoomRemovedMeEventData,
  WsChatRoomRemovedMemberEventData,
  WsChatRoomSentMessageEventData,
  WsChatRoomUpdatedNameEventData,
  WsChatRoomWithdrawnMeEventData,
  WsChatRoomWithdrawnMemberEventData,
  WsConnectedEventData,
  WsConnectingMembersEventData,
  WsDisconnectedEventData,
} from "@/types/ws/event";
import { WsEventTypes } from "@/types/ws/event-type";
import { OnlineMembers } from "@/types/ws/online";
import { WsEmptyDataRequest, WsRequestTypes } from "@/types/ws/request";
import { convertKeysToSnakeCase } from "@/utils/change-case";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import {
  useRecoilCallback,
  useRecoilState,
  useRecoilValue,
  useSetRecoilState,
} from "recoil";

export const WsProvider = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuthContext();

  if (!user) return <>{children}</>;

  return <InnerWsProvider>{children}</InnerWsProvider>;
};

const InnerWsProvider = ({ children }: { children: React.ReactNode }) => {
  const setWsConnectingMembersEventDispatch = useSetRecoilState(
    wsConnectingMembersEventDispatchState
  );
  const setWsDispatchConnectingMembersEvent = useSetRecoilState(
    wsDispatchConnectingMembersEventState
  );
  const setWsConnectedEventDispatch = useSetRecoilState(
    wsConnectedEventDispatchState
  );
  const setWsDispatchConnectedEvent = useSetRecoilState(
    wsDispatchConnectedEventState
  );
  const setWsDisconnectedEventDispatch = useSetRecoilState(
    wsDisconnectedEventDispatchState
  );
  const setWsDispatchDisconnectedEvent = useSetRecoilState(
    wsDispatchDisconnectedEventState
  );
  const setWsChatRoomUpdatedNameEventDispatch = useSetRecoilState(
    wsChatRoomUpdatedNameEventDispatchState
  );
  const setWsDispatchChatRoomUpdatedNameEvent = useSetRecoilState(
    wsDispatchChatRoomUpdatedNameEventState
  );
  const setWsChatRoomAddedMemberEventDispatch = useSetRecoilState(
    wsChatRoomAddedMemberEventDispatchState
  );
  const setWsDispatchChatRoomAddedMemberEvent = useSetRecoilState(
    wsDispatchChatRoomAddedMemberEventState
  );
  const setWsChatRoomAddedMeEventDispatch = useSetRecoilState(
    wsChatRoomAddedMeEventDispatchState
  );
  const setWsDispatchChatRoomAddedMeEvent = useSetRecoilState(
    wsDispatchChatRoomAddedMeEventState
  );
  const setChatRoomRemovedMemberEventDispatch = useSetRecoilState(
    wsChatRoomRemovedMemberEventDispatchState
  );
  const setWsDispatchChatRoomRemovedMemberEvent = useSetRecoilState(
    wsDispatchChatRoomRemovedMemberEventState
  );
  const setChatRoomRemovedMeEventDispatch = useSetRecoilState(
    wsChatRoomRemovedMeEventDispatchState
  );
  const setWsDispatchChatRoomRemovedMeEvent = useSetRecoilState(
    wsDispatchChatRoomRemovedMeEventState
  );
  const setWsChatRoomWithdrawnMemberEventDispatch = useSetRecoilState(
    wsChatRoomWithdrawnMemberEventDispatchState
  );
  const setWsDispatchChatRoomWithdrawnMemberEvent = useSetRecoilState(
    wsDispatchChatRoomWithdrawnMemberEventState
  );
  const setWsChatRoomWithdrawnMeEventDispatch = useSetRecoilState(
    wsChatRoomWithdrawnMeEventDispatchState
  );
  const setWsDispatchChatRoomWithdrawnMeEvent = useSetRecoilState(
    wsDispatchChatRoomWithdrawnMeEventState
  );
  const setWsChatRoomSentMessageEventDispatch = useSetRecoilState(
    wsChatRoomSentMessageEventDispatchState
  );
  const setWsDispatchChatRoomSentMessageEvent = useSetRecoilState(
    wsDispatchChatRoomSentMessageEventState
  );
  const setWsChatRoomDeletedMessageEventDispatch = useSetRecoilState(
    wsChatRoomDeletedMessageEventDispatchState
  );
  const setWsDispatchChatRoomDeletedMessageEvent = useSetRecoilState(
    wsDispatchChatRoomDeletedMessageEventState
  );
  const setWsChatRoomEditedMessageEventDispatch = useSetRecoilState(
    wsChatRoomEditedMessageEventDispatchState
  );
  const setWsDispatchChatRoomEditedMessageEvent = useSetRecoilState(
    wsDispatchChatRoomEditedMessageEventState
  );
  const setWsChatRoomReadMessageEventDispatch = useSetRecoilState(
    wsChatRoomReadMessageEventDispatchState
  );
  const setWsDispatchChatRoomReadMessageEvent = useSetRecoilState(
    wsDispatchChatRoomReadMessageEventState
  );
  const setWsChatRoomDeletedEventDispatch = useSetRecoilState(
    wsChatRoomDeletedEventDispatchState
  );
  const setWsDispatchChatRoomDeletedEvent = useSetRecoilState(
    wsDispatchChatRoomDeletedEventState
  );

  const handleWsPayload = useHandleWsPayload((eventType, data) => {
    let connectingMembersData: WsConnectingMembersEventData;
    let connectedData: WsConnectedEventData;
    let disconnectedData: WsDisconnectedEventData;
    let updatedNameActionData: WsChatRoomUpdatedNameEventData;
    let addedMemberActionData: WsChatRoomAddedMemberEventData;
    let addedMeActionData: WsChatRoomAddedMeEventData;
    let removedMemberActionData: WsChatRoomRemovedMemberEventData;
    let removedMeActionData: WsChatRoomRemovedMeEventData;
    let withdrawnMemberActionData: WsChatRoomWithdrawnMemberEventData;
    let withdrawnMeActionData: WsChatRoomWithdrawnMeEventData;
    let sentMessageActionData: WsChatRoomSentMessageEventData;
    let deletedMessageActionData: WsChatRoomDeletedMessageEventData;
    let editedMessageActionData: WsChatRoomEditedMessageEventData;
    let readMessageActionData: WsChatRoomReadMessageEventData;
    let deletedActionData: WsChatRoomDeletedEventData;
    switch (eventType) {
      case WsEventTypes.CONNECTION_MEMBERS:
        connectingMembersData = data.data as WsConnectingMembersEventData;
        setWsConnectingMembersEventDispatch((p) => !p);
        setWsDispatchConnectingMembersEvent((prev) => [
          ...prev,
          connectingMembersData,
        ]);
        break;
      case WsEventTypes.CONNECTED:
        connectedData = data.data as WsConnectedEventData;
        setWsConnectedEventDispatch((p) => !p);
        setWsDispatchConnectedEvent((prev) => [...prev, connectedData]);
        break;
      case WsEventTypes.DISCONNECTED:
        disconnectedData = data.data as WsDisconnectedEventData;
        setWsDisconnectedEventDispatch((p) => !p);
        setWsDispatchDisconnectedEvent((prev) => [...prev, disconnectedData]);
        break;
      case WsEventTypes.CHAT_ROOM_UPDATED_NAME:
        updatedNameActionData = data.data as WsChatRoomUpdatedNameEventData;
        setWsChatRoomUpdatedNameEventDispatch((p) => !p);
        setWsDispatchChatRoomUpdatedNameEvent((prev) => [
          ...prev,
          updatedNameActionData,
        ]);
        break;
      case WsEventTypes.CHAT_ROOM_ADDED_MEMBER:
        addedMemberActionData = data.data as WsChatRoomAddedMemberEventData;
        setWsChatRoomAddedMemberEventDispatch((p) => !p);
        setWsDispatchChatRoomAddedMemberEvent((prev) => [
          ...prev,
          addedMemberActionData,
        ]);
        break;
      case WsEventTypes.CHAT_ROOM_ADDED_ME:
        addedMeActionData = data.data as WsChatRoomAddedMeEventData;
        setWsChatRoomAddedMeEventDispatch((p) => !p);
        setWsDispatchChatRoomAddedMeEvent((prev) => [
          ...prev,
          addedMeActionData,
        ]);
        break;
      case WsEventTypes.CHAT_ROOM_REMOVED_MEMBER:
        removedMemberActionData = data.data as WsChatRoomRemovedMemberEventData;
        setChatRoomRemovedMemberEventDispatch((p) => !p);
        setWsDispatchChatRoomRemovedMemberEvent((prev) => [
          ...prev,
          removedMemberActionData,
        ]);
        break;
      case WsEventTypes.CHAT_ROOM_REMOVED_ME:
        removedMeActionData = data.data as WsChatRoomRemovedMeEventData;
        setChatRoomRemovedMeEventDispatch((p) => !p);
        setWsDispatchChatRoomRemovedMeEvent((prev) => [
          ...prev,
          removedMeActionData,
        ]);
        break;
      case WsEventTypes.CHAT_ROOM_WITHDRAWN_MEMBER:
        withdrawnMemberActionData =
          data.data as WsChatRoomWithdrawnMemberEventData;
        setWsChatRoomWithdrawnMemberEventDispatch((p) => !p);
        setWsDispatchChatRoomWithdrawnMemberEvent((prev) => [
          ...prev,
          withdrawnMemberActionData,
        ]);
        break;
      case WsEventTypes.CHAT_ROOM_WITHDRAWN_ME:
        withdrawnMeActionData = data.data as WsChatRoomWithdrawnMeEventData;
        setWsChatRoomWithdrawnMeEventDispatch((p) => !p);
        setWsDispatchChatRoomWithdrawnMeEvent((prev) => [
          ...prev,
          withdrawnMeActionData,
        ]);
        break;
      case WsEventTypes.CHAT_ROOM_SENT_MESSAGE:
        sentMessageActionData = data.data as WsChatRoomSentMessageEventData;
        setWsChatRoomSentMessageEventDispatch((p) => !p);
        setWsDispatchChatRoomSentMessageEvent((prev) => [
          ...prev,
          sentMessageActionData,
        ]);
        break;
      case WsEventTypes.CHAT_ROOM_DELETED_MESSAGE:
        deletedMessageActionData =
          data.data as WsChatRoomDeletedMessageEventData;
        setWsChatRoomDeletedMessageEventDispatch((p) => !p);
        setWsDispatchChatRoomDeletedMessageEvent((prev) => [
          ...prev,
          deletedMessageActionData,
        ]);
        break;
      case WsEventTypes.CHAT_ROOM_EDITED_MESSAGE:
        editedMessageActionData = data.data as WsChatRoomEditedMessageEventData;
        setWsChatRoomEditedMessageEventDispatch((p) => !p);
        setWsDispatchChatRoomEditedMessageEvent((prev) => [
          ...prev,
          editedMessageActionData,
        ]);
        break;
      case WsEventTypes.CHAT_ROOM_READ_MESSAGE:
        readMessageActionData = data.data as WsChatRoomReadMessageEventData;
        setWsChatRoomReadMessageEventDispatch((p) => !p);
        setWsDispatchChatRoomReadMessageEvent((prev) => [
          ...prev,
          readMessageActionData,
        ]);
        break;
      case WsEventTypes.CHAT_ROOM_DELETED:
        deletedActionData = data.data as WsChatRoomDeletedEventData;
        setWsChatRoomDeletedEventDispatch((p) => !p);
        setWsDispatchChatRoomDeletedEvent((prev) => [
          ...prev,
          deletedActionData,
        ]);
        break;
    }
  });

  const socket = useRecoilValue(websocketAtom);
  socket.onmessage = (msg) => {
    handleWsPayload(msg.data);
  };

  useEffect(() => {
    const sendMsg: WsEmptyDataRequest = {
      requestType: WsRequestTypes.ONLINE_MEMBERS,
      data: {},
    };
    socket.send(JSON.stringify(convertKeysToSnakeCase(sendMsg)));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    return () => {
      socket.close();
    };
  });

  return <WsDispatcher>{children}</WsDispatcher>;
};

const WsDispatcher = ({ children }: { children: React.ReactNode }) => {
  const openChatRoom = useRecoilValue(openChatRoomState);
  const queryClient = useQueryClient();
  const { user } = useAuthContext();

  const wsConnectingMembersEventDispatch = useRecoilValue(
    wsConnectingMembersEventDispatchState
  );
  const wsConnectedEventDispatch = useRecoilValue(
    wsConnectedEventDispatchState
  );
  const wsDisconnectedEventDispatch = useRecoilValue(
    wsDisconnectedEventDispatchState
  );
  const wsChatRoomUpdatedNameEventDispatch = useRecoilValue(
    wsChatRoomUpdatedNameEventDispatchState
  );
  const wsChatRoomAddedMemberEventDispatch = useRecoilValue(
    wsChatRoomAddedMemberEventDispatchState
  );
  const wsChatRoomAddedMeEventDispatch = useRecoilValue(
    wsChatRoomAddedMeEventDispatchState
  );
  const chatRoomRemovedMemberEventDispatch = useRecoilValue(
    wsChatRoomRemovedMemberEventDispatchState
  );
  const chatRoomRemovedMeEventDispatch = useRecoilValue(
    wsChatRoomRemovedMeEventDispatchState
  );
  const wsChatRoomWithdrawnMemberEventDispatch = useRecoilValue(
    wsChatRoomWithdrawnMemberEventDispatchState
  );
  const wsChatRoomWithdrawnMeEventDispatch = useRecoilValue(
    wsChatRoomWithdrawnMeEventDispatchState
  );
  const wsChatRoomSentMessageEventDispatch = useRecoilValue(
    wsChatRoomSentMessageEventDispatchState
  );
  const wsChatRoomDeletedMessageEventDispatch = useRecoilValue(
    wsChatRoomDeletedMessageEventDispatchState
  );
  const wsChatRoomEditedMessageEventDispatch = useRecoilValue(
    wsChatRoomEditedMessageEventDispatchState
  );
  const wsChatRoomReadMessageEventDispatch = useRecoilValue(
    wsChatRoomReadMessageEventDispatchState
  );
  const wsChatRoomDeletedEventDispatch = useRecoilValue(
    wsChatRoomDeletedEventDispatchState
  );

  const [
    wsDispatchConnectingMembersEvent,
    setWsDispatchConnectingMembersEvent,
  ] = useRecoilState(wsDispatchConnectingMembersEventState);
  const [wsDispatchConnectedEvent, setWsDispatchConnectedEvent] =
    useRecoilState(wsDispatchConnectedEventState);
  const [wsDispatchDisconnectedEvent, setWsDispatchDisconnectedEvent] =
    useRecoilState(wsDispatchDisconnectedEventState);
  const [
    wsDispatchChatRoomUpdatedNameEvent,
    setWsDispatchChatRoomUpdatedNameEvent,
  ] = useRecoilState(wsDispatchChatRoomUpdatedNameEventState);
  const [
    wsDispatchChatRoomAddedMemberEvent,
    setWsDispatchChatRoomAddedMemberEvent,
  ] = useRecoilState(wsDispatchChatRoomAddedMemberEventState);
  const [wsDispatchChatRoomAddedMeEvent, setWsDispatchChatRoomAddedMeEvent] =
    useRecoilState(wsDispatchChatRoomAddedMeEventState);
  const [
    wsDispatchChatRoomRemovedMemberEvent,
    setWsDispatchChatRoomRemovedMemberEvent,
  ] = useRecoilState(wsDispatchChatRoomRemovedMemberEventState);
  const [
    wsDispatchChatRoomRemovedMeEvent,
    setWsDispatchChatRoomRemovedMeEvent,
  ] = useRecoilState(wsDispatchChatRoomRemovedMeEventState);
  const [
    wsDispatchChatRoomWithdrawnMemberEvent,
    setWsDispatchChatRoomWithdrawnMemberEvent,
  ] = useRecoilState(wsDispatchChatRoomWithdrawnMemberEventState);
  const [
    wsDispatchChatRoomWithdrawnMeEvent,
    setWsDispatchChatRoomWithdrawnMeEvent,
  ] = useRecoilState(wsDispatchChatRoomWithdrawnMeEventState);
  const [
    wsDispatchChatRoomSentMessageEvent,
    setWsDispatchChatRoomSentMessageEvent,
  ] = useRecoilState(wsDispatchChatRoomSentMessageEventState);
  const [
    wsDispatchChatRoomDeletedMessageEvent,
    setWsDispatchChatRoomDeletedMessageEvent,
  ] = useRecoilState(wsDispatchChatRoomDeletedMessageEventState);
  const [
    wsDispatchChatRoomEditedMessageEvent,
    setWsDispatchChatRoomEditedMessageEvent,
  ] = useRecoilState(wsDispatchChatRoomEditedMessageEventState);
  const [
    wsDispatchChatRoomReadMessageEvent,
    setWsDispatchChatRoomReadMessageEvent,
  ] = useRecoilState(wsDispatchChatRoomReadMessageEventState);
  const [wsDispatchChatRoomDeletedEvent, setWsDispatchChatRoomDeletedEvent] =
    useRecoilState(wsDispatchChatRoomDeletedEventState);

  const setChatRoomRefetchDispatch = useSetRecoilState(
    chatRoomRefetchDispatchState
  );

  const setLatestActionOnChatRoom = useSetRecoilState(
    latestActionOnChatRoomState
  );
  const setEditMessageOnChatRoom = useSetRecoilState(
    EditMessageOnChatRoomState
  );
  const setDeleteMessageOnChatRoom = useSetRecoilState(
    DeleteMessageOnChatRoomState
  );
  const setNewNameOnChatRoom = useSetRecoilState(newNameChatRoomState);

  const setOnlineMembers = useRecoilCallback(
    ({ set }) =>
      (data: WsConnectingMembersEventData) => {
        const connectingMembers = data.connectingMembers.reduce(
          (acc, member) => {
            acc[member.memberId] = member.connectIds;
            return acc;
          },
          {} as OnlineMembers
        );
        set(onlineMembersState, connectingMembers);
      }
  );

  const addOnlineMemberList = useRecoilCallback(
    ({ set }) =>
      (data: WsConnectedEventData) => {
        set(onlineMembersState, (prev): OnlineMembers => {
          // prevにdata.authMemberIDがキーのオブジェクトが存在するか
          if (prev[data.authMemberId]) {
            // connectIdが存在するか
            if (prev[data.authMemberId].includes(data.connectId)) {
              return prev;
            }
            return {
              ...prev,
              [data.authMemberId]: [...prev[data.authMemberId], data.connectId],
            };
          } else {
            return { ...prev, [data.authMemberId]: [data.connectId] };
          }
        });
      }
  );

  const removeOnlineMemberList = useRecoilCallback(
    ({ set }) =>
      (data: WsDisconnectedEventData) => {
        set(onlineMembersState, (prev): OnlineMembers => {
          // prevにdata.authMemberIdがキーのオブジェクトが存在するか
          if (prev[data.authMemberId]) {
            const p = { ...prev };
            // 存在する場合は、connectIdを削除
            p[data.authMemberId] = prev[data.authMemberId].filter(
              (id) => id !== data.connectId
            );
            // connectIdが空になった場合は、キーを削除
            if (p[data.authMemberId].length === 0) {
              delete p[data.authMemberId];
            }
            return p;
          } else {
            return prev;
          }
        });
      }
  );

  const addUpdatedNameAction = useRecoilCallback(
    ({ set }) =>
      (data: WsChatRoomUpdatedNameEventData) => {
        set(openChatRoomAdditionalActionState, (prev) => {
          const action: ChatRoomActionPractical = {
            chatRoomActionId: data.chatRoomActionId,
            chatRoomId: data.chatRoomId,
            chatRoomActionTypeId: data.chatRoomActionTypeId,
            actedAt: data.actedAt,
            chatRoomCreateAction: null,
            chatRoomUpdateNameAction: data.action,
            chatRoomAddMemberAction: null,
            chatRoomRemoveMemberAction: null,
            chatRoomWithdrawAction: null,
            chatRoomDeleteMessageAction: null,
            message: null,
          };
          if (
            openChatRoom &&
            data.chatRoomId === openChatRoom.chatRoom.chatRoomId
          ) {
            return [action, ...prev];
          }
          return prev;
        });
      }
  );

  const addAddedMemberAction = useRecoilCallback(
    ({ set }) =>
      (data: WsChatRoomAddedMemberEventData) => {
        set(openChatRoomAdditionalActionState, (prev) => {
          const action: ChatRoomActionPractical = {
            chatRoomActionId: data.chatRoomActionId,
            chatRoomId: data.chatRoomId,
            chatRoomActionTypeId: data.chatRoomActionTypeId,
            actedAt: data.actedAt,
            chatRoomCreateAction: null,
            chatRoomUpdateNameAction: null,
            chatRoomAddMemberAction: data.action,
            chatRoomRemoveMemberAction: null,
            chatRoomWithdrawAction: null,
            chatRoomDeleteMessageAction: null,
            message: null,
          };
          if (
            openChatRoom &&
            data.chatRoomId === openChatRoom.chatRoom.chatRoomId
          ) {
            return [action, ...prev];
          }
          return prev;
        });
      }
  );

  const addRemovedMemberAction = useRecoilCallback(
    ({ set }) =>
      (data: WsChatRoomRemovedMemberEventData) => {
        set(openChatRoomAdditionalActionState, (prev) => {
          const action: ChatRoomActionPractical = {
            chatRoomActionId: data.chatRoomActionId,
            chatRoomId: data.chatRoomId,
            chatRoomActionTypeId: data.chatRoomActionTypeId,
            actedAt: data.actedAt,
            chatRoomCreateAction: null,
            chatRoomUpdateNameAction: null,
            chatRoomAddMemberAction: null,
            chatRoomRemoveMemberAction: data.action,
            chatRoomWithdrawAction: null,
            chatRoomDeleteMessageAction: null,
            message: null,
          };
          if (
            openChatRoom &&
            data.chatRoomId === openChatRoom.chatRoom.chatRoomId
          ) {
            return [action, ...prev];
          }
          return prev;
        });
      }
  );

  const addWithdrawnMemberAction = useRecoilCallback(
    ({ set }) =>
      (data: WsChatRoomWithdrawnMemberEventData) => {
        set(openChatRoomAdditionalActionState, (prev) => {
          const action: ChatRoomActionPractical = {
            chatRoomActionId: data.chatRoomActionId,
            chatRoomId: data.chatRoomId,
            chatRoomActionTypeId: data.chatRoomActionTypeId,
            actedAt: data.actedAt,
            chatRoomCreateAction: null,
            chatRoomUpdateNameAction: null,
            chatRoomAddMemberAction: null,
            chatRoomRemoveMemberAction: null,
            chatRoomWithdrawAction: data.action,
            chatRoomDeleteMessageAction: null,
            message: null,
          };
          if (
            openChatRoom &&
            data.chatRoomId === openChatRoom.chatRoom.chatRoomId
          ) {
            return [action, ...prev];
          }
          return prev;
        });
      }
  );

  const addMessageAction = useRecoilCallback(
    ({ set }) =>
      (data: WsChatRoomSentMessageEventData) => {
        set(openChatRoomAdditionalActionState, (prev) => {
          const action: ChatRoomActionPractical = {
            chatRoomActionId: data.chatRoomActionId,
            chatRoomId: data.chatRoomId,
            chatRoomActionTypeId: data.chatRoomActionTypeId,
            actedAt: data.actedAt,
            chatRoomCreateAction: null,
            chatRoomUpdateNameAction: null,
            chatRoomAddMemberAction: null,
            chatRoomRemoveMemberAction: null,
            chatRoomWithdrawAction: null,
            chatRoomDeleteMessageAction: null,
            message: data.action,
          };
          if (
            openChatRoom &&
            data.chatRoomId === openChatRoom.chatRoom.chatRoomId
          ) {
            return [action, ...prev];
          }
          return prev;
        });
      }
  );

  const setUnreadMessageCount = useSetRecoilState(unreadMessageCountState);
  const setUnreadMessageCountOnChatRoom = useSetRecoilState(
    unreadMessageCountOnChatRoomState
  );
  const { mutate: readMessage } = useReadMessageQuery();
  const setOpenChatRoomReadReceipt = useSetRecoilState(
    openChatRoomReadReceiptState
  );
  const mountChatRoom = useRecoilValue(mountChatRoomState);
  const setIgnoreChatRoom = useSetRecoilState(ignoreChatRoomState);
  const setOverrideMessage = useSetRecoilState(
    openChatRoomMessageOverrideState
  );
  const setDeleteMessage = useSetRecoilState(openChatRoomMessageDeleteState);

  useEffect(() => {
    wsDispatchConnectingMembersEvent.forEach((data) => {
      setOnlineMembers(data);
    });
    setWsDispatchConnectingMembersEvent([]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [wsConnectingMembersEventDispatch]);

  useEffect(() => {
    wsDispatchConnectedEvent.forEach((data) => {
      addOnlineMemberList(data);
    });
    setWsDispatchConnectedEvent([]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [wsConnectedEventDispatch]);

  useEffect(() => {
    wsDispatchDisconnectedEvent.forEach((data) => {
      removeOnlineMemberList(data);
    });
    setWsDispatchDisconnectedEvent([]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [wsDisconnectedEventDispatch]);

  useEffect(() => {
    wsDispatchChatRoomUpdatedNameEvent.forEach((data) => {
      addUpdatedNameAction(data);
      if (mountChatRoom) {
        setNewNameOnChatRoom((prev) => ({
          ...prev,
          [data.chatRoomId]: data.action.name,
        }));
        const actionType: ChatRoomActionType = {
          chatRoomActionTypeId: data.chatRoomActionTypeId,
          name: "",
          key: ChatRoomActionTypeKeys.UPDATE_NAME,
        };
        const action: ChatRoomActionWithActionType = {
          chatRoomActionId: data.chatRoomActionId,
          chatRoomId: data.chatRoomId,
          actedAt: data.actedAt,
          chatRoomActionType: actionType,
        };
        setLatestActionOnChatRoom((prev) => ({
          data: [
            ...prev.data,
            {
              chatRoomId: data.chatRoomId,
              latestMessage: null,
              latestAction: action,
            },
          ],
          dispatch: !prev.dispatch,
        }));
      }
    });
    setWsDispatchChatRoomUpdatedNameEvent([]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [wsChatRoomUpdatedNameEventDispatch]);

  useEffect(() => {
    wsDispatchChatRoomAddedMemberEvent.forEach((data) => {
      queryClient.invalidateQueries({
        queryKey: [chatRoomQueryKey.members.belongingList(data.chatRoomId)],
      });
      queryClient.invalidateQueries({
        queryKey: [chatRoomQueryKey.members.unBelongingList(data.chatRoomId)],
      });
      addAddedMemberAction(data);
      if (mountChatRoom) {
        const actionType: ChatRoomActionType = {
          chatRoomActionTypeId: data.chatRoomActionTypeId,
          name: "",
          key: ChatRoomActionTypeKeys.ADD_MEMBER,
        };
        const action: ChatRoomActionWithActionType = {
          chatRoomActionId: data.chatRoomActionId,
          chatRoomId: data.chatRoomId,
          actedAt: data.actedAt,
          chatRoomActionType: actionType,
        };
        setLatestActionOnChatRoom((prev) => ({
          data: [
            ...prev.data,
            {
              chatRoomId: data.chatRoomId,
              latestMessage: null,
              latestAction: action,
            },
          ],
          dispatch: !prev.dispatch,
        }));
      }
    });
    setWsDispatchChatRoomAddedMemberEvent([]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [wsChatRoomAddedMemberEventDispatch]);

  useEffect(() => {
    wsDispatchChatRoomAddedMeEvent.forEach(() => {
      setChatRoomRefetchDispatch((p) => ({
        dispatch: !p.dispatch,
        first: false,
      }));
    });
    setWsDispatchChatRoomAddedMeEvent([]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [wsChatRoomAddedMeEventDispatch]);

  useEffect(() => {
    wsDispatchChatRoomRemovedMemberEvent.forEach((data) => {
      queryClient.invalidateQueries({
        queryKey: [chatRoomQueryKey.members.belongingList(data.chatRoomId)],
      });
      queryClient.invalidateQueries({
        queryKey: [chatRoomQueryKey.members.unBelongingList(data.chatRoomId)],
      });
      addRemovedMemberAction(data);
      if (mountChatRoom) {
        const actionType: ChatRoomActionType = {
          chatRoomActionTypeId: data.chatRoomActionTypeId,
          name: "",
          key: ChatRoomActionTypeKeys.REMOVE_MEMBER,
        };
        const action: ChatRoomActionWithActionType = {
          chatRoomActionId: data.chatRoomActionId,
          chatRoomId: data.chatRoomId,
          actedAt: data.actedAt,
          chatRoomActionType: actionType,
        };
        setLatestActionOnChatRoom((prev) => ({
          data: [
            ...prev.data,
            {
              chatRoomId: data.chatRoomId,
              latestMessage: null,
              latestAction: action,
            },
          ],
          dispatch: !prev.dispatch,
        }));
      }
    });
    setWsDispatchChatRoomRemovedMemberEvent([]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chatRoomRemovedMemberEventDispatch]);

  useEffect(() => {
    wsDispatchChatRoomRemovedMeEvent.forEach((data) => {
      setIgnoreChatRoom((prev) => ({
        ...prev,
        [data.chatRoomId]: true,
      }));
    });
    setWsDispatchChatRoomRemovedMeEvent([]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chatRoomRemovedMeEventDispatch]);

  useEffect(() => {
    wsDispatchChatRoomWithdrawnMemberEvent.forEach((data) => {
      addWithdrawnMemberAction(data);
      if (mountChatRoom) {
        const actionType: ChatRoomActionType = {
          chatRoomActionTypeId: data.chatRoomActionTypeId,
          name: "",
          key: ChatRoomActionTypeKeys.WITHDRAW,
        };
        const action: ChatRoomActionWithActionType = {
          chatRoomActionId: data.chatRoomActionId,
          chatRoomId: data.chatRoomId,
          actedAt: data.actedAt,
          chatRoomActionType: actionType,
        };
        setLatestActionOnChatRoom((prev) => ({
          data: [
            ...prev.data,
            {
              chatRoomId: data.chatRoomId,
              latestMessage: null,
              latestAction: action,
            },
          ],
          dispatch: !prev.dispatch,
        }));
      }
    });
    setWsDispatchChatRoomWithdrawnMemberEvent([]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [wsChatRoomWithdrawnMemberEventDispatch]);

  useEffect(() => {
    wsDispatchChatRoomWithdrawnMeEvent.forEach((data) => {
      setIgnoreChatRoom((prev) => ({
        ...prev,
        [data.chatRoomId]: true,
      }));
    });
    setWsDispatchChatRoomWithdrawnMeEvent([]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [wsChatRoomWithdrawnMeEventDispatch]);

  useEffect(() => {
    wsDispatchChatRoomSentMessageEvent.forEach((data) => {
      addMessageAction(data);
      if (mountChatRoom) {
        const actionType: ChatRoomActionType = {
          chatRoomActionTypeId: data.chatRoomActionTypeId,
          name: "",
          key: ChatRoomActionTypeKeys.MESSAGE,
        };
        const action: ChatRoomActionWithActionType = {
          chatRoomActionId: data.chatRoomActionId,
          chatRoomId: data.chatRoomId,
          actedAt: data.actedAt,
          chatRoomActionType: actionType,
        };
        const msg: MessageCard = {
          messageId: data.action.messageId,
          body: data.action.body,
          postedAt: data.action.postedAt,
        };
        setLatestActionOnChatRoom((prev) => ({
          data: [
            ...prev.data,
            {
              chatRoomId: data.chatRoomId,
              latestMessage: msg,
              latestAction: action,
            },
          ],
          dispatch: !prev.dispatch,
        }));
      }
      if (
        !openChatRoom ||
        data.chatRoomId !== openChatRoom.chatRoom.chatRoomId
      ) {
        setUnreadMessageCount((prev) => prev + 1);
        setUnreadMessageCountOnChatRoom((prev) => {
          const newUnreadCounts = { ...prev };
          newUnreadCounts[data.chatRoomId] = (prev[data.chatRoomId] || 0) + 1;
          return newUnreadCounts;
        });
      }
      if (
        openChatRoom &&
        openChatRoom.chatRoom.chatRoomId === data.chatRoomId &&
        user &&
        data.action.sender &&
        data.action.sender.memberId !== user.memberId
      ) {
        readMessage({
          chatRoomId: data.chatRoomId,
          messageId: data.action.messageId,
        });
        setUnreadMessageCount((prev) => prev + 1);
        setUnreadMessageCountOnChatRoom((prev) => {
          const newUnreadCounts = { ...prev };
          if (!newUnreadCounts[data.chatRoomId]) {
            newUnreadCounts[data.chatRoomId] = 0;
          }
          newUnreadCounts[data.chatRoomId] += 1;
          return newUnreadCounts;
        });
      }
    });
    setWsDispatchChatRoomSentMessageEvent([]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [wsChatRoomSentMessageEventDispatch]);

  useEffect(() => {
    wsDispatchChatRoomDeletedMessageEvent.forEach((data) => {
      data.unreadMemberIds.forEach((memberId) => {
        if (memberId === user?.memberId) {
          setUnreadMessageCount((prev) => prev - 1);
          setUnreadMessageCountOnChatRoom((prev) => {
            const newUnreadCounts = { ...prev };
            if (!newUnreadCounts[data.chatRoomId]) {
              newUnreadCounts[data.chatRoomId] = 0;
            }
            newUnreadCounts[data.chatRoomId]--;
            if (newUnreadCounts[data.chatRoomId] <= 0) {
              delete newUnreadCounts[data.chatRoomId];
            }
            return newUnreadCounts;
          });
        }
      });
      if (
        openChatRoom &&
        data.chatRoomId === openChatRoom.chatRoom.chatRoomId
      ) {
        setDeleteMessage((prev) => ({
          ...prev,
          [data.chatRoomActionId]: data.action,
        }));
      }
      if (mountChatRoom) {
        setDeleteMessageOnChatRoom((prev) => ({
          data: [
            ...prev.data,
            {
              chatRoomId: data.chatRoomId,
              action: data.action,
              actionTypeId: data.chatRoomActionTypeId,
            },
          ],
          dispatch: !prev.dispatch,
        }));
      }
    });
    setWsDispatchChatRoomDeletedMessageEvent([]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [wsChatRoomDeletedMessageEventDispatch]);

  useEffect(() => {
    wsDispatchChatRoomEditedMessageEvent.forEach((data) => {
      if (
        openChatRoom &&
        data.chatRoomId === openChatRoom.chatRoom.chatRoomId
      ) {
        setOverrideMessage((prev) => ({
          ...prev,
          [data.message.messageId]: {
            content: data.message.body,
          },
        }));
      }
      if (mountChatRoom) {
        setEditMessageOnChatRoom((prev) => ({
          data: [
            ...prev.data,
            {
              chatRoomId: data.chatRoomId,
              messageId: data.message.messageId,
              content: data.message.body,
            },
          ],
          dispatch: !prev.dispatch,
        }));
      }
    });
    setWsDispatchChatRoomEditedMessageEvent([]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [wsChatRoomEditedMessageEventDispatch]);

  useEffect(() => {
    wsDispatchChatRoomReadMessageEvent.forEach((data) => {
      setOpenChatRoomReadReceipt((prev) => {
        const newReadReceipt = { ...prev };
        data.messageIds.forEach((messageId) => {
          if (!newReadReceipt[messageId]) {
            newReadReceipt[messageId] = 1;
          } else {
            newReadReceipt[messageId]++;
          }
        });
        return newReadReceipt;
      });
      if (user && data.memberId === user.memberId) {
        // 時間差による-1以下があるかもしれないが、許容する
        setUnreadMessageCount((prev) => prev - data.messageIds.length);
        setUnreadMessageCountOnChatRoom((prev) => {
          const newUnreadCounts = { ...prev };
          if (!newUnreadCounts[data.chatRoomId]) {
            newUnreadCounts[data.chatRoomId] = 0;
          }
          newUnreadCounts[data.chatRoomId] -= data.messageIds.length;
          if (newUnreadCounts[data.chatRoomId] <= 0) {
            delete newUnreadCounts[data.chatRoomId];
          }
          return newUnreadCounts;
        });
      }
    });
    setWsDispatchChatRoomReadMessageEvent([]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [wsChatRoomReadMessageEventDispatch]);

  useEffect(() => {
    wsDispatchChatRoomDeletedEvent.forEach((data) => {
      setIgnoreChatRoom((prev) => ({
        ...prev,
        [data.chatRoom.chatRoomId]: true,
      }));
    });
    setWsDispatchChatRoomDeletedEvent([]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [wsChatRoomDeletedEventDispatch]);

  return <>{children}</>;
};
