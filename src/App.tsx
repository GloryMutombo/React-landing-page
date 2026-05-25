import { useState, useEffect } from 'react';

// Setup types for data structures
interface NavItem {
  label: string;
  hasDropdown: boolean;
}

interface StatItem {
  value: string;
  superscript: string;
  count: string;
  label: string;
  highlighted: boolean;
}

interface PartnerItem {
  name: string;
}

export default function App() {
  // Real-time dynamic clock tracking the time in USA (Eastern Time Zone, matching reference "02:16 PM")
  const [clockTime, setClockTime] = useState<string>('02:16:00 PM');

  // Header Nav Items from design
  const navItems: NavItem[] = [
    { label: 'Features', hasDropdown: true },
    { label: 'How It Works', hasDropdown: false },
    { label: 'About', hasDropdown: false },
    { label: 'Product', hasDropdown: false },
    { label: 'Blogs', hasDropdown: false }
  ];

  // Stats Card configurations
  const stats: StatItem[] = [
    {
      value: '150+',
      superscript: '(*)',
      count: '(60)',
      label: 'Projects delivered',
      highlighted: false
    },
    {
      value: '98%',
      superscript: '(*)',
      count: '(102)',
      label: 'Client satisfaction',
      highlighted: true
    }
  ];

  // Client Avatar placeholders mimicking the reference image designs
  const avatars: string[] = [
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&h=120&q=80',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&h=120&q=80',
    'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&h=120&q=80'
  ];

  useEffect(() => {
    const updateTime = () => {
      try {
        const options: Intl.DateTimeFormatOptions = {
          timeZone: 'America/New_York',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: true
        };
        const formatter = new Intl.DateTimeFormat('en-US', options);
        setClockTime(formatter.format(new Date()));
      } catch (e) {
        const date = new Date();
        setClockTime(date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
      }
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleGetStarted = () => {
    console.log('Get Started action initiated');
  };

  return (
    <div id="hero-root" className="relative min-h-screen w-full text-white font-sans flex flex-col justify-between p-6 md:p-12 overflow-hidden selection:bg-[#FF2E00] selection:text-white">
      
      {/* Background Video Player - Auto-playing, looped, and muted */}
      <video
        id="bg-video"
        className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none"
        src="https://res.cloudinary.com/de7a17yos/video/upload/kling_20260523_Image_to_Video__651_0_tafv9p.mp4"
        autoPlay
        loop
        muted
        playsInline
      />
      
      {/* Subtle overlay to soften the video and elevate text visibility */}
      <div id="video-overlay" className="absolute inset-0 bg-black/45 z-0 pointer-events-none" />
      
      {/* Ambient glowing blobs for high-production-value visual depth (subtle dark red/orange backdrops) */}
      <div 
        id="glow-top" 
        className="absolute top-[30%] -left-[10%] w-[250px] sm:w-[500px] h-[250px] sm:h-[500px] rounded-full bg-red-950/15 blur-[80px] sm:blur-[120px] pointer-events-none transition-opacity duration-1000"
      />
      <div 
        id="glow-bottom" 
        className="absolute bottom-0 right-[10%] w-[300px] sm:w-[600px] h-[300px] sm:h-[600px] rounded-full bg-orange-950/10 blur-[100px] sm:blur-[150px] pointer-events-none transition-opacity duration-1000"
      />

      {/* HEADER */}
      <header id="chativ-header" className="relative z-10 w-full flex items-center justify-between">
        {/* Brand Logo */}
        <a id="logo-link" href="#" className="flex items-center gap-3 group focus:outline-none focus:ring-1 focus:ring-orange-500 rounded-lg p-1">
          <div id="logo-icon-container" className="relative w-8 h-8 flex items-center justify-center bg-transparent">
            {/* Exact geometric orange-red folded hexagon icon */}
            <svg id="logo-svg" viewBox="0 0 100 100" className="w-full h-full fill-current text-[#FF2E00] transform transition-transform duration-300 group-hover:scale-110" aria-hidden="true">
              <path d="M75,25 L100,50 L75,75 L25,75 L0,50 L25,25 Z" />
              <circle cx="50" cy="50" r="15" className="text-black" />
            </svg>
          </div>
          <span id="logo-text" className="text-xl md:text-2xl font-bold tracking-tight text-white transition-colors duration-300 group-hover:text-neutral-200">Chativ</span>
        </a>

        {/* Navigation Pills */}
        <nav id="navbar" className="hidden lg:flex items-center gap-2">
          {navItems.map((item, index) => (
            <div key={item.label} id={`nav-item-wrapper-${index}`} className="relative">
              <button 
                id={`nav-btn-${index}`}
                className="flex items-center justify-center gap-1.5 px-4 py-2 text-xs md:text-sm font-medium tracking-wide text-gray-300 bg-neutral-900/50 hover:bg-neutral-800/80 hover:text-white border border-neutral-800/60 rounded-full transition-all cursor-pointer focus:outline-none focus:ring-1 focus:ring-orange-500"
              >
                {item.label}
                {item.hasDropdown && (
                  /* Down Chevron */
                  <svg id={`chevron-${index}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-3.5 h-3.5 text-gray-400">
                    <polyline points="6 9 12 15 18 9"></polyline>
                  </svg>
                )}
              </button>
            </div>
          ))}
        </nav>

        {/* Header Actions (Live Clock + Get Started Button) */}
        <div id="header-actions" className="flex items-center gap-6">
          {/* Live Clock matching the 02:16 PM (USA) styling */}
          <div id="usa-clock" className="hidden sm:flex items-center gap-2.5 text-gray-400 font-mono text-xs md:text-sm tracking-widest bg-neutral-900/40 px-4 py-2 rounded-full border border-neutral-800/50">
            <span id="clock-pulse" className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" aria-hidden="true"></span>
            <span id="clock-text">{clockTime} (USA)</span>
          </div>

          <button 
            id="register-btn"
            onClick={handleGetStarted} 
            className="cursor-pointer bg-white text-black text-xs md:text-sm font-semibold px-5 py-2.5 rounded-full hover:bg-neutral-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black focus:ring-white transition-all transform hover:scale-[1.03]"
          >
            Get Started
          </button>
        </div>
      </header>

      {/* HERO CORE CONTENT */}
      <main id="hero-body" className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center my-auto py-12 md:py-20">
        <div id="hero-left-column" className="lg:col-span-8 flex flex-col items-start text-left max-w-3xl">
          
          {/* Top Badge (World Info) */}
          <div id="world-badge" className="flex items-center gap-3.5 mb-8 group">
            <div id="world-icon-container" className="w-10 h-10 flex items-center justify-center rounded-full bg-neutral-900/80 border border-neutral-800/65 text-gray-300 group-hover:border-neutral-600 transition-colors duration-300">
              {/* Wireframe Rotating Globe Icon */}
              <svg id="globe-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5 animate-[spin_30s_linear_infinite]" aria-hidden="true">
                <circle cx="12" cy="12" r="10"></circle>
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
                <path d="M2 12h20"></path>
              </svg>
            </div>
            <div id="world-badge-text" className="text-xs md:text-sm text-gray-400 font-medium leading-relaxed tracking-wide">
              <p>Hub support peoples from</p>
              <p className="text-gray-300">all over the world</p>
            </div>
          </div>

          {/* Main Heading Text */}
          <h1 id="hero-title" className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight text-white leading-[1.05] mb-8 select-none">
            Technology<br />
            Crafted for All<br />
            Not <span id="title-machines" className="font-serif italic font-light text-neutral-200 relative inline-block tracking-tight" style={{ textShadow: '0 0 40px rgba(255, 255, 255, 0.15)' }}>Machines</span>
          </h1>

          {/* Description Subheading */}
          <p id="hero-description" className="text-base sm:text-lg md:text-xl text-gray-300 leading-relaxed max-w-xl mb-10 font-normal">
            We create clear, intuitive, and accessible digital experiences shaped by real human behavior.
          </p>

          {/* CTA and Avatars Row */}
          <div id="cta-row" className="flex flex-wrap items-center gap-6 md:gap-10">
            {/* Get started button with brand gradient and white arrow circle */}
            <button 
              id="cta-start-btn"
              onClick={handleGetStarted} 
              className="cursor-pointer group relative flex items-center gap-3 pl-6 pr-2.5 py-2.5 rounded-full bg-gradient-to-r from-[#FF2E00] to-[#FF6F00] text-white text-sm md:text-base font-semibold shadow-[0_10px_30px_rgba(255,46,0,0.22)] hover:shadow-[0_15px_40px_rgba(255,46,0,0.35)] transition-all duration-300 hover:scale-[1.04] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black focus:ring-[#FF5500]"
            >
              <span>Get started</span>
              <div id="cta-arrow-circle" className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-black transform group-hover:rotate-45 transition-transform duration-300">
                {/* Sleek Up-Right Arrow */}
                <svg id="arrow-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="w-4 h-4">
                  <line x1="7" y1="17" x2="17" y2="7"></line>
                  <polyline points="7 7 17 7 17 17"></polyline>
                </svg>
              </div>
            </button>

            {/* Overlapping Avatar Group */}
            <div id="happy-clients-block" className="flex items-center gap-3">
              <div id="avatar-overlap" className="flex -space-x-3.5">
                {avatars.map((avatar, idx) => (
                  <img 
                    key={idx}
                    id={`client-avatar-${idx}`}
                    src={avatar} 
                    alt={`Happy client avatar ${idx + 1}`} 
                    className="w-10 h-10 rounded-full border-2 border-black object-cover hover:scale-110 hover:z-10 transition-transform duration-200"
                    referrerPolicy="no-referrer"
                  />
                ))}
              </div>
              <div id="client-text" className="text-left font-sans text-xs md:text-sm">
                <p id="client-title" className="font-semibold text-white tracking-wide">900+ Happy Clients</p>
                <p id="client-sub" className="text-gray-500 font-medium">Over 5 years</p>
              </div>
            </div>
          </div>

        </div>

        {/* Right Column (Kept dark & empty for exact asymmetric layout elegance, as in reference) */}
        <div id="hero-right-column" className="hidden lg:col-span-4 h-full"></div>
      </main>

      {/* BOTTOM STATS AND FOOTER PARTNERS */}
      <footer id="hero-footer" className="relative z-10 w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-end border-t border-neutral-900/80 pt-8 mt-6">
        
        {/* Stats Cards on Left (6 columns) */}
        <div id="stats-wrapper" className="lg:col-span-6 flex flex-col sm:flex-row gap-4 items-stretch">
          {stats.map((stat, index) => (
            <div 
              key={stat.label} 
              id={`stat-card-${index}`}
              className={`flex-1 rounded-2xl p-5 border min-h-[140px] flex flex-col justify-between transition-all duration-300 group ${
                stat.highlighted 
                  ? 'bg-gradient-to-br from-[#1c0401] to-[#3a0a04] hover:to-[#550f06] border-[#FF2E00]/30 hover:border-[#FF2E00]/50 shadow-[inset_0_1px_20px_rgba(255,46,0,0.05)]' 
                  : 'bg-[#0b0b0b]/95 hover:bg-[#121212] border-neutral-800/80 hover:border-neutral-700/80'
              }`}
            >
              <div id={`stat-top-${index}`} className="flex justify-between items-start">
                <span id={`stat-val-${index}`} className="text-4xl md:text-5xl font-bold tracking-tight text-white">
                  {stat.value}
                </span>
                <span id={`stat-[#]-${index}`} className={`text-xs font-semibold ${stat.highlighted ? 'text-[#FF5500]/90' : 'text-gray-500'}`}>
                  {stat.superscript}
                </span>
              </div>

              <div id={`stat-bottom-${index}`} className="mt-4">
                <div id={`stat-count-${index}`} className={`text-xs font-mono mb-1 ${stat.highlighted ? 'text-[#FF5500]/70' : 'text-gray-500'}`}>
                  {stat.count}
                </div>
                <div id={`stat-label-${index}`} className={`text-xs sm:text-sm font-medium ${stat.highlighted ? 'text-gray-200' : 'text-gray-400'}`}>
                  {stat.label}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Partner Logos on Right (6 columns) */}
        <div id="partners-wrapper" className="lg:col-span-6 flex flex-col items-start lg:items-end gap-3.5">
          <span id="partners-title" className="text-[10px] md:text-xs font-bold font-sans uppercase tracking-[0.2em] text-neutral-500">
            Our Partners
          </span>

          {/* Logos Row with responsive layout */}
          <div id="partners-logos-row" className="w-full lg:w-auto flex flex-wrap lg:flex-nowrap items-center gap-x-8 gap-y-4 pt-1 justify-start lg:justify-end">
            
            {/* BookStore Logo */}
            <div id="partner-bookstore" className="flex items-center gap-2 group cursor-pointer text-gray-400 hover:text-white transition-colors">
              <svg id="bookstore-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4.5 h-4.5 text-inherit">
                <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
                <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
              </svg>
              <span id="bookstore-text" className="text-xs md:text-sm font-semibold tracking-wider text-inherit">BookStore</span>
            </div>

            {/* Zantic Logo */}
            <div id="partner-zantic" className="flex items-center gap-2 group cursor-pointer text-gray-400 hover:text-white transition-colors">
              <svg id="zantic-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-4.5 h-4.5 text-inherit">
                <polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5"></polygon>
                <polyline points="2 8.5 12 15 22 8.5"></polyline>
                <line x1="12" y1="15" x2="12" y2="22"></line>
              </svg>
              <span id="zantic-text" className="text-xs md:text-sm font-semibold tracking-wider text-inherit">zantic</span>
            </div>

            {/* Crona Logo */}
            <div id="partner-crona" className="flex items-center gap-2 group cursor-pointer text-gray-400 hover:text-white transition-colors">
              <svg id="crona-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4.5 h-4.5 text-inherit">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
              </svg>
              <span id="crona-text" className="text-xs md:text-sm font-semibold tracking-wider text-inherit">Crona</span>
            </div>

            {/* Mercury Logo */}
            <div id="partner-mercury" className="flex items-center gap-1.5 group cursor-pointer text-gray-400 hover:text-white transition-colors">
              <svg id="mercury-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-4.5 h-4.5 text-inherit">
                <path d="M4 20V4h4l4 8 4-8h4v16"></path>
              </svg>
              <span id="mercury-text" className="text-xs md:text-sm font-bold tracking-widest text-inherit">Mercury</span>
            </div>

            {/* Wager Logo */}
            <div id="partner-wager" className="flex items-center gap-2 group cursor-pointer text-gray-400 hover:text-white transition-colors">
              <svg id="wager-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4.5 h-4.5 text-inherit">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
              </svg>
              <span id="wager-text" className="text-xs md:text-sm font-semibold tracking-wider text-inherit">Wager</span>
            </div>

          </div>
        </div>
      </footer>

    </div>
  );
}
