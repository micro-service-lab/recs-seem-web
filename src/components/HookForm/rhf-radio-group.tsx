import { HTMLProps } from "react";
import { useFormContext, Controller } from "react-hook-form";

// ----------------------------------------------------------------------

type Props = HTMLProps<HTMLInputElement> & {
  name: string;
  parentClassName?: string;
  options: { label: string; value: any; key: string }[];
  label?: string;
  spacing?: number;
};

export default function RHFRadioGroup({
  name,
  label,
  parentClassName,
  options,
  spacing,
  ...other
}: Props) {
  const { control } = useFormContext();

  const labelledby = label ? `${name}-${label}` : "";

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <>
          {label && (
            <div
              className="text-sm font-semibold text-gray-700"
              id={labelledby}
            >
              {label}
            </div>
          )}
          <div className={`${parentClassName === "" ? "flex flex-wrap" : parentClassName}`} style={{ gap: spacing }}>
            {options.map((option) => (
              <label
                key={option.key}
                className="flex items-center cursor-pointer"
              >
                <input
                  {...field}
                  {...other}
                  type="radio"
                  value={option.value}
                  className="form-radio"
                  checked={field.value === option.value}
                  onChange={() => field.onChange(option.value)}
                />
                <span className="text-gray-700">{option.label}</span>
              </label>
            ))}
          </div>
          {!!error && (
            <div className="text-danger mt-1 mx-2">{error.message}</div>
          )}
        </>
      )}
    />
  );
}
