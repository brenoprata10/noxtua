export default function Content({ children }: { children: React.ReactNode }) {
  return (
    <div className="p-6 w-full h-full flex flex-col gap-2">{children}</div>
  );
}
