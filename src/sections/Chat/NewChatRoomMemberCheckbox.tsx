import { Controller, useFormContext } from "react-hook-form";
import { NewChatRoomMemberTable } from "./NewChatRoomMemberTable";

type Props = {
  name: string;
};

export const NewChatRoomMemberCheckbox = ({ name }: Props) => {
  const { control } = useFormContext();
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <>
          <NewChatRoomMemberTable field={field} />
          {!!error && (
            <div className="text-danger mt-1 mx-2 text-sm">{error.message}</div>
          )}
        </>
      )}
    />
  );
};
