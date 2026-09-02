'use client';
import { useState } from 'react';
import { Users } from 'lucide-react';
import { toast } from 'sonner';
import UserManagementTable from '@/components/app/UserManagementTable';
import RemoveUserModal from '@/components/app/RemoveUserModal';
import { useLanguage } from '@/context/LanguageContext';
import { useRetrieveUsersQuery, useDeleteUserMutation } from '@/redux/features/app/app.api';
import { TUserItem } from '@/redux/features/app/app.type';

const UserManagementPage = () => {
  const { t } = useLanguage();
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [userToDelete, setUserToDelete] = useState<TUserItem | null>(null);

  const { data, isLoading } = useRetrieveUsersQuery({ page, search, page_size: 30 });
  const [deleteUserMutation, { isLoading: isDeleting }] = useDeleteUserMutation();

  const handleSearchChange = (term: string) => {
    setSearch(term);
    setPage(1);
  };

  const handleConfirmDelete = async () => {
    if (!userToDelete) return;
    try {
      await deleteUserMutation(userToDelete.id).unwrap();
      toast.success(`User "${userToDelete.profile_name || userToDelete.email}" removed successfully!`);
      setUserToDelete(null);
    } catch (err: any) {
      toast.error(err?.data?.detail || err?.data?.message || 'Failed to remove user account.');
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

      {/* Stat Card: TOTAL PLATFORM USERS */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
        <div className="bg-[#0A101D] border border-border-color rounded-2xl p-5 sm:p-6 shadow-sm flex flex-col justify-between">
          <span className="text-[11px] font-semibold tracking-wider uppercase text-description mb-3 block">
            {t.totalPlatformUsers}
          </span>
          <span className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            {data?.users_count ?? 0}
          </span>
        </div>
      </div>

      {/* User Management Table */}
      <UserManagementTable
        users={data?.results || []}
        isLoading={isLoading}
        onDeleteUser={(user) => setUserToDelete(user)}
        searchTerm={search}
        onSearchChange={handleSearchChange}
        page={page}
        onPageChange={(newPage) => setPage(newPage)}
        hasNextPage={!!data?.next}
        hasPreviousPage={!!data?.previous}
        totalUsersCount={data?.users_count || 0}
      />

      {/* Remove User Modal */}
      <RemoveUserModal
        user={userToDelete}
        isOpen={!!userToDelete}
        onClose={() => setUserToDelete(null)}
        onConfirm={handleConfirmDelete}
        isDeleting={isDeleting}
      />
    </div>
  );
};

export default UserManagementPage;