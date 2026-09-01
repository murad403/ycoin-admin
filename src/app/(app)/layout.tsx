'use client';
import React, { useState } from 'react';
import AdminSidebar from '@/components/shared/AdminSidebar';
import AdminTopbar from '@/components/shared/AdminTopbar';
import LogoutModal from '@/components/shared/LogoutModal';
import { LanguageProvider } from '@/context/LanguageContext';

const AppLayoutContent = ({ children }: { children: React.ReactNode }) => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  const handleConfirmLogout = () => {
    setIsLogoutModalOpen(false);
    window.location.href = '/auth/sign-in';
  };

  return (
    <div className="min-h-screen w-full bg-[#030712] text-white selection:bg-[#0071E3]/40">
      {/* Mobile Header Topbar */}
      <AdminTopbar onOpenMobileMenu={() => setIsMobileOpen(true)} />

      {/* Sidebar Navigation */}
      <AdminSidebar
        isMobileOpen={isMobileOpen}
        onCloseMobile={() => setIsMobileOpen(false)}
        onOpenLogoutModal={() => setIsLogoutModalOpen(true)}
      />

      {/* Main Content Area */}
      <div className="lg:pl-65 min-h-screen flex flex-col transition-all">
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-350 w-full mx-auto">
          {children}
        </main>
      </div>

      {/* Logout Confirmation Modal */}
      <LogoutModal
        isOpen={isLogoutModalOpen}
        onClose={() => setIsLogoutModalOpen(false)}
        onConfirm={handleConfirmLogout}
        type="logout"
      />
    </div>
  );
};

const AppLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <LanguageProvider>
      <AppLayoutContent>{children}</AppLayoutContent>
    </LanguageProvider>
  );
};

export default AppLayout;