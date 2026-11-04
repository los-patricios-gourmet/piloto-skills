"use client";

import { motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";

export function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const [isMounted, setIsMounted] = useState(false);
  const reduced = useReducedMotion();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Si aún no se monta (SSR o primer render idéntico), devolvemos un div plano
  // sin estilos dinámicos que causen conflictos de hidratación.
  if (!isMounted) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={reduced ? false : { opacity: 0, y: 32 }}
      whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1], delay }}
    >
      {children}
    </motion.div>
  );
}