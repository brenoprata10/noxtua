import clsx from "clsx";

export default function TextArea({
  onChange,
  className,
  ...props
}: React.ComponentProps<"textarea">) {
  return (
    <textarea
      {...props}
      onChange={onChange}
      className={clsx(
        "bg-chat resize-none select-none outline-none",
        className
      )}
    />
  );
}
