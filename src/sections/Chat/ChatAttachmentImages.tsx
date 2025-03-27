import Image from "@/components/image";
import Lightbox, { useLightBox } from "@/components/lightbox";
import Download from "yet-another-react-lightbox/plugins/download";
import { HOST_API } from "@/config-global";
import { ATTACHABLE_ITEM_ENDPOINTS } from "@/constants/endpoints/attachable-item-endpoint";
import { AttachedItemOnMessage } from "@/types/entity/attached-message";

type Props = {
  attachmentImages: AttachedItemOnMessage[];
  attachmentImagesCount: number;
};

export const ChatAttachmentImages = ({
  attachmentImages,
  attachmentImagesCount,
}: Props) => {
  const slides = attachmentImages.map((attachment) => ({
    src: attachment.attachableItem.url,
    alt: attachment.attachableItem.alias,
    captions: attachment.attachableItem.alias,
    downloadUrl: `${HOST_API}${ATTACHABLE_ITEM_ENDPOINTS.attachableItem.download(
      attachment.attachableItem.attachableItemId,
    )}`,
  }));
  const lightbox = useLightBox(slides);
  return (
    <>
      <div
        className={`grid gap-4 max-w-72 sm:max-w-64 md:max-w-72 ${
          attachmentImagesCount === 1 ? "grid-cols-1" : "grid-cols-2"
        }`}
      >
        {attachmentImagesCount === 1 ? (
          <div className="flex items-start my-2 rounded-xl p-2 w-32 flex-shrink-0">
            <Image
              ratio="3/4"
              src={attachmentImages[0].attachableItem.url}
              alt={attachmentImages[0].attachableItem.alias}
              onClick={() =>
                lightbox.onOpen(attachmentImages[0].attachableItem.url)
              }
              sx={{
                borderRadius: 2,
                "&:hover": {
                  cursor: "pointer",
                },
              }}
            />
          </div>
        ) : (
          attachmentImages.slice(0, 4).map((attachment, i) => (
            <div
              className="flex items-start my-2  rounded-xl p-2 w-32 flex-shrink-0 relative"
              key={attachment.attachedMessageId}
            >
              {attachmentImagesCount > 4 && i === 3 ? (
                <>
                  <Image
                    ratio="1/1"
                    src={attachment.attachableItem.url}
                    alt={attachment.attachableItem.alias}
                    key={attachment.attachedMessageId}
                    onClick={() =>
                      lightbox.onOpen(attachment.attachableItem.url)
                    }
                    sx={{
                      borderRadius: 2,
                      "&:hover": {
                        cursor: "pointer",
                      },
                    }}
                    overlay="rgba(0, 0, 0, 0.72)"
                  />
                  <div
                    className="absolute top-16 left-6 bg-gray-900 bg-opacity-50 text-white text-xl font-medium rounded-full p-2"
                    style={{ transform: "translate(50%, -50%)" }}
                  >
                    +{attachmentImagesCount - 4}
                  </div>
                </>
              ) : (
                <Image
                  ratio="1/1"
                  src={attachment.attachableItem.url}
                  alt={attachment.attachableItem.alias}
                  key={attachment.attachedMessageId}
                  onClick={() => lightbox.onOpen(attachment.attachableItem.url)}
                  sx={{
                    borderRadius: 2,
                    "&:hover": {
                      cursor: "pointer",
                    },
                  }}
                />
              )}
            </div>
          ))
        )}
      </div>
      <Lightbox
        open={lightbox.open}
        slides={slides}
        close={lightbox.onClose}
        index={lightbox.selected}
        plugins={[Download]}
      />
    </>
  );
};
