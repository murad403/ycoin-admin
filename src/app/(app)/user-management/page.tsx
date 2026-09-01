'use client';

import React, { useState } from 'react';
import { Users } from 'lucide-react';
import UserStats from '@/components/app/UserStats';
import UserManagementTable from '@/components/app/UserManagementTable';
import RemoveUserModal, { UserManagementItem } from '@/components/app/RemoveUserModal';
import { useLanguage } from '@/context/LanguageContext';

const UserManagementPage = () => {
  const { t } = useLanguage();
  const [selectedUserToDelete, setSelectedUserToDelete] = useState<UserManagementItem | null>(null);

  const handleConfirmDelete = () => {
    if (selectedUserToDelete) {
      console.log('Removed user account:', selectedUserToDelete.email);
      setSelectedUserToDelete(null);
    }
  };

  return (
    <div className="space-y-6 sm:space-y-8 animate-in fade-in duration-300">
      {/* Header */}
      <div>
        <div className="flex items-center gap-3 mb-1">
          <div className="w-8 h-8 rounded-xl bg-[#0071E3]/15 border border-[#0071E3]/30 flex items-center justify-center text-[#0071E3]">
            <Users className="w-4 h-4" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            {t.userManagement}
          </h1>
        </div>
        <p className="text-xs sm:text-sm text-description leading-relaxed">
          {t.userManagementDesc}
        </p>
      </div>

      {/* User Stats Grid */}
      <UserStats />

      {/* User Management Table */}
      <UserManagementTable
        onDeleteUser={(user) => setSelectedUserToDelete(user)}
      />

      {/* Remove User Modal */}
      <RemoveUserModal
        user={selectedUserToDelete}
        isOpen={!!selectedUserToDelete}
        onClose={() => setSelectedUserToDelete(null)}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
};

export default UserManagementPage;