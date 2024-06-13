import { HTMLProps, ReactNode } from "react";
import IconLoader from "../Icon/IconLoader";

type Props = HTMLProps<HTMLButtonElement> & {
  loading: boolean;
  loadingChildren?: ReactNode;
  children: ReactNode;
  type: "button" | "submit" | "reset" | undefined;
};

export const LoadingButton = ({
  loading,
  loadingChildren,
  children,
  type,
  ...other
}: Props) => {
  return (
    <button type={type} {...other}>
      {loading && (
        <IconLoader className="animate-[spin_2s_linear_infinite] inline-block align-middle ltr:mr-2 rtl:ml-2 shrink-0" />
      )}
      {loading ? loadingChildren || <></> : children}
    </button>
  );
};
