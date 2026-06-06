"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";

const FLOWERS = [
  { color: "#FF8FAB", center: "#C2185B", cx: 100, cy: 70,  r: 34, rot: 0,   delay: 0.05 },
  { color: "#CE93D8", center: "#7B1FA2", cx: 52,  cy: 92,  r: 28, rot: 22,  delay: 0.18 },
  { color: "#FFD54F", center: "#E65100", cx: 148, cy: 92,  r: 28, rot: -15, delay: 0.22 },
  { color: "#FF8A65", center: "#BF360C", cx: 72,  cy: 133, r: 24, rot: 10,  delay: 0.30 },
  { color: "#F06292", center: "#880E4F", cx: 128, cy: 133, r: 24, rot: -10, delay: 0.35 },
  { color: "#80CBC4", center: "#00695C", cx: 100, cy: 158, r: 20, rot: 30,  delay: 0.40 },
];

function Petal({ r, rot }: { r: number; rot: number }) {
  const n = 14;
  const py = -(r * 0.38 + r * 0.55 * 0.5);
  return (
    <g transform={`rotate(${rot})`}>
      {Array.from({ length: n }, (_, i) => (
        <ellipse key={i} cx={0} cy={py} rx={r*0.13} ry={r*0.55*0.5}
          transform={`rotate(${(i/n)*360})`} />
      ))}
    </g>
  );
}

export default function FlowerBoxView({ onAdvance }: { onAdvance: () => void }) {
  const [opened, setOpened] = useState(false);

  return (
    <div className="flex flex-col items-center gap-5">
      <AnimatePresence mode="wait">
        {!opened ? (
          <motion.button key="box" exit={{ opacity:0, scale:0.9 }}
            onClick={() => setOpened(true)}
            className="flex flex-col items-center gap-3">
            <motion.div
              animate={{ y:[0,-5,0] }}
              transition={{ duration:2.5, repeat:Infinity, ease:"easeInOut" }}
              className="flex h-24 w-24 items-center justify-center rounded-2xl bg-white shadow-[0_10px_30px_rgba(200,140,130,0.25)]">
              <span className="text-5xl" role="img" aria-label="gift">🎁</span>
            </motion.div>
            <span className="text-[13px] font-medium tracking-wide text-[#C06B7C]">Tap to open</span>
          </motion.button>
        ) : (
          <motion.div key="flowers"
            initial={{ opacity:0, scale:0.88, y:12 }}
            animate={{ opacity:1, scale:1, y:0 }}
            transition={{ duration:0.5, ease:"easeOut" }}
            className="flex flex-col items-center gap-4">

            <svg width="200" height="180" viewBox="0 0 200 180" overflow="visible">
              {/* stems */}
              {FLOWERS.map((f,i) => (
                <line key={`s${i}`} x1={f.cx} y1={f.cy} x2={100} y2={185}
                  stroke="#6A994E" strokeWidth="2.2" strokeLinecap="round" opacity="0.5"/>
              ))}
              {/* flowers */}
              {FLOWERS.map((f,i) => (
                <g key={`g${i}`} transform={`translate(${f.cx},${f.cy})`}>
                  <motion.g
                    initial={{ scale:0, opacity:0 }}
                    animate={{ scale:1, opacity:1 }}
                    transition={{ duration:0.45, delay:f.delay, type:"spring", stiffness:220, damping:14 }}
                  >
                    {/* petals */}
                    <g fill={f.color}><Petal r={f.r} rot={f.rot}/></g>
                    {/* dark center */}
                    <circle r={f.r*0.32} fill={f.center}/>
                    {/* bright inner */}
                    <circle r={f.r*0.17} fill="#FFD600"/>
                  </motion.g>
                </g>
              ))}
            </svg>

            <motion.p
              initial={{ opacity:0, y:6 }} animate={{ opacity:1, y:0 }}
              transition={{ delay:0.6 }}
              className="text-[14px] italic text-center text-[#7A5F58] leading-relaxed px-4">
              Jarbelia flowers — one for every color of you.
            </motion.p>

            <motion.button
              initial={{ opacity:0 }} animate={{ opacity:1 }}
              transition={{ delay:0.9 }}
              onClick={onAdvance}
              className="flex items-center gap-2 rounded-2xl bg-[#D98B9B] px-6 py-3 font-medium text-white shadow-[0_6px_20px_rgba(217,139,155,0.35)] transition active:scale-[0.98]">
              Keep reading <ArrowRight className="h-4 w-4" strokeWidth={2.2}/>
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
