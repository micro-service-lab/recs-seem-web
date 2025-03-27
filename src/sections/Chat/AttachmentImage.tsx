import Image, { ImageRatio } from "@/components/image";

type Props = {
  url: string;
  filename: string;
  ratio?: ImageRatio | undefined;
  handleClose: () => void;
};

export const AttachmentImage = ({
  url,
  filename,
  ratio,
  handleClose,
}: Props) => {
  return (
    <div className="flex items-start my-2  rounded-xl p-2 w-32 flex-shrink-0 relative">
      <Image alt={filename} src={url} sx={{ borderRadius: 2 }} ratio={ratio} />
      <div className="absolute -top-0.5 -right-0.5">
        <button
          className="flex items-center justify-center w-6 h-6 bg-gray-200 dark:bg-gray-800 rounded-full focus:outline-none z-[999]"
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
    </div>
  );
};
