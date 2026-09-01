'use client';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutGrid, BookOpen, Users, Bell, Settings, Shield, LogOut, Globe, X } from 'lucide-react';
import logo from '@/assets/logo.png';
import { useLanguage } from '@/context/LanguageContext';

interface AdminSidebarProps {
  isMobileOpen?: boolean;
  onCloseMobile?: () => void;
  onOpenLogoutModal?: () => void;
}

const AdminSidebar = ({ isMobileOpen = false, onCloseMobile, onOpenLogoutModal }: AdminSidebarProps) => {
  const pathname = usePathname();
  const { language, toggleLanguage, t } = useLanguage();

  const navItems = [
    {
      name: t.overview,
      href: '/',
      icon: LayoutGrid,
    },
    {
      name: t.knowledgeBase,
      href: '/knowledge-base',
      icon: BookOpen,
    },
    {
      name: t.userManagement,
      href: '/user-management',
      icon: Users,
    },
    {
      name: t.bulkPushNotifications,
      href: '/bulk-push-notifications',
      icon: Bell,
    },
    {
      name: t.accountSecurity,
      href: '/account-&-security',
      icon: Settings,
    },
  ];

  return (
    <>
      {/* Mobile Backdrop Overlay */}
      {isMobileOpen && (
        <div
          onClick={onCloseMobile}
          className="fixed inset-0 z-40 bg-black/80 backdrop-blur-sm lg:hidden transition-opacity"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-0 left-0 bottom-0 z-40 w-65 bg-[#060B17] border-r border-border-color flex flex-col justify-between p-5 transition-transform duration-300 ease-in-out lg:translate-x-0 ${isMobileOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
      >
        <div className="flex flex-col min-h-0">
          {/* Top Logo Header */}
          <div className="flex items-center justify-between mb-2">
            <Link href="/" className="flex items-center gap-3">
              <Image
                src={logo}
                alt="Ycoin AI"
                width={32}
                height={32}
                className="w-8 h-8 object-contain"
                priority
              />
              <div className="flex flex-col">
                <span className="text-lg font-extrabold tracking-tight text-white leading-tight">
                  Ycoin AI
                </span>
                <span className="text-[9px] font-semibold text-description tracking-widest uppercase">
                  BTC NATIVE AI
                </span>
              </div>
            </Link>

            {/* Mobile Close Button */}
            {onCloseMobile && (
              <button
                onClick={onCloseMobile}
                className="lg:hidden text-gray-400 hover:text-white p-1"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>

          {/* Sovereign Admin Portal Pill */}
          <div className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-[#0071E3] bg-[#0071E3]/10 border border-[#0071E3]/30 px-2.5 py-1 rounded-full mb-6 w-fit mt-1">
            <Shield className="w-3 h-3 text-[#0071E3]" />
            <span>{t.superAdminPortal}</span>
          </div>

          {/* Language Switcher */}
          <div className="mb-6">
            <button
              type="button"
              onClick={toggleLanguage}
              className="w-full bg-[#0A101D] hover:bg-[#111A2E] border border-border-color rounded-xl px-3 py-2 flex items-center justify-between text-xs text-description hover:text-white transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <Globe className="w-3.5 h-3.5 text-[#0071E3]" />
                <span className="font-medium">{t.languageLabel}</span>
              </div>
              <span className="text-[#0071E3] font-semibold text-[11px] underline">
                {t.switchLang}
              </span>
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1.5 overflow-y-auto pr-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive =
                pathname === item.href ||
                (item.href !== '/' && pathname?.startsWith(item.href));

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={onCloseMobile}
                  className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all ${isActive
                    ? 'bg-[#0071E3]/15 text-[#0071E3] border border-[#0071E3]/30 font-semibold shadow-sm'
                    : 'text-description hover:text-white hover:bg-[#0A101D]'
                    }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon
                      className={`w-4 h-4 ${isActive ? 'text-[#0071E3]' : 'text-gray-400'
                        }`}
                    />
                    <span>{item.name}</span>
                  </div>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Bottom Profile & Logout Section */}
        <div className="pt-4 border-t border-border-color space-y-3 mt-auto">
          <div className="bg-[#0A101D] border border-border-color rounded-xl p-3 flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-[#0071E3]/20 border border-[#0071E3]/40 text-[#0071E3] font-bold text-xs flex items-center justify-center shrink-0">
              YA
            </div>
            <div className="min-w-0">
              <h4 className="text-xs font-bold text-white truncate">
                {t.administrator}
              </h4>
              <p className="text-[11px] text-description truncate">
                admin@ycoin.ai
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onOpenLogoutModal}
            className="w-full bg-rose-950/20 border border-rose-900/40 text-rose-400 hover:bg-rose-900/30 hover:text-rose-300 py-2.5 rounded-xl flex items-center justify-center gap-2 font-semibold text-xs transition-colors cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>{t.logout}</span>
          </button>
        </div>
      </aside>
    </>
  );
};

export default AdminSidebar;