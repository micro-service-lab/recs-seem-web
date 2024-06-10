import { useCreateMessageQuery } from "@/api/message/useCreateMessageQuery";
import IconCamera from "@/components/Icon/IconCamera";
import IconDownload from "@/components/Icon/IconDownload";
import IconHorizontalDots from "@/components/Icon/IconHorizontalDots";
import IconMicrophoneOff from "@/components/Icon/IconMicrophoneOff";
import IconMoodSmile from "@/components/Icon/IconMoodSmile";
import IconSend from "@/components/Icon/IconSend";
import { PracticalChatRoomOnMember } from "@/types/entity/chat-room-belonging";
import { useState } from "react";

type Props = {
  onSendMessage: (message: string) => void;
  chatRoom: PracticalChatRoomOnMember;
};

const ChatMessageInput = ({ onSendMessage, chatRoom }: Props) => {
  const [textMessage, setTextMessage] = useState("");
  const { mutate } = useCreateMessageQuery(chatRoom.chatRoom.chatRoomId);
  const sendMessage = () => {
    if (textMessage.trim()) {
      mutate({
        content: textMessage,
        attachableItemIds: [],
      });
      onSendMessage(textMessage);
      setTextMessage("");
    }
  };
  const sendMessageHandle = (event: any) => {
    if (event.key === "Enter") {
      sendMessage();
    }
  };
  return (
    <div className="p-4 w-full bg-[#dfd7d7dc] dark:bg-[#344452]">
      <div className="flex w-full space-x-3 rtl:space-x-reverse items-center">
        <div className="relative flex-1">
          <input
            className="form-input rounded-full border-0 bg-[#f4f4f4] px-12 focus:outline-none py-2"
            placeholder="Type a message"
            value={textMessage}
            onChange={(e: any) => setTextMessage(e.target.value)}
            onKeyUp={sendMessageHandle}
          />
          <button
            type="button"
            className="absolute ltr:left-4 rtl:right-4 top-1/2 -translate-y-1/2 hover:text-primary"
          >
            <IconMoodSmile />
          </button>
          <button
            type="button"
            className="absolute ltr:right-4 rtl:left-4 top-1/2 -translate-y-1/2 hover:text-primary"
            onClick={() => sendMessage()}
          >
            <IconSend />
          </button>
        </div>
        <div className="items-center space-x-3 rtl:space-x-reverse sm:py-0 py-3 hidden sm:block">
          <button
            type="button"
            className="bg-[#f4f4f4] dark:bg-[#1b2e4b] hover:bg-primary-light rounded-md p-2 hover:text-primary"
          >
            <IconMicrophoneOff />
          </button>
          <button
            type="button"
            className="bg-[#f4f4f4] dark:bg-[#1b2e4b] hover:bg-primary-light rounded-md p-2 hover:text-primary"
          >
            <IconDownload />
          </button>
          <button
            type="button"
            className="bg-[#f4f4f4] dark:bg-[#1b2e4b] hover:bg-primary-light rounded-md p-2 hover:text-primary"
          >
            <IconCamera />
          </button>
          <button
            type="button"
            className="bg-[#f4f4f4] dark:bg-[#1b2e4b] hover:bg-primary-light rounded-md p-2 hover:text-primary"
          >
            <IconHorizontalDots className="opacity-70" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatMessageInput;
