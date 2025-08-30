import { motion } from "framer-motion";

export function SlideWrapper({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      className="w-full space-y-6 py-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {children}
    </motion.div>
  );
}
