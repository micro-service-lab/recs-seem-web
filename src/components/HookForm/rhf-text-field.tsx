import { HTMLProps, ReactNode } from 'react';
import { useFormContext, Controller } from 'react-hook-form';

// ----------------------------------------------------------------------

type Props = HTMLProps<HTMLInputElement> & {
  name: string;
  startProps?: ReactNode;
};

export default function RHFTextField({ startProps, name, type, ...other }: Props) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <>
          <div className="relative">
            {startProps && startProps}
            <input
              {...field}
              type={type}
              value={type === 'number' && field.value === 0 ? '' : field.value}
              onChange={(event) => {
                if (type === 'number') {
                  field.onChange(Number(event.target.value));
                } else {
                  field.onChange(event.target.value);
                }
              }}
              {...other}
            />
          </div>
          {!!error && <div className="text-danger mt-1 mx-2">{error.message}</div>}
        </>
      )}
    />
  );
}
