import { useState, useEffect, useRef } from 'react';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { label: 'BIONIC ARM', href: '#health' },
  { label: 'TECHNOLOGY', href: '#technology' },
  { label: 'IMPACT', href: '#impact' },
  { label: 'STUDIO', href: '#team' },
  { label: 'INVESTORS', href: '#investors' },
  { label: 'CONTACT', href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const progressBarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let rafId = 0;
    const updateProgress = () => {
      const scrollY = window.scrollY;
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollHeight > 0 ? Math.min(Math.max(scrollY / scrollHeight, 0), 1) : 0;

      if (progressBarRef.current) {
        progressBarRef.current.style.transform = `scaleX(${progress})`;
      }
      setScrolled(scrollY > 20);
    };

    const onScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(updateProgress);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    updateProgress();

    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(rafId);
    };
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setMenuOpen(false); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [menuOpen]);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-white/90 backdrop-blur-xl border-b border-slate-200/80 shadow-xs'
            : 'bg-transparent border-b border-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-16">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <a
              href="#hero"
              className="text-xs font-mono tracking-[0.2em] font-semibold text-slate-900 hover:text-black uppercase"
            >
              PRATIKSHYA HEALTH
            </a>

            {/* Nav Links */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-[11px] font-mono tracking-[0.15em] text-slate-600 hover:text-slate-900 transition-colors duration-200"
                >
                  {link.label}
                </a>
              ))}
            </div>

            {/* Start a Clinical Inquiry Pill Button */}
            <div className="hidden md:block">
              <a
                href="#contact"
                className="text-[11px] font-mono tracking-[0.15em] uppercase px-5 py-2 rounded-full border border-slate-300 text-slate-900 hover:bg-slate-900 hover:text-white active:scale-95 transition-all duration-200"
              >
                CLINICAL INQUIRY
              </a>
            </div>

            {/* Mobile Toggle */}
            <button
              className="md:hidden text-slate-900 p-1"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Continuous GPU-accelerated scroll progress bar */}
        <div className="h-[2px] w-full bg-slate-200/40 overflow-hidden">
          <div
            ref={progressBarRef}
            className="h-full w-full bg-slate-900 origin-left will-change-transform"
            style={{ transform: 'scaleX(0)' }}
          />
        </div>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="fixed inset-0 z-40 md:hidden bg-white/98 backdrop-blur-2xl pt-24 px-8" role="dialog" aria-modal="true">
          <div className="flex flex-col items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="text-2xl font-mono tracking-wider text-slate-800 hover:text-slate-900 transition-colors"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setMenuOpen(false)}
              className="text-sm font-mono tracking-widest uppercase px-6 py-3 rounded-full border border-slate-900 bg-slate-900 text-white mt-4"
            >
              CLINICAL INQUIRY
            </a>
          </div>
        </div>
      )}
    </>
  );
}
