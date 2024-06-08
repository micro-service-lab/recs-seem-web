import { useGetInfinityChatRoomsOnAuthQuery } from "@/api/chatRoom/useGetChatRoomsOnAuthQuery";
import { useInView } from "react-intersection-observer";
import { PracticalChatRoomOnMember } from "@/types/entity/chat-room-belonging";
import PerfectScrollbar from "react-perfect-scrollbar";
import React, { useEffect } from "react";
import { formatDate } from "@/utils/format-time";
import { ChatRoomActionTypeKeys } from "@/types/chat-room-action";
import { useTranslation } from "react-i18next";
import { useRecoilValue } from "recoil";
import { openChatRoomState } from "@/store/openChatRoom";

const CHAT_ROOM_PER_PAGE = 10;

type Props = {
  searchName: string;
  onSelectChatRoom: (chatRoom: PracticalChatRoomOnMember) => void
};

/* eslint-disable @typescript-eslint/no-explicit-any */
const ChatRoomScrollList = ({
  searchName,
  onSelectChatRoom,
}: Props) => {
  const { t } = useTranslation("chat");
  const openChatRoom = useRecoilValue(openChatRoomState);
  const { data, hasNextPage, fetchNextPage, isFetchingNextPage } =
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
    if (hasNextPage && inView) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  if (!data) {
    return <div>No Room</div>;
  }

  return (
    <>
      <PerfectScrollbar className="chat-users relative h-full min-h-[100px] sm:h-[calc(100vh_-_357px)] space-y-0.5 ltr:pr-3.5 rtl:pl-3.5 ltr:-mr-3.5 rtl:-ml-3.5">
        {data.pages.map((page, i) => (
          <React.Fragment key={i}>
            {page.data.data.map((room) => (
              <div key={room.chatRoom.chatRoomId}>
                <button
                  type="button"
                  className={`w-full flex justify-between items-center p-2 hover:bg-gray-100 dark:hover:bg-[#050b14] rounded-md dark:hover:text-primary hover:text-primary overflow-hidden h-20
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
                    <div className="flex items-center">
                      <div className="flex-shrink-0 relative">
                        {room.chatRoom.isPrivate ? (
                          room.chatRoom.companion?.member.profileImage ? (
                            <img
                              src={
                                room.chatRoom.companion?.member.profileImage
                                  .attachableItem.url
                              }
                              className="h-10 w-10 rounded-md object-cover"
                              alt=""
                            />
                          ) : (
                            <span className="block w-10 h-10 text-center rounded-md object-cover bg-success text-2xl">
                              {(room.chatRoom.companion?.member.name || "")[0]}
                            </span>
                          )
                        ) : room.chatRoom.coverImage ? (
                          <img
                            src={room.chatRoom.coverImage.attachableItem.url}
                            className="h-10 w-10 rounded-md object-cover"
                            alt=""
                          />
                        ) : (
                          <span className="block w-10 h-10 text-center rounded-md object-cover bg-success text-2xl">
                            {(room.chatRoom.name || "")[0]}
                          </span>
                        )}
                      </div>
                      <div className="mx-3 ltr:text-left rtl:text-right">
                        <p className="mb-1 font-semibold">
                          {room.chatRoom.isPrivate
                            ? room.chatRoom.companion?.member.name || ""
                            : room.chatRoom.name || ""}
                        </p>
                        <p className="text-xs text-white-dark truncate max-w-[185px]">
                          {room.chatRoom.latestAction?.chatRoomActionType.key === ChatRoomActionTypeKeys.MESSAGE
                            ? room.chatRoom.latestMessage?.body
                            : t(`chat-room-action-${room.chatRoom.latestAction?.chatRoomActionType.key || ""}`)
                            }
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="font-semibold whitespace-nowrap text-xs">
                    <p>
                      {room.chatRoom.latestAction?.actedAt ? formatDate(room.chatRoom.latestAction.actedAt) : ""}
                    </p>
                  </div>
                </button>
              </div>
            ))}
          </React.Fragment>
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
