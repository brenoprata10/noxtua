import clsx from "clsx";

export default function Button({
  className,
  ...props
}: React.ComponentProps<"button">) {
  return <button className={clsx("p-3 rounded-md", className)} {...props} />;
}
