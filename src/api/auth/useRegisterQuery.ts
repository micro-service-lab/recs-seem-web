import { useMutation } from "@tanstack/react-query";
import axios from "@/utils/axios";
import { AUTH_ENDPOINTS } from "@/constants/endpoints";
import { ApplicationResponse } from "@/types/response/application-response";
import { MemberWithDetail } from "@/types/entity/member";

type MutateProps = {
    loginId: string;
    password: string;
    passwordConfirmation: string;
    email: string;
    name: string;
    firstName?: string|null;
    lastName?: string|null;
    gradeId: string;
    groupId: string;
};

type Response = ApplicationResponse<MemberWithDetail>;

export const useRegisterQuery = () => {
  const { data, error, mutate, isPending } = useMutation({
    mutationFn: (mutateProps: MutateProps) => {
      return axios.post<Response>(AUTH_ENDPOINTS.auth.register, mutateProps);
    },
  });

  return { data, error, isPending, mutate };
};
