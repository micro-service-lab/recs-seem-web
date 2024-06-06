import { useInView } from "react-intersection-observer";
import PerfectScrollbar from "react-perfect-scrollbar";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import {
  useGetInfinityChatRoomActionsOnChatRoomQuery,
} from "@/api/chatRoomAction/useGetChatRoomActionsOnChatRoom";
import { PracticalChatRoomOnMember } from "@/types/entity/chat-room-belonging";

const ACTION_PER_PAGE = 30;

type Props = {
    chatRoom: PracticalChatRoomOnMember
    onClose: () => void
};

/* eslint-disable @typescript-eslint/no-explicit-any */
const ChatScrollList = ({ chatRoom }: Props) => {
  const { t } = useTranslation("chat");
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


//   const sendMessage = () => {
//     if (textMessage.trim()) {
//       const list = contactList;
//       const user: any = list.find((d) => d.userId === selectedUser.userId);
//       user.messages.push({
//         fromUserId: selectedUser.userId,
//         toUserId: 0,
//         text: textMessage,
//         time: "Just now",
//       });
//       setFilteredItems(list);
//       setTextMessage("");
//       scrollToBottom();
//     }
//   };
//   const sendMessageHandle = (event: any) => {
//     if (event.key === "Enter") {
//       sendMessage();
//     }
//   };

  if (!data) {
    return <div>No Room</div>;
  }

  return (
    <>
      <PerfectScrollbar className="chat-users relative h-full min-h-[100px] sm:h-[calc(100vh_-_357px)] space-y-0.5 ltr:pr-3.5 rtl:pl-3.5 ltr:-mr-3.5 rtl:-ml-3.5">
        {data.pages.map((page, i) => (
          <React.Fragment key={i}>
            {page.data.data.map((act) => (
              <div key={act.chatRoomActionId}>{act.actedAt}</div>
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

export default ChatScrollList;


// {isShowChat && selectChatRoom ? (
//     <div className="relative h-full">
//       <div className="flex justify-between items-center p-4">
//         <div className="flex items-center space-x-2 rtl:space-x-reverse">
//           <button
//             type="button"
//             className="xl:hidden hover:text-primary"
//             onClick={() => setIsShowChatMenu(!isShowChatMenu)}
//           >
//             <IconMenu />
//           </button>
//           <div className="relative flex-none">
//             <img
//               src={`/assets/images/${selectChatRoom.path}`}
//               className="rounded-full w-10 h-10 sm:h-12 sm:w-12 object-cover"
//               alt=""
//             />
//             <div className="absolute bottom-0 ltr:right-0 rtl:left-0">
//               <div className="w-4 h-4 bg-success rounded-full"></div>
//             </div>
//           </div>
//           <div className="mx-3">
//             <p className="font-semibold">{selectChatRoom.name}</p>
//             <p className="text-white-dark text-xs">
//               {selectChatRoom.active
//                 ? "Active now"
//                 : "Last seen at " + selectChatRoom.time}
//             </p>
//           </div>
//         </div>
//         <div className="flex sm:gap-5 gap-3">
//           <button type="button">
//             <IconPhoneCall className="hover:text-primary" />
//           </button>

//           <button type="button">
//             <IconVideo className="w-5 h-5 hover:text-primary" />
//           </button>
//           <div className="dropdown">
//             <Dropdown
//               placement="bottom-end"
//               btnClassName="bg-[#f4f4f4] dark:bg-[#1b2e4b] hover:bg-primary-light w-8 h-8 rounded-full !flex justify-center items-center"
//               button={
//                 <IconHorizontalDots className="hover:text-primary rotate-90 opacity-70" />
//               }
//             >
//               <ul className="text-black dark:text-white-dark">
//                 <li>
//                   <button type="button">
//                     <IconSearch className="ltr:mr-2 rtl:ml-2 shrink-0" />
//                     Search
//                   </button>
//                 </li>
//                 <li>
//                   <button type="button">
//                     <IconCopy className="w-4.5 h-4.5 ltr:mr-2 rtl:ml-2 shrink-0" />
//                     Copy
//                   </button>
//                 </li>
//                 <li>
//                   <button type="button">
//                     <IconTrashLines className="w-4.5 h-4.5 ltr:mr-2 rtl:ml-2 shrink-0" />
//                     Delete
//                   </button>
//                 </li>
//                 <li>
//                   <button type="button">
//                     <IconShare className="w-4.5 h-4.5 ltr:mr-2 rtl:ml-2 shrink-0" />
//                     Share
//                   </button>
//                 </li>
//                 <li>
//                   <button type="button">
//                     <IconSettings className="w-4.5 h-4.5 ltr:mr-2 rtl:ml-2 shrink-0" />
//                     Settings
//                   </button>
//                 </li>
//               </ul>
//             </Dropdown>
//           </div>
//         </div>
//       </div>
//       <div className="h-px w-full border-b border-white-light dark:border-[#1b2e4b]"></div>

//       <div className="h-full min-h-[100px] sm:h-[calc(100vh_-_300px)]">
//         <PerfectScrollbar className="relative h-full sm:h-[calc(100vh_-_300px)] chat-conversation-box">
//           <div className="space-y-5 p-4 sm:pb-0 pb-[68px] sm:min-h-[300px] min-h-[400px]">
//             <div className="block m-6 mt-0">
//               <h4 className="text-xs text-center border-b border-[#f4f4f4] dark:border-gray-800 relative">
//                 <span className="relative top-2 px-3 bg-white dark:bg-black">
//                   {"Today, " + selectChatRoom.time}
//                 </span>
//               </h4>
//             </div>
//             {selectChatRoom.messages && selectChatRoom.messages.length ? (
//               <>
//                 {selectChatRoom.messages.map(
//                   (message: any, index: any) => {
//                     return (
//                       <div key={index}>
//                         <div
//                           className={`flex items-start gap-3 ${
//                             selectChatRoom.userId === message.fromUserId
//                               ? "justify-end"
//                               : ""
//                           }`}
//                         >
//                           <div
//                             className={`flex-none ${
//                               selectChatRoom.userId === message.fromUserId
//                                 ? "order-2"
//                                 : ""
//                             }`}
//                           >
//                             {selectChatRoom.userId ===
//                             message.fromUserId ? (
//                               <img
//                                 src={`/assets/images/${loginUser.path}`}
//                                 className="rounded-full h-10 w-10 object-cover"
//                                 alt=""
//                               />
//                             ) : (
//                               ""
//                             )}
//                             {selectChatRoom.userId !==
//                             message.fromUserId ? (
//                               <img
//                                 src={`/assets/images/${selectChatRoom.path}`}
//                                 className="rounded-full h-10 w-10 object-cover"
//                                 alt=""
//                               />
//                             ) : (
//                               ""
//                             )}
//                           </div>
//                           <div className="space-y-2">
//                             <div className="flex items-center gap-3">
//                               <div
//                                 className={`dark:bg-gray-800 p-4 py-2 rounded-md bg-black/10 ${
//                                   message.fromUserId ===
//                                   selectChatRoom.userId
//                                     ? "ltr:rounded-br-none rtl:rounded-bl-none !bg-primary text-white"
//                                     : "ltr:rounded-bl-none rtl:rounded-br-none"
//                                 }`}
//                               >
//                                 {message.text}
//                               </div>
//                               <div
//                                 className={`${
//                                   selectChatRoom.userId ===
//                                   message.fromUserId
//                                     ? "hidden"
//                                     : ""
//                                 }`}
//                               >
//                                 <IconMoodSmile className="hover:text-primary" />
//                               </div>
//                             </div>
//                             <div
//                               className={`text-xs text-white-dark ${
//                                 selectChatRoom.userId ===
//                                 message.fromUserId
//                                   ? "ltr:text-right rtl:text-left"
//                                   : ""
//                               }`}
//                             >
//                               {message.time ? message.time : "5h ago"}
//                             </div>
//                           </div>
//                         </div>
//                       </div>
//                     );
//                   }
//                 )}
//               </>
//             ) : (
//               ""
//             )}
//           </div>
//         </PerfectScrollbar>
//       </div>
//       <div className="p-4 absolute bottom-0 left-0 w-full">
//         <div className="sm:flex w-full space-x-3 rtl:space-x-reverse items-center">
//           <div className="relative flex-1">
//             <input
//               className="form-input rounded-full border-0 bg-[#f4f4f4] px-12 focus:outline-none py-2"
//               placeholder="Type a message"
//               value={textMessage}
//               onChange={(e: any) => setTextMessage(e.target.value)}
//               onKeyUp={sendMessageHandle}
//             />
//             <button
//               type="button"
//               className="absolute ltr:left-4 rtl:right-4 top-1/2 -translate-y-1/2 hover:text-primary"
//             >
//               <IconMoodSmile />
//             </button>
//             <button
//               type="button"
//               className="absolute ltr:right-4 rtl:left-4 top-1/2 -translate-y-1/2 hover:text-primary"
//               onClick={() => sendMessage()}
//             >
//               <IconSend />
//             </button>
//           </div>
//           <div className="items-center space-x-3 rtl:space-x-reverse sm:py-0 py-3 hidden sm:block">
//             <button
//               type="button"
//               className="bg-[#f4f4f4] dark:bg-[#1b2e4b] hover:bg-primary-light rounded-md p-2 hover:text-primary"
//             >
//               <IconMicrophoneOff />
//             </button>
//             <button
//               type="button"
//               className="bg-[#f4f4f4] dark:bg-[#1b2e4b] hover:bg-primary-light rounded-md p-2 hover:text-primary"
//             >
//               <IconDownload />
//             </button>
//             <button
//               type="button"
//               className="bg-[#f4f4f4] dark:bg-[#1b2e4b] hover:bg-primary-light rounded-md p-2 hover:text-primary"
//             >
//               <IconCamera />
//             </button>
//             <button
//               type="button"
//               className="bg-[#f4f4f4] dark:bg-[#1b2e4b] hover:bg-primary-light rounded-md p-2 hover:text-primary"
//             >
//               <IconHorizontalDots className="opacity-70" />
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   ) : (
//     ""
//   )}
