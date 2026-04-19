export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
          {/* Brand */}
          <div className="col-span-2 lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-full gold-gradient flex items-center justify-center">
                <span className="text-white text-sm font-bold">璀</span>
              </div>
              <span className="text-xl font-bold text-white tracking-widest">璀璨珠宝</span>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed mb-4">
              专注高品质首饰，让每一位爱美的你都拥有属于自己的璀璨时刻。
            </p>
            <div className="flex gap-3">
              {["微信", "微博", "抖音", "小红书"].map((social) => (
                <button
                  key={social}
                  className="w-8 h-8 rounded-full bg-white/10 hover:bg-amber-600 text-xs transition-colors flex items-center justify-center"
                >
                  {social[0]}
                </button>
              ))}
            </div>
          </div>

          {/* Links */}
          {[
            {
              title: "购物指南",
              links: ["注册登录", "我的订单", "购物车", "地址管理", "积分说明"],
            },
            {
              title: "商品服务",
              links: ["新品上市", "热销榜单", "礼品定制", "以旧换新", "保养服务"],
            },
            {
              title: "客户支持",
              links: ["帮助中心", "退换货政策", "真伪鉴别", "尺寸指南", "联系客服"],
            },
            {
              title: "关于我们",
              links: ["品牌故事", "荣誉资质", "媒体报道", "加盟合作", "招商招聘"],
            },
          ].map((col) => (
            <div key={col.title}>
              <h4 className="text-white font-semibold text-sm mb-4">{col.title}</h4>
              <ul className="space-y-2">
                {col.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm text-gray-400 hover:text-amber-400 transition-colors"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Payment methods */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 flex-wrap justify-center">
              <span className="text-xs text-gray-500">支持支付方式：</span>
              {["微信支付", "支付宝", "银联", "信用卡", "花呗"].map((pay) => (
                <span
                  key={pay}
                  className="px-2.5 py-1 bg-white/10 rounded text-xs text-gray-400 border border-white/10"
                >
                  {pay}
                </span>
              ))}
            </div>
            <div className="flex items-center gap-3 text-xs text-gray-500">
              <span>🔒 SSL 安全加密</span>
              <span>·</span>
              <span>CNCA 认证</span>
              <span>·</span>
              <span>GIA 鉴定合作</span>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-white/5 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-xs text-gray-600">
          © 2026 璀璨珠宝 Jewelry Store. All rights reserved. | 粤ICP备XXXXXXXX号
        </div>
      </div>
    </footer>
  );
}
