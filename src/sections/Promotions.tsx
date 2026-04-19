import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

// Countdown timer hook
function useCountdown(targetHours: number) {
  const calcRemaining = () => {
    const now = new Date();
    const target = new Date(now);
    target.setHours(target.getHours() + targetHours, 0, 0, 0);
    const diff = target.getTime() - now.getTime();
    return {
      h: Math.floor(diff / 3600000),
      m: Math.floor((diff % 3600000) / 60000),
      s: Math.floor((diff % 60000) / 1000),
    };
  };

  const [time, setTime] = useState(calcRemaining);

  useEffect(() => {
    const timer = setInterval(() => setTime(calcRemaining()), 1000);
    return () => clearInterval(timer);
  });

  return time;
}

function CountdownUnit({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <div className="bg-black/80 text-white text-xl sm:text-2xl font-bold w-10 sm:w-12 h-10 sm:h-12 rounded-lg flex items-center justify-center">
        {String(value).padStart(2, "0")}
      </div>
      <div className="text-[10px] text-white/60 mt-1">{label}</div>
    </div>
  );
}

const flashDeals = [
  { id: 1, name: "碎钻项链", emoji: "💎", price: 299, original: 599, stock: 23, soldPct: 76, productId: 101 },
  { id: 2, name: "珍珠耳钉", emoji: "🌸", price: 188, original: 399, stock: 45, soldPct: 62, productId: 201 },
  { id: 3, name: "情侣戒指", emoji: "💍", price: 488, original: 980, stock: 12, soldPct: 88, productId: 301 },
  { id: 4, name: "黄金手链", emoji: "🌟", price: 1280, original: 1980, stock: 8, soldPct: 94, productId: 401 },
];

const banners = [
  {
    id: 1,
    title: "母亲节感恩特惠",
    desc: "精选妈妈最爱首饰，全场 7 折起",
    emoji: "🌹",
    bg: "from-rose-600 to-pink-700",
    cta: "立即抢购",
    end: "05.12 截止",
    path: "/product?id=109",
  },
  {
    id: 2,
    title: "新品首发礼遇",
    desc: "2026 春夏系列全新上市，首单立减 150 元",
    emoji: "✨",
    bg: "from-amber-600 to-yellow-700",
    cta: "探索新品",
    end: "限时 72 小时",
    path: "/category/new",
  },
  {
    id: 3,
    title: "会员专属钜惠",
    desc: "注册即享 9 折优惠券，积分可抵现金",
    emoji: "👑",
    bg: "from-violet-600 to-purple-700",
    cta: "立即注册",
    end: "长期有效",
    path: "/custom",
  },
];

export function Promotions() {
  const navigate = useNavigate();
  const time = useCountdown(3);

  return (
    <section className="py-20 bg-gradient-to-b from-amber-50/30 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">

        {/* ─── Flash Sale ─── */}
        <div>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div className="flex items-center gap-4">
              <div>
                <div className="inline-flex items-center gap-2 mb-1">
                  <div className="h-px w-8 bg-gradient-to-r from-transparent to-amber-400" />
                  <span className="text-amber-600 text-xs font-semibold tracking-widest uppercase">Flash Sale</span>
                </div>
                <h2 className="text-3xl font-bold text-gray-900">
                  限时<span className="gold-text">秒杀</span>
                </h2>
              </div>
              {/* Countdown */}
              <div className="flex items-center gap-1 ml-2">
                <CountdownUnit value={time.h} label="时" />
                <span className="text-white font-bold text-xl mb-4">:</span>
                <CountdownUnit value={time.m} label="分" />
                <span className="text-white font-bold text-xl mb-4">:</span>
                <CountdownUnit value={time.s} label="秒" />
              </div>
            </div>
            <Badge className="bg-red-500 text-white border-0 text-sm px-4 py-1.5 animate-pulse">
              🔥 抢购进行中
            </Badge>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {flashDeals.map((deal) => (
              <div
                key={deal.id}
                className="bg-white border border-red-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all hover:-translate-y-0.5 group"
              >
                <div className="bg-gradient-to-br from-red-50 to-orange-50 h-32 flex items-center justify-center relative">
                  <Badge className="absolute top-2 left-2 bg-red-500 text-white text-[10px] border-0">
                    -{Math.round((1 - deal.price / deal.original) * 100)}%
                  </Badge>
                  <span className="text-5xl group-hover:scale-110 transition-transform">{deal.emoji}</span>
                </div>
                <div className="p-3">
                  <div className="font-medium text-gray-800 text-sm mb-1">{deal.name}</div>
                  <div className="flex items-baseline gap-1.5 mb-2">
                    <span className="text-red-600 font-bold text-base">¥{deal.price}</span>
                    <span className="text-gray-400 text-xs line-through">¥{deal.original}</span>
                  </div>
                  {/* Progress bar */}
                  <div className="mb-2">
                    <div className="flex justify-between text-[10px] text-gray-400 mb-1">
                      <span>仅剩 {deal.stock} 件</span>
                      <span>{deal.soldPct}% 已抢</span>
                    </div>
                    <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-red-400 to-orange-500"
                        style={{ width: `${deal.soldPct}%` }}
                      />
                    </div>
                  </div>
                  <Button
                    className="w-full h-7 text-xs bg-red-500 hover:bg-red-600 text-white border-0"
                    onClick={() => navigate(`/product?id=${deal.productId}`)}
                  >
                    立即抢购
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ─── Promo Banners ─── */}
        <div>
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 mb-4">
              <div className="h-px w-12 bg-gradient-to-r from-transparent to-amber-400" />
              <span className="text-amber-600 text-sm font-semibold tracking-widest uppercase">Special Offers</span>
              <div className="h-px w-12 bg-gradient-to-l from-transparent to-amber-400" />
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
              专属<span className="gold-text">优惠活动</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-5">
            {banners.map((banner) => (
              <div
                key={banner.id}
                onClick={() => navigate(banner.path)}
                className={`relative bg-gradient-to-br ${banner.bg} rounded-2xl p-6 overflow-hidden group cursor-pointer`}
              >
                {/* Decorative circle */}
                <div className="absolute -right-6 -top-6 w-32 h-32 rounded-full bg-white/10" />
                <div className="absolute -right-2 -bottom-8 w-24 h-24 rounded-full bg-white/5" />

                <div className="relative z-10">
                  <div className="text-4xl mb-3">{banner.emoji}</div>
                  <div className="text-xs text-white/70 mb-1">{banner.end}</div>
                  <h3 className="text-xl font-bold text-white mb-2">{banner.title}</h3>
                  <p className="text-sm text-white/80 mb-5 leading-relaxed">{banner.desc}</p>
                  <Button
                    variant="outline"
                    className="border-white/50 text-white bg-white/15 hover:bg-white/25 text-sm font-medium group-hover:border-white transition-colors"
                    onClick={() => navigate(banner.path)}
                  >
                    {banner.cta}
                    <svg className="ml-1.5 w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                    </svg>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ─── Brand Promise ─── */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { icon: "🛡️", title: "正品保障", desc: "全场100%正品，假一赔十" },
            { icon: "🚚", title: "极速发货", desc: "24小时内发货，顺丰包邮" },
            { icon: "↩️", title: "无忧退换", desc: "7天无理由退换，无需理由" },
            { icon: "💎", title: "品质认证", desc: "国家珠宝玉石质量检测证书" },
          ].map((item) => (
            <div
              key={item.title}
              className="flex items-start gap-3 p-5 bg-amber-50/50 border border-amber-100 rounded-xl"
            >
              <span className="text-2xl shrink-0">{item.icon}</span>
              <div>
                <div className="font-semibold text-gray-900 text-sm">{item.title}</div>
                <div className="text-xs text-gray-500 mt-0.5">{item.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
