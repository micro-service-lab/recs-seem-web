import { HOST_API } from "@/config-global";
import { ATTACHABLE_ITEM_ENDPOINTS } from "@/constants/endpoints/attachable-item-endpoint";
import { getFileType } from "@/utils/extension";
import { fData } from "@/utils/format-number";
import Tippy from "@tippyjs/react";
import { FileIcon } from "react-file-icon";

type Props = {
  id: string;
  fileName: string;
  fileSize: number;
};

export const ChatAttachmentFile = ({ id, fileName, fileSize }: Props) => {
  const extension = fileName.split(".").pop();
  const fileType = getFileType(extension || "txt");

  return (
    <div className="flex items-start my-2 bg-gray-50 dark:bg-gray-600 rounded-xl p-2 w-48 flex-shrink-0">
      <div className="me-2">
        <span className="flex items-center gap-2 text-sm font-medium text-gray-900 dark:text-white pb-2">
          <div className="w-10 h-10">
            <FileIcon
              extension={extension || "txt"}
              color={fileType.color}
              type={fileType.type}
              glyphColor={"#4F4F4F"}
            />
          </div>
          <Tippy content={fileName}>
            <span className="line-clamp-2 break-words max-w-[5rem]">
              {fileName}
            </span>
          </Tippy>
        </span>
        <span className="flex text-xs font-normal text-gray-500 dark:text-gray-400 gap-2 ml-2">
          {fData(fileSize)}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            className="self-center"
            width="3"
            height="4"
            viewBox="0 0 3 4"
            fill="none"
          >
            <circle cx="1.5" cy="2" r="1.5" fill="#6B7280" />
          </svg>
          {(extension || "txt").toUpperCase()}
        </span>
      </div>
      <div className="inline-flex self-center items-center">
        <a href={`${HOST_API}${ATTACHABLE_ITEM_ENDPOINTS.attachableItem.download(id)}`}>
          <button
            className="inline-flex self-center items-center text-sm font-medium text-center text-gray-900 bg-gray-50 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none dark:text-white focus:ring-gray-50 dark:bg-gray-600 dark:hover:bg-gray-500 dark:focus:ring-gray-600"
            type="button"
          >
            <svg
              className="w-4 h-4 text-gray-900 dark:text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M14.707 7.793a1 1 0 0 0-1.414 0L11 10.086V1.5a1 1 0 0 0-2 0v8.586L6.707 7.793a1 1 0 1 0-1.414 1.414l4 4a1 1 0 0 0 1.416 0l4-4a1 1 0 0 0-.002-1.414Z" />
              <path d="M18 12h-2.55l-2.975 2.975a3.5 3.5 0 0 1-4.95 0L4.55 12H2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-4a2 2 0 0 0-2-2Zm-3 5a1 1 0 1 1 0-2 1 1 0 0 1 0 2Z" />
            </svg>
          </button>
        </a>
      </div>
    </div>
  );
};
