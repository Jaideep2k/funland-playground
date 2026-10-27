"use client";

import { useEffect, useState } from "react";
import { formatTime, hours } from "@/content/site";

function torontoNow() {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/Toronto",
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).formatToParts(new Date());
  const get = (t: string) => parts.find((p) => p.type === t)?.value ?? "";
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const day = days.indexOf(get("weekday").slice(0, 3));
  const minutes = (Number(get("hour")) % 24) * 60 + Number(get("minute"));
  return { day, minutes };
}

const toMin = (t: string) => {
  const [h, m] = t.split(":").map(Number);
  return h * 60 + m;
};

/** "Open now · until 7:00 PM", worked out in Markham's time zone. Renders a neutral line on the server. */
export function OpenToday({ className = "", dot = true }: { className?: string; dot?: boolean }) {
  const [label, setLabel] = useState<{ text: string; open: boolean } | null>(null);

  useEffect(() => {
    const update = () => {
      const { day, minutes } = torontoNow();
      const today = hours.find((h) => h.dayIdx.includes(day));
      if (!today) return setLabel({ text: "See hours", open: false });
      const o = toMin(today.open);
      const c = toMin(today.close);
      if (minutes < o) setLabel({ text: `Opens today at ${formatTime(today.open)}`, open: false });
      else if (minutes < c) setLabel({ text: `Open now · until ${formatTime(today.close)}`, open: true });
      else {
        const next = hours.find((h) => h.dayIdx.includes((day + 1) % 7));
        setLabel({ text: next ? `Closed · opens ${formatTime(next.open)} tomorrow` : "Closed now", open: false });
      }
    };
    update();
    const id = window.setInterval(update, 60_000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      {dot ? (
        <span
          aria-hidden
          className={`relative inline-block size-2.5 rounded-full ${label?.open ? "bg-[#3ee08f]" : "bg-sun"}`}
        >
          {label?.open ? <span className="absolute inset-0 animate-ping rounded-full bg-[#3ee08f] opacity-60" /> : null}
        </span>
      ) : null}
      <span>{label?.text ?? "Open 7 days a week"}</span>
    </span>
  );
}
