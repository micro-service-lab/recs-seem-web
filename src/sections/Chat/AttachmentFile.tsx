import { getFileType } from "@/utils/extension";
import { fData } from "@/utils/format-number";
import Tippy from "@tippyjs/react";
import { FileIcon } from "react-file-icon";

type Props = {
  fileName: string;
  fileSize: number;
  handleClose: () => void;
};

export const AttachmentFile = ({ fileName, fileSize, handleClose }: Props) => {
  const extension = fileName.split(".").pop();
  const fileType = getFileType(extension || "txt");
  return (
    <div className="flex items-start my-2 bg-gray-50 dark:bg-gray-600 rounded-xl p-2 w-40 flex-shrink-0 relative">
      <div className="absolute -top-0.5 -right-0.5">
        <button
          className="flex items-center justify-center w-6 h-6 bg-gray-200 dark:bg-gray-800 rounded-full focus:outline-none"
          type="button"
          onClick={handleClose}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M18 6L6 18"></path>
            <path d="M6 6L18 18"></path>
          </svg>
        </button>
      </div>
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
    </div>
  );
};
