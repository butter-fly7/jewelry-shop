import { useState } from "react";
import { Button } from "@/components/ui/button";

const fonts = [
  { id: "elegant", name: "优雅衬线体", sample: "精致优雅" },
  { id: "cute", name: "圆润可爱体", sample: "精致优雅" },
  { id: "simple", name: "简约无衬线", sample: "精致优雅" },
  { id: "romantic", name: "浪漫花体", sample: "精致优雅" },
  { id: "modern", name: "现代几何体", sample: "精致优雅" },
];

const cards = [
  { id: "birthday", emoji: "🎂", name: "生日贺卡", desc: "献给特别的生日祝福" },
  { id: "love", emoji: "❤️", name: "爱情贺卡", desc: "表达真挚的爱意" },
  { id: "grateful", emoji: "🌹", name: "感恩贺卡", desc: "感谢妈妈的养育之恩" },
  { id: "none", emoji: "📝", name: "不留贺卡", desc: "无需附赠贺卡" },
];

const addons = [
  { id: "box", emoji: "🎁", name: "精美礼盒包装", price: 38, desc: "高档礼盒+丝带包装" },
  { id: "shine", emoji: "✨", name: "闪亮包装升级", price: 28, desc: "特别闪亮纸+LED灯装饰" },
  { id: "priority", emoji: "🚀", name: "优先发货", price: 18, desc: "48小时内优先发出" },
];

export function CustomPage() {
  const [selectedFont, setSelectedFont] = useState("elegant");
  const [engraving, setEngraving] = useState("");
  const [selectedCard, setSelectedCard] = useState("none");
  const [cardMsg, setCardMsg] = useState("");
  const [selectedAddons, setSelectedAddons] = useState<string[]>([]);

  const toggleAddon = (id: string) => {
    setSelectedAddons((prev) =>
      prev.includes(id) ? prev.filter((a) => a !== id) : [...prev, id]
    );
  };

  const addonTotal = addons
    .filter((a) => selectedAddons.includes(a.id))
    .reduce((sum, a) => sum + a.price, 0);
  const engravingFee = engraving.trim() ? 30 : 0;
  const cardFee = selectedCard !== "none" ? 10 : 0;
  const total = engravingFee + addonTotal + cardFee;

  const handleSubmit = () => {
    const lines = [
      `✅ 定制确认单`,
      ``,
      `刻字内容：${engraving || "无"}`,
      `字体风格：${fonts.find((f) => f.id === selectedFont)?.name}`,
      `贺卡类型：${cards.find((c) => c.id === selectedCard)?.name}`,
      selectedCard !== "none" && cardMsg ? `贺卡内容：${cardMsg}` : null,
      selectedAddons.length > 0
        ? `附加服务：${addons.filter((a) => selectedAddons.includes(a.id)).map((a) => a.name).join("、")}`
        : null,
      ``,
      `定制费用：¥${total.toLocaleString()}`,
      ``,
      `我们将尽快为您安排制作！`,
    ].filter(Boolean).join("\n");
    alert(lines);
  };

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Hero */}
      <div className="bg-gradient-to-br from-purple-900 via-purple-800 to-amber-900 text-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="text-5xl mb-4">💍</div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">定制专属您的珠宝</h1>
          <p className="text-purple-200 text-lg max-w-2xl mx-auto">
            刻字留言、礼盒包装、附加服务，为您的珠宝赋予独一无二的专属意义
          </p>
          <div className="flex justify-center gap-6 mt-6 text-sm text-purple-200">
            <span>✍️ 专业刻字</span>
            <span>🎁 精美包装</span>
            <span>🚀 优先发货</span>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-3 gap-8">

          {/* ── Left: Customization Options ── */}
          <div className="md:col-span-2 space-y-8">

            {/* 1. Engraving */}
            <div className="bg-white rounded-2xl border shadow-sm p-6">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
                  <span className="text-xl">✍️</span>
                </div>
                <div>
                  <h2 className="font-bold text-gray-900">定制刻字</h2>
                  <p className="text-xs text-gray-400">为您的珠宝刻上专属文字，最多 12 字</p>
                </div>
              </div>

              {/* Font selection */}
              <div className="mb-4">
                <div className="text-sm font-medium text-gray-700 mb-2">选择字体风格</div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {fonts.map((font) => (
                    <button
                      key={font.id}
                      onClick={() => setSelectedFont(font.id)}
                      className={`p-3 rounded-xl border text-sm transition-all ${
                        selectedFont === font.id
                          ? "border-purple-500 bg-purple-50 text-purple-700"
                          : "border-gray-200 hover:border-purple-300 text-gray-600"
                      }`}
                    >
                      <div className="text-base font-medium">{font.name}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Engraving input */}
              <div className="mb-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-700">刻字内容</span>
                  <span className="text-xs text-gray-400">{engraving.length}/12 字</span>
                </div>
                <input
                  type="text"
                  maxLength={12}
                  placeholder="例如：Love Forever / 永恒的爱"
                  value={engraving}
                  onChange={(e) => setEngraving(e.target.value)}
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-400 transition-colors"
                />
                {engraving.trim() && (
                  <p className="text-xs text-purple-600 mt-2">
                    刻字费：+¥30
                  </p>
                )}
              </div>

              {/* Live preview */}
              {engraving.trim() && (
                <div className="bg-gray-50 rounded-xl p-4 text-center border border-dashed border-gray-300">
                  <p className="text-xs text-gray-400 mb-2">刻字预览效果</p>
                  <p className="text-xl font-bold text-gray-800 tracking-widest">{engraving}</p>
                  <p className="text-xs text-gray-400 mt-1">字体：{fonts.find((f) => f.id === selectedFont)?.name}</p>
                </div>
              )}
            </div>

            {/* 2. Greeting Card */}
            <div className="bg-white rounded-2xl border shadow-sm p-6">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-full bg-rose-100 flex items-center justify-center">
                  <span className="text-xl">💌</span>
                </div>
                <div>
                  <h2 className="font-bold text-gray-900">祝福留言</h2>
                  <p className="text-xs text-gray-400">附赠精美贺卡，传递您的心意</p>
                </div>
              </div>

              {/* Card type selection */}
              <div className="grid grid-cols-2 gap-3 mb-4">
                {cards.map((card) => (
                  <button
                    key={card.id}
                    onClick={() => setSelectedCard(card.id)}
                    className={`p-4 rounded-xl border text-left transition-all ${
                      selectedCard === card.id
                        ? "border-rose-400 bg-rose-50 ring-1 ring-rose-300"
                        : "border-gray-200 hover:border-rose-300"
                    }`}
                  >
                    <div className="text-2xl mb-1">{card.emoji}</div>
                    <div className="font-medium text-sm text-gray-800">{card.name}</div>
                    <div className="text-xs text-gray-400 mt-0.5">{card.desc}</div>
                  </button>
                ))}
              </div>

              {/* Card message */}
              {selectedCard !== "none" && (
                <div>
                  <div className="text-sm font-medium text-gray-700 mb-2">贺卡内容</div>
                  <textarea
                    rows={3}
                    maxLength={100}
                    placeholder={`写下您想对${selectedCard === "grateful" ? "妈妈" : "TA"}说的话...`}
                    value={cardMsg}
                    onChange={(e) => setCardMsg(e.target.value)}
                    className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-rose-400 focus:ring-1 focus:ring-rose-300 transition-colors resize-none"
                  />
                  <p className="text-xs text-gray-400 mt-1">{cardMsg.length}/100 字 | 贺卡费：+¥10</p>
                </div>
              )}
            </div>

            {/* 3. Add-ons */}
            <div className="bg-white rounded-2xl border shadow-sm p-6">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center">
                  <span className="text-xl">🎁</span>
                </div>
                <div>
                  <h2 className="font-bold text-gray-900">附加服务</h2>
                  <p className="text-xs text-gray-400">升级您的购物体验</p>
                </div>
              </div>

              <div className="grid sm:grid-cols-3 gap-4">
                {addons.map((addon) => {
                  const isSelected = selectedAddons.includes(addon.id);
                  return (
                    <div
                      key={addon.id}
                      onClick={() => toggleAddon(addon.id)}
                      className={`p-4 rounded-xl border cursor-pointer transition-all ${
                        isSelected
                          ? "border-amber-400 bg-amber-50 ring-1 ring-amber-300"
                          : "border-gray-200 hover:border-amber-300"
                      }`}
                    >
                      <div className="text-3xl mb-2">{addon.emoji}</div>
                      <div className="font-medium text-sm text-gray-800">{addon.name}</div>
                      <div className="text-xs text-gray-400 mb-2">{addon.desc}</div>
                      <div className="flex items-center justify-between">
                        <span className="text-amber-600 font-bold text-sm">+¥{addon.price}</span>
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${
                          isSelected ? "bg-amber-500 border-amber-500" : "border-gray-300"
                        }`}>
                          {isSelected && (
                            <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                            </svg>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* ── Right: Order Summary ── */}
          <div className="space-y-6">
            {/* Summary card */}
            <div className="bg-white rounded-2xl border shadow-sm p-6 sticky top-32">
              <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                <span>📋</span> 定制费用明细
              </h3>

              <div className="space-y-3 text-sm">
                {/* Engraving */}
                <div className="flex justify-between">
                  <span className="text-gray-500">刻字定制</span>
                  <span className={engraving.trim() ? "text-red-500 font-medium" : "text-gray-400"}>
                    {engraving.trim() ? "+¥30" : "¥0"}
                  </span>
                </div>

                {/* Card */}
                <div className="flex justify-between">
                  <span className="text-gray-500">祝福贺卡</span>
                  <span className={selectedCard !== "none" ? "text-red-500 font-medium" : "text-gray-400"}>
                    {selectedCard !== "none" ? "+¥10" : "¥0"}
                  </span>
                </div>

                {/* Add-ons */}
                {selectedAddons.map((id) => {
                  const addon = addons.find((a) => a.id === id);
                  return addon ? (
                    <div key={id} className="flex justify-between">
                      <span className="text-gray-500">{addon.name}</span>
                      <span className="text-red-500 font-medium">+¥{addon.price}</span>
                    </div>
                  ) : null;
                })}
                {selectedAddons.length === 0 && (
                  <div className="flex justify-between">
                    <span className="text-gray-500">附加服务</span>
                    <span className="text-gray-400">¥0</span>
                  </div>
                )}
              </div>

              {/* Divider */}
              <div className="border-t my-4" />

              {/* Total */}
              <div className="flex justify-between items-center mb-5">
                <span className="font-bold text-gray-900">定制费用合计</span>
                <span className="text-2xl font-bold text-red-600">¥{total.toLocaleString()}</span>
              </div>

              {/* Submit */}
              <Button
                onClick={handleSubmit}
                className="w-full h-12 gold-gradient text-white font-medium text-base border-0"
              >
                确认定制
              </Button>

              <div className="mt-3 text-xs text-gray-400 text-center leading-relaxed">
                定制商品将在确认后 3-5 个工作日内发出<br />
                定制商品不支持 7 天无理由退换
              </div>
            </div>

            {/* Tips */}
            <div className="bg-purple-50 rounded-xl p-4 border border-purple-100">
              <div className="text-sm font-medium text-purple-700 mb-2">💡 定制小贴士</div>
              <ul className="text-xs text-purple-600 space-y-1">
                <li>• 刻字内容需在 12 字以内</li>
                <li>• 特殊字符及表情暂不支持</li>
                <li>• 定制商品不可与其他优惠同享</li>
                <li>• 精美礼盒非常适合送礼</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
