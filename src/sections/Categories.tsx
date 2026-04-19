import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";

const categories = [
  {
    id: "necklace",
    name: "项链",
    sub: "Necklace",
    emoji: "📿",
    count: 386,
    color: "from-amber-50 to-yellow-100",
    border: "border-amber-200",
    hover: "hover:border-amber-400 hover:shadow-amber-100",
    badge: "黄金 / 钻石 / 珍珠",
    hot: true,
  },
  {
    id: "earring",
    name: "耳饰",
    sub: "Earrings",
    emoji: "✨",
    count: 512,
    color: "from-rose-50 to-pink-100",
    border: "border-rose-200",
    hover: "hover:border-rose-400 hover:shadow-rose-100",
    badge: "耳钉 / 耳环 / 耳夹",
    hot: true,
  },
  {
    id: "ring",
    name: "戒指",
    sub: "Rings",
    emoji: "💍",
    count: 298,
    color: "from-violet-50 to-purple-100",
    border: "border-violet-200",
    hover: "hover:border-violet-400 hover:shadow-violet-100",
    badge: "对戒 / 钻戒 / 玉戒",
    hot: false,
  },
  {
    id: "bracelet",
    name: "手链手镯",
    sub: "Bracelets",
    emoji: "🪬",
    count: 224,
    color: "from-emerald-50 to-teal-100",
    border: "border-emerald-200",
    hover: "hover:border-emerald-400 hover:shadow-emerald-100",
    badge: "翡翠 / 和田玉 / 黄金",
    hot: false,
  },
  {
    id: "brooch",
    name: "胸针摆件",
    sub: "Brooches",
    emoji: "🌺",
    count: 156,
    color: "from-sky-50 to-blue-100",
    border: "border-sky-200",
    hover: "hover:border-sky-400 hover:shadow-sky-100",
    badge: "复古 / 时尚 / 礼品",
    hot: false,
  },
  {
    id: "set",
    name: "套装礼盒",
    sub: "Gift Sets",
    emoji: "🎁",
    count: 89,
    color: "from-orange-50 to-amber-100",
    border: "border-orange-200",
    hover: "hover:border-orange-400 hover:shadow-orange-100",
    badge: "节日 / 婚庆 / 定制",
    hot: false,
  },
];

export function Categories() {
  return (
    <section className="py-20 bg-gradient-to-b from-white to-amber-50/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-amber-400" />
            <span className="text-amber-600 text-sm font-semibold tracking-widest uppercase">Categories</span>
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-amber-400" />
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
            精选首饰<span className="gold-text">分类</span>
          </h2>
          <p className="text-gray-500 text-base max-w-xl mx-auto">
            覆盖各类首饰品类，为您甄选每一款精品
          </p>
        </div>

        {/* Category grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              to={cat.id === "brooch" ? "/" : `/category/${cat.id}`}
              className={`group relative bg-gradient-to-b ${cat.color} border ${cat.border} ${cat.hover} rounded-2xl p-5 flex flex-col items-center gap-3 transition-all duration-300 hover:scale-105 hover:shadow-lg cursor-pointer`}
            >
              {cat.hot && (
                <Badge className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] px-1.5 py-0.5 border-0">
                  HOT
                </Badge>
              )}

              {/* Icon */}
              <div className="w-14 h-14 rounded-full bg-white/70 flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow">
                <span className="text-2xl">{cat.emoji}</span>
              </div>

              {/* Text */}
              <div className="text-center">
                <div className="font-bold text-gray-800 text-sm">{cat.name}</div>
                <div className="text-gray-400 text-[10px] mb-1">{cat.sub}</div>
                <div className="text-xs text-gray-500 leading-tight">{cat.badge}</div>
              </div>

              {/* Count */}
              <div className="text-[11px] text-gray-400 mt-auto">
                {cat.count}+ 款
              </div>
            </Link>
          ))}
        </div>

        {/* Feature tags */}
        <div className="flex flex-wrap justify-center gap-3 mt-10">
          {["免费刻字", "终身保养", "正品保证", "7天退换", "定制服务", "专属包装"].map((tag) => (
            <div
              key={tag}
              className="flex items-center gap-1.5 px-4 py-2 bg-white border border-amber-200 rounded-full text-xs text-amber-700 font-medium shadow-sm"
            >
              <svg className="w-3.5 h-3.5 text-amber-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              {tag}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
