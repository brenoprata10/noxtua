import clsx from "clsx";

export default function Button({
  className,
  ...props
}: React.ComponentProps<"button">) {
  return (
    <button
      className={clsx(
        "p-3 border border-amber-400 bg-amber-50  rounded-md",
        className
      )}
      {...props}
    />
  );
}
