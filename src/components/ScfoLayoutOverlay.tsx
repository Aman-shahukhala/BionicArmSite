import { useState, useEffect } from 'react';

const sections = [
  { id: 'hero', label: 'Start' },
  { id: 'neural-emg', label: 'Neural EMG' },
  { id: 'articulation', label: 'Kinematics' },
  { id: 'socket-haptics', label: 'Socket & Haptics' },
  { id: 'mission', label: 'Mission' },
  { id: 'health', label: 'Clinical Specs' },
  { id: 'technology', label: 'Technology' },
  { id: 'impact', label: 'Impact' },
  { id: 'team', label: 'Team' },
  { id: 'investors', label: 'Investors' },
  { id: 'contact', label: 'Contact' },
];

export default function ScfoLayoutOverlay() {
  const [activeSection, setActiveSection] = useState('hero');

  // ScrollSpy to track active section checkpoint
  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + window.innerHeight * 0.4;
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i].id);
        if (el && scrollPos >= el.offsetTop) {
          setActiveSection(sections[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* 1. Architectural Vertical Hairline Grid Columns (Layer z-[15]) */}
      <div className="fixed inset-0 pointer-events-none z-[15] flex justify-between max-w-7xl mx-auto px-6 sm:px-12 lg:px-16">
        <div className="w-[1px] h-full bg-slate-900/[0.05]" />
        <div className="w-[1px] h-full bg-slate-900/[0.05] hidden sm:block" />
        <div className="w-[1px] h-full bg-slate-900/[0.05] hidden md:block" />
        <div className="w-[1px] h-full bg-slate-900/[0.05] hidden lg:block" />
        <div className="w-[1px] h-full bg-slate-900/[0.05]" />
      </div>



    </>
  );
}
