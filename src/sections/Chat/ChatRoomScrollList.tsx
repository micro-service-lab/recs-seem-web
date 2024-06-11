import { useGetInfinityChatRoomsOnAuthQuery } from "@/api/chatRoom/useGetChatRoomsOnAuthQuery";
import { useInView } from "react-intersection-observer";
import { PracticalChatRoomOnMember } from "@/types/entity/chat-room-belonging";
import PerfectScrollbar from "react-perfect-scrollbar";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { formatDate } from "@/utils/format-time";
import { ChatRoomActionTypeKeys } from "@/types/chat-room-action";
import { useTranslation } from "react-i18next";
import { useRecoilState, useRecoilValue } from "recoil";
import { openChatRoomState } from "@/store/openChatRoom";
import { unreadMessageCountOnChatRoomState } from "@/store/unreadMessage";
import { chatRoomRefetchDispatchState } from "@/store/chatRoomRefetch";
import {
  DeleteMessageOnChatRoomState,
  EditMessageOnChatRoomState,
  latestActionOnChatRoomState,
} from "@/store/chatRoomLatestAction";
import { ignoreChatRoomState } from "@/store/ignoreChatRoom";
import { onlineMembersState } from "@/store/onlineMembers";

const CHAT_ROOM_PER_PAGE = 10;

type Props = {
  searchName: string;
  onSelectChatRoom: (chatRoom: PracticalChatRoomOnMember) => void;
  setOpenLatestActedAt: Dispatch<SetStateAction<string | null>>;
};

/* eslint-disable @typescript-eslint/no-explicit-any */
const ChatRoomScrollList = ({
  searchName,
  onSelectChatRoom,
  setOpenLatestActedAt,
}: Props) => {
  const { t } = useTranslation("chat");
  const [unreadCounts, setUnreadCounts] = useRecoilState(
    unreadMessageCountOnChatRoomState
  );
  const onlineMembers = useRecoilValue(onlineMembersState);
  const [openChatRoom, setOpenChatRoom] = useRecoilState(openChatRoomState);
  const [chatRoomRefetchDispatch, setChatRoomRefetchDispatch] = useRecoilState(
    chatRoomRefetchDispatchState
  );
  const [chatRoom, setChatRoom] = useState<PracticalChatRoomOnMember[]>([]);
  const [latestActionOnChatRoom, setLatestActionOnChatRoom] = useRecoilState(
    latestActionOnChatRoomState
  );
  const [editMessageOnChatRoom, setEditMessageOnChatRoom] = useRecoilState(
    EditMessageOnChatRoomState
  );
  const [deleteMessageOnChatRoom, setDeleteMessageOnChatRoom] = useRecoilState(
    DeleteMessageOnChatRoomState
  );
  const ignoreChatRoom = useRecoilValue(ignoreChatRoomState);
  const { data, hasNextPage, fetchNextPage, isFetchingNextPage, refetch } =
    useGetInfinityChatRoomsOnAuthQuery({
      searchName: searchName,
      order: "late_act",
      limit: CHAT_ROOM_PER_PAGE,
      offset: 0,
      pagination: "cursor",
      cursor: "",
      withCount: false,
    });
  const { ref, inView } = useInView();

  useEffect(() => {
    if (ignoreChatRoom) {
      const newChatRoom = chatRoom.filter(
        (room) => !ignoreChatRoom[room.chatRoom.chatRoomId]
      );
      setChatRoom(newChatRoom);
    }
    if (
      openChatRoom &&
      ignoreChatRoom &&
      ignoreChatRoom[openChatRoom.chatRoom.chatRoomId]
    ) {
      setOpenChatRoom(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ignoreChatRoom]);

  useEffect(() => {
    if (hasNextPage && inView) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  useEffect(() => {
    if (data) {
      const newUnreadCounts: { [key: string]: number } = {};
      const newChatRoom: PracticalChatRoomOnMember[] = [];
      data.pages.forEach((page) => {
        page.data.data.forEach((room) => {
          newChatRoom.push(room);
          newUnreadCounts[room.chatRoom.chatRoomId] = room.unreadCount;
        });
      });
      setChatRoom(newChatRoom);
      setUnreadCounts((prev) => ({ ...prev, ...newUnreadCounts }));
    }
  }, [data, setUnreadCounts, setChatRoom]);

  useEffect(() => {
    if (latestActionOnChatRoom.data.length > 0) {
      let newChatRoom = [...chatRoom];
      let needRefetch = false;
      latestActionOnChatRoom.data.forEach((action) => {
        const index = newChatRoom.findIndex(
          (room) => room.chatRoom.chatRoomId === action.chatRoomId
        );
        if (index === -1) {
          needRefetch = true;
          return;
        }
        if (
          openChatRoom &&
          openChatRoom.chatRoom.chatRoomId === action.chatRoomId
        ) {
          setOpenLatestActedAt(action.latestAction.actedAt);
        }
        newChatRoom = [
          {
            chatRoom: {
              ...newChatRoom[index].chatRoom,
              latestMessage: action.latestMessage,
              latestAction: action.latestAction,
            },
            unreadCount: newChatRoom[index].unreadCount,
            addedAt: newChatRoom[index].addedAt,
          },
          ...newChatRoom.slice(0, index),
          ...newChatRoom.slice(index + 1),
        ];
      });
      if (needRefetch) {
        setChatRoomRefetchDispatch((p) => ({
          dispatch: !p.dispatch,
          first: p.first,
        }));
        return;
      }
      setChatRoom(newChatRoom);
      setLatestActionOnChatRoom((p) => ({
        data: [],
        dispatch: p.dispatch,
      }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    latestActionOnChatRoom.dispatch,
    setUnreadCounts,
    setChatRoom,
    setChatRoomRefetchDispatch,
  ]);

  useEffect(() => {
    if (editMessageOnChatRoom.data.length > 0) {
      const processedChatRoom = [...chatRoom];
      editMessageOnChatRoom.data.forEach((data) => {
        const index = processedChatRoom.findIndex(
          (room) => room.chatRoom.chatRoomId === data.chatRoomId
        );
        if (index === -1) {
          return;
        }
        if (
          processedChatRoom[index].chatRoom.latestMessage &&
          processedChatRoom[index].chatRoom.latestMessage?.messageId ===
            data.messageId
        ) {
          const latestMsg = {
            ...processedChatRoom[index].chatRoom.latestMessage,
            body: data.content,
          };
          if (!latestMsg.messageId || !latestMsg.postedAt) {
            return;
          }
          processedChatRoom[index] = {
            chatRoom: {
              ...processedChatRoom[index].chatRoom,
              latestMessage: {
                messageId: latestMsg.messageId,
                body: data.content,
                postedAt: latestMsg.postedAt,
              },
            },
            unreadCount: processedChatRoom[index].unreadCount,
            addedAt: processedChatRoom[index].addedAt,
          };
        }
      });
      setChatRoom(processedChatRoom);
      setEditMessageOnChatRoom((p) => ({
        data: [],
        dispatch: p.dispatch,
      }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editMessageOnChatRoom]);

  useEffect(() => {
    if (deleteMessageOnChatRoom.data.length > 0) {
      const processedChatRoom = [...chatRoom];
      deleteMessageOnChatRoom.data.forEach((data) => {
        const index = processedChatRoom.findIndex(
          (room) => room.chatRoom.chatRoomId === data.chatRoomId
        );
        if (index === -1) {
          return;
        }
        if (
          processedChatRoom[index].chatRoom.latestAction &&
          processedChatRoom[index].chatRoom.latestAction?.chatRoomActionId ===
            data.action.chatRoomActionId
        ) {
          processedChatRoom[index] = {
            chatRoom: {
              ...processedChatRoom[index].chatRoom,
              latestAction: {
                chatRoomActionId: data.action.chatRoomActionId,
                actedAt:
                  processedChatRoom[index].chatRoom.latestAction?.actedAt || "",
                chatRoomActionType: {
                  chatRoomActionTypeId: data.actionTypeId,
                  key: ChatRoomActionTypeKeys.DELETE_MESSAGE,
                  name: "",
                },
                chatRoomId: data.chatRoomId,
              },
            },
            addedAt: processedChatRoom[index].addedAt,
            unreadCount: processedChatRoom[index].unreadCount,
          };
        }
      });
      setChatRoom(processedChatRoom);
      setDeleteMessageOnChatRoom((p) => ({
        data: [],
        dispatch: p.dispatch,
      }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deleteMessageOnChatRoom]);

  useEffect(() => {
    if (!chatRoomRefetchDispatch.first) {
      setChatRoom([]);
      setLatestActionOnChatRoom((p) => ({
        data: [],
        dispatch: p.dispatch,
      }));
      setEditMessageOnChatRoom((p) => ({
        data: [],
        dispatch: p.dispatch,
      }));
      setDeleteMessageOnChatRoom((p) => ({
        data: [],
        dispatch: p.dispatch,
      }));
      refetch();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chatRoomRefetchDispatch]);

  useEffect(() => {
    return () => {
      setChatRoom([]);
      setChatRoomRefetchDispatch((p) => ({
        dispatch: p.dispatch,
        first: true,
      }));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!chatRoom || chatRoom.length === 0) {
    return (
      <div className="h-full min-h-[100px] sm:h-[calc(100vh_-_357px)] space-y-0.5 ltr:pr-3.5 rtl:pl-3.5 ltr:-mr-3.5 rtl:-ml-3.5 relative">
        {[...Array.from({ length: 10 })].map((_, index) => (
          <div
            key={index}
            className="w-full flex justify-between items-center p-2 bg-gray-100 dark:bg-[#050b14] rounded-md dark:text-primary text-primary overflow-hidden h-20 relative"
          >
            <div className="flex-1">
              <div className="flex items-center w-[calc(100%-3rem)]">
                <div className="flex-shrink-0 relative">
                  <span className="block w-10 h-10 text-center rounded-md object-cover bg-gray-300 dark:bg-gray-100/20 text-2xl animate-pulse" />
                </div>
                <div className="mx-3 ltr:text-left rtl:text-right">
                  <p className="mb-1 font-semibold truncate w-[145px] animate-pulse bg-black-light dark:bg-white-light h-7" />
                  <p className="text-xs text-white-dark truncate w-[165px] animate-pulse bg-black-light dark:bg-white-light h-5" />
                </div>
              </div>
            </div>
            <div className="font-semibold whitespace-nowrap text-xs absolute right-1 space-y-2">
              <div className="w-8 h-8 flex justify-center items-center bg-black-light dark:bg-white-light animate-pulse rounded-full" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <>
      <PerfectScrollbar className="chat-users relative h-full min-h-[100px] sm:h-[calc(100vh_-_357px)] space-y-0.5 ltr:pr-3.5 rtl:pl-3.5 ltr:-mr-3.5 rtl:-ml-3.5">
        {chatRoom.map((room) => (
          <div key={room.chatRoom.chatRoomId}>
            <button
              type="button"
              className={`w-full flex justify-between items-center p-2 hover:bg-gray-100 dark:hover:bg-[#050b14] rounded-md dark:hover:text-primary hover:text-primary overflow-hidden h-20 relative
                  ${
                    openChatRoom &&
                    openChatRoom.chatRoom.chatRoomId ===
                      room.chatRoom.chatRoomId
                      ? "bg-gray-100 dark:bg-[#050b14] dark:text-primary text-primary"
                      : ""
                  }`}
              onClick={() => onSelectChatRoom(room)}
            >
              <div className="flex-1">
                <div className="flex items-center w-[calc(100%-3rem)]">
                  <div className="flex-shrink-0 relative">
                    {room.chatRoom.isPrivate ? (
                      <>
                        {room.chatRoom.companion?.member.profileImage ? (
                          <img
                            src={
                              room.chatRoom.companion?.member.profileImage
                                .attachableItem.url
                            }
                            className="h-10 w-10 rounded-md object-cover"
                            alt=""
                          />
                        ) : (
                          <span className="w-10 h-10 text-center rounded-md object-cover bg-gray-300 dark:bg-gray-100 text-2xl flex justify-center items-center">
                            {(room.chatRoom.companion?.member.name || "")[0]}
                          </span>
                        )}
                        {room.chatRoom.companion &&
                          onlineMembers[
                            room.chatRoom.companion.member.memberId
                          ] && (
                            <div className="absolute -bottom-0.5 -right-0.5">
                              <div className="w-3 h-3 bg-success rounded-full animate-pulse" />
                            </div>
                          )}
                      </>
                    ) : room.chatRoom.coverImage ? (
                      <img
                        src={room.chatRoom.coverImage.attachableItem.url}
                        className="h-10 w-10 rounded-md object-cover"
                        alt=""
                      />
                    ) : (
                      <span className="w-10 h-10 text-center rounded-md object-cover bg-gray-300 dark:bg-gray-100 text-2xl flex justify-center items-center">
                        {(room.chatRoom.name || "")[0]}
                      </span>
                    )}
                  </div>
                  <div className="mx-3 ltr:text-left rtl:text-right">
                    <p className="mb-1 font-semibold truncate max-w-[145px]">
                      {room.chatRoom.isPrivate
                        ? room.chatRoom.companion?.member.name || ""
                        : room.chatRoom.name || ""}
                    </p>
                    <p className="text-xs text-white-dark truncate max-w-[165px]">
                      {room.chatRoom.latestAction?.chatRoomActionType.key ===
                      ChatRoomActionTypeKeys.MESSAGE
                        ? room.chatRoom.latestMessage?.body
                        : t(
                            `chat-room-action-${
                              room.chatRoom.latestAction?.chatRoomActionType
                                .key || ""
                            }`
                          )}
                    </p>
                  </div>
                </div>
              </div>
              <div className="font-semibold whitespace-nowrap text-xs absolute right-1 space-y-2">
                <p>
                  {room.chatRoom.latestAction?.actedAt
                    ? formatDate(room.chatRoom.latestAction.actedAt)
                    : ""}
                </p>
                <div className="w-full h-5 flex justify-center items-center">
                  {(unreadCounts[room.chatRoom.chatRoomId] || 0) > 0 && (
                    <span className="badge bg-danger rounded-full h-full w-5 flex justify-center items-center">
                      {unreadCounts[room.chatRoom.chatRoomId]}
                    </span>
                  )}
                </div>
              </div>
            </button>
          </div>
        ))}
        {isFetchingNextPage && <div>Loading...</div>}

        <div style={{ visibility: "hidden", height: 0 }} ref={ref}>
          <div />
        </div>
      </PerfectScrollbar>
    </>
  );
};

export default ChatRoomScrollList;
