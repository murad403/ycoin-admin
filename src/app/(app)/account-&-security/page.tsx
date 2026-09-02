'use client';
import { Settings } from 'lucide-react';
import LegalPoliciesTermsEditor from '@/components/app/LegalPoliciesTermsEditor';
import AdministratorDetails from '@/components/app/AdministratorDetails';
import ChangePassword from '@/components/app/ChangePassword';
import { useLanguage } from '@/context/LanguageContext';

const AccountSecurityPage = () => {
  const { t } = useLanguage();

  return (
    <div className="space-y-6 sm:space-y-8 animate-in fade-in duration-300">
      {/* Header */}
      <div>
        <div className="flex items-center gap-3 mb-1">
          <div className="w-8 h-8 rounded-xl bg-[#0071E3]/15 border border-[#0071E3]/30 flex items-center justify-center text-[#0071E3]">
            <Settings className="w-4 h-4" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            {t.systemSettingsTitle}
          </h1>
        </div>
        <p className="text-xs sm:text-sm text-description max-w-3xl leading-relaxed">
          {t.systemSettingsDesc}
        </p>
      </div>

      {/* Full-width Top Component: Legal Policies & Terms Editor */}
      <LegalPoliciesTermsEditor />

      {/* Bottom Grid: Administrator Details + Change Password */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
        <AdministratorDetails />
        <ChangePassword />
      </div>
    </div>
  );
};

export default AccountSecurityPage;