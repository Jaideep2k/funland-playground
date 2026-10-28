import { CountUp, Reveal } from "@/components/motion/Reveal";

const stats = [
  { value: null, display: "1–13", label: "Ages welcome, with a toddler area for the littlest", bg: "bg-sky" },
  { value: 3, label: "Spacious party rooms for every size of celebration", bg: "bg-pink text-white" },
  { value: 140, label: "Guests at a 3-hour weekend private party for the whole facility", bg: "bg-sun", prefix: "Up to " },
  { value: 5, suffix: " min", label: "From the 407, on Highway 7 in Markham", bg: "bg-cloud" },
];

export function Stats() {
  return (
    <section aria-label="Funland at a glance" className="wrap py-[clamp(3rem,7vw,6rem)]">
      <Reveal className="grid grid-cols-2 gap-4 md:gap-5 lg:grid-cols-4" stagger={0.1} effect="pop">
        {stats.map((s) => (
          <div key={s.label} className={`sticker flex flex-col justify-between gap-6 p-5 md:p-7 ${s.bg}`}>
            <p className="font-display font-display-heavy text-[clamp(2.4rem,5vw,4.2rem)] leading-none">
              {s.value === null ? (
                s.display
              ) : (
                <>
                  {s.prefix ? <span className="block text-[0.32em] font-semibold uppercase tracking-wider">{s.prefix}</span> : null}
                  <CountUp to={s.value} suffix={s.suffix} className="num" />
                </>
              )}
            </p>
            <p className="text-[0.95rem] font-semibold leading-snug opacity-90 md:text-base">{s.label}</p>
          </div>
        ))}
      </Reveal>
    </section>
  );
}
