'use client';

import React from 'react';
import { BookOpen } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

const KnowledgeBasePage = () => {
  const { t } = useLanguage();

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-xl bg-[#0071E3]/15 border border-[#0071E3]/30 flex items-center justify-center text-[#0071E3]">
          <BookOpen className="w-4 h-4" />
        </div>
        <h1 className="text-2xl font-extrabold text-white tracking-tight">
          {t.knowledgeBase}
        </h1>
      </div>
      <div className="bg-[#0A101D] border border-border-color rounded-2xl p-8 text-center text-description text-sm">
        Knowledge Base Document Management Console
      </div>
    </div>
  );
};

export default KnowledgeBasePage;