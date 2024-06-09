import { useAuthContext } from "@/auth/hooks";
import { useHandleWsPayload } from "@/hooks/use-handle-ws-payload";
import { chatRoomRefetchDispatchState } from "@/store/chatRoomRefetch";
import { onlineMembersState } from "@/store/onlineMembers";
import {
  openChatRoomAdditionalActionState,
  openChatRoomState,
} from "@/store/openChatRoom";
import { unreadMessageCountOnChatRoomState, unreadMessageCountState } from "@/store/unreadMessage";
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
  wsDispatchChatRoomWithdrawnMemberEventState,
  wsDispatchConnectedEventState,
  wsDispatchConnectingMembersEventState,
  wsDispatchDisconnectedEventState,
} from "@/store/wsDispatchEvent";
import { ChatRoomActionPractical } from "@/types/entity/chat-room-action";
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
  WsChatRoomWithdrawnMemberEventData,
  WsConnectedEventData,
  WsConnectingMembersEventData,
  WsDisconnectedEventData,
} from "@/types/ws/event";
import { WsEventTypes } from "@/types/ws/event-type";
import { OnlineMembers } from "@/types/ws/online";
import { WsEmptyDataRequest, WsRequestTypes } from "@/types/ws/request";
import { convertKeysToSnakeCase } from "@/utils/change-case";
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

  useEffect(() => {
    wsDispatchConnectingMembersEvent.forEach((data) => {
      setOnlineMembers(data);
    });
    setWsDispatchConnectingMembersEvent([]);
  }, [wsConnectingMembersEventDispatch]);

  useEffect(() => {
    wsDispatchConnectedEvent.forEach((data) => {
      addOnlineMemberList(data);
    });
    setWsDispatchConnectedEvent([]);
  }, [wsConnectedEventDispatch]);

  useEffect(() => {
    wsDispatchDisconnectedEvent.forEach((data) => {
      removeOnlineMemberList(data);
    });
    setWsDispatchDisconnectedEvent([]);
  }, [wsDisconnectedEventDispatch]);

  useEffect(() => {
    wsDispatchChatRoomUpdatedNameEvent.forEach((data) => {
      addUpdatedNameAction(data);
    });
    setWsDispatchChatRoomUpdatedNameEvent([]);
  }, [wsChatRoomUpdatedNameEventDispatch]);

  useEffect(() => {
    wsDispatchChatRoomAddedMemberEvent.forEach((data) => {
      addAddedMemberAction(data);
    });
    setWsDispatchChatRoomAddedMemberEvent([]);
  }, [wsChatRoomAddedMemberEventDispatch]);

  useEffect(() => {
    wsDispatchChatRoomAddedMeEvent.forEach((data) => {
      setChatRoomRefetchDispatch((p) => ({
        dispatch: !p.dispatch,
        first: false,
      }));
      console.log("wsDispatchChatRoomAddedMeEvent", data);
    });
    setWsDispatchChatRoomAddedMeEvent([]);
  }, [wsChatRoomAddedMeEventDispatch]);

  useEffect(() => {
    wsDispatchChatRoomRemovedMemberEvent.forEach((data) => {
      addRemovedMemberAction(data);
    });
    setWsDispatchChatRoomRemovedMemberEvent([]);
  }, [chatRoomRemovedMemberEventDispatch]);

  useEffect(() => {
    wsDispatchChatRoomRemovedMeEvent.forEach((data) => {
      setChatRoomRefetchDispatch((p) => ({
        dispatch: !p.dispatch,
        first: false,
      }));
      console.log("wsDispatchChatRoomRemovedMeEvent", data);
    });
    setWsDispatchChatRoomRemovedMeEvent([]);
  }, [chatRoomRemovedMeEventDispatch]);

  useEffect(() => {
    wsDispatchChatRoomWithdrawnMemberEvent.forEach((data) => {
      addWithdrawnMemberAction(data);
    });
    setWsDispatchChatRoomWithdrawnMemberEvent([]);
  }, [wsChatRoomWithdrawnMemberEventDispatch]);

  useEffect(() => {
    wsDispatchChatRoomSentMessageEvent.forEach((data) => {
      addMessageAction(data);
      if (!openChatRoom || data.chatRoomId !== openChatRoom.chatRoom.chatRoomId) {
        setUnreadMessageCount((prev) => prev + 1);
        setUnreadMessageCountOnChatRoom((prev) => {
          const newUnreadCounts = { ...prev };
          newUnreadCounts[data.chatRoomId] = (prev[data.chatRoomId] || 0) + 1;
          return newUnreadCounts;
        });
      }
    });
    setWsDispatchChatRoomSentMessageEvent([]);
  }, [wsChatRoomSentMessageEventDispatch]);

  useEffect(() => {
    wsDispatchChatRoomDeletedMessageEvent.forEach((data) => {
      console.log("wsDispatchChatRoomDeletedMessageEvent", data);
    });
    setWsDispatchChatRoomDeletedMessageEvent([]);
  }, [wsChatRoomDeletedMessageEventDispatch]);

  useEffect(() => {
    wsDispatchChatRoomEditedMessageEvent.forEach((data) => {
      console.log("wsDispatchChatRoomEditedMessageEvent", data);
    });
    setWsDispatchChatRoomEditedMessageEvent([]);
  }, [wsChatRoomEditedMessageEventDispatch]);

  useEffect(() => {
    wsDispatchChatRoomReadMessageEvent.forEach((data) => {
      console.log("wsDispatchChatRoomReadMessageEvent", data);
    });
    setWsDispatchChatRoomReadMessageEvent([]);
  }, [wsChatRoomReadMessageEventDispatch]);

  useEffect(() => {
    wsDispatchChatRoomDeletedEvent.forEach((data) => {
      setChatRoomRefetchDispatch((p) => ({
        dispatch: !p.dispatch,
        first: false,
      }));
      console.log("wsDispatchChatRoomDeletedEvent", data);
    });
    setWsDispatchChatRoomDeletedEvent([]);
  }, [wsChatRoomDeletedEventDispatch]);

  return <>{children}</>;
};
