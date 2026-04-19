import { useState } from "react";
import { useParams, Link, useLocation, useNavigate } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getCategoryByKey, categories } from "@/data/products";

export function CategoryPage() {
  const navigate = useNavigate();
  const { key: paramKey } = useParams<{ key: string }>();
  const location = useLocation();
  // Support both /category/:key and /:key shorthand routes
  const key = paramKey || location.pathname.replace("/", "");
  const cat = getCategoryByKey(key || "");
  const [wishlist, setWishlist] = useState<number[]>([]);
  const [added, setAdded] = useState<number[]>([]);
  const [sortBy, setSortBy] = useState<"default" | "price-asc" | "price-desc" | "sales">("default");

  if (!cat) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-6">
        <p className="text-2xl text-gray-400">暂无此分类</p>
        <Link to="/">
          <Button className="gold-gradient text-white">返回首页</Button>
        </Link>
      </div>
    );
  }

  const sortedProducts = [...cat.products].sort((a, b) => {
    if (sortBy === "price-asc") return a.price - b.price;
    if (sortBy === "price-desc") return b.price - a.price;
    if (sortBy === "sales") return b.sales - a.sales;
    return 0;
  });

  const toggleWishlist = (id: number) => {
    setWishlist((prev) => prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]);
  };

  const handleAddCart = (id: number) => {
    setAdded((prev) => [...prev, id]);
    setTimeout(() => setAdded((prev) => prev.filter((i) => i !== id)), 1200);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Banner */}
      <div className="relative h-64 md:h-80 overflow-hidden">
        <img
          src={cat.banner}
          alt={cat.label}
          className="w-full h-full object-cover"
          loading="lazy"
        />
        <div className={`absolute inset-0 bg-gradient-to-r ${cat.color} opacity-60`} />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-4">
          {/* Breadcrumb */}
          <div className="text-sm opacity-80 mb-4 flex items-center gap-2">
            <Link to="/" className="hover:underline">首页</Link>
            <span>/</span>
            <span>{cat.label}</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-wider drop-shadow mb-3">
            {cat.bannerTitle}
          </h1>
          <p className="text-lg opacity-90">{cat.bannerSub}</p>
        </div>
      </div>

      {/* Category quick-switch */}
      <div className="bg-white border-b shadow-sm sticky top-[calc(4rem+1.75rem)] z-30">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center gap-2 overflow-x-auto scrollbar-none">
          {categories.map((c) => (
            <Link
              key={c.key}
              to={`/category/${c.key}`}
              className={`shrink-0 px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                c.key === cat.key
                  ? "gold-gradient text-white shadow"
                  : "bg-gray-100 text-gray-600 hover:bg-amber-50 hover:text-amber-700"
              }`}
            >
              {c.label}
            </Link>
          ))}
        </div>
      </div>

      {/* Toolbar */}
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <p className="text-sm text-gray-500">共 <span className="font-semibold text-amber-700">{cat.products.length}</span> 件商品</p>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-500">排序：</span>
          {[
            { value: "default", label: "综合" },
            { value: "sales", label: "销量" },
            { value: "price-asc", label: "价格↑" },
            { value: "price-desc", label: "价格↓" },
          ].map((opt) => (
            <button
              key={opt.value}
              onClick={() => setSortBy(opt.value as typeof sortBy)}
              className={`px-3 py-1 rounded text-xs font-medium transition-colors ${
                sortBy === opt.value
                  ? "bg-amber-500 text-white"
                  : "bg-white border border-gray-200 text-gray-600 hover:border-amber-400"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* Product Grid */}
      <div className="max-w-7xl mx-auto px-4 pb-16">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 md:gap-6">
          {sortedProducts.map((product) => (
            <div
              key={product.id}
              onClick={() => navigate(`/product?id=${product.id}`)}
              className="bg-white rounded-2xl overflow-hidden shadow hover:shadow-xl transition-all duration-300 group cursor-pointer"
            >
              {/* Image */}
              <div className="relative overflow-hidden aspect-square">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  loading="lazy"
                />
                {/* Tag */}
                {product.tag && (
                  <Badge className={`absolute top-2 left-2 text-xs ${
                    product.tag === "NEW" ? "bg-emerald-500" :
                    product.tag === "热销" ? "bg-red-500" :
                    product.tag === "奢品" ? "bg-purple-600" :
                    "bg-amber-500"
                  } text-white border-0`}>
                    {product.tag}
                  </Badge>
                )}
                {/* Discount */}
                {product.originalPrice && (
                  <Badge className="absolute top-2 right-2 bg-red-600 text-white text-xs border-0">
                    {Math.round((1 - product.price / product.originalPrice) * 10)}折
                  </Badge>
                )}
                {/* Wishlist */}
                <button
                  onClick={(e) => { e.stopPropagation(); toggleWishlist(product.id); }}
                  className="absolute bottom-2 right-2 w-8 h-8 bg-white/90 rounded-full flex items-center justify-center shadow transition-transform hover:scale-110"
                  aria-label="收藏"
                >
                  <svg
                    className={`w-4 h-4 transition-colors ${wishlist.includes(product.id) ? "fill-red-500 stroke-red-500" : "fill-none stroke-gray-400"}`}
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </button>
              </div>

              {/* Info */}
              <div className="p-3">
                <h3 className="text-sm font-semibold text-gray-800 truncate mb-1">{product.name}</h3>
                <p className="text-xs text-gray-400 truncate mb-2">{product.description}</p>

                {/* Rating & Sales */}
                <div className="flex items-center gap-2 mb-2">
                  <div className="flex text-amber-400 text-xs">
                    {"★".repeat(Math.floor(product.rating))}
                  </div>
                  <span className="text-xs text-gray-400">已售 {product.sales.toLocaleString()}</span>
                </div>

                {/* Price */}
                <div className="flex items-baseline gap-1 mb-3">
                  <span className="text-amber-600 font-bold text-lg">¥{product.price.toLocaleString()}</span>
                  {product.originalPrice && (
                    <span className="text-gray-300 text-xs line-through">¥{product.originalPrice.toLocaleString()}</span>
                  )}
                </div>

                {/* Add to cart */}
                <Button
                  size="sm"
                  className={`w-full text-xs transition-all ${
                    added.includes(product.id)
                      ? "bg-green-500 hover:bg-green-500 text-white"
                      : "gold-gradient text-white hover:opacity-90"
                  }`}
                  onClick={(e) => { e.stopPropagation(); handleAddCart(product.id); }}
                >
                  {added.includes(product.id) ? "✓ 已加入" : "加入购物车"}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
