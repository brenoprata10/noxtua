export default function Content({ children }: { children: React.ReactNode }) {
  return (
    <div className="p-6 w-full grid grid-cols-1 grid-rows-[1fr] gap-2 max-h-screen">
      {children}
    </div>
  );
}
