"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Finger/mouse signature pad. Hands back a PNG data URL (or "" when cleared).
 * Strokes are smoothed with quadratic curves so a shaky finger still signs neatly.
 */
export function SignaturePad({
  onChange,
  invalid,
  describedBy,
}: {
  onChange: (dataUrl: string) => void;
  invalid?: boolean;
  describedBy?: string;
}) {
  const canvas = useRef<HTMLCanvasElement>(null);
  const [empty, setEmpty] = useState(true);
  const emptyRef = useRef(true);
  const drawing = useRef(false);
  const points = useRef<{ x: number; y: number }[]>([]);

  useEffect(() => {
    const c = canvas.current;
    if (!c) return;
    const fit = () => {
      const r = c.getBoundingClientRect();
      const dpr = Math.max(1, window.devicePixelRatio || 1);
      const snapshot = emptyRef.current ? null : c.toDataURL();
      c.width = Math.round(r.width * dpr);
      c.height = Math.round(r.height * dpr);
      const ctx = c.getContext("2d")!;
      ctx.scale(dpr, dpr);
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.lineWidth = 2.6;
      ctx.strokeStyle = "#252854";
      if (snapshot) {
        const img = new Image();
        img.onload = () => ctx.drawImage(img, 0, 0, r.width, r.height);
        img.src = snapshot;
      }
    };
    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(c);
    return () => ro.disconnect();
  }, []);

  const pos = (e: React.PointerEvent) => {
    const r = canvas.current!.getBoundingClientRect();
    return { x: e.clientX - r.left, y: e.clientY - r.top };
  };

  const down = (e: React.PointerEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    canvas.current!.setPointerCapture(e.pointerId);
    drawing.current = true;
    const p = pos(e);
    points.current = [p];
    const ctx = canvas.current!.getContext("2d")!;
    ctx.beginPath();
    ctx.arc(p.x, p.y, 1.3, 0, Math.PI * 2);
    ctx.fillStyle = "#252854";
    ctx.fill();
  };

  const move = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!drawing.current) return;
    const ctx = canvas.current!.getContext("2d")!;
    const pts = points.current;
    pts.push(pos(e));
    if (pts.length < 3) return;
    const [a, b, c] = pts.slice(-3);
    ctx.beginPath();
    ctx.moveTo((a.x + b.x) / 2, (a.y + b.y) / 2);
    ctx.quadraticCurveTo(b.x, b.y, (b.x + c.x) / 2, (b.y + c.y) / 2);
    ctx.stroke();
  };

  const up = () => {
    if (!drawing.current) return;
    drawing.current = false;
    emptyRef.current = false;
    setEmpty(false);
    onChange(canvas.current!.toDataURL("image/png"));
  };

  const clear = () => {
    const c = canvas.current!;
    c.getContext("2d")!.clearRect(0, 0, c.width, c.height);
    emptyRef.current = true;
    setEmpty(true);
    onChange("");
  };

  return (
    <div>
      <div
        className={`relative overflow-hidden rounded-2xl border-[2.5px] bg-cloud ${invalid ? "border-danger" : "border-ink"}`}
      >
        <canvas
          ref={canvas}
          role="img"
          aria-label="Signature area. Draw your signature with your finger or mouse."
          aria-describedby={describedBy}
          className="block h-44 w-full touch-none cursor-crosshair"
          onPointerDown={down}
          onPointerMove={move}
          onPointerUp={up}
          onPointerCancel={up}
          onPointerLeave={up}
        />
        <div aria-hidden className="pointer-events-none absolute inset-x-6 bottom-10 border-b-2 border-dashed border-ink/25" />
        {empty ? (
          <p aria-hidden className="pointer-events-none absolute inset-x-0 bottom-3 text-center text-sm font-semibold text-ink-faint">
            Sign here with your finger or mouse
          </p>
        ) : null}
      </div>
      <button
        type="button"
        onClick={clear}
        className="mt-2 rounded-full border-2 border-ink bg-cloud px-4 py-1.5 font-display text-sm font-semibold hover:bg-sun-soft"
      >
        Clear signature
      </button>
    </div>
  );
}
