import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { getProductById } from "@/data/products";

const materials = ["18K黄金", "925纯银", "PT950铂金"];
const sizes = ["16cm", "17cm", "18cm", "19cm", "20cm", "21cm", "22cm"];
const colors = ["金色", "银色", "玫瑰金"];

export function ProductDetailPage() {
  const params = new URLSearchParams(window.location.search);
  const productId = parseInt(params.get("id") || "101");

  const result = getProductById(productId);
  const [selectedImg, setSelectedImg] = useState(0);
  const [material, setMaterial] = useState(materials[0]);
  const [size, setSize] = useState(sizes[2]);
  const [color, setColor] = useState(colors[0]);
  const [qty, setQty] = useState(1);
  const [engraving, setEngraving] = useState("");
  const [giftBox, setGiftBox] = useState(false);
  const [cartAdded, setCartAdded] = useState(false);
  const [activeTab, setActiveTab] = useState<"detail" | "spec">("detail");

  if (!result) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-6 bg-gray-50">
        <p className="text-2xl text-gray-400">未找到该商品</p>
        <Link to="/">
          <Button className="bg-gradient-to-r from-amber-500 to-yellow-500 text-white hover:opacity-90">返回首页</Button>
        </Link>
      </div>
    );
  }

  const { product, category } = result;
  const discount = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : 0;
  const engravingFee = engraving.trim() ? 30 : 0;
  const giftFee = giftBox ? 38 : 0;
  const total = (product.price + engravingFee + giftFee) * qty;

  const handleAddCart = () => {
    setCartAdded(true);
    setTimeout(() => setCartAdded(false), 2000);
  };

  const handleBuyNow = () => {
    alert(`✅ 订单确认\n\n商品：${product.name}\n材质：${material} | 尺寸：${size} | 颜色：${color}\n数量：${qty} 件\n${engraving.trim() ? `刻字内容：${engraving}\n` : ""}${giftBox ? "精美礼盒包装 ✓\n" : ""}\n合计：¥${total.toLocaleString()}\n\n感谢您的购买！`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 面包屑导航 */}
      <div className="bg-white border-b shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center gap-2 text-sm text-gray-500">
          <Link to="/" className="hover:text-amber-600 font-medium">首页</Link>
          <span className="text-gray-300">›</span>
          <Link to={`/category/${category.key}`} className="hover:text-amber-600">{category.label}</Link>
          <span className="text-gray-300">›</span>
          <span className="text-gray-700 font-medium truncate max-w-xs">{product.name}</span>
        </div>
      </div>

      {/* 商品主体 */}
      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <div className="grid md:grid-cols-2 gap-0">

            {/* ── 左侧：图片画廊 ── */}
            <div className="p-6 bg-gray-50">
              {/* 主图 */}
              <div
                className="rounded-xl overflow-hidden bg-white border shadow-sm mb-4 cursor-zoom-in"
                style={{ aspectRatio: "1" }}
              >
                <img
                  src={product.images[selectedImg]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              {/* 缩略图 */}
              <div className="flex gap-2">
                {product.images.map((src, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImg(i)}
                    className={`w-16 h-16 rounded-lg overflow-hidden border-2 transition-all flex-shrink-0 ${
                      selectedImg === i
                        ? "border-amber-500 shadow-md ring-2 ring-amber-200"
                        : "border-gray-200 hover:border-amber-300"
                    }`}
                  >
                    <img src={src} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

            {/* ── 右侧：商品信息 ── */}
            <div className="p-6 flex flex-col gap-5">
              {/* 标签 */}
              <div className="flex gap-2 flex-wrap">
                {product.tag && (
                  <Badge className="bg-red-500 text-white border-0 text-xs">{product.tag}</Badge>
                )}
                {discount > 0 && (
                  <Badge className="bg-orange-500 text-white border-0 text-xs">限时{discount}折</Badge>
                )}
                <Badge className="bg-amber-100 text-amber-700 border-amber-300 text-xs">正品保障</Badge>
              </div>

              {/* 商品名 */}
              <h1 className="text-2xl font-bold text-gray-900 leading-snug">
                {product.name}
              </h1>

              {/* 评分 & 销量 */}
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <span
                      key={i}
                      className={i < Math.floor(product.rating) ? "text-amber-400" : "text-gray-200"}
                    >
                      ★
                    </span>
                  ))}
                  <span className="text-amber-600 ml-1 font-medium">{product.rating}</span>
                </div>
                <span className="text-gray-300">|</span>
                <span className="text-gray-500">累计售出 <span className="text-red-500 font-medium">{product.sales.toLocaleString()}</span> 件</span>
                <span className="text-gray-300">|</span>
                <span className="text-gray-400">库存充足</span>
              </div>

              {/* 价格区域 */}
              <div className="bg-gradient-to-r from-red-50 to-orange-50 border border-red-100 rounded-xl p-4">
                <div className="flex items-baseline gap-3">
                  <span className="text-3xl font-bold text-red-600">¥{product.price.toLocaleString()}</span>
                  {product.originalPrice && (
                    <>
                      <span className="text-gray-400 line-through text-lg">¥{product.originalPrice.toLocaleString()}</span>
                      <span className="text-red-500 text-sm font-medium bg-red-100 px-2 py-0.5 rounded">省¥{((product.originalPrice) - product.price).toLocaleString()}</span>
                    </>
                  )}
                </div>
              </div>

              {/* 规格选择：材质 */}
              <div>
                <div className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                  材质
                  <span className="text-gray-400 text-xs">（必选）</span>
                </div>
                <div className="flex gap-2 flex-wrap">
                  {materials.map((m) => (
                    <button
                      key={m}
                      onClick={() => setMaterial(m)}
                      className={`px-4 py-2 rounded-lg text-sm border-2 transition-all font-medium ${
                        material === m
                          ? "bg-amber-500 text-white border-amber-500 shadow-sm"
                          : "bg-white border-gray-200 text-gray-600 hover:border-amber-400 hover:text-amber-600"
                      }`}
                    >
                      {m}
                    </button>
                  ))}
                </div>
              </div>

              {/* 规格选择：尺寸 */}
              <div>
                <div className="text-sm font-medium text-gray-700 mb-2">尺寸</div>
                <div className="flex gap-2 flex-wrap">
                  {sizes.map((s) => (
                    <button
                      key={s}
                      onClick={() => setSize(s)}
                      className={`px-3 py-2 rounded-lg text-sm border-2 transition-all font-medium ${
                        size === s
                          ? "bg-amber-500 text-white border-amber-500 shadow-sm"
                          : "bg-white border-gray-200 text-gray-600 hover:border-amber-400 hover:text-amber-600"
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              {/* 规格选择：颜色 */}
              <div>
                <div className="text-sm font-medium text-gray-700 mb-2">颜色</div>
                <div className="flex gap-2 flex-wrap">
                  {colors.map((c) => (
                    <button
                      key={c}
                      onClick={() => setColor(c)}
                      className={`px-4 py-2 rounded-lg text-sm border-2 transition-all font-medium ${
                        color === c
                          ? "bg-amber-500 text-white border-amber-500 shadow-sm"
                          : "bg-white border-gray-200 text-gray-600 hover:border-amber-400 hover:text-amber-600"
                      }`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>

              {/* 数量选择 */}
              <div>
                <div className="text-sm font-medium text-gray-700 mb-2">数量</div>
                <div className="flex items-center gap-4">
                  <div className="flex border-2 border-gray-200 rounded-lg overflow-hidden">
                    <button
                      onClick={() => setQty(Math.max(1, qty - 1))}
                      className="w-10 h-10 flex items-center justify-center text-gray-500 hover:bg-gray-100 bg-white font-bold text-lg"
                    >
                      −
                    </button>
                    <input
                      type="number"
                      min="1"
                      value={qty}
                      onChange={(e) => setQty(Math.max(1, parseInt(e.target.value) || 1))}
                      className="w-14 h-10 text-center border-x-2 border-gray-200 text-sm font-medium focus:outline-none bg-white"
                    />
                    <button
                      onClick={() => setQty(qty + 1)}
                      className="w-10 h-10 flex items-center justify-center text-gray-500 hover:bg-gray-100 bg-white font-bold text-lg"
                    >
                      +
                    </button>
                  </div>
                  <span className="text-sm text-gray-400">件（库存充足）</span>
                </div>
              </div>

              {/* 刻字定制 */}
              <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                <div className="flex items-center justify-between mb-2">
                  <div className="text-sm font-medium text-gray-700">定制刻字</div>
                  <span className="text-xs text-gray-400">可选，最多12字，+30元</span>
                </div>
                <input
                  type="text"
                  maxLength={12}
                  placeholder="输入刻字内容，如：Love Forever"
                  value={engraving}
                  onChange={(e) => setEngraving(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-400 transition-colors"
                />
                {engraving.trim() && (
                  <p className="text-xs text-amber-600 mt-1.5 flex items-center gap-1">
                    <span className="bg-amber-100 px-2 py-0.5 rounded font-medium">{engraving}</span>
                    <span className="text-gray-400">刻字费 +¥30</span>
                  </p>
                )}
              </div>

              {/* 精美礼盒 */}
              <div
                className="flex items-center gap-3 p-4 bg-white border-2 rounded-xl cursor-pointer transition-all"
                style={{ borderColor: giftBox ? "#f59e0b" : "#e5e7eb" }}
                onClick={() => setGiftBox(!giftBox)}
              >
                <div
                  className="w-6 h-6 rounded border-2 flex items-center justify-center flex-shrink-0 transition-colors"
                  style={{ backgroundColor: giftBox ? "#f59e0b" : "transparent", borderColor: giftBox ? "#f59e0b" : "#d1d5db" }}
                >
                  {giftBox && (
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </div>
                <div className="flex-1">
                  <div className="text-sm font-medium text-gray-700">精美礼盒包装 🎁</div>
                  <div className="text-xs text-gray-400">适合送礼，加 ¥38</div>
                </div>
                <span className="text-amber-600 font-bold text-sm">+¥38</span>
              </div>

              {/* 分割线 */}
              <div className="border-t border-dashed border-gray-200 my-1" />

              {/* 服务保障图标 */}
              <div className="grid grid-cols-2 gap-2">
                {[
                  { icon: "✓", text: "正品保证", color: "text-green-600" },
                  { icon: "✓", text: "顺丰包邮", color: "text-green-600" },
                  { icon: "✓", text: "7天退换", color: "text-green-600" },
                  { icon: "✓", text: "终身保养", color: "text-green-600" },
                ].map((s) => (
                  <div key={s.text} className="flex items-center gap-2 text-xs text-gray-500">
                    <span className={`${s.color} font-bold`}>{s.icon}</span>
                    <span>{s.text}</span>
                  </div>
                ))}
              </div>

              {/* 总计价格 */}
              <div className="bg-amber-50 border-2 border-amber-200 rounded-xl p-4 flex items-center justify-between">
                <span className="text-gray-500 text-sm">商品合计（含运费）</span>
                <div className="text-right">
                  <div className="text-3xl font-bold text-red-600">¥{total.toLocaleString()}</div>
                  {engraving.trim() || giftBox ? (
                    <div className="text-xs text-gray-400 mt-0.5">
                      {engraving.trim() ? `含刻字 ¥30 | ` : ""}{giftBox ? "含礼盒 ¥38" : ""}
                    </div>
                  ) : null}
                </div>
              </div>

              {/* 操作按钮 */}
              <div className="flex gap-3">
                <Button
                  onClick={handleAddCart}
                  className={`flex-1 h-12 text-base font-medium rounded-xl transition-all ${
                    cartAdded
                      ? "bg-green-500 hover:bg-green-600 text-white border-0"
                      : "bg-white border-2 border-amber-500 text-amber-600 hover:bg-amber-50"
                  }`}
                >
                  {cartAdded ? "✓ 已加入购物车" : "🛒 加入购物车"}
                </Button>
                <Button
                  onClick={handleBuyNow}
                  className="flex-1 h-12 text-base font-medium rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-white border-0 shadow-md"
                >
                  立即购买
                </Button>
              </div>

              {/* 店铺 / 收藏 */}
              <div className="flex items-center gap-4 text-sm text-gray-500">
                <div className="flex items-center gap-1">
                  <span className="w-5 h-5 bg-amber-500 rounded text-white text-xs flex items-center justify-center font-bold">宝</span>
                  <span>璀璨珠宝旗舰店</span>
                </div>
                <span className="text-gray-300">|</span>
                <span className="text-gray-400">描述相符 4.9 ↑</span>
                <span className="text-gray-300">|</span>
                <span className="text-gray-400">物流服务 4.8 ↑</span>
              </div>
            </div>
          </div>

          {/* ── 商品详情区域（淘宝/京东风格）── */}
          <div className="border-t-2 border-gray-100">
            {/* Tab切换 */}
            <div className="flex border-b bg-white sticky top-0 z-10">
              <button
                onClick={() => setActiveTab("detail")}
                className={`px-8 py-4 text-base font-medium border-b-2 transition-all ${
                  activeTab === "detail"
                    ? "text-amber-600 border-amber-500 bg-amber-50"
                    : "text-gray-500 border-transparent hover:text-amber-500"
                }`}
              >
                商品详情
              </button>
              <button
                onClick={() => setActiveTab("spec")}
                className={`px-8 py-4 text-base font-medium border-b-2 transition-all ${
                  activeTab === "spec"
                    ? "text-amber-600 border-amber-500 bg-amber-50"
                    : "text-gray-500 border-transparent hover:text-amber-500"
                }`}
              >
                规格参数
              </button>
            </div>

            {/* 商品详情内容 */}
            {activeTab === "detail" && (
              <div className="p-8">
                {/* 商品描述 */}
                <div className="mb-8">
                  <h3 className="text-lg font-bold text-gray-800 mb-3 pb-2 border-b">商品描述</h3>
                  <p className="text-gray-600 leading-relaxed">{product.description}</p>
                </div>

                {/* 商品图片展示 */}
                <div>
                  <h3 className="text-lg font-bold text-gray-800 mb-4 pb-2 border-b">商品图片</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {product.images.map((src, i) => (
                      <div
                        key={i}
                        className="rounded-xl overflow-hidden border bg-gray-50"
                        style={{ aspectRatio: "1" }}
                      >
                        <img
                          src={src}
                          alt={`${product.name}实拍图${i + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ))}
                  </div>
                </div>

                {/* 购买须知 */}
                <div className="mt-8 bg-amber-50 rounded-xl p-6 border border-amber-100">
                  <h3 className="text-base font-bold text-gray-800 mb-3">购物须知</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-gray-600">
                    <div className="flex items-start gap-2">
                      <span className="text-amber-500 font-bold mt-0.5">·</span>
                      <span>天然宝石每件纹理略有不同，以实物为准</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-amber-500 font-bold mt-0.5">·</span>
                      <span>顺丰快递全国包邮，预计3-5个工作日到货</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-amber-500 font-bold mt-0.5">·</span>
                      <span>收到商品7天内不满意可退换（不影响二次销售）</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-amber-500 font-bold mt-0.5">·</span>
                      <span>每件商品配有国检证书，终身免费清洗保养</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* 规格参数内容 */}
            {activeTab === "spec" && (
              <div className="p-8">
                <h3 className="text-lg font-bold text-gray-800 mb-4 pb-2 border-b">规格参数</h3>
                <div className="bg-gray-50 rounded-xl border overflow-hidden">
                  <div className="grid grid-cols-1 divide-y">
                    <div className="flex">
                      <div className="w-36 bg-gray-100 px-4 py-3 text-sm font-medium text-gray-500 flex-shrink-0">商品名称</div>
                      <div className="px-4 py-3 text-sm text-gray-800 font-medium">{product.name}</div>
                    </div>
                    <div className="flex">
                      <div className="w-36 bg-gray-100 px-4 py-3 text-sm font-medium text-gray-500 flex-shrink-0">商品分类</div>
                      <div className="px-4 py-3 text-sm text-gray-800">{category.label}</div>
                    </div>
                    <div className="flex">
                      <div className="w-36 bg-gray-100 px-4 py-3 text-sm font-medium text-gray-500 flex-shrink-0">当前材质</div>
                      <div className="px-4 py-3 text-sm text-gray-800">{material}</div>
                    </div>
                    <div className="flex">
                      <div className="w-36 bg-gray-100 px-4 py-3 text-sm font-medium text-gray-500 flex-shrink-0">当前尺寸</div>
                      <div className="px-4 py-3 text-sm text-gray-800">{size}</div>
                    </div>
                    <div className="flex">
                      <div className="w-36 bg-gray-100 px-4 py-3 text-sm font-medium text-gray-500 flex-shrink-0">当前颜色</div>
                      <div className="px-4 py-3 text-sm text-gray-800">{color}</div>
                    </div>
                    {product.details.map((d, i) => (
                      <div key={i} className="flex">
                        <div className="w-36 bg-gray-100 px-4 py-3 text-sm font-medium text-gray-500 flex-shrink-0">
                          {d.split("：")[0]}
                        </div>
                        <div className="px-4 py-3 text-sm text-gray-800">{d.split("：")[1]}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* ── 猜你喜欢 ── */}
        <div className="mt-8">
          <h3 className="text-lg font-bold text-gray-800 mb-4">— 猜你喜欢 —</h3>
          <div className="grid grid-cols-4 gap-4">
            {category.products.slice(0, 4).map((p) => (
              <Link
                key={p.id}
                to={`/product?id=${p.id}`}
                className="bg-white rounded-xl border overflow-hidden hover:shadow-md transition-all hover:-translate-y-1 group"
              >
                <div className="overflow-hidden" style={{ aspectRatio: "1" }}>
                  <img
                    src={p.image}
                    alt={p.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-3">
                  <p className="text-sm text-gray-700 line-clamp-2 leading-snug">{p.name}</p>
                  <p className="text-red-500 font-bold mt-1">¥{p.price.toLocaleString()}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
