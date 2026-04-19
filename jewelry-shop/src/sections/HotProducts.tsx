import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const tabs = ["全部", "项链", "耳饰", "戒指", "手链", "套装"];

const products = [
  {
    id: 1,
    name: "18K金钻石蝴蝶项链",
    category: "项链",
    price: 3680,
    originalPrice: 4599,
    rating: 4.9,
    reviews: 2341,
    emoji: "💎",
    tags: ["新品", "热销"],
    color: "bg-gradient-to-br from-amber-50 to-yellow-100",
    badgeColor: "bg-amber-500",
    material: "18K黄金 · 天然钻石",
    sold: 5632,
  },
  {
    id: 2,
    name: "南海珍珠耳环一对",
    category: "耳饰",
    price: 1280,
    originalPrice: 1680,
    rating: 4.8,
    reviews: 1896,
    emoji: "🌸",
    tags: ["珍珠", "优雅"],
    color: "bg-gradient-to-br from-rose-50 to-pink-100",
    badgeColor: "bg-rose-500",
    material: "淡水珍珠 · 925纯银",
    sold: 3241,
  },
  {
    id: 3,
    name: "PT950铂金情侣对戒",
    category: "戒指",
    price: 5980,
    originalPrice: 7200,
    rating: 5.0,
    reviews: 987,
    emoji: "💍",
    tags: ["对戒", "定制"],
    color: "bg-gradient-to-br from-slate-50 to-gray-100",
    badgeColor: "bg-slate-500",
    material: "PT950铂金 · 可免费刻字",
    sold: 1892,
  },
  {
    id: 4,
    name: "天然翡翠A货手镯",
    category: "手链",
    price: 8800,
    originalPrice: 12000,
    rating: 4.9,
    reviews: 654,
    emoji: "🪬",
    tags: ["翡翠", "A货"],
    color: "bg-gradient-to-br from-emerald-50 to-teal-100",
    badgeColor: "bg-emerald-600",
    material: "天然翡翠A货 · 冰种",
    sold: 892,
  },
  {
    id: 5,
    name: "黄金999足金转运珠",
    category: "手链",
    price: 2360,
    originalPrice: 2800,
    rating: 4.7,
    reviews: 3120,
    emoji: "🌟",
    tags: ["足金", "转运"],
    color: "bg-gradient-to-br from-yellow-50 to-amber-100",
    badgeColor: "bg-yellow-600",
    material: "999足金 · 精工打造",
    sold: 7821,
  },
  {
    id: 6,
    name: "水晶星月项链套装",
    category: "套装",
    price: 899,
    originalPrice: 1299,
    rating: 4.8,
    reviews: 2567,
    emoji: "🌙",
    tags: ["套装", "礼盒"],
    color: "bg-gradient-to-br from-violet-50 to-purple-100",
    badgeColor: "bg-violet-500",
    material: "天然水晶 · 礼盒包装",
    sold: 6543,
  },
  {
    id: 7,
    name: "复古宫廷胸针花卉",
    category: "项链",
    price: 456,
    originalPrice: 688,
    rating: 4.6,
    reviews: 1234,
    emoji: "🌺",
    tags: ["复古", "精致"],
    color: "bg-gradient-to-br from-orange-50 to-red-100",
    badgeColor: "bg-orange-500",
    material: "锌合金镀金 · 手工嵌钻",
    sold: 4321,
  },
  {
    id: 8,
    name: "蓝宝石18K耳钉",
    category: "耳饰",
    price: 2180,
    originalPrice: 2980,
    rating: 4.9,
    reviews: 876,
    emoji: "💙",
    tags: ["蓝宝石", "高端"],
    color: "bg-gradient-to-br from-blue-50 to-sky-100",
    badgeColor: "bg-blue-600",
    material: "18K白金 · 天然蓝宝石",
    sold: 2134,
  },
];

interface ProductCardProps {
  product: typeof products[0];
}

function ProductCard({ product }: ProductCardProps) {
  const navigate = useNavigate();
  const [liked, setLiked] = useState(false);
  const [inCart, setInCart] = useState(false);

  const discount = Math.round((1 - product.price / product.originalPrice) * 100);

  return (
    <div
      onClick={() => navigate(`/product?id=${product.id}`)}
      className="product-card group relative bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer"
    >
      {/* Image area */}
      <div className={`relative h-52 ${product.color} overflow-hidden`}>
        {/* Tags */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
          {product.tags.map((tag) => (
            <Badge
              key={tag}
              className={`${product.badgeColor} text-white text-[10px] px-2 py-0.5 border-0 shadow-sm`}
            >
              {tag}
            </Badge>
          ))}
          <Badge className="bg-red-500 text-white text-[10px] px-2 py-0.5 border-0 shadow-sm">
            -{discount}%
          </Badge>
        </div>

        {/* Wishlist */}
        <button
          onClick={(e) => { e.stopPropagation(); setLiked(!liked); }}
          className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-white/80 backdrop-blur flex items-center justify-center shadow-sm hover:bg-white transition-colors"
        >
          <svg
            className={`w-4 h-4 transition-colors ${liked ? "text-red-500 fill-red-500" : "text-gray-400"}`}
            fill={liked ? "currentColor" : "none"}
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        </button>

        {/* Product image */}
        <div className="product-image h-full flex items-center justify-center transition-transform duration-300">
          <span className="text-7xl filter drop-shadow-lg">{product.emoji}</span>
        </div>

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors" />
      </div>

      {/* Content */}
      <div className="p-4">
        <div className="text-xs text-gray-400 mb-1">{product.material}</div>
        <h3 className="font-semibold text-gray-900 text-sm mb-2 line-clamp-1">
          {product.name}
        </h3>

        {/* Rating */}
        <div className="flex items-center gap-1 mb-3">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                className={`w-3 h-3 ${i < Math.floor(product.rating) ? "text-amber-400 fill-amber-400" : "text-gray-200 fill-gray-200"}`}
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
          <span className="text-[11px] text-gray-500">{product.rating} ({product.reviews.toLocaleString()})</span>
          <span className="ml-auto text-[11px] text-gray-400">已售 {product.sold.toLocaleString()}</span>
        </div>

        {/* Price */}
        <div className="flex items-baseline gap-2 mb-3">
          <span className="text-lg font-bold text-red-600">¥{product.price.toLocaleString()}</span>
          <span className="text-xs text-gray-400 line-through">¥{product.originalPrice.toLocaleString()}</span>
        </div>

        {/* Add to cart */}
        <Button
          className={`w-full h-8 text-xs font-medium transition-all ${
            inCart
              ? "bg-green-500 hover:bg-green-600 text-white"
              : "gold-gradient hover:opacity-90 text-white border-0"
          }`}
          onClick={(e) => { e.stopPropagation(); setInCart(true); }}
        >
          {inCart ? (
            <>
              <svg className="w-3.5 h-3.5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
              已加入购物车
            </>
          ) : (
            <>
              <svg className="w-3.5 h-3.5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              加入购物车
            </>
          )}
        </Button>
      </div>
    </div>
  );
}

export function HotProducts() {
  const [activeTab, setActiveTab] = useState("全部");

  const filtered =
    activeTab === "全部"
      ? products
      : products.filter((p) => p.category === activeTab);

  return (
    <section className="py-20 bg-white" id="hot">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 mb-4">
              <div className="h-px w-12 bg-gradient-to-r from-transparent to-amber-400" />
              <span className="text-amber-600 text-sm font-semibold tracking-widest uppercase">Hot Products</span>
              <div className="h-px w-12 bg-gradient-to-l from-transparent to-amber-400" />
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
              热门<span className="gold-text">爆款</span>
            </h2>
            <p className="text-gray-500 mt-2 text-sm">精选销量榜首，每一款都是品质之选</p>
          </div>
          <Link to="/category/necklace" className="text-amber-600 text-sm font-medium flex items-center gap-1 hover:gap-2 transition-all shrink-0">
            查看全部商品
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-8 overflow-x-auto pb-2 scrollbar-hide">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap shrink-0 ${
                activeTab === tab
                  ? "gold-gradient text-white shadow-md"
                  : "bg-gray-100 text-gray-600 hover:bg-amber-50 hover:text-amber-700"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Product grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
