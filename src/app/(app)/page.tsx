'use client';

import React, { useState } from 'react';
import { LayoutGrid, RefreshCw } from 'lucide-react';
import OverviewStats from '@/components/app/OverviewStats';
import RecentKnowledgeBaseDocuments from '@/components/app/RecentKnowledgeBaseDocuments';
import RecentRegisteredUsers, { UserItem } from '@/components/app/RecentRegisteredUsers';
import DocumentDetailsModal, { DocumentItem } from '@/components/app/DocumentDetailsModal';
import LogoutModal from '@/components/shared/LogoutModal';
import { useLanguage } from '@/context/LanguageContext';

const OverviewPage = () => {
  const { t } = useLanguage();
  const [selectedDoc, setSelectedDoc] = useState<DocumentItem | null>(null);
  const [deleteTargetUser, setDeleteTargetUser] = useState<UserItem | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
    }, 800);
  };

  const handleConfirmDeleteUser = () => {
    if (deleteTargetUser) {
      console.log('Deleted user:', deleteTargetUser.email);
      setDeleteTargetUser(null);
    }
  };

  return (
    <div className="space-y-6 sm:space-y-8 animate-in fade-in duration-300">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <div className="w-8 h-8 rounded-xl bg-[#0071E3]/15 border border-[#0071E3]/30 flex items-center justify-center text-[#0071E3]">
              <LayoutGrid className="w-4 h-4" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              {t.systemOverview}
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-description max-w-3xl leading-relaxed">
            {t.systemOverviewDesc}
          </p>
        </div>

        {/* Refresh Button */}
        <button
          type="button"
          onClick={handleRefresh}
          disabled={isRefreshing}
          className="self-start sm:self-auto px-4 py-2.5 bg-[#0A101D] hover:bg-[#111A2E] border border-border-color text-xs font-semibold text-white rounded-xl flex items-center gap-2 transition-all shadow-sm cursor-pointer disabled:opacity-50"
        >
          <RefreshCw
            className={`w-3.5 h-3.5 text-[#0071E3] ${
              isRefreshing ? 'animate-spin' : ''
            }`}
          />
          <span>{isRefreshing ? 'Refreshing...' : t.refreshOverview}</span>
        </button>
      </div>

      {/* 4 Stat Cards */}
      <OverviewStats />

      {/* Recent Activity Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
        <RecentKnowledgeBaseDocuments
          onSelectDocument={(doc) => setSelectedDoc(doc)}
        />
        <RecentRegisteredUsers
          onDeleteUser={(user) => setDeleteTargetUser(user)}
        />
      </div>

      {/* Document Inspector Modal */}
      <DocumentDetailsModal
        document={selectedDoc}
        isOpen={!!selectedDoc}
        onClose={() => setSelectedDoc(null)}
      />

      {/* Delete User Modal */}
      <LogoutModal
        isOpen={!!deleteTargetUser}
        onClose={() => setDeleteTargetUser(null)}
        onConfirm={handleConfirmDeleteUser}
        type="delete-user"
        targetUser={
          deleteTargetUser
            ? { name: deleteTargetUser.name, email: deleteTargetUser.email }
            : null
        }
      />
    </div>
  );
};

export default OverviewPage;