import { DotFilledIcon } from "@radix-ui/react-icons";
import { motion } from "motion/react";

const DOT_COUNT = 3;
const SIZE = 22;

export default function LoadingDots() {
  const dotVariants = {
    loadingDots: {
      opacity: [0.5, 1, 0.5],
      translateY: [5, -5, 5],
      transition: {
        repeat: Infinity,
        duration: 1.5,
      },
    },
  };

  const containerVariants = {
    loadingDots: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <motion.div
      className="flex items-center"
      variants={containerVariants}
      animate="loadingDots"
    >
      {Array.from({ length: DOT_COUNT }).map((_, index) => (
        <motion.div key={index} variants={dotVariants} className="ml-[-5px]">
          <DotFilledIcon width={SIZE} height={SIZE} />
        </motion.div>
      ))}
    </motion.div>
  );
}
