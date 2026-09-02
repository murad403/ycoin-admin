'use client';

import React from 'react';
import Link from 'next/link';
import { BookOpen, Users, Wallet, Cpu, ExternalLink } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { useRetrieveUsersQuery } from '@/redux/features/app/app.api';

const OverviewStats = () => {
  const { t } = useLanguage();
  const { data: usersData } = useRetrieveUsersQuery();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
      {/* Card 1: Knowledge Base Docs */}
      <div className="bg-[#0A101D] border border-border-color rounded-2xl p-5 flex flex-col justify-between hover:border-[#0071E3]/50 transition-colors shadow-sm relative overflow-hidden group">
        <div>
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-semibold text-description">
              {t.knowledgeBaseDocs}
            </span>
            <BookOpen className="w-4 h-4 text-[#0071E3]" />
          </div>

          <div className="flex items-baseline justify-between">
            <span className="text-3xl font-extrabold text-white tracking-tight">
              3
            </span>
            <Link
              href="/knowledge-base"
              className="text-xs text-[#0071E3] hover:underline font-medium inline-flex items-center gap-0.5"
            >
              <span>{t.viewDocs}</span>
              <ExternalLink className="w-3 h-3 ml-0.5" />
            </Link>
          </div>
        </div>

        <div className="mt-4 pt-3 border-t border-border-color/50">
          <span className="text-[11px] text-description">
            {t.totalCharsIndexed}
          </span>
        </div>
      </div>

      {/* Card 2: Platform Users (Dynamic API count) */}
      <div className="bg-[#0A101D] border border-border-color rounded-2xl p-5 flex flex-col justify-between hover:border-[#0071E3]/50 transition-colors shadow-sm relative overflow-hidden group">
        <div>
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-semibold text-description">
              {t.platformUsers}
            </span>
            <Users className="w-4 h-4 text-[#0071E3]" />
          </div>

          <div className="flex items-baseline justify-between">
            <span className="text-3xl font-extrabold text-white tracking-tight">
              {usersData?.users_count ?? 0}
            </span>
            <Link
              href="/user-management"
              className="text-xs text-[#0071E3] hover:underline font-medium inline-flex items-center gap-0.5"
            >
              <span>{t.manageUsers}</span>
              <ExternalLink className="w-3 h-3 ml-0.5" />
            </Link>
          </div>
        </div>

        <div className="mt-4 pt-3 border-t border-border-color/50">
          <span className="text-[11px] text-description">
            {t.activeNodeOperators}
          </span>
        </div>
      </div>

      {/* Card 3: Staked YCOIN */}
      <div className="bg-[#0A101D] border border-border-color rounded-2xl p-5 flex flex-col justify-between hover:border-[#0071E3]/50 transition-colors shadow-sm relative overflow-hidden group">
        <div>
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-semibold text-description">
              {t.stakedYcoin}
            </span>
            <Wallet className="w-4 h-4 text-amber-400" />
          </div>

          <div className="flex items-baseline justify-between">
            <span className="text-3xl font-extrabold text-amber-400 tracking-tight">
              125,000
            </span>
          </div>
        </div>

        <div className="mt-4 pt-3 border-t border-border-color/50">
          <span className="text-[11px] text-description">
            {t.anchoredOnBtc}
          </span>
        </div>
      </div>

      {/* Card 4: AI Engine Status */}
      <div className="bg-[#0A101D] border border-border-color rounded-2xl p-5 flex flex-col justify-between hover:border-[#0071E3]/50 transition-colors shadow-sm relative overflow-hidden group">
        <div>
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-description">
              {t.aiEngineStatus}
            </span>
            <Cpu className="w-4 h-4 text-[#0071E3]" />
          </div>

          <div className="flex items-center gap-2">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-cyan-500"></span>
            </span>
            <span className="text-lg font-bold text-cyan-400 tracking-tight">
              Gemini 3.6 Flash
            </span>
          </div>
        </div>

        <div className="mt-4 pt-3 border-t border-border-color/50 flex items-center justify-between text-[11px]">
          <span className="text-description">{t.liveRagActive}</span>
          <span className="px-2 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 font-semibold text-[10px]">
            {t.active}
          </span>
        </div>
      </div>
    </div>
  );
};

export default OverviewStats;