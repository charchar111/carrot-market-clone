import { makeClassName } from "@/libs/client/utils";

interface TextareaProps {
  label?: string;
  name?: string;
  height?: string;
  [key: string]: any;
}

export default function Textarea({
  label,
  height,
  register,
  ...rest
}: TextareaProps) {
  return (
    <>
      {!label ? (
        <textarea
          className={makeClassName(
            "mb-2",
            `h-${height ? [height] : 64}`,
            "w-full resize-none rounded-md border-gray-400",
          )}
          {...register}
          {...rest}
        />
      ) : (
        <label>
          {label}
          <textarea
            className={makeClassName(
              "mb-2",
              `h-${height ? [height] : 64}`,
              "w-full resize-none rounded-md border-gray-400",
            )}
            {...register}
            {...rest}
          />
        </label>
      )}
    </>
  );
}
