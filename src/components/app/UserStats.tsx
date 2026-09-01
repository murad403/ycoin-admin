'use client';
import { useLanguage } from '@/context/LanguageContext';

const UserStats = () => {
  const { t } = useLanguage();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-8">
      {/* Card 1: TOTAL PLATFORM USERS */}
      <div className="bg-[#0A101D] border border-border-color rounded-2xl p-5 sm:p-6 shadow-sm flex flex-col justify-between">
        <span className="text-[11px] font-semibold tracking-wider uppercase text-description mb-3 block">
          {t.totalPlatformUsers}
        </span>
        <span className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          5
        </span>
      </div>

      {/* Card 2: ACTIVE VALIDATORS */}
      <div className="bg-[#0A101D] border border-border-color rounded-2xl p-5 sm:p-6 shadow-sm flex flex-col justify-between">
        <span className="text-[11px] font-semibold tracking-wider uppercase text-description mb-3 block">
          {t.activeValidators}
        </span>
        <span className="text-3xl sm:text-4xl font-extrabold text-[#0071E3] tracking-tight">
          0
        </span>
      </div>

      {/* Card 3: TOTAL STAKED YCOIN */}
      <div className="bg-[#0A101D] border border-border-color rounded-2xl p-5 sm:p-6 shadow-sm flex flex-col justify-between">
        <span className="text-[11px] font-semibold tracking-wider uppercase text-description mb-3 block">
          {t.totalStakedYcoin}
        </span>
        <span className="text-3xl sm:text-4xl font-extrabold text-amber-400 tracking-tight">
          125,000
        </span>
      </div>
    </div>
  );
};

export default UserStats;