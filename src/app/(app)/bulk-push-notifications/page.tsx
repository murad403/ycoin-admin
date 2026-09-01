'use client';

import React from 'react';
import { Bell } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

const BulkPushNotificationsPage = () => {
  const { t } = useLanguage();

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-xl bg-[#0071E3]/15 border border-[#0071E3]/30 flex items-center justify-center text-[#0071E3]">
          <Bell className="w-4 h-4" />
        </div>
        <h1 className="text-2xl font-extrabold text-white tracking-tight">
          {t.bulkPushNotifications}
        </h1>
      </div>
      <div className="bg-[#0A101D] border border-border-color rounded-2xl p-8 text-center text-description text-sm">
        Push Notifications Center
      </div>
    </div>
  );
};

export default BulkPushNotificationsPage;