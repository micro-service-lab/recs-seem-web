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
                loadingChildren={
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
                }
              >
                <IconSend />
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
