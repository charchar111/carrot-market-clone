import { makeClassName } from "@/libs/client/utils";

interface TextareaProps {
  label?: string;
  name?: string;
  height?: string;
  [key: string]: any;
}

export default function Textarea({
  label,
  name,
  height,
  ...rest
}: TextareaProps) {
  return (
    <>
      {!label ? null : <label htmlFor={name ? name : ""}>{label}</label>}

      <textarea
        className={makeClassName(
          "mb-2",
          `h-${height ? [height] : 64}`,
          "w-full resize-none rounded-md border-gray-400",
        )}
        id={name ? name : ""}
        {...rest}
      />
    </>
  );
}
