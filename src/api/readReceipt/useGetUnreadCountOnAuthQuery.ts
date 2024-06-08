import { useSuspenseQuery } from "@tanstack/react-query";
import axios from "@/utils/axios";
import { ApplicationResponse } from "@/types/response/application-response";
import { readReceiptQueryKey } from "@/query-keys/read-receipt-query-key";
import { READ_RECEIPT_ENDPOINTS } from "@/constants/endpoints/read-receipt";

type DefaultResponse = ApplicationResponse<{
  count: number;
}>;

export const useGetUnreadCountOnAuthQuery = () => {
  const { data, status, isPending } = useSuspenseQuery({
    queryKey: [readReceiptQueryKey.countUnreadOnAuth],
    queryFn: async () => {
      return axios
        .get<DefaultResponse>(READ_RECEIPT_ENDPOINTS.unreadCountOnAuth)
        .then((res) => res.data);
    },
    staleTime: 1000 * 60 * 2,
    gcTime: 1000 * 60 * 10,
  });

  return { data, status, isPending };
};
