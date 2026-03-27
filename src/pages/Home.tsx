/* ============================================================
   HOME PAGE — Maria Valencia Portfolio
   Design: Soft Modernism meets Editorial Warmth — Blue Edition
   Primary: Soft periwinkle blue #7B9EC4
   Dark:    Deep navy #1A2340
   Accent:  Sage green #A8B5A2
   Base:    Warm cream #FAF7F2
   ============================================================ */

import { useEffect, useRef, useState } from "react";
import {
  Linkedin,
  Mail,
  Instagram,
  ChevronDown,
  Sparkles,
  TrendingUp,
  Megaphone,
  Palette,
  BarChart2,
  Globe,
  Camera,
  Heart,
  ExternalLink,
  MapPin,
  CheckCircle,
  Send,
  Loader2,
} from "lucide-react";
import { trpc } from "@/lib/trpc";

// ─── Image CDN URLs ──────────────────────────────────────────
const HERO_BG =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663477710385/gs2UqGeQoh4TdAdTX2AmRc/hero-bg-blue-fiuvcAuJbiEd4Z657RPQ7C.webp";
const PROFILE_BLOB =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663477710385/gs2UqGeQoh4TdAdTX2AmRc/profile-blob-blue-Q7jYqgF8vt78yBdAwd9wsb.webp";
const MARKETING_ABS =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663477710385/gs2UqGeQoh4TdAdTX2AmRc/marketing-abstract-NwUrWdB6VjCDXoiecwncFF.webp";
const WORK_TEXTURE =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663477710385/gs2UqGeQoh4TdAdTX2AmRc/work-texture-AgFXknXg3NK8tr6HpXAVwK.webp";

// ─── Brand color constants ────────────────────────────────────
const BLUE = "#7B9EC4";        // soft periwinkle blue — primary accent
const BLUE_LIGHT = "#C8D8EC";  // pale blue — backgrounds, borders
const BLUE_PALE = "#EBF2F9";   // very pale blue — card backgrounds
const NAVY = "#1A2340";        // deep navy — headlines, dark sections
const SAGE = "#A8B5A2";        // sage green — secondary accent
const SAGE_LIGHT = "#D4EDD8";  // pale sage — tag backgrounds
const CREAM = "#FAF7F2";       // warm cream — main background

// ─── Typewriter Hook ────────────────────────────────────────
function useTypewriter(words: string[], typingSpeed = 80, deletingSpeed = 45, pauseMs = 1800) {
  const [displayed, setDisplayed] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const current = words[wordIndex % words.length];
    let timeout: ReturnType<typeof setTimeout>;

    if (!isDeleting && displayed === current) {
      // Pause at full word before deleting
      timeout = setTimeout(() => setIsDeleting(true), pauseMs);
    } else if (isDeleting && displayed === "") {
      // Move to next word
      setIsDeleting(false);
      setWordIndex((i) => (i + 1) % words.length);
    } else {
      const next = isDeleting
        ? current.slice(0, displayed.length - 1)
        : current.slice(0, displayed.length + 1);
      timeout = setTimeout(() => setDisplayed(next), isDeleting ? deletingSpeed : typingSpeed);
    }

    return () => clearTimeout(timeout);
  }, [displayed, isDeleting, wordIndex, words, typingSpeed, deletingSpeed, pauseMs]);

  return displayed;
}

// ─── Intersection Observer Hook ──────────────────────────────
function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          obs.disconnect();
        }
      },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);

  return { ref, inView };
}

// ─── Animated Section Wrapper ─────────────────────────────────
function AnimSection({
  children,
  className = "",
  delay = 0,
  direction = "up",
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "left" | "in";
}) {
  const { ref, inView } = useInView();
  const animClass =
    direction === "up"
      ? "animate-fade-up"
      : direction === "left"
      ? "animate-slide-right"
      : "animate-fade-in";

  return (
    <div
      ref={ref}
      className={`${className} ${inView ? animClass : "anim-hidden"}`}
      style={{ animationDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

// ─── Typewriter Role Display ─────────────────────────────────
function TypewriterRole() {
  const roles = ["Social Media Manager", "Content Strategist", "Creative Thinker"];
  const text = useTypewriter(roles);

  return (
    <div
      className="flex items-center gap-2 mb-6 animate-fade-up anim-hidden"
      style={{ animationDelay: "250ms", minHeight: "2.2rem" }}
    >
      <span className="text-lg md:text-xl font-['DM_Sans'] font-medium text-[#7B9EC4]">
        {text}
      </span>
      {/* Blinking cursor */}
      <span
        className="inline-block w-0.5 h-6 bg-[#7B9EC4] rounded-full"
        style={{ animation: "blink 1s step-end infinite" }}
      />
      <style>{`@keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }`}</style>
    </div>
  );
}

// ─── Navigation ───────────────────────────────────────────────
function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = ["About", "Experience", "Skills", "Works", "Contact"];

  const scrollTo = (id: string) => {
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-[#FAF7F2]/90 backdrop-blur-md shadow-sm border-b border-[#C8D8EC]/60"
          : "bg-transparent"
      }`}
    >
      <div className="container flex items-center justify-between h-16">
        {/* Logo */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="font-['Playfair_Display'] text-xl font-semibold text-[#1A2340] tracking-tight hover:text-[#7B9EC4] transition-colors"
        >
          MV<span className="text-[#7B9EC4]">.</span>
        </button>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <button
              key={link}
              onClick={() => scrollTo(link)}
              className="text-sm font-medium text-[#1A2340]/70 hover:text-[#7B9EC4] transition-colors tracking-wide"
            >
              {link}
            </button>
          ))}
          <a
            href="https://www.linkedin.com/in/maria-valencia-0b36aa2b6/"
            target="_blank"
            rel="noopener noreferrer"
            className="pill-tag bg-[#7B9EC4] text-white hover:bg-[#6a8db3] transition-colors"
          >
            <Linkedin size={13} className="mr-1.5" />
            LinkedIn
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span className={`block w-5 h-0.5 bg-[#1A2340] transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
          <span className={`block w-5 h-0.5 bg-[#1A2340] transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`} />
          <span className={`block w-5 h-0.5 bg-[#1A2340] transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-[#FAF7F2]/95 backdrop-blur-md border-t border-[#C8D8EC]/60 px-6 py-4 flex flex-col gap-4">
          {links.map((link) => (
            <button
              key={link}
              onClick={() => scrollTo(link)}
              className="text-left text-base font-medium text-[#1A2340]/80 hover:text-[#7B9EC4] transition-colors py-1"
            >
              {link}
            </button>
          ))}
          <a
            href="https://www.linkedin.com/in/maria-valencia-0b36aa2b6/"
            target="_blank"
            rel="noopener noreferrer"
            className="pill-tag bg-[#7B9EC4] text-white w-fit"
          >
            <Linkedin size={13} className="mr-1.5" />
            LinkedIn
          </a>
        </div>
      )}
    </nav>
  );
}

// ─── Hero Section ─────────────────────────────────────────────
function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{
        background: `linear-gradient(135deg, #FAF7F2 0%, #EDF3F9 50%, #E8EEF5 100%)`,
      }}
    >
      {/* Hero background image */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `url(${HERO_BG})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      {/* Decorative dot pattern top-right */}
      <div className="absolute top-24 right-8 w-48 h-48 dot-pattern opacity-30 rounded-full" />

      {/* Floating blob decorations */}
      <div
        className="absolute top-20 right-[8%] w-72 h-72 rounded-full opacity-20 animate-float-slow"
        style={{ background: `radial-gradient(circle, ${BLUE} 0%, transparent 70%)` }}
      />
      <div
        className="absolute bottom-20 left-[5%] w-56 h-56 rounded-full opacity-15 animate-float"
        style={{ background: `radial-gradient(circle, ${SAGE} 0%, transparent 70%)`, animationDelay: "2s" }}
      />
      <div
        className="absolute top-1/2 right-[15%] w-32 h-32 rounded-full opacity-25 animate-breathe"
        style={{ background: `radial-gradient(circle, ${BLUE_LIGHT} 0%, transparent 70%)` }}
      />

      {/* Content */}
      <div className="container relative z-10 pt-24 pb-16">
        <div className="max-w-3xl">
          {/* Text */}
          <div>
            <div className="animate-fade-up anim-hidden" style={{ animationDelay: "100ms" }}>
              <span className="section-label text-[#7B9EC4] mb-4 block">✦ Portfolio</span>
            </div>

            <h1
              className="font-['Playfair_Display'] text-5xl md:text-6xl lg:text-7xl font-bold text-[#1A2340] leading-[1.1] mb-4 animate-fade-up anim-hidden"
              style={{ animationDelay: "200ms" }}
            >
              Hi, I'm{" "}
              <span className="italic text-[#7B9EC4]">Maria</span>
              <br />
              <span className="text-4xl md:text-5xl lg:text-6xl font-semibold">Valencia</span>
            </h1>
            <TypewriterRole />

            <p
              className="text-lg md:text-xl text-[#1A2340]/65 leading-relaxed mb-8 max-w-md font-['DM_Sans'] animate-fade-up anim-hidden"
              style={{ animationDelay: "300ms" }}
            >
              I turn brands into conversations and ideas into impact — through strategy, creativity, and a genuine love for storytelling.
            </p>

            <div className="flex flex-wrap gap-3 mb-10 animate-fade-up anim-hidden" style={{ animationDelay: "400ms" }}>
              <span className="pill-tag bg-[#C8D8EC] text-[#1A2340]">
                <Sparkles size={12} className="mr-1.5 text-[#7B9EC4]" />
                Social Media Manager
              </span>
              <span className="pill-tag bg-[#D4EDD8] text-[#2C3A2C]">
                <TrendingUp size={12} className="mr-1.5 text-[#A8B5A2]" />
                Marketing
              </span>
              <span className="pill-tag bg-[#FAF7F2] text-[#1A2340] border border-[#7B9EC4]/40">
                <MapPin size={12} className="mr-1.5 text-[#7B9EC4]" />
                Winnipeg, MB
              </span>
            </div>

            <div className="flex flex-wrap gap-4 animate-fade-up anim-hidden" style={{ animationDelay: "500ms" }}>
              <button
                onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
                className="px-7 py-3.5 bg-[#7B9EC4] text-white rounded-full font-medium text-sm hover:bg-[#6a8db3] transition-all hover:shadow-lg hover:shadow-[#7B9EC4]/30 hover:-translate-y-0.5 active:scale-95"
              >
                Let's Connect
              </button>
              <button
                onClick={() => document.getElementById("experience")?.scrollIntoView({ behavior: "smooth" })}
                className="px-7 py-3.5 border border-[#7B9EC4]/60 text-[#1A2340] rounded-full font-medium text-sm hover:bg-[#C8D8EC]/50 transition-all hover:-translate-y-0.5"
              >
                View Experience
              </button>
            </div>
          </div>


        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50">
          <span className="text-xs text-[#1A2340]/50 font-['DM_Sans'] tracking-widest uppercase">Scroll</span>
          <ChevronDown size={16} className="text-[#7B9EC4] animate-bounce" />
        </div>
      </div>
    </section>
  );
}

// ─── About Section ────────────────────────────────────────────
function About() {
  const stats = [
    { value: "2+", label: "Years Experience" },
    { value: "AA", label: "Marketing" },
    { value: "∞", label: "Creative Ideas" },
  ];

  return (
    <section id="about" className="py-24 bg-white relative overflow-hidden">
      {/* Subtle background texture */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `url(${WORK_TEXTURE})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      {/* Decorative blobs */}
      <div className="absolute -top-16 -right-16 w-64 h-64 blob-shape-2 opacity-10" style={{ background: BLUE }} />
      <div className="absolute -bottom-16 -left-16 w-48 h-48 blob-shape opacity-10" style={{ background: SAGE }} />

      <div className="container relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Image */}
          <AnimSection direction="left">
            <div className="relative">
              <div
                className="w-full aspect-square max-w-md mx-auto blob-shape-3 overflow-hidden shadow-xl shadow-[#7B9EC4]/15"
                style={{ background: "#EDF3F9" }}
              >
                <img
                  src={MARKETING_ABS}
                  alt="Marketing & Creativity"
                  className="w-full h-full object-cover"
                  style={{ filter: "hue-rotate(180deg) saturate(0.8)" }}
                />
              </div>
              {/* Stats floating card */}
              <div className="absolute -right-4 top-1/2 -translate-y-1/2 bg-white rounded-2xl p-5 shadow-xl shadow-[#7B9EC4]/15 border border-[#C8D8EC]/60">
                {stats.map((stat, i) => (
                  <div key={i} className={`text-center ${i < stats.length - 1 ? "mb-4 pb-4 border-b border-[#C8D8EC]/60" : ""}`}>
                    <p className="font-['Playfair_Display'] text-2xl font-bold text-[#7B9EC4]">{stat.value}</p>
                    <p className="text-xs text-[#1A2340]/50 font-['DM_Sans'] mt-0.5">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </AnimSection>

          {/* Right: Text */}
          <div>
            <AnimSection delay={100}>
              <span className="section-label text-[#7B9EC4] mb-4 block">✦ About Me</span>
            </AnimSection>
            <AnimSection delay={200}>
              <h2 className="font-['Playfair_Display'] text-4xl md:text-5xl font-bold text-[#1A2340] leading-tight mb-6">
                Crafting stories that{" "}
                <span className="italic text-[#7B9EC4]">connect</span>
              </h2>
            </AnimSection>
            <AnimSection delay={300}>
              <p className="text-base text-[#1A2340]/65 leading-relaxed mb-5 font-['DM_Sans']">
                I'm a Business Administration graduate with a major in Marketing, passionate about the intersection of creativity and strategy. I believe every brand has a story worth telling, and I'm here to help tell it beautifully.
              </p>
              <p className="text-base text-[#1A2340]/65 leading-relaxed mb-8 font-['DM_Sans']">
                From crafting engaging social media content to developing creative
                campaigns, I bring a thoughtful, data-informed approach to every
                project. My experience spans creative assistance and social media
                management, giving me a well-rounded view of how brands grow and
                connect with their audiences.
              </p>
            </AnimSection>
            <AnimSection delay={400}>
              <div className="flex flex-wrap gap-2">
                {["Brand Strategy", "Content Creation", "Social Media", "Marketing Analytics", "Creative Direction", "Storytelling"].map((tag) => (
                  <span
                    key={tag}
                    className="pill-tag bg-[#EBF2F9] text-[#1A2340]/70 border border-[#7B9EC4]/30 hover:bg-[#C8D8EC] hover:text-[#1A2340] transition-colors"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </AnimSection>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Experience Section ───────────────────────────────────────
function Experience() {
  const experiences = [
    {
      role: "Social Media Manager",
      company: "Aethos Blinds & Interiors",
      period: "2024 – Present",
      location: "Winnipeg, MB",
      type: "Current",
      color: BLUE,
      bgColor: "#F0F6FC",
      description:
        "I lead the social media presence for a premium window covering and interior design company — developing content strategies, creating engaging posts, shaping brand voice, and growing community engagement across platforms.",
      highlights: ["Content strategy & creation", "Brand voice development", "Community management", "Analytics & reporting", "Campaign planning"],
      link: "https://aethosinteriors.com",
    },
    {
      role: "Creative Assistant",
      company: "Rhyme and Rhythm",
      period: "Past Role",
      location: "Canada",
      type: "Past",
      color: SAGE,
      bgColor: "#F5F8F5",
      description:
        "I supported creative projects and campaigns, contributing to content development, visual storytelling, and creative strategy. I gained hands-on experience across the full creative production process — from concept all the way to execution.",
      highlights: ["Creative content development", "Visual storytelling", "Campaign support", "Concept ideation", "Production coordination"],
      link: "https://rhymeandrhythm.ca/",
    },
  ];

  return (
    <section
      id="experience"
      className="py-24 relative overflow-hidden"
      style={{ background: `linear-gradient(180deg, ${CREAM} 0%, #EDF3F9 100%)` }}
    >
      {/* Dot pattern decoration */}
      <div className="absolute top-12 left-8 w-32 h-32 dot-pattern opacity-40 rounded-full" />
      <div className="absolute bottom-12 right-8 w-24 h-24 dot-pattern opacity-30 rounded-full" />

      <div className="container relative z-10">
        <div className="text-center mb-16">
          <AnimSection>
            <span className="section-label text-[#7B9EC4] mb-4 block">✦ Experience</span>
          </AnimSection>
          <AnimSection delay={100}>
            <h2 className="font-['Playfair_Display'] text-4xl md:text-5xl font-bold text-[#1A2340] leading-tight">
              Where I've{" "}
              <span className="italic text-[#7B9EC4]">made my mark</span>
            </h2>
          </AnimSection>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {experiences.map((exp, i) => (
            <AnimSection key={i} delay={i * 150}>
              <div
                className="rounded-3xl p-8 h-full border border-white/60 shadow-lg shadow-[#7B9EC4]/10 hover:shadow-xl hover:shadow-[#7B9EC4]/15 transition-all hover:-translate-y-1 group"
                style={{ background: exp.bgColor }}
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <span
                      className="pill-tag text-white text-xs mb-3 inline-flex"
                      style={{ background: exp.color }}
                    >
                      {exp.type === "Current" ? "● Current" : "Past"}
                    </span>
                    <h3 className="font-['Playfair_Display'] text-xl font-bold text-[#1A2340] leading-tight">
                      {exp.role}
                    </h3>
                    <p className="font-semibold font-['DM_Sans'] mt-1" style={{ color: exp.color }}>
                      {exp.company}
                    </p>
                  </div>
                  {exp.link && (
                    <a
                      href={exp.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-full hover:bg-white/60 transition-colors text-[#1A2340]/40 hover:text-[#7B9EC4]"
                    >
                      <ExternalLink size={16} />
                    </a>
                  )}
                </div>

                {/* Meta */}
                <div className="flex items-center gap-4 mb-5 text-xs text-[#1A2340]/50 font-['DM_Sans']">
                  <span className="flex items-center gap-1"><MapPin size={11} />{exp.location}</span>
                  <span>{exp.period}</span>
                </div>

                {/* Description */}
                <p className="text-sm text-[#1A2340]/65 leading-relaxed mb-6 font-['DM_Sans']">
                  {exp.description}
                </p>

                {/* Highlights */}
                <div className="flex flex-wrap gap-2">
                  {exp.highlights.map((h) => (
                    <span
                      key={h}
                      className="text-xs px-3 py-1 rounded-full font-['DM_Sans'] font-medium"
                      style={{
                        background: `${exp.color}20`,
                        color: exp.color === BLUE ? "#2A4A6A" : "#3A5A3A",
                      }}
                    >
                      {h}
                    </span>
                  ))}
                </div>
              </div>
            </AnimSection>
          ))}
        </div>

        {/* Education card */}
        <AnimSection delay={300} className="mt-8 max-w-5xl mx-auto">
          <div className="rounded-3xl p-8 border border-[#C8D8EC]/60 bg-white/60 shadow-md">
            <div className="flex flex-col md:flex-row md:items-center gap-6">
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0"
                style={{ background: `linear-gradient(135deg, ${BLUE}, ${SAGE})` }}
              >
                <span className="text-white font-['Playfair_Display'] font-bold text-lg">AA</span>
              </div>
              <div className="flex-1">
                <span className="section-label text-[#7B9EC4] mb-1 block">Education</span>
                <h3 className="font-['Playfair_Display'] text-xl font-bold text-[#1A2340]">
                  Associate Degree in Marketing
                </h3>
                <p className="font-semibold font-['DM_Sans'] mt-0.5 text-[#7B9EC4]">Marketing</p>
              </div>
              <div className="flex flex-wrap gap-2">
                <span className="pill-tag bg-[#C8D8EC] text-[#2A4A6A] text-xs">Marketing</span>
                <span className="pill-tag bg-[#D4EDD8] text-[#3A5A3A] text-xs">Brand Strategy</span>
                <span className="pill-tag bg-[#EBF2F9] text-[#1A2340]/60 border border-[#7B9EC4]/30 text-xs">Consumer Behavior</span>
              </div>
            </div>
          </div>
        </AnimSection>
      </div>
    </section>
  );
}

// ─── Skills Section ───────────────────────────────────────────
function Skills() {
  const skillGroups = [
    {
      icon: Megaphone,
      title: "Social Media",
      color: BLUE,
      bgColor: "#F0F6FC",
      skills: ["Instagram", "Facebook", "TikTok", "LinkedIn", "Content Calendar", "Community Management"],
    },
    {
      icon: Palette,
      title: "Creative",
      color: SAGE,
      bgColor: "#F5F8F5",
      skills: ["Content Creation", "Copywriting", "Visual Storytelling", "Brand Identity", "Canva", "Adobe Suite"],
    },
    {
      icon: TrendingUp,
      title: "Strategy",
      color: "#6B8FAF",
      bgColor: "#EEF4FA",
      skills: ["Marketing Strategy", "Campaign Planning", "Brand Development", "Market Research", "Audience Analysis"],
    },
    {
      icon: BarChart2,
      title: "Analytics",
      color: "#7A9BB5",
      bgColor: "#EDF3F8",
      skills: ["Performance Tracking", "Insights & Reporting", "KPI Monitoring", "A/B Testing", "ROI Analysis"],
    },
    {
      icon: Globe,
      title: "Digital",
      color: "#5E8AAD",
      bgColor: "#EBF2F7",
      skills: ["SEO Basics", "Email Marketing", "Digital Advertising", "Website Content", "Google Analytics"],
    },
    {
      icon: Camera,
      title: "Production",
      color: "#8AABCA",
      bgColor: "#F2F7FB",
      skills: ["Photo Editing", "Video Concepts", "Reel Creation", "Graphic Design", "Brand Photography"],
    },
  ];

  return (
    <section id="skills" className="py-24 bg-white relative overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url(${WORK_TEXTURE})`,
          backgroundSize: "cover",
        }}
      />

      <div className="container relative z-10">
        <div className="text-center mb-16">
          <AnimSection>
            <span className="section-label text-[#7B9EC4] mb-4 block">✦ Skills & Expertise</span>
          </AnimSection>
          <AnimSection delay={100}>
            <h2 className="font-['Playfair_Display'] text-4xl md:text-5xl font-bold text-[#1A2340] leading-tight">
              What I{" "}
              <span className="italic text-[#7B9EC4]">bring to the table</span>
            </h2>
          </AnimSection>
          <AnimSection delay={200}>
            <p className="text-base text-[#1A2340]/55 max-w-xl mx-auto mt-4 font-['DM_Sans']">
              I've built a versatile skill set through hands-on experience in marketing, creative work, and social media management.
            </p>
          </AnimSection>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillGroups.map((group, i) => {
            const Icon = group.icon;
            return (
              <AnimSection key={i} delay={i * 80}>
                <div
                  className="rounded-3xl p-6 h-full border border-white/60 shadow-sm hover:shadow-md transition-all hover:-translate-y-1 group"
                  style={{ background: group.bgColor }}
                >
                  <div className="flex items-center gap-3 mb-5">
                    <div
                      className="w-10 h-10 rounded-2xl flex items-center justify-center"
                      style={{ background: `${group.color}25` }}
                    >
                      <Icon size={18} style={{ color: group.color }} />
                    </div>
                    <h3 className="font-['Playfair_Display'] text-lg font-bold text-[#1A2340]">
                      {group.title}
                    </h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {group.skills.map((skill) => (
                      <span
                        key={skill}
                        className="text-xs px-3 py-1.5 rounded-full font-['DM_Sans'] font-medium transition-colors hover:opacity-80"
                        style={{ background: `${group.color}18`, color: "#1A2340", opacity: 0.85 }}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </AnimSection>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ─── Best Works Section ─────────────────────────────────────
function BestWorks() {
  const works = [
    {
      url: "https://www.instagram.com/reel/DV9odKxEmpt/",
      embedUrl: "https://www.instagram.com/reel/DV9odKxEmpt/embed",
      type: "reel",
      label: "Reel",
    },
    {
      url: "https://www.instagram.com/reel/DWFGeFimgMJ/",
      embedUrl: "https://www.instagram.com/reel/DWFGeFimgMJ/embed",
      type: "reel",
      label: "Reel",
    },
    {
      url: "https://www.instagram.com/reel/DVCS_BuDIxM/",
      embedUrl: "https://www.instagram.com/reel/DVCS_BuDIxM/embed",
      type: "reel",
      label: "Reel",
    },
    {
      url: "https://www.instagram.com/reel/DWKjyxujgXU/",
      embedUrl: "https://www.instagram.com/reel/DWKjyxujgXU/embed",
      type: "reel",
      label: "Reel",
    },
    {
      url: "https://www.instagram.com/p/DUZHZ82kgHD/",
      embedUrl: "https://www.instagram.com/p/DUZHZ82kgHD/embed",
      type: "post",
      label: "Post",
    },
    {
      url: "https://www.instagram.com/p/DO82WJ2jXu8/",
      embedUrl: "https://www.instagram.com/p/DO82WJ2jXu8/embed",
      type: "post",
      label: "Post",
    },
    {
      url: "https://www.instagram.com/p/DLXyGkdITRE/",
      embedUrl: "https://www.instagram.com/p/DLXyGkdITRE/embed",
      type: "post",
      label: "Post",
    },
  ];

  return (
    <section
      id="works"
      className="py-24 bg-white relative overflow-hidden"
    >
      {/* Subtle decorative blobs */}
      <div
        className="absolute -top-16 -right-16 w-64 h-64 blob-shape-2 opacity-[0.07]"
        style={{ background: BLUE }}
      />
      <div
        className="absolute -bottom-16 -left-16 w-48 h-48 blob-shape opacity-[0.07]"
        style={{ background: SAGE }}
      />

      <div className="container relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <AnimSection>
            <span className="section-label text-[#7B9EC4] mb-4 block">✦ Portfolio</span>
          </AnimSection>
          <AnimSection delay={100}>
            <h2 className="font-['Playfair_Display'] text-4xl md:text-5xl font-bold text-[#1A2340] leading-tight">
              Best{" "}
              <span className="italic text-[#7B9EC4]">Works</span>
            </h2>
          </AnimSection>
          <AnimSection delay={200}>
            <p className="text-base text-[#1A2340]/55 max-w-xl mx-auto mt-4 font-['DM_Sans']">
              A curated selection of content, campaigns, and creative work across the brands and companies I've had the pleasure of working with.
            </p>
          </AnimSection>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 justify-items-center">
          {works.map((work, i) => (
            <AnimSection key={i} delay={i * 80} className="w-full max-w-[340px]">
              <div className="group relative rounded-3xl overflow-hidden shadow-md shadow-[#7B9EC4]/10 hover:shadow-xl hover:shadow-[#7B9EC4]/20 transition-all hover:-translate-y-1 border border-[#C8D8EC]/40 bg-[#F8FBFE]">
                {/* Instagram embed */}
                <div className="relative w-full" style={{ paddingBottom: work.type === 'reel' ? '177.78%' : '125%' }}>
                  <iframe
                    src={work.embedUrl}
                    className="absolute inset-0 w-full h-full"
                    frameBorder="0"
                    scrolling="no"
                    allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                    title={`Instagram ${work.label} ${i + 1}`}
                    loading="lazy"
                  />
                </div>
                {/* Footer bar */}
                <div className="flex items-center justify-between px-4 py-3 bg-white border-t border-[#C8D8EC]/40">
                  <div className="flex items-center gap-2">
                    <Instagram size={14} className="text-[#7B9EC4]" />
                    <span className="text-xs font-['DM_Sans'] text-[#1A2340]/60 font-medium">
                      {work.label}
                    </span>
                  </div>
                  <a
                    href={work.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-['DM_Sans'] text-[#7B9EC4] hover:text-[#6a8db3] font-medium flex items-center gap-1 transition-colors"
                  >
                    View <ExternalLink size={11} />
                  </a>
                </div>
              </div>
            </AnimSection>
          ))}
        </div>

        {/* CTA */}
        <AnimSection delay={400} className="text-center mt-12">
          <a
            href="https://www.instagram.com/jose2015010"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 px-7 py-3.5 border border-[#7B9EC4]/60 text-[#1A2340] rounded-full font-medium text-sm hover:bg-[#C8D8EC]/50 transition-all hover:-translate-y-0.5 font-['DM_Sans']"
          >
            <Instagram size={16} className="text-[#7B9EC4]" />
            View More on Instagram
          </a>
        </AnimSection>
      </div>
    </section>
  );
}

// ─── Contact Section ──────────────────────────────────────────
function Contact() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sent, setSent] = useState(false);

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.email.trim()) e.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Enter a valid email";
    if (!form.subject.trim()) e.subject = "Subject is required";
    if (!form.message.trim()) e.message = "Message is required";
    return e;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setErrors({});

    // Build a mailto: link pre-filled with the form data
    const body = `Hi Maria,\n\nMy name is ${form.name}.\n\n${form.message}\n\n---\nSent from: ${form.email}`;
    const mailtoUrl = `mailto:hello@mariavalencia.com?subject=${encodeURIComponent(form.subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoUrl;

    // Show success confirmation after a short delay
    setTimeout(() => setSent(true), 500);
  };

  const inputClass = (field: string) =>
    `w-full px-4 py-3 rounded-2xl bg-white/10 border ${
      errors[field] ? "border-red-400" : "border-white/20"
    } text-white placeholder-white/40 font-['DM_Sans'] text-sm focus:outline-none focus:border-[#7B9EC4] focus:bg-white/15 transition-all`;

  return (
    <section
      id="contact"
      className="py-24 relative overflow-hidden"
      style={{ background: `linear-gradient(135deg, ${NAVY} 0%, #243050 100%)` }}
    >
      {/* Decorative blobs */}
      <div className="absolute top-0 right-0 w-96 h-96 opacity-10 blob-shape" style={{ background: BLUE }} />
      <div className="absolute bottom-0 left-0 w-64 h-64 opacity-10 blob-shape-2" style={{ background: SAGE }} />
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-5"
        style={{ background: `radial-gradient(circle, ${BLUE} 0%, transparent 70%)` }}
      />

      <div className="container relative z-10">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <AnimSection>
              <span className="section-label text-[#7B9EC4] mb-4 block">✦ Get In Touch</span>
            </AnimSection>
            <AnimSection delay={100}>
              <h2 className="font-['Playfair_Display'] text-4xl md:text-5xl font-bold text-white leading-tight mb-4">
                Let's create something{" "}
                <span className="italic text-[#7B9EC4]">beautiful</span>{" "}
                together
              </h2>
            </AnimSection>
            <AnimSection delay={200}>
              <p className="text-base text-white/60 leading-relaxed font-['DM_Sans']">
                Whether you're looking for a creative collaborator, a social media strategist, or just want to say hello — my inbox is always open.
              </p>
            </AnimSection>
          </div>

          {/* Form or Success */}
          <AnimSection delay={300}>
            {sent ? (
              /* ── Success State ── */
              <div className="rounded-3xl bg-white/10 border border-white/15 backdrop-blur-sm p-12 text-center">
                <div className="w-20 h-20 rounded-full bg-[#7B9EC4]/20 border border-[#7B9EC4]/40 flex items-center justify-center mx-auto mb-6">
                  <CheckCircle size={40} className="text-[#7B9EC4]" />
                </div>
                <h3 className="font-['Playfair_Display'] text-2xl font-bold text-white mb-3">
                  Message Sent!
                </h3>
                <p className="text-white/60 font-['DM_Sans'] text-base leading-relaxed mb-8">
                  Thank you for reaching out! I'll get back to you as soon as possible — usually within 1–2 business days.
                </p>
                <button
                  onClick={() => { setSent(false); setForm({ name: "", email: "", subject: "", message: "" }); }}
                  className="px-6 py-3 border border-white/20 text-white/70 rounded-full text-sm font-['DM_Sans'] hover:bg-white/10 transition-all"
                >
                  Send another message
                </button>
              </div>
            ) : (
              /* ── Contact Form ── */
              <form
                onSubmit={handleSubmit}
                className="rounded-3xl bg-white/10 border border-white/15 backdrop-blur-sm p-8 md:p-10"
              >
                <div className="grid sm:grid-cols-2 gap-5 mb-5">
                  {/* Name */}
                  <div>
                    <label className="block text-white/70 text-xs font-['DM_Sans'] font-medium mb-2 tracking-wide uppercase">Name</label>
                    <input
                      type="text"
                      placeholder="Your name"
                      value={form.name}
                      onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                      className={inputClass("name")}
                    />
                    {errors.name && <p className="text-red-400 text-xs mt-1 font-['DM_Sans']">{errors.name}</p>}
                  </div>
                  {/* Email */}
                  <div>
                    <label className="block text-white/70 text-xs font-['DM_Sans'] font-medium mb-2 tracking-wide uppercase">Email</label>
                    <input
                      type="email"
                      placeholder="your@email.com"
                      value={form.email}
                      onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                      className={inputClass("email")}
                    />
                    {errors.email && <p className="text-red-400 text-xs mt-1 font-['DM_Sans']">{errors.email}</p>}
                  </div>
                </div>
                {/* Subject */}
                <div className="mb-5">
                  <label className="block text-white/70 text-xs font-['DM_Sans'] font-medium mb-2 tracking-wide uppercase">Subject</label>
                  <input
                    type="text"
                    placeholder="What's this about?"
                    value={form.subject}
                    onChange={e => setForm(f => ({ ...f, subject: e.target.value }))}
                    className={inputClass("subject")}
                  />
                  {errors.subject && <p className="text-red-400 text-xs mt-1 font-['DM_Sans']">{errors.subject}</p>}
                </div>
                {/* Message */}
                <div className="mb-7">
                  <label className="block text-white/70 text-xs font-['DM_Sans'] font-medium mb-2 tracking-wide uppercase">Message</label>
                  <textarea
                    rows={5}
                    placeholder="Tell me about your project or just say hi..."
                    value={form.message}
                    onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                    className={`${inputClass("message")} resize-none`}
                  />
                  {errors.message && <p className="text-red-400 text-xs mt-1 font-['DM_Sans']">{errors.message}</p>}
                </div>
                {/* Submit */}
                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2.5 px-8 py-4 bg-[#7B9EC4] text-white rounded-full font-medium hover:bg-[#6a8db3] transition-all hover:shadow-lg hover:shadow-[#7B9EC4]/30 hover:-translate-y-0.5 font-['DM_Sans']"
                >
                  <Send size={18} /> Open in Email App
                </button>
              </form>
            )}
          </AnimSection>

          {/* Social links */}
          <AnimSection delay={500}>
            <div className="flex items-center justify-center gap-6 mt-12">
              <div className="h-px flex-1 bg-white/10" />
              <span className="text-white/30 text-xs font-['DM_Sans'] tracking-widest uppercase">Find me on</span>
              <div className="h-px flex-1 bg-white/10" />
            </div>
            <div className="flex justify-center gap-4 mt-6">
              {[
                { icon: Linkedin, href: "https://www.linkedin.com/in/maria-valencia-0b36aa2b6/", label: "LinkedIn" },
                { icon: Instagram, href: "https://www.instagram.com/jose2015010", label: "Instagram" },
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-12 h-12 rounded-full border border-white/15 flex items-center justify-center text-white/50 hover:text-[#7B9EC4] hover:border-[#7B9EC4]/40 hover:bg-[#7B9EC4]/10 transition-all"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </AnimSection>
        </div>
      </div>
    </section>
  );
}

// ─── Footer ───────────────────────────────────────────────────
function Footer() {
  return (
    <footer className="py-8 bg-[#1A2340] border-t border-white/5">
      <div className="container flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-white/30 text-sm font-['DM_Sans']">
          © {new Date().getFullYear()} Maria Valencia. All rights reserved.
        </p>
        <div className="flex items-center gap-1 text-white/25 text-sm font-['DM_Sans']">
          Made with <Heart size={12} className="text-[#7B9EC4] mx-1" /> and a lot of creativity
        </div>
      </div>
    </footer>
  );
}

// ─── Main Export ──────────────────────────────────────────────
export default function Home() {
  return (
    <div className="min-h-screen bg-[#FAF7F2]">
      <Nav />
      <Hero />
      <About />
      <Experience />
      <Skills />
      <BestWorks />
      <Contact />
      <Footer />
    </div>
  );
}
