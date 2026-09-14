import { useState, useEffect, useRef } from 'react';
import { Activity, Brain, Cpu, ShieldCheck, Battery, ChevronDown, Sparkles } from 'lucide-react';
import Reveal from './Reveal';

export default function BionicShowcase() {
  const [cursorVisible, setCursorVisible] = useState(true);
  const haloRef = useRef<HTMLDivElement>(null);

  // Blinking clinical terminal / typewriter cursor
  useEffect(() => {
    const timer = setInterval(() => setCursorVisible((v) => !v), 530);
    return () => clearInterval(timer);
  }, []);

  // Scroll-fade the halo ring out as user scrolls past the hero section
  useEffect(() => {
    const onScroll = () => {
      const heroEl = document.getElementById('hero');
      if (!haloRef.current || !heroEl) return;
      const heroHeight = heroEl.offsetHeight;
      const scrollY = window.scrollY;
      // Fade from 1 -> 0 over the first hero section height
      const opacity = Math.max(0, 1 - (scrollY / heroHeight) * 1.6);
      haloRef.current.style.opacity = String(opacity);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div id="bionic-showcase" className="relative">
      {/* =========================================================================
          STAGE 0: HERO OVERVIEW (3D Arm Position: Right ~65%)
      ========================================================================= */}
      <section
        id="hero"
        className="relative min-h-screen flex items-center justify-start overflow-hidden bg-transparent text-slate-900"
      >
        {/* Halo Glyph — centered on the 3D hand position, fades on scroll, no fill */}
        <div
          ref={haloRef}
          className="pointer-events-none z-[5] fixed"
          style={{
            left: '66%',
            top: '55%',
            transform: 'translate(-50%, -50%)',
            width: 'min(54vw, 640px)',
            height: 'min(54vw, 640px)',
            transition: 'opacity 0.1s linear',
          }}
        >
          <div className="absolute inset-0 rounded-full border-[18px] border-slate-300/40" />
        </div>

        <div className="relative z-20 max-w-7xl mx-auto px-6 sm:px-12 lg:px-16 w-full pt-20 pb-12">
          <div className="max-w-xl">

            {/* Index tag — JetBrains Mono, labels only */}
            <p className="text-[10px] font-mono tracking-[0.3em] uppercase text-slate-400 mb-10">
              01 &mdash; Neuroprosthetics
            </p>

            {/* Display headline — Space Grotesk only, weight contrast 300 → 700 */}
            <h1 className="font-sans leading-[0.9] mb-8 text-slate-900"
                style={{ fontSize: 'clamp(3.5rem, 8.5vw, 8rem)' }}>
              <span className="font-light block">Restoring</span>
              <span className="font-bold block">Human</span>
              <span className="font-light block">Motion.</span>
            </h1>

            {/* Divider */}
            <div className="w-8 h-[1px] bg-slate-200 mb-8" />

            {/* Body — Inter, inherits from body tag */}
            <p className="text-[15px] text-slate-500 leading-[1.75] max-w-sm mb-10 font-normal">
              Neural-linked bionic prosthetics.<br />
              Built in Kathmandu. Built for life.
            </p>

            {/* Scroll cue — Mono only */}
            <a
              href="#neural-emg"
              className="inline-flex items-center gap-3 text-[10px] font-mono tracking-[0.25em] uppercase text-slate-400 hover:text-slate-900 transition-colors duration-200"
            >
              <span className="w-5 h-[1px] bg-current" />
              Inspect anatomy
            </a>

          </div>
        </div>
      </section>

      {/* =========================================================================
          STAGE 1: NEURAL EMG INTERFACE (3D Arm Position: Left ~28%, Content on Right)
      ========================================================================= */}
      <section
        id="neural-emg"
        className="relative min-h-screen flex items-center justify-end overflow-hidden bg-transparent text-slate-900 border-t border-slate-100"
      >
        <div className="relative z-20 max-w-7xl mx-auto px-6 sm:px-12 lg:px-16 w-full py-16 sm:py-20 flex justify-end">
          <div className="w-full lg:w-[500px] xl:w-[540px]">
            <Reveal variant="right">
              <div className="bg-white/95 backdrop-blur-xl border border-slate-200/90 rounded-3xl p-8 sm:p-10 shadow-xl">
                <div className="flex items-center gap-2 mb-4">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                  <p className="text-[11px] font-mono tracking-[0.25em] uppercase text-emerald-600 font-semibold">
                    PART 01 · NEURAL CONTROL
                  </p>
                </div>

                <h3 className="text-3xl sm:text-4xl font-light text-slate-900 tracking-tight mb-4">
                  Multichannel <br />
                  <span className="font-sans font-normal">Surface EMG Matrix</span>
                </h3>

                <p className="text-sm sm:text-base text-slate-600 leading-relaxed mb-8">
                  Conformal dry-contact electrode arrays map subtle electrical impulses
                  from residual forearm muscles. An on-device edge neural processor decodes
                  intended motion in under 50 milliseconds.
                </p>

                <div className="grid grid-cols-2 gap-3 mb-6">
                  <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-4">
                    <div className="flex items-center gap-2 text-emerald-600 mb-1">
                      <Brain size={16} />
                      <span className="text-xs font-mono font-semibold">LATENCY</span>
                    </div>
                    <p className="text-2xl font-sans text-slate-900">&lt; 50 ms</p>
                    <p className="text-[10px] text-slate-500 font-mono">Real-time inference</p>
                  </div>

                  <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-4">
                    <div className="flex items-center gap-2 text-blue-600 mb-1">
                      <Activity size={16} />
                      <span className="text-xs font-mono font-semibold">CHANNELS</span>
                    </div>
                    <p className="text-2xl font-sans text-slate-900">16-Ch Matrix</p>
                    <p className="text-[10px] text-slate-500 font-mono">High-density array</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-xs text-slate-500 border-t border-slate-100 pt-5">
                  <Sparkles size={14} className="text-amber-500 shrink-0" />
                  <span>Adaptive neural AI calibrates daily to muscle fatigue &amp; perspiration.</span>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* =========================================================================
          STAGE 2: 14-DoF MICRO-ACTUATORS (3D Arm Position: Right ~70%, Content on Left)
      ========================================================================= */}
      <section
        id="articulation"
        className="relative min-h-screen flex items-center justify-start overflow-hidden bg-transparent text-slate-900 border-t border-slate-100"
      >
        <div className="relative z-20 max-w-7xl mx-auto px-6 sm:px-12 lg:px-16 w-full py-16 sm:py-20 flex justify-start">
          <div className="w-full lg:w-[500px] xl:w-[540px]">
            <Reveal variant="left">
              <div className="bg-white/95 backdrop-blur-xl border border-slate-200/90 rounded-3xl p-8 sm:p-10 shadow-xl">
                <div className="flex items-center gap-2 mb-4">
                  <span className="w-2 h-2 rounded-full bg-blue-500" />
                  <p className="text-[11px] font-mono tracking-[0.25em] uppercase text-blue-600 font-semibold">
                    PART 02 · KINEMATICS &amp; GRIP
                  </p>
                </div>

                <h3 className="text-3xl sm:text-4xl font-light text-slate-900 tracking-tight mb-4">
                  14 Degrees of Freedom <br />
                  <span className="font-sans font-normal">Micro-Actuators</span>
                </h3>

                <p className="text-sm sm:text-base text-slate-600 leading-relaxed mb-8">
                  Individually motorized brushless DC coreless micromotors in every digit joint.
                  Features compliant tendons that dynamically self-conform around organic shapes
                  such as eggs, tools, door handles, and keys.
                </p>

                <div className="grid grid-cols-2 gap-3 mb-6">
                  <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-4">
                    <div className="flex items-center gap-2 text-blue-600 mb-1">
                      <Cpu size={16} />
                      <span className="text-xs font-mono font-semibold">MOTORS</span>
                    </div>
                    <p className="text-2xl font-sans text-slate-900">14 Active DoF</p>
                    <p className="text-[10px] text-slate-500 font-mono">Independent digits</p>
                  </div>

                  <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-4">
                    <div className="flex items-center gap-2 text-emerald-600 mb-1">
                      <ShieldCheck size={16} />
                      <span className="text-xs font-mono font-semibold">WEIGHT</span>
                    </div>
                    <p className="text-2xl font-sans text-slate-900">480 grams</p>
                    <p className="text-[10px] text-slate-500 font-mono">30% lighter than avg</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-xs text-slate-500 border-t border-slate-100 pt-5">
                  <span className="font-mono text-blue-600 font-semibold">GRIP MODES:</span>
                  <span>Tripod, Precision Pinch, Power Cylinder, Lateral Key, Open Palm.</span>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* =========================================================================
          STAGE 3: MODULAR SOCKET & HAPTICS (3D Arm Position: Left ~30%, Content on Right)
      ========================================================================= */}
      <section
        id="socket-haptics"
        className="relative min-h-screen flex items-center justify-end overflow-hidden bg-transparent text-slate-900 border-t border-slate-100"
      >
        <div className="relative z-20 max-w-7xl mx-auto px-6 sm:px-12 lg:px-16 w-full py-16 sm:py-20 flex justify-end">
          <div className="w-full lg:w-[500px] xl:w-[540px]">
            <Reveal variant="right">
              <div className="bg-white/95 backdrop-blur-xl border border-slate-200/90 rounded-3xl p-8 sm:p-10 shadow-xl">
                <div className="flex items-center gap-2 mb-4">
                  <span className="w-2 h-2 rounded-full bg-indigo-500" />
                  <p className="text-[11px] font-mono tracking-[0.25em] uppercase text-indigo-600 font-semibold">
                    PART 03 · WEARABILITY &amp; SENSORY
                  </p>
                </div>

                <h3 className="text-3xl sm:text-4xl font-light text-slate-900 tracking-tight mb-4">
                  Modular Socket &amp; <br />
                  <span className="font-sans font-normal">Haptic Slip Sensing</span>
                </h3>

                <p className="text-sm sm:text-base text-slate-600 leading-relaxed mb-8">
                  Breathable universal socket with multi-point micro-adjustment dials that
                  accommodates daily residual limb volume changes without discomfort.
                  Fingertip piezo-resistive sensors detect micro-slip in real-time.
                </p>

                <div className="grid grid-cols-2 gap-3 mb-6">
                  <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-4">
                    <div className="flex items-center gap-2 text-indigo-600 mb-1">
                      <ShieldCheck size={16} />
                      <span className="text-xs font-mono font-semibold">SOCKET</span>
                    </div>
                    <p className="text-2xl font-sans text-slate-900">Universal</p>
                    <p className="text-[10px] text-slate-500 font-mono">Micro-adjustable</p>
                  </div>

                  <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-4">
                    <div className="flex items-center gap-2 text-emerald-600 mb-1">
                      <Battery size={16} />
                      <span className="text-xs font-mono font-semibold">BATTERY</span>
                    </div>
                    <p className="text-2xl font-sans text-slate-900">18+ Hours</p>
                    <p className="text-[10px] text-slate-500 font-mono">Full-day clinical life</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-xs text-slate-500 border-t border-slate-100 pt-5">
                  <span className="font-mono text-indigo-600 font-semibold">FEEDBACK:</span>
                  <span>Tactile vibromotors relay touch pressure directly to the residual limb.</span>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </div>
  );
}
