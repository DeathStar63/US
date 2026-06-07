"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { ImageIcon } from "lucide-react";

export default function VideoFrame({
  src,
  poster,
  alt,
}: {
  src: string;
  poster?: string;
  alt?: string;
}) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [errored, setErrored] = useState(false);
  const isPlaceholder = src.includes("placeholder");
  const showFallback = isPlaceholder || errored;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="mx-auto w-full max-w-[300px] rounded-[20px] bg-white p-2 shadow-[0_8px_30px_rgba(200,140,130,0.18)]"
    >
      <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[14px] bg-[#F6E9E6]">
        {showFallback ? (
          <div className="flex h-full w-full flex-col items-center justify-center gap-2 bg-gradient-to-br from-[#F8E4E1] to-[#EFD9D2]">
            <ImageIcon className="h-7 w-7 text-[#D9A8A0]" strokeWidth={1.5} />
            <span className="px-4 text-center text-[11px] font-medium tracking-wide text-[#B98A82]">
              {alt || "Your video here"}
            </span>
          </div>
        ) : (
          <video
            ref={videoRef}
            src={src}
            poster={poster}
            autoPlay
            muted
            loop
            playsInline
            onError={() => setErrored(true)}
            className="h-full w-full object-cover"
          />
        )}
      </div>
    </motion.div>
  );
}
