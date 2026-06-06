"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";

interface Piece {
  id: number;
  left: number;
  color: string;
  delay: number;
  duration: number;
  size: number;
  rotate: number;
  drift: number;
  round: boolean;
}

const COLORS = ["#FF5252","#66BB6A","#4286F5","#FFD740","#FF9100","#E8A0AE","#BA68C8","#4DB6AC"];

export default function Confetti() {
  const [vh, setVh] = useState(800);
  const [pieces, setPieces] = useState<Piece[]>([]);

  useEffect(() => {
    setVh(window.innerHeight);
    setPieces(
      Array.from({ length: 55 }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        color: COLORS[i % COLORS.length],
        delay: Math.random() * 0.7,
        duration: 1.6 + Math.random() * 1.4,
        size: 5 + Math.random() * 7,
        rotate: Math.random() * 360,
        drift: (Math.random() - 0.5) * 110,
        round: Math.random() > 0.6,
      }))
    );
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden z-50" aria-hidden>
      {pieces.map((p) => (
        <motion.div
          key={p.id}
          className="absolute top-0"
          style={{ left: `${p.left}%` }}
          initial={{ y: -p.size, x: 0, rotate: p.rotate, opacity: 1 }}
          animate={{
            y: vh + p.size,
            x: p.drift,
            rotate: p.rotate + 400,
            opacity: [1, 1, 0.7, 0],
          }}
          transition={{ duration: p.duration, delay: p.delay, ease: "easeIn" }}
        >
          <div
            style={{
              width: p.round ? p.size : p.size * 1.7,
              height: p.round ? p.size : p.size * 0.45,
              backgroundColor: p.color,
              borderRadius: p.round ? "50%" : "1px",
            }}
          />
        </motion.div>
      ))}
    </div>
  );
}
