import { motion } from "motion/react";
import Button from "./Button";

export default function SidepanelButton({
  isSelected,
  layoutId,
  children,
  onSelect,
}: {
  isSelected: boolean;
  layoutId: string;
  children: React.ReactNode;
  onSelect: () => void;
}) {
  return (
    <motion.div
      className="w-full relative transition-colors hover:bg-ternary rounded-lg"
      initial={{ opacity: 0, translateY: -20 }}
      animate={{ opacity: 1, translateY: 0 }}
      whileTap={{ scale: 0.95 }}
    >
      {isSelected && (
        <motion.div
          className={
            "absolute h-full w-full rounded-lg top-0 left-0 bg-active-primary"
          }
          layoutId={layoutId}
        />
      )}
      <Button
        onClick={onSelect}
        className="relative text-black px-3 py-1 w-full overflow-hidden text-ellipsis whitespace-nowrap bg-transparent z-10"
      >
        {children}
      </Button>
    </motion.div>
  );
}
