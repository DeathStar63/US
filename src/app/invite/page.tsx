"use client";

import { useState } from "react";

const ACTIVITIES = [
  { id: "roblox",      emoji: "🎮", label: "Play Roblox" },
  { id: "euphoria",    emoji: "📺", label: "Watch Euphoria" },
  { id: "her-series",  emoji: "🍿", label: "Watch what you're watching rn" },
  { id: "imessage",    emoji: "📱", label: "iMessage games" },
  { id: "dehradun",    emoji: "🏔️", label: "Hear about Dehradun" },
  { id: "movie",       emoji: "🎬", label: "Watch a movie" },
  { id: "charades",    emoji: "🎭", label: "Play Charades" },
  { id: "paint",       emoji: "🎨", label: "Paint together online" },
  { id: "jigsaw",      emoji: "🧩", label: "Jigsaw puzzle" },
  { id: "skribbl",     emoji: "✏️",  label: "Skribbl.io" },
  { id: "discord",     emoji: "🕹️", label: "Discord games" },
  { id: "reels",       emoji: "🎞️", label: "Watch Reels / YT Shorts" },
  { id: "geoguessr",   emoji: "🌍", label: "GeoGuessr" },
  { id: "book",        emoji: "📖", label: "Book review" },
  { id: "youtube",     emoji: "▶️",  label: "Future Canoe / Muffin Juice" },
  { id: "gmaps",       emoji: "🗺️", label: "Random pin drop on Maps" },
];

const HIS_EMAIL = "ayushjodh@gmail.com";
const HER_EMAIL = "adasharma0308@gmail.com";
const FORMSPREE_ENDPOINT = "https://formspree.io/f/YOUR_FORM_ID";

export default function InvitePage() {
  const [selected, setSelected] = useState<string[]>([]);
  const [date, setDate]         = useState("");
  const [time, setTime]         = useState("");
  const [sent, setSent]         = useState(false);

  const toggle = (id: string) =>
    setSelected(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );

  const selectedActivities = ACTIVITIES.filter(a => selected.includes(a.id));

  const handleSend = () => {
    if (!date || !time || selected.length === 0) return;

    const [year, month, day] = date.split("-").map(Number);
    const [hour, minute]     = time.split(":").map(Number);
    const pad = (n: number)  => String(n).padStart(2, "0");
    const fmt  = (y: number, mo: number, d: number, h: number, mi: number) =>
      `${y}${pad(mo)}${pad(d)}T${pad(h)}${pad(mi)}00`;

    const start = fmt(year, month, day, hour, minute);
    const end   = fmt(year, month, day, (hour + 1) % 24, minute);

    const labels = selectedActivities.map(a => `${a.emoji} ${a.label}`);
    const title  =
      labels.length === 1
        ? `Us — ${labels[0]}`
        : `Us — ${labels[0]} + ${labels.length - 1} more`;

    const details = `Something small and fun to look forward to 🤍\n\n${labels.join("\n")}`;

    const params = new URLSearchParams({
      action:  "TEMPLATE",
      text:    title,
      dates:   `${start}/${end}`,
      details,
    });
    params.append("add", HIS_EMAIL);
    params.append("add", HER_EMAIL);

    window.open(`https://calendar.google.com/calendar/render?${params.toString()}`, "_blank");

    fetch(FORMSPREE_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        activities: labels.join(", "),
        date,
        time,
      }),
    });

    setSent(true);
  };

  const ready = selected.length > 0 && date && time;
  const today = new Date().toISOString().split("T")[0];

  return (
    <main className="fixed inset-0 overflow-y-auto bg-pink-50">
      <div className="mx-auto max-w-md px-5 py-14 flex flex-col gap-10">

      {/* Header */}
      <div className="text-center flex flex-col gap-2">
        <p className="text-4xl">🤍</p>
        <h1 className="text-2xl font-semibold text-rose-900 leading-snug tracking-tight">
          Something to look forward to.
        </h1>
        <p className="text-sm text-rose-400 leading-relaxed mt-1 max-w-xs mx-auto">
          I know you need your space right now. If you would like, we could spend time
          together whenever you feel like it or are ready for it — around your schedule.
          No pressure, open heart.
        </p>
        <p className="text-sm text-rose-400 leading-relaxed max-w-xs mx-auto">
          Choose whatever you&apos;d like to do from these, select the date and time of your
          preference and I will be there ❤️ A little something so we have something to
          look forward to — so that your space doesn&apos;t get disturbed.
        </p>
      </div>

      {/* Activity bubbles */}
      <div className="flex flex-wrap gap-2 justify-center">
        {ACTIVITIES.map(a => (
          <button
            key={a.id}
            onClick={() => toggle(a.id)}
            className={`px-3.5 py-2 rounded-full text-sm transition-all duration-200 border select-none ${
              selected.includes(a.id)
                ? "bg-rose-100 border-rose-300 text-rose-800 shadow-sm scale-105"
                : "bg-white border-rose-100 text-rose-500 hover:border-rose-200 hover:bg-rose-50"
            }`}
          >
            {a.emoji} {a.label}
          </button>
        ))}
      </div>

      {/* Date + time picker — appears after at least one bubble is chosen */}
      {selected.length > 0 && (
        <div className="flex flex-col gap-4 bg-rose-50 rounded-2xl p-5 border border-rose-100 transition-all">
          <p className="text-sm text-rose-400 text-center">When works for you?</p>
          <input
            type="date"
            value={date}
            min={today}
            onChange={e => setDate(e.target.value)}
            className="w-full rounded-xl border border-rose-200 px-4 py-3 text-rose-800 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-rose-200"
          />
          <input
            type="time"
            value={time}
            onChange={e => setTime(e.target.value)}
            className="w-full rounded-xl border border-rose-200 px-4 py-3 text-rose-800 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-rose-200"
          />
        </div>
      )}

      {/* Send button */}
      {ready && (
        <div className="flex flex-col gap-2">
          <button
            onClick={handleSend}
            className="w-full py-4 rounded-2xl bg-rose-400 text-white text-sm font-medium hover:bg-rose-500 active:scale-95 transition-all shadow-sm"
          >
            {sent ? "Invite sent 🤍" : "Send invite to both of us"}
          </button>
          {sent && (
            <p className="text-center text-xs text-rose-300">
              Google Calendar will open — just confirm and we&apos;re set.
            </p>
          )}
        </div>
      )}

      </div>
    </main>
  );
}
