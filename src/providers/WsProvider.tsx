import { useAuthContext } from "@/auth/hooks";
import { useHandleWsPayload } from "@/hooks/use-handle-ws-payload";
import { onlineMembersState } from "@/store/onlineMembers";
import { chatRoomAdditionalActionState } from "@/store/openChatRoom";
import { websocketAtom } from "@/store/websocket";
import { ChatRoomActionPractical } from "@/types/entity/chat-room-action";
import {
  WsChatRoomAddedMemberEventData,
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
import { useRecoilCallback, useRecoilValue } from "recoil";

export const WsProvider = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuthContext();

  if (!user) return <>{children}</>;

  return <InnerWsProvider>{children}</InnerWsProvider>;
};

const InnerWsProvider = ({ children }: { children: React.ReactNode }) => {
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
        set(chatRoomAdditionalActionState, (prev) => {
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
          if (prev[data.chatRoomId]) {
            return {
              ...prev,
              [data.chatRoomId]: [action, ...prev[data.chatRoomId]],
            };
          } else {
            return {
              ...prev,
              [data.chatRoomId]: [action],
            };
          }
        });
      }
  );

  const addAddedMemberAction = useRecoilCallback(
    ({ set }) =>
      (data: WsChatRoomAddedMemberEventData) => {
        set(chatRoomAdditionalActionState, (prev) => {
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
          if (prev[data.chatRoomId]) {
            return {
              ...prev,
              [data.chatRoomId]: [action, ...prev[data.chatRoomId]],
            };
          } else {
            return {
              ...prev,
              [data.chatRoomId]: [action],
            };
          }
        });
      }
  );

  const addRemovedMemberAction = useRecoilCallback(
    ({ set }) =>
      (data: WsChatRoomRemovedMemberEventData) => {
        set(chatRoomAdditionalActionState, (prev) => {
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
          if (prev[data.chatRoomId]) {
            return {
              ...prev,
              [data.chatRoomId]: [action, ...prev[data.chatRoomId]],
            };
          } else {
            return {
              ...prev,
              [data.chatRoomId]: [action],
            };
          }
        });
      }
  );

  const addWithdrawnMemberAction = useRecoilCallback(
    ({ set }) =>
      (data: WsChatRoomWithdrawnMemberEventData) => {
        set(chatRoomAdditionalActionState, (prev) => {
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
          if (prev[data.chatRoomId]) {
            return {
              ...prev,
              [data.chatRoomId]: [action, ...prev[data.chatRoomId]],
            };
          } else {
            return {
              ...prev,
              [data.chatRoomId]: [action],
            };
          }
        });
      }
  );

  const addMessageAction = useRecoilCallback(
    ({ set }) =>
      (data: WsChatRoomSentMessageEventData) => {
        set(chatRoomAdditionalActionState, (prev) => {
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
          if (prev[data.chatRoomId]) {
            return {
              ...prev,
              [data.chatRoomId]: [action, ...prev[data.chatRoomId]],
            };
          } else {
            return {
              ...prev,
              [data.chatRoomId]: [action],
            };
          }
        });
      }
  );

  const handleWsPayload = useHandleWsPayload((eventType, data) => {
    let connectingMembersData: WsConnectingMembersEventData;
    let connectedData: WsConnectedEventData;
    let disconnectedData: WsDisconnectedEventData;
    let updatedNameActionData: WsChatRoomUpdatedNameEventData;
    let addedMemberActionData: WsChatRoomAddedMemberEventData;
    let removedMemberActionData: WsChatRoomRemovedMemberEventData;
    let withdrawnMemberActionData: WsChatRoomWithdrawnMemberEventData;
    let sentMessageActionData: WsChatRoomSentMessageEventData;
    switch (eventType) {
      case WsEventTypes.CONNECTION_MEMBERS:
        connectingMembersData = data.data as WsConnectingMembersEventData;
        setOnlineMembers(connectingMembersData);
        break;
      case WsEventTypes.CONNECTED:
        connectedData = data.data as WsConnectedEventData;
        addOnlineMemberList(connectedData);
        break;
      case WsEventTypes.DISCONNECTED:
        disconnectedData = data.data as WsDisconnectedEventData;
        removeOnlineMemberList(disconnectedData);
        break;
      case WsEventTypes.CHAT_ROOM_UPDATED_NAME:
        updatedNameActionData = data.data as WsChatRoomUpdatedNameEventData;
        addUpdatedNameAction(updatedNameActionData);
        break;
      case WsEventTypes.CHAT_ROOM_ADDED_MEMBER:
        addedMemberActionData = data.data as WsChatRoomAddedMemberEventData;
        addAddedMemberAction(addedMemberActionData);
        break;
      case WsEventTypes.CHAT_ROOM_REMOVED_MEMBER:
        removedMemberActionData = data.data as WsChatRoomRemovedMemberEventData;
        addRemovedMemberAction(removedMemberActionData);
        break;
      case WsEventTypes.CHAT_ROOM_WITHDRAWN_MEMBER:
        withdrawnMemberActionData =
          data.data as WsChatRoomWithdrawnMemberEventData;
        addWithdrawnMemberAction(withdrawnMemberActionData);
        break;
      case WsEventTypes.CHAT_ROOM_SENT_MESSAGE:
        sentMessageActionData = data.data as WsChatRoomSentMessageEventData;
        addMessageAction(sentMessageActionData);
        break;
    }
    console.log("eventType", eventType);
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

  return <>{children}</>;
};
