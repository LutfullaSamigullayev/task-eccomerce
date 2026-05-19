"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { useAnimStore } from "@/features/cart/animStore";

export function FlyingCartImage() {
  const flyItem = useAnimStore((s) => s.flyItem);
  const endFly = useAnimStore((s) => s.endFly);
  const triggerShake = useAnimStore((s) => s.triggerShake);

  // Cart icon ning ekrandagi pozitsiyasi
  const [target, setTarget] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (!flyItem) return;
    // id="cart-icon" elementi headerda bo'ladi
    const cartEl = document.getElementById("cart-icon");
    if (cartEl) {
      const rect = cartEl.getBoundingClientRect();
      setTarget({
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2,
      });
    }
  }, [flyItem]);

  return (
    <AnimatePresence>
      {flyItem && (
        <motion.img
          key={`${flyItem.x}-${flyItem.y}`}
          src={flyItem.src}
          alt=""
          // fixed — sahifaning istalgan joyida ko'rinadi
          className="pointer-events-none fixed left-0 top-0 z-[9999] rounded-lg object-cover shadow-xl"
          initial={{
            x: flyItem.x,
            y: flyItem.y,
            width: flyItem.size,
            height: flyItem.size,
            opacity: 1,
            borderRadius: "8px",
          }}
          animate={{
            x: target.x - 12,
            y: target.y - 12,
            width: 24,
            height: 24,
            opacity: 0.85,
            borderRadius: "50%",
          }}
          transition={{ duration: 0.55, ease: [0.4, 0, 0.2, 1] }}
          onAnimationComplete={() => {
            endFly();       // uchuvchi rasmni o'chirish
            triggerShake(); // cart iconni chayqatish
          }}
        />
      )}
    </AnimatePresence>
  );
}
