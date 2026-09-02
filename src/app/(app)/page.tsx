'use client';

import React, { useState } from 'react';
import { LayoutGrid } from 'lucide-react';
import { toast } from 'sonner';
import OverviewStats from '@/components/app/OverviewStats';
import RecentKnowledgeBaseDocuments from '@/components/app/RecentKnowledgeBaseDocuments';
import RecentRegisteredUsers from '@/components/app/RecentRegisteredUsers';
import DocumentDetailsModal from '@/components/app/DocumentDetailsModal';
import RemoveUserModal from '@/components/app/RemoveUserModal';
import { useLanguage } from '@/context/LanguageContext';
import { useDeleteUserMutation } from '@/redux/features/app/app.api';
import { TUserItem, TKnowledgeBaseItem } from '@/redux/features/app/app.type';

const OverviewPage = () => {
  const { t } = useLanguage();
  const [selectedDoc, setSelectedDoc] = useState<TKnowledgeBaseItem | null>(null);
  const [deleteTargetUser, setDeleteTargetUser] = useState<TUserItem | null>(null);

  const [deleteUserMutation, { isLoading: isDeleting }] = useDeleteUserMutation();

  const handleConfirmDeleteUser = async () => {
    if (!deleteTargetUser) return;
    try {
      await deleteUserMutation(deleteTargetUser.id).unwrap();
      toast.success(`User "${deleteTargetUser.profile_name || deleteTargetUser.email}" removed successfully!`);
      setDeleteTargetUser(null);
    } catch (err: any) {
      toast.error(err?.data?.detail || err?.data?.message || 'Failed to remove user account.');
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
      <RemoveUserModal
        user={deleteTargetUser}
        isOpen={!!deleteTargetUser}
        onClose={() => setDeleteTargetUser(null)}
        onConfirm={handleConfirmDeleteUser}
        isDeleting={isDeleting}
      />
    </div>
  );
};

export default OverviewPage;