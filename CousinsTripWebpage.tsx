import { useEffect, useState } from "react";

interface CountdownState { days: number; hours: number; minutes: number; seconds: number; }

const TRIP_START = new Date("2026-05-21T00:00:00-05:00");

function getCountdown(): CountdownState {
  const now = new Date();
  const distance = Math.max(0, TRIP_START.getTime() - now.getTime());
  return {
    days: Math.floor(distance / (1000 * 60 * 60 * 24)),
    hours: Math.floor((distance / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((distance / (1000 * 60)) % 60),
    seconds: Math.floor((distance / 1000) % 60),
  };
}

const NAV_LINKS: [string, string][] = [
  ["Countdown","#countdown"],["Schedule","#schedule"],["Playlist","#playlist"],
  ["Packing","#packing"],["Map","#map"],["Gallery","#gallery"],["Vote","#vote"],
];

const PHOTOS = [
  { label:"Beach Days", color:"text-[#0b7b96]", rotate:"rotate-[-2deg]", url:"https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80" },
  { label:"Family Laughs", color:"text-[#ef476f]", rotate:"rotate-[1deg]", url:"https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&w=1200&q=80" },
  { label:"Good Vibes", color:"text-[#0b7b96]", rotate:"rotate-[-1deg]", url:"https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=1400&q=80" },
];

const LABELS = ["Days","Hours","Minutes","Seconds"] as const;

export default function CousinsTripWebpage() {
  const [countdown, setCountdown] = useState<CountdownState>(getCountdown);
  useEffect(() => {
    const t = setInterval(() => setCountdown(getCountdown()), 1000);
    return () => clearInterval(t);
  }, []);
  const values = [countdown.days, countdown.hours, countdown.minutes, countdown.seconds];

  return (
    <div className="min-h-screen bg-[#082652] text-[#071733]">
      <nav className="sticky top-0 z-50 border-b border-white/10 bg-[#082652]/95 px-4 py-4 text-white backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <div className="text-sm font-black uppercase tracking-[0.25em] text-[#ffd98b]">Cousin's Trip</div>
          <div className="flex gap-2 overflow-x-auto whitespace-nowrap">
            {NAV_LINKS.map(([label,href]) => (
              <a key={label} href={href} className="rounded-full px-4 py-2 text-xs font-black uppercase tracking-wide transition hover:bg-white/10 hover:text-[#ffd98b]">{label}</a>
            ))}
          </div>
          <a href="https://www.youtube.com/results?search_query=we+are+family+sister+sledge" target="_blank" rel="noreferrer" className="rounded-full bg-[#ffd98b] px-4 py-2 text-xs font-black uppercase tracking-wide text-[#082652] shadow-lg transition hover:scale-105">Play Family Vibes</a>
        </div>
      </nav>
      <section className="relative overflow-hidden bg-gradient-to-b from-[#082652] via-[#f4744a] to-[#ffd98b] px-6 py-24 text-center text-white">
        <div className="absolute left-10 top-10 h-32 w-32 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute right-10 top-10 h-40 w-40 rounded-full bg-[#ffd98b]/20 blur-3xl" />
        <p className="relative z-10 text-2xl font-black italic tracking-wide text-[#ffb0b0] md:text-4xl">Sun. Sand. Coastal Views. Family Nights</p>
        <h1 className="relative z-10 mt-4 text-6xl font-black uppercase leading-none md:text-9xl">Cousin's Trip</h1>
        <h2 className="relative z-10 mt-2 text-5xl font-black uppercase italic tracking-wide text-[#062b59] md:text-8xl" style={{animation:"popIn 1.6s ease-out both"}}>Myrtle Beach</h2>
        <div className="relative z-10 mx-auto mt-6 w-fit rotate-[-1deg] bg-[#0b7b96] px-6 py-3 text-xl font-black uppercase shadow-xl">Together is our favorite place to be!</div>
        <div className="relative z-10 mx-auto mt-6 w-fit rotate-[1deg] rounded-xl bg-[#ef476f] px-8 py-4 text-3xl font-black uppercase shadow-xl">May 21–25, 2026</div>
      </section>
      <section className="bg-[#fff7e8] px-6 py-16">
        <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-3">
          {PHOTOS.map(({label,color,rotate,url}) => (
            <div key={label} className={`${rotate} rounded-xl bg-white p-3 shadow-2xl`}>
              <div className="h-72 rounded-lg bg-cover bg-center" style={{backgroundImage:`url('${url}')`}} />
              <div className="py-4 text-center"><p className={`text-xl font-black uppercase ${color}`}>{label}</p></div>
            </div>
          ))}
        </div>
      </section>
      <section id="countdown" className="bg-[#082652] px-6 py-20 text-white">
        <div className="mx-auto max-w-6xl text-center">
          <p className="text-sm font-black uppercase tracking-[0.3em] text-[#ffd98b]">Family Countdown</p>
          <h2 className="mt-3 text-5xl font-black uppercase md:text-7xl">The Cousins Take Myrtle Beach</h2>
          <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-4">
            {LABELS.map((label,i) => (
              <div key={label} className="rounded-3xl bg-white/10 p-6 ring-1 ring-white/20">
                <div className="text-5xl font-black text-[#ffd98b] md:text-7xl">{String(values[i]).padStart(2,"0")}</div>
                <div className="mt-2 text-sm font-black uppercase tracking-[0.2em] text-white/80">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="bg-white px-6 py-20">
        <div className="mx-auto max-w-5xl rounded-[2.5rem] bg-gradient-to-r from-[#ef476f] via-[#f7a51b] to-[#0b7b96] p-10 text-center text-white shadow-2xl">
          <h2 className="text-4xl font-black uppercase md:text-6xl">Just Cousins, Coastlines, Late Nights, and Good Memories</h2>
          <div className="mt-8 inline-flex items-center gap-3 rounded-2xl bg-white px-6 py-4 font-black text-[#082652] shadow-lg">Private family URL idea: theannualcousinstrip.com</div>
        </div>
      </section>
    </div>
  );
}
