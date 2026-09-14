import { useState, useEffect } from 'react';

export default function Hero() {
  const [cursorVisible, setCursorVisible] = useState(true);

  // Blinking clinical terminal / typewriter cursor
  useEffect(() => {
    const timer = setInterval(() => setCursorVisible((v) => !v), 530);
    return () => clearInterval(timer);
  }, []);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-start overflow-hidden bg-transparent text-slate-900 scroll-mt-20"
    >
      {/* SCFO Architectural Halo / Glyph centered on 3D subject position */}
      <div className="absolute left-1/2 md:left-[62%] -translate-x-1/2 top-1/2 -translate-y-1/2 w-[340px] h-[340px] sm:w-[480px] sm:h-[480px] lg:w-[540px] lg:h-[540px] pointer-events-none z-0">
        <div className="absolute inset-0 rounded-full border-[20px] sm:border-[28px] border-slate-200/60 shadow-[0_0_80px_rgba(0,0,0,0.03),inset_0_0_40px_rgba(0,0,0,0.02)] bg-slate-50/30" />
      </div>

      {/* Main Content Area */}
      <div className="relative z-20 max-w-7xl mx-auto px-6 sm:px-12 lg:px-16 w-full pt-28 pb-20">
        <div className="max-w-2xl">
          {/* Clinical Telemetry Tag */}
          <div>
            <p className="text-[11px] font-mono tracking-[0.25em] uppercase text-slate-400 mb-8 font-medium">
              00 &nbsp; BIONIC NEUROPROSTHETICS · NEURAL EMG INTERFACE · CLINICAL ROBOTICS
            </p>
          </div>

          {/* MedTech Headline (Instrument Serif + Plus Jakarta Sans) */}
          <div>
            <h1 className="text-6xl sm:text-7xl lg:text-8xl xl:text-9xl tracking-tight leading-[0.92] mb-8 font-light text-slate-900">
              <span className="font-serif italic font-normal text-slate-900">Restoring &amp;</span>
              <br />
              <span className="font-sans font-extrabold tracking-tight text-slate-900">Motion</span>
            </h1>
          </div>

          {/* Subheading with Typewriter Cursor */}
          <div>
            <h2 className="text-xl sm:text-2xl font-medium text-slate-800 mb-4 leading-snug">
              Bionic robotics that make human potential feel limitless.
              <span className={`inline-block font-mono text-emerald-600 ml-1 font-bold ${cursorVisible ? 'opacity-100' : 'opacity-0'}`}>
                |
              </span>
            </h2>
          </div>

          {/* Description */}
          <div>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-xl mb-12 font-normal">
              Advanced bionic neuroprosthetics engineered for intuitive biological control.
              Built on deep-learning EMG pattern recognition, multi-articulating finger kinematics,
              and active sensory feedback — from Kathmandu to the world.
            </p>
          </div>

          {/* Scroll Prompt */}
          <div className="flex items-center gap-3 text-xs font-mono tracking-[0.2em] uppercase text-slate-400">
            <span className="w-4 h-[1.5px] bg-slate-400" />
            <span>Scroll to explore</span>
          </div>
        </div>
      </div>
    </section>
  );
}
