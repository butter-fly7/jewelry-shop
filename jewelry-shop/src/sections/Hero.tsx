import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const slides = [
  {
    id: 1,
    title: "璀璨 · 18K 金钻石项链",
    subtitle: "每一颗钻石都是宇宙的星光",
    desc: "精选南非优质钻石，18K 黄金打造，诠释永恒之美",
    cta: "立即选购",
    cta2: "查看系列",
    badge: "NEW",
    bg: "from-slate-900 via-amber-950 to-slate-800",
    accent: "#ffd700",
    image: "💎",
    overlay: "bg-[radial-gradient(ellipse_at_right,_rgba(218,165,32,0.25)_0%,_transparent_60%)]",
    primaryPath: "/product/1",
    secondaryPath: "/category/necklace",
  },
  {
    id: 2,
    title: "春季新品 · 珍珠耳饰系列",
    subtitle: "优雅从耳边开始",
    desc: "采用南海天然淡水珍珠，搭配925纯银，优雅精致",
    cta: "立即选购",
    cta2: "查看系列",
    badge: "限定",
    bg: "from-rose-950 via-pink-900 to-slate-900",
    accent: "#ffc0cb",
    image: "🌸",
    overlay: "bg-[radial-gradient(ellipse_at_right,_rgba(255,182,193,0.2)_0%,_transparent_60%)]",
    primaryPath: "/category/earring",
    secondaryPath: "/category/earring",
  },
  {
    id: 3,
    title: "情侣对戒 · 白金铂金系列",
    subtitle: "把爱刻进金属的纹理里",
    desc: "铂金 PT950 材质，专为爱情设计，见证每一段珍贵时光",
    cta: "立即选购",
    cta2: "查看系列",
    badge: "热销",
    bg: "from-slate-800 via-gray-900 to-zinc-900",
    accent: "#e8e8e8",
    image: "💍",
    overlay: "bg-[radial-gradient(ellipse_at_right,_rgba(232,232,232,0.15)_0%,_transparent_60%)]",
    primaryPath: "/category/ring",
    secondaryPath: "/category/ring",
  },
  {
    id: 4,
    title: "母亲节特辑 · 翡翠手链",
    subtitle: "用东方玉韵，述说深情",
    desc: "天然 A 货翡翠，玉质温润细腻，传递无尽孝心",
    cta: "立即选购",
    cta2: "查看系列",
    badge: "母亲节",
    bg: "from-emerald-950 via-teal-900 to-slate-800",
    accent: "#50c878",
    image: "🪬",
    overlay: "bg-[radial-gradient(ellipse_at_right,_rgba(80,200,120,0.2)_0%,_transparent_60%)]",
    primaryPath: "/product/9",
    secondaryPath: "/category/bracelet",
  },
];

export function Hero() {
  const navigate = useNavigate();
  const [current, setCurrent] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const goTo = useCallback(
    (index: number) => {
      if (isTransitioning) return;
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrent(index);
        setIsTransitioning(false);
      }, 200);
    },
    [isTransitioning]
  );

  const next = useCallback(() => {
    goTo((current + 1) % slides.length);
  }, [current, goTo]);

  const prev = useCallback(() => {
    goTo((current - 1 + slides.length) % slides.length);
  }, [current, goTo]);

  useEffect(() => {
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next]);

  const slide = slides[current];

  return (
    <section className={`relative min-h-screen flex items-center bg-gradient-to-br ${slide.bg} transition-all duration-700 overflow-hidden`}>
      {/* Decorative background elements */}
      <div className={`absolute inset-0 ${slide.overlay}`} />
      <div className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `radial-gradient(circle at 20% 80%, ${slide.accent} 0%, transparent 50%), radial-gradient(circle at 80% 20%, ${slide.accent} 0%, transparent 50%)`,
        }}
      />

      {/* Floating particles */}
      {[...Array(8)].map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full opacity-20 animate-pulse"
          style={{
            width: `${Math.random() * 6 + 2}px`,
            height: `${Math.random() * 6 + 2}px`,
            background: slide.accent,
            left: `${10 + i * 11}%`,
            top: `${20 + (i % 3) * 25}%`,
            animationDelay: `${i * 0.5}s`,
            animationDuration: `${2 + i * 0.3}s`,
          }}
        />
      ))}

      <div className="relative max-w-7xl mx-auto px-6 lg:px-16 pt-24 pb-20 w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text content */}
          <div
            className={`transition-all duration-500 ${
              isTransitioning ? "opacity-0 translate-y-4" : "opacity-100 translate-y-0"
            }`}
          >
            <div
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold mb-6 border"
              style={{ borderColor: slide.accent, color: slide.accent, backgroundColor: `${slide.accent}15` }}
            >
              <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: slide.accent }} />
              {slide.badge}
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-4">
              {slide.title.split(" · ").map((part, i) => (
                <span key={i}>
                  {i > 0 && (
                    <span style={{ color: slide.accent }}> · </span>
                  )}
                  {i === 1 ? (
                    <span style={{ color: slide.accent }}>{part}</span>
                  ) : part}
                </span>
              ))}
            </h1>

            <p className="text-xl font-light text-white/80 mb-3 tracking-wide">
              {slide.subtitle}
            </p>
            <p className="text-sm text-white/60 mb-10 max-w-md leading-relaxed">
              {slide.desc}
            </p>

            <div className="flex items-center gap-4 flex-wrap">
              <Button
                onClick={() => navigate(slide.primaryPath)}
                className="shimmer-btn text-white font-semibold px-8 py-6 text-base rounded-full border-0 shadow-lg hover:scale-105 transition-transform cursor-pointer"
              >
                {slide.cta}
                <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
              </Button>
              <Button
                onClick={() => navigate(slide.secondaryPath)}
                variant="outline"
                className="px-8 py-6 text-base rounded-full border-white/30 text-white bg-white/10 hover:bg-white/20 backdrop-blur cursor-pointer"
              >
                {slide.cta2}
                <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
              </Button>
            </div>

            {/* Stats */}
            <div className="flex items-center gap-8 mt-12">
              {[
                { value: "10,000+", label: "款式在售" },
                { value: "98%", label: "好评率" },
                { value: "500万+", label: "信赖顾客" },
              ].map((stat) => (
                <div key={stat.label}>
                  <div className="text-xl font-bold" style={{ color: slide.accent }}>
                    {stat.value}
                  </div>
                  <div className="text-xs text-white/50 mt-0.5">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Hero visual */}
          <div
            className={`flex justify-center items-center transition-all duration-500 ${
              isTransitioning ? "opacity-0 scale-95" : "opacity-100 scale-100"
            }`}
          >
            <div
              className="relative w-72 h-72 lg:w-96 lg:h-96 rounded-full flex items-center justify-center"
              style={{
                background: `radial-gradient(circle, ${slide.accent}20 0%, transparent 70%)`,
                boxShadow: `0 0 80px ${slide.accent}30`,
              }}
            >
              <div
                className="absolute inset-8 rounded-full border opacity-30 animate-spin"
                style={{ borderColor: slide.accent, animationDuration: "20s" }}
              />
              <div
                className="absolute inset-16 rounded-full border opacity-20 animate-spin"
                style={{ borderColor: slide.accent, animationDuration: "15s", animationDirection: "reverse" }}
              />
              <span className="text-8xl lg:text-9xl filter drop-shadow-2xl" style={{ filter: `drop-shadow(0 0 30px ${slide.accent}80)` }}>
                {slide.image}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation arrows */}
      <button
        onClick={prev}
        className="absolute left-4 lg:left-8 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 backdrop-blur border border-white/20 text-white flex items-center justify-center hover:bg-white/20 transition-colors"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button
        onClick={next}
        className="absolute right-4 lg:right-8 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 backdrop-blur border border-white/20 text-white flex items-center justify-center hover:bg-white/20 transition-colors"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Dots */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-2">
        {slides.map((s, i) => (
          <button
            key={s.id}
            onClick={() => goTo(i)}
            className={`rounded-full transition-all duration-300 ${
              i === current ? "w-8 h-2" : "w-2 h-2 bg-white/30"
            }`}
            style={i === current ? { background: slide.accent } : {}}
          />
        ))}
      </div>
    </section>
  );
}
