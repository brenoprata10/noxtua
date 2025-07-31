import clsx from "clsx";

export default function Button({
  className,
  ...props
}: React.ComponentProps<"button">) {
  return (
    <button
      className={clsx([
        "p-2.5 bg-primary text-active-primary rounded-lg cursor-pointer",
        props.disabled && "opacity-70 !cursor-not-allowed",
        className,
      ])}
      {...props}
    />
  );
}
