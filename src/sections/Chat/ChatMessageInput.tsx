import { useCreateMessageQuery } from "@/api/message/useCreateMessageQuery";
import IconMoodSmile from "@/components/Icon/IconMoodSmile";
import IconSend from "@/components/Icon/IconSend";
import IconAttachment from "@/components/Icon/IconAttachment";
import IconImage from "@/components/Icon/IconImage";
import { PracticalChatRoomOnMember } from "@/types/entity/chat-room-belonging";
import PerfectScrollbar from "react-perfect-scrollbar";
import { useCallback, useEffect, useRef, useState } from "react";
import { AttachmentFile } from "./AttachmentFile";
import { AttachmentImage } from "./AttachmentImage";
import { useUploadImageQuery } from "@/api/image/useUploadImageQuery";
import { useUploadFileQuery } from "@/api/file/useUploadFileQuery";
import { LoadingButton } from "@/components/Button/LoadingButton";

type Props = {
  onSendMessage: (message: string) => void;
  chatRoom: PracticalChatRoomOnMember;
};

/* eslint-disable @typescript-eslint/no-explicit-any */
const ChatMessageInput = ({ onSendMessage, chatRoom }: Props) => {
  const [textMessage, setTextMessage] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const [images, setImages] = useState<
    {
      file: File;
      url: string;
    }[]
  >([]);
  const fileRef = useRef<HTMLInputElement>(null);
  const imageRef = useRef<HTMLInputElement>(null);
  const {
    data: imageData,
    isPending: imageIsPending,
    mutate: imageMutate,
  } = useUploadImageQuery();
  const {
    data: fileData,
    isPending: fileIsPending,
    mutate: fileMutate,
  } = useUploadFileQuery();
  const { mutate, isPending } = useCreateMessageQuery(
    chatRoom.chatRoom.chatRoomId
  );
  const [sendState, setSendState] = useState<{
    isSending: boolean;
    sendingAttachment: ("file" | "image")[];
    attachmentIds: string[];
  }>({
    isSending: false,
    sendingAttachment: [],
    attachmentIds: [],
  });
  const sendMessage = () => {
    if (textMessage.trim()) {
      setSendState({
        isSending: true,
        sendingAttachment: [],
        attachmentIds: [],
      });
      let isAttachment = false;
      if (files.length > 0) {
        const formData = new FormData();
        files.forEach((file) => {
          formData.append("files[]", file);
        });
        isAttachment = true;
        setSendState((prev) => ({
          ...prev,
          sendingAttachment: [...prev.sendingAttachment, "file"],
        }));
        fileMutate(formData);
        setFiles([]);
      }
      if (images.length > 0) {
        const formData = new FormData();
        images.forEach((image) => {
          formData.append("files[]", image.file);
        });
        isAttachment = true;
        setSendState((prev) => ({
          ...prev,
          sendingAttachment: [...prev.sendingAttachment, "image"],
        }));
        imageMutate(formData);
        setImages([]);
      }
      if (!isAttachment) {
        mutate({
          content: textMessage,
          attachableItemIds: [],
        });
        onSendMessage(textMessage);
        setTextMessage("");
      }
    }
  };

  useEffect(() => {
    if (fileData && sendState.sendingAttachment.includes("file")) {
      const attachableItemIds = fileData.data.map(
        (file) => file.attachableItem.attachableItemId
      );
      setSendState((prev) => {
        const sendingAttachment = prev.sendingAttachment.filter(
          (attachment) => attachment !== "file"
        );
        const currentAttachmentIds = prev.attachmentIds;
        attachableItemIds.forEach((attachableItemId) => {
          if (attachableItemId) {
            currentAttachmentIds.push(attachableItemId);
          }
        });
        return {
          ...prev,
          sendingAttachment,
          attachmentIds: currentAttachmentIds,
        };
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fileData]);

  useEffect(() => {
    if (imageData && sendState.sendingAttachment.includes("image")) {
      const attachableItemIds = imageData.data.map(
        (image) => image.attachableItem.attachableItemId
      );
      setSendState((prev) => {
        const sendingAttachment = prev.sendingAttachment.filter(
          (attachment) => attachment !== "image"
        );
        const currentAttachmentIds = prev.attachmentIds;
        attachableItemIds.forEach((attachableItemId) => {
          if (attachableItemId) {
            currentAttachmentIds.push(attachableItemId);
          }
        });
        return {
          ...prev,
          sendingAttachment,
          attachmentIds: currentAttachmentIds,
        };
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imageData]);

  useEffect(() => {
    if (
      sendState.sendingAttachment.length === 0 &&
      sendState.isSending &&
      sendState.attachmentIds.length > 0
    ) {
      mutate({
        content: textMessage,
        attachableItemIds: sendState.attachmentIds,
      });
      onSendMessage(textMessage);
      setTextMessage("");
      setSendState({
        isSending: false,
        sendingAttachment: [],
        attachmentIds: [],
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sendState.sendingAttachment]);

  const sendMessageHandle = (event: any) => {
    if (event.key === "Enter") {
      sendMessage();
    }
  };

  const handleImageAttach = useCallback(() => {
    if (imageRef.current) {
      imageRef.current.click();
    }
  }, []);

  const handleFileAttach = useCallback(() => {
    if (fileRef.current) {
      fileRef.current.click();
    }
  }, []);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFiles((prevFiles) => {
        const origin = [...prevFiles];
        if (event.target.files) {
          for (let i = 0; i < event.target.files.length; i++) {
            origin.push(event.target.files[i]);
          }
        }
        return origin;
      });
    }
  };
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setImages((prevImages) => {
        const origin = [...prevImages];
        if (event.target.files) {
          for (let i = 0; i < event.target.files.length; i++) {
            const imageUrl = URL.createObjectURL(event.target.files[i]);
            origin.push({
              file: event.target.files[i],
              url: imageUrl,
            });
          }
        }
        return origin;
      });
    }
  };
  return (
    <>
      <div className="relative">
        {images.length > 0 && (
          <div
            className={`absolute left-0 w-full bg-[#344452]/50 dark:bg-[#dfd7d7dc]/40 px-4 ${
              files.length > 0 ? "-top-72 h-48" : "-top-48 h-48"
            }`}
          >
            <PerfectScrollbar className="flex space-x-8 overflow-x-auto">
              {images.map((image, index) => (
                <AttachmentImage
                  key={index}
                  handleClose={() => {
                    setImages((prevFiles) => {
                      const origin = [...prevFiles];
                      origin.splice(index, 1);
                      return origin;
                    });
                  }}
                  filename={image.file.name}
                  url={image.url}
                  ratio="4/6"
                />
              ))}
            </PerfectScrollbar>
          </div>
        )}
        {files.length > 0 && (
          <div className="absolute -top-24 left-0 w-full h-24 dark:bg-white/40 bg-[#1b2e4b]/50 px-4">
            <PerfectScrollbar className="flex space-x-8 overflow-x-auto">
              {files.map((file, index) => (
                <AttachmentFile
                  key={index}
                  handleClose={() => {
                    setFiles((prevFiles) => {
                      const origin = [...prevFiles];
                      origin.splice(index, 1);
                      return origin;
                    });
                  }}
                  fileName={file.name}
                  fileSize={file.size}
                />
              ))}
            </PerfectScrollbar>
          </div>
        )}
        <div className="p-4 w-full bg-[#dfd7d7dc] dark:bg-[#344452]">
          <div className="flex w-full space-x-3 rtl:space-x-reverse items-center">
            <div className="items-center space-x-3 rtl:space-x-reverse sm:py-0 py-3 block">
              <button
                type="button"
                className="bg-[#f4f4f4] dark:bg-[#1b2e4b] hover:bg-primary-light rounded-md p-2 hover:text-primary"
                onClick={handleImageAttach}
              >
                <IconImage className="w-5 h-5" />
              </button>
              <button
                type="button"
                className="bg-[#f4f4f4] dark:bg-[#1b2e4b] hover:bg-primary-light rounded-md p-2 hover:text-primary"
                onClick={handleFileAttach}
              >
                <IconAttachment className="w-5 h-5" />
              </button>
            </div>
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
              <LoadingButton
                loading={imageIsPending || fileIsPending || isPending}
                type="button"
                className="absolute ltr:right-4 rtl:left-4 top-1/2 -translate-y-1/2 hover:text-primary"
                onClick={() => sendMessage()}
              >
                <IconSend className="w-5 h-5" />
              </LoadingButton>
            </div>
          </div>
        </div>
      </div>
      <input
        type="file"
        ref={fileRef}
        style={{ display: "none" }}
        multiple
        onChange={handleFileChange}
      />
      <input
        type="file"
        ref={imageRef}
        style={{ display: "none" }}
        accept="image/*"
        multiple
        onChange={handleImageChange}
      />
    </>
  );
};

export default ChatMessageInput;
