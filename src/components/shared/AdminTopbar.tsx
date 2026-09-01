'use client';
import Image from 'next/image';
import { Menu, Shield, RefreshCw } from 'lucide-react';
import logo from '@/assets/logo.png';
import { useLanguage } from '@/context/LanguageContext';

interface AdminTopbarProps {
    onOpenMobileMenu: () => void;
    onRefresh?: () => void;
}

const AdminTopbar = ({ onOpenMobileMenu, onRefresh }: AdminTopbarProps) => {
    const { t } = useLanguage();

    return (
        <header className="lg:hidden sticky top-0 z-30 w-full bg-[#060B17]/90 backdrop-blur-md border-b border-border-color px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
                <button
                    onClick={onOpenMobileMenu}
                    className="p-2 rounded-lg bg-[#0A101D] border border-border-color text-gray-300 hover:text-white focus:outline-none"
                    aria-label="Open Mobile Menu"
                >
                    <Menu className="w-5 h-5" />
                </button>

                <div className="flex items-center gap-2">
                    <Image
                        src={logo}
                        alt="Ycoin AI Logo"
                        width={26}
                        height={26}
                        className="w-6.5 h-6.5 object-contain"
                    />
                    <span className="text-base font-bold text-white tracking-tight">
                        Ycoin AI
                    </span>
                </div>
            </div>

            <div className="flex items-center gap-2">
                {onRefresh && (
                    <button
                        onClick={onRefresh}
                        className="p-2 rounded-lg bg-[#0A101D] border border-border-color text-[#0071E3] hover:bg-[#111A2E] transition-colors"
                        title={t.refreshOverview}
                    >
                        <RefreshCw className="w-4 h-4" />
                    </button>
                )}
                <div className="hidden sm:inline-flex items-center gap-1 text-[10px] font-bold text-[#0071E3] bg-[#0071E3]/10 border border-[#0071E3]/30 px-2 py-0.5 rounded-full">
                    <Shield className="w-3 h-3 text-[#0071E3]" />
                    <span>{t.superAdminPortal}</span>
                </div>
            </div>
        </header>
    );
};

export default AdminTopbar;