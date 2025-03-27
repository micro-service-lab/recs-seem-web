import { useGetUnreadCountOnAuthQuery } from "@/api/readReceipt/useGetUnreadCountOnAuthQuery";
import { unreadMessageCountState } from "@/store/unreadMessage";
import { useEffect } from "react";
import { useRecoilState } from "recoil";

const UnreadIcon = ({ className }: { className?: string }) => {
  const { data } = useGetUnreadCountOnAuthQuery();
  const [unreadCount, setUnreadCount] = useRecoilState(unreadMessageCountState);

  useEffect(() => {
    if (data) {
      setUnreadCount(data.data.count);
    }
  }, [data, setUnreadCount]);

  return (
    <>
      {unreadCount > 0 && (
        <span
          className={`badge absolute right-2 bg-danger p-0.5 px-1.5 rounded-full h-6 w-6 flex justify-center items-center ${className}`}
        >
          {unreadCount}
        </span>
      )}
    </>
  );
};

export default UnreadIcon;
