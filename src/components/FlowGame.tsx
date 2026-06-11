"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Confetti from "./Confetti";

type ColorName = "red" | "green" | "blue" | "yellow" | "orange";
type CellPos = [number, number];
type Paths = Record<ColorName, CellPos[]>;
type DotDef = { color: ColorName; a: CellPos; b: CellPos };

const GRID = 5;

const HEX: Record<ColorName, string> = {
  red:    "#FF5252",
  green:  "#56C464",
  blue:   "#4286F5",
  yellow: "#FFD740",
  orange: "#FF9100",
};

// Each level is a set of 5 dot-pair endpoints; the solution must fill all 25 cells.
//
// Level 1 solution:
//   R  R  R  R  R
//   G  B  B  B  R
//   G  Y  Y  B  B
//   G  Y  Y  O  O (O: [3,3]→[3,4]→[4,4]→[4,3])
//   G  Y  Y  O  O
//
// Level 2 solution:
//   R  R  R  B  B
//   G  G  R  B  Y
//   O  G  R  B  Y
//   O  G  G  G  Y
//   O  O  O  O  Y
//
// Level 3 solution:
//   R  R  R  R  G
//   Y  B  B  R  G
//   Y  B  O  O  G
//   Y  B  B  O  G
//   Y  Y  Y  O  G
//
// Level 4 solution:
//   R  R  B  B  B
//   G  R  R  Y  B
//   G  G  R  Y  Y
//   O  G  R  R  Y
//   O  O  O  R  Y
//
// Level 5 solution:
//   G  G  G  G  G
//   R  R  B  O  G
//   Y  R  B  O  O
//   Y  R  B  B  O
//   Y  Y  Y  B  O
//
// Level 6 solution:
//   R  B  B  B  G
//   R  R  Y  B  G
//   O  R  Y  Y  G
//   O  R  O  Y  G
//   O  O  O  Y  G

const LEVELS: DotDef[][] = [
  [
    { color: "red",    a: [0,0], b: [1,4] },
    { color: "green",  a: [1,0], b: [4,0] },
    { color: "blue",   a: [1,1], b: [2,4] },
    { color: "yellow", a: [2,1], b: [4,2] },
    { color: "orange", a: [3,3], b: [4,3] },
  ],
  [
    { color: "red",    a: [0,0], b: [2,2] },
    { color: "blue",   a: [0,4], b: [2,3] },
    { color: "green",  a: [1,0], b: [3,3] },
    { color: "yellow", a: [1,4], b: [4,4] },
    { color: "orange", a: [2,0], b: [4,3] },
  ],
  [
    { color: "red",    a: [0,0], b: [1,3] },
    { color: "green",  a: [0,4], b: [4,4] },
    { color: "blue",   a: [1,2], b: [3,2] },
    { color: "orange", a: [2,2], b: [4,3] },
    { color: "yellow", a: [1,0], b: [4,2] },
  ],
  [
    { color: "red",    a: [0,0], b: [4,3] },
    { color: "blue",   a: [0,2], b: [1,4] },
    { color: "green",  a: [1,0], b: [3,1] },
    { color: "yellow", a: [1,3], b: [4,4] },
    { color: "orange", a: [3,0], b: [4,2] },
  ],
  [
    { color: "green",  a: [0,0], b: [1,4] },
    { color: "red",    a: [1,0], b: [3,1] },
    { color: "blue",   a: [1,2], b: [4,3] },
    { color: "orange", a: [1,3], b: [4,4] },
    { color: "yellow", a: [2,0], b: [4,2] },
  ],
  [
    { color: "red",    a: [0,0], b: [3,1] },
    { color: "blue",   a: [0,1], b: [1,3] },
    { color: "green",  a: [0,4], b: [4,4] },
    { color: "yellow", a: [1,2], b: [4,3] },
    { color: "orange", a: [2,0], b: [3,2] },
  ],
];

const key = (r: number, c: number) => `${r},${c}`;

function dotAt(r: number, c: number, dots: DotDef[]): ColorName | null {
  for (const d of dots)
    if ((d.a[0]===r&&d.a[1]===c)||(d.b[0]===r&&d.b[1]===c)) return d.color;
  return null;
}

function adj(a: CellPos, b: CellPos) {
  return Math.abs(a[0]-b[0])+Math.abs(a[1]-b[1])===1;
}

function complete(path: CellPos[], color: ColorName, dots: DotDef[]): boolean {
  if (path.length < 2) return false;
  const s=path[0], e=path[path.length-1];
  const d=dots.find(x=>x.color===color)!;
  const sOk=(s[0]===d.a[0]&&s[1]===d.a[1])||(s[0]===d.b[0]&&s[1]===d.b[1]);
  const eOk=(e[0]===d.a[0]&&e[1]===d.a[1])||(e[0]===d.b[0]&&e[1]===d.b[1]);
  return sOk&&eOk&&!(s[0]===e[0]&&s[1]===e[1]);
}

function won(paths: Paths, dots: DotDef[]): boolean {
  for (const d of dots) if (!complete(paths[d.color], d.color, dots)) return false;
  const covered = new Set<string>();
  for (const p of Object.values(paths)) for (const [r,c] of p) covered.add(key(r,c));
  return covered.size === GRID*GRID;
}

function init(): Paths {
  return { red:[], green:[], blue:[], yellow:[], orange:[] };
}

function cellMap(paths: Paths): Map<string,ColorName> {
  const m = new Map<string,ColorName>();
  for (const [col, path] of Object.entries(paths) as [ColorName,CellPos[]][])
    for (const [r,c] of path) m.set(key(r,c), col);
  return m;
}

export default function FlowGameView({ onAdvance }: { onAdvance: () => void }) {
  const [levelIdx, setLevelIdx] = useState(0);
  const [paths, setPaths] = useState<Paths>(init);
  const [isWon, setIsWon] = useState(false);
  const [showBtn, setShowBtn] = useState(false);
  const gridRef = useRef<HTMLDivElement>(null);
  const drawColor = useRef<ColorName | null>(null);
  const pathsRef = useRef<Paths>(init());
  pathsRef.current = paths;

  const dots = LEVELS[levelIdx];
  const isLastLevel = levelIdx === LEVELS.length - 1;

  const getCell = (x: number, y: number): CellPos | null => {
    const el = gridRef.current;
    if (!el) return null;
    const r = el.getBoundingClientRect();
    if (x<r.left||x>r.right||y<r.top||y>r.bottom) return null;
    const col = Math.floor((x-r.left)/r.width*GRID);
    const row = Math.floor((y-r.top)/r.height*GRID);
    if (row>=0&&row<GRID&&col>=0&&col<GRID) return [row,col];
    return null;
  };

  const onDown = (e: React.PointerEvent) => {
    e.preventDefault();
    const cell = getCell(e.clientX, e.clientY);
    if (!cell) return;
    const [r,c] = cell;
    const color = dotAt(r,c, dots);
    if (color) {
      setPaths(prev => ({ ...prev, [color]: [[r,c]] }));
      drawColor.current = color;
      return;
    }
    const map = cellMap(pathsRef.current);
    const existing = map.get(key(r,c)) as ColorName|undefined;
    if (existing) {
      const path = pathsRef.current[existing];
      const idx = path.findIndex(([pr,pc])=>pr===r&&pc===c);
      const d = dots.find(x=>x.color===existing)!;
      const isEndpt=(r===d.a[0]&&c===d.a[1])||(r===d.b[0]&&c===d.b[1]);
      if (!isEndpt && idx>0 && idx<path.length-1) {
        setPaths(prev => ({ ...prev, [existing]: path.slice(0,idx+1) }));
        drawColor.current = existing;
      }
    }
  };

  const onMove = (e: React.PointerEvent) => {
    const color = drawColor.current;
    if (!color) return;
    e.preventDefault();
    const cell = getCell(e.clientX, e.clientY);
    if (!cell) return;
    const [r,c] = cell;
    const path = pathsRef.current[color];
    if (!path.length) return;
    const last = path[path.length-1];
    if (last[0]===r&&last[1]===c) return;
    if (!adj(last,[r,c])) return;
    const map = cellMap(pathsRef.current);
    const occ = map.get(key(r,c));
    if (occ && occ!==color) return;
    const back = path.findIndex(([pr,pc])=>pr===r&&pc===c);
    if (back>=0) {
      setPaths(prev => ({ ...prev, [color]: path.slice(0,back+1) }));
      return;
    }
    setPaths(prev => ({ ...prev, [color]: [...path,[r,c]] }));
  };

  const onUp = () => { drawColor.current = null; };

  useEffect(() => {
    if (!isWon && won(paths, dots)) {
      setIsWon(true);
      setTimeout(() => setShowBtn(true), 2400);
    }
  }, [paths, isWon, dots]);

  const handleNext = () => {
    if (isLastLevel) {
      onAdvance();
    } else {
      setLevelIdx(i => i + 1);
      setPaths(init());
      setIsWon(false);
      setShowBtn(false);
    }
  };

  return (
    <div className="flex flex-col items-center gap-4 w-full">
      {isWon && <Confetti />}

      <p className="text-[13px] text-[#B08090] font-medium tracking-wide">
        Level {levelIdx + 1} of {LEVELS.length}
      </p>

      <div
        ref={gridRef}
        className="relative mx-auto aspect-square rounded-xl border-2 border-[#EBD8D2] shadow-md overflow-hidden"
        style={{ width:"min(272px,88vw)", background:"#FEF9F7", touchAction:"none", cursor:"crosshair" }}
        onPointerDown={onDown}
        onPointerMove={onMove}
        onPointerUp={onUp}
        onPointerLeave={onUp}
        onPointerCancel={onUp}
      >
        <svg className="absolute inset-0 w-full h-full" viewBox={`0 0 ${GRID} ${GRID}`}>
          {Array.from({length:GRID-1},(_,i)=>i+1).map(i=>(
            <g key={i}>
              <line x1={i} y1={0} x2={i} y2={GRID} stroke="#EFDDD8" strokeWidth="0.04"/>
              <line x1={0} y1={i} x2={GRID} y2={i} stroke="#EFDDD8" strokeWidth="0.04"/>
            </g>
          ))}
          {(Object.entries(paths) as [ColorName,CellPos[]][]).map(([col,path])=>
            path.map(([r,c])=>(
              <rect key={`f${col}${r}${c}`} x={c} y={r} width={1} height={1}
                fill={HEX[col]} opacity={0.2}/>
            ))
          )}
          {(Object.entries(paths) as [ColorName,CellPos[]][]).map(([col,path])=>{
            if(path.length<2) return null;
            const d=path.map(([r,c],i)=>`${i===0?"M":"L"}${(c+0.5).toFixed(2)},${(r+0.5).toFixed(2)}`).join(" ");
            return <path key={`l${col}`} d={d} stroke={HEX[col]}
              strokeWidth="0.38" strokeLinecap="round" strokeLinejoin="round" fill="none"/>;
          })}
          {dots.map(({color,a,b})=>(
            <g key={color}>
              <circle cx={a[1]+0.5} cy={a[0]+0.5} r={0.28} fill={HEX[color]}/>
              <circle cx={b[1]+0.5} cy={b[0]+0.5} r={0.28} fill={HEX[color]}/>
            </g>
          ))}
        </svg>
      </div>


<AnimatePresence>
        {isWon && (
          <motion.p key="msg" initial={{opacity:0,y:6}} animate={{opacity:1,y:0}}
            className="text-[14px] font-medium text-[#C06B7C]">
            {isLastLevel ? "All done ♡" : "You solved it ♡"}
          </motion.p>
        )}
        {showBtn && (
          <motion.button key={`btn-${levelIdx}`} initial={{opacity:0,scale:0.95}} animate={{opacity:1,scale:1}}
            onClick={handleNext}
            className="flex items-center gap-2 rounded-2xl bg-[#D98B9B] px-6 py-3 font-medium text-white shadow-[0_6px_20px_rgba(217,139,155,0.35)] transition active:scale-[0.98]">
            {isLastLevel ? "Keep going" : "Next level"} <ArrowRight className="h-4 w-4" strokeWidth={2.2}/>
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
