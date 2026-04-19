import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const navLinks = [
  { label: "首页", to: "/" },
  { label: "项链", to: "/category/necklace" },
  { label: "耳饰", to: "/category/earring" },
  { label: "戒指", to: "/category/ring" },
  { label: "手链", to: "/category/bracelet" },
  { label: "套装", to: "/category/set" },
  { label: "新品上市", to: "/category/new" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // 判断当前链接是否激活
  const isActive = (to: string) => {
    if (to === "/") return location.pathname === "/";
    return location.pathname.startsWith(to);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/98 backdrop-blur shadow-lg"
          : "bg-[#1a0a2e]/90 backdrop-blur-sm"
      }`}
    >
      {/* ── 顶部公告条 ── */}
      <div className="gold-gradient text-white text-center text-xs py-2 px-4 font-semibold tracking-widest">
        🎁 限时优惠：全场首饰满 299 元包邮 · 购满 599 享 8 折优惠 🎁
      </div>

      {/* ── 主导航区 ── */}
      <div
        className={`transition-all duration-300 ${
          scrolled ? "border-b border-amber-100" : "border-b border-white/10"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 shrink-0">
              <div className="w-8 h-8 rounded-full gold-gradient flex items-center justify-center shadow-md">
                <span className="text-white text-sm font-bold">璀</span>
              </div>
              <span
                className={`text-xl font-bold tracking-widest hidden sm:block ${
                  scrolled ? "gold-text" : "text-amber-300"
                }`}
              >
                璀璨珠宝
              </span>
            </Link>

            {/* ── 桌面导航 ── */}
            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => {
                const active = isActive(link.to);
                return (
                  <Link
                    key={link.label}
                    to={link.to}
                    className={`
                      relative px-4 py-2 rounded-md text-sm transition-all duration-200
                      ${
                        active
                          ? scrolled
                            ? "text-amber-700 font-bold bg-amber-50"
                            : "text-amber-300 font-bold bg-white/10"
                          : scrolled
                          ? "text-gray-700 font-medium hover:text-amber-700 hover:bg-amber-50"
                          : "text-white/80 font-medium hover:text-amber-300 hover:bg-white/10"
                      }
                    `}
                  >
                    {link.label}
                    {/* 激活时底部金色下划线 */}
                    {active && (
                      <span className="absolute bottom-0.5 left-3 right-3 h-0.5 bg-amber-400 rounded-full" />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* ── 右侧图标 ── */}
            <div className="flex items-center gap-1.5">
              {/* 搜索 */}
              <div className="relative hidden md:flex items-center">
                {searchOpen ? (
                  <Input
                    autoFocus
                    placeholder="搜索首饰..."
                    className="w-48 h-8 text-sm border-amber-300 focus:border-amber-500"
                    onBlur={() => setSearchOpen(false)}
                  />
                ) : (
                  <button
                    onClick={() => setSearchOpen(true)}
                    className={`p-2 rounded-md transition-colors ${
                      scrolled
                        ? "text-gray-600 hover:text-amber-600 hover:bg-amber-50"
                        : "text-white/70 hover:text-amber-300 hover:bg-white/10"
                    }`}
                    aria-label="搜索"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <circle cx="11" cy="11" r="8" strokeWidth="2" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m21 21-4.35-4.35" />
                    </svg>
                  </button>
                )}
              </div>

              {/* 收藏 */}
              <button
                className={`p-2 rounded-md transition-colors hidden md:block ${
                  scrolled
                    ? "text-gray-600 hover:text-amber-600 hover:bg-amber-50"
                    : "text-white/70 hover:text-amber-300 hover:bg-white/10"
                }`}
                aria-label="收藏"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </button>

              {/* 购物车 */}
              <button
                className={`p-2 rounded-md transition-colors relative ${
                  scrolled
                    ? "text-gray-600 hover:text-amber-600 hover:bg-amber-50"
                    : "text-white/70 hover:text-amber-300 hover:bg-white/10"
                }`}
                aria-label="购物车"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                <Badge className="absolute -top-0.5 -right-0.5 h-4 w-4 p-0 flex items-center justify-center text-[10px] gold-gradient border-0">
                  3
                </Badge>
              </button>

              {/* 登录按钮 */}
              <Button
                size="sm"
                variant="outline"
                className={`hidden md:flex text-xs transition-colors ${
                  scrolled
                    ? "border-amber-400 text-amber-700 hover:bg-amber-50"
                    : "border-amber-400/70 text-amber-300 hover:bg-white/10 hover:border-amber-300"
                }`}
              >
                登录
              </Button>

              {/* 移动端菜单按钮 */}
              <button
                className={`lg:hidden p-2 rounded-md transition-colors ${
                  scrolled ? "text-gray-600" : "text-white/80"
                }`}
                onClick={() => setMenuOpen(!menuOpen)}
                aria-label="菜单"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {menuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ── 移动端下拉菜单 ── */}
      {menuOpen && (
        <div className="lg:hidden border-t border-amber-100 py-2 bg-white shadow-xl">
          {navLinks.map((link) => {
            const active = isActive(link.to);
            return (
              <Link
                key={link.label}
                to={link.to}
                className={`flex items-center justify-between px-5 py-3 text-sm transition-colors ${
                  active
                    ? "bg-amber-50 text-amber-700 font-bold border-l-4 border-amber-500"
                    : "text-gray-700 hover:bg-amber-50 hover:text-amber-700 border-l-4 border-transparent"
                }`}
                onClick={() => setMenuOpen(false)}
              >
                <span>{link.label}</span>
                {active && (
                  <span className="text-amber-500 text-xs font-semibold">● 当前</span>
                )}
              </Link>
            );
          })}
        </div>
      )}
    </header>
  );
}
