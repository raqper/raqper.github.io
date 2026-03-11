import { motion, AnimatePresence } from "motion/react";

interface LightboxProps {
  open: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}

export function Lightbox({ open, onClose, title, subtitle, children }: LightboxProps) {
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
              onClick={(e) => e.stopPropagation()}
              style={{
                background: "#fff",
                padding: 16,
                width: "min(640px, 90vw)",
                maxHeight: "85vh",
                overflow: "auto",
                boxShadow: "0 24px 80px rgba(0,0,0,0.3)",
              }}
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <p
                    style={{
                      fontFamily: "var(--font-expanded)",
                      fontSize: "18px",
                      fontWeight: 300,
                      letterSpacing: "-0.03em",
                      color: "#0a0a0a",
                    }}
                  >
                    {title}
                  </p>
                  {subtitle && (
                    <p
                      style={{
                        fontFamily: "var(--font-sans)",
                        fontSize: "12px",
                        color: "rgba(10,10,10,0.45)",
                        marginTop: 2,
                      }}
                    >
                      {subtitle}
                    </p>
                  )}
                </div>
                <button
                  onClick={onClose}
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: "12px",
                    fontWeight: 500,
                    letterSpacing: "0.06em",
                    color: "#c8392b",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    padding: 0,
                  }}
                >
                  Close ×
                </button>
              </div>
              {children}
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
