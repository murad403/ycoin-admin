'use client';

import React from 'react';
import { Search, Trash2, CheckCircle2, XCircle, ChevronLeft, ChevronRight, User, Loader2 } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { TUserItem } from '@/redux/features/app/app.type';

interface UserManagementTableProps {
  users: TUserItem[];
  isLoading: boolean;
  onDeleteUser: (user: TUserItem) => void;
  searchTerm: string;
  onSearchChange: (term: string) => void;
  page: number;
  onPageChange: (newPage: number) => void;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  totalUsersCount: number;
}

const UserManagementTable = ({
  users,
  isLoading,
  onDeleteUser,
  searchTerm,
  onSearchChange,
  page,
  onPageChange,
  hasNextPage,
  hasPreviousPage,
  totalUsersCount,
}: UserManagementTableProps) => {
  const { t } = useLanguage();

  // Calculate total pages assuming default page size (10) or based on count
  const pageSize = 10;
  const totalPages = Math.max(1, Math.ceil(totalUsersCount / pageSize));

  return (
    <div className="bg-[#0A101D] border border-border-color rounded-2xl p-4 sm:p-6 shadow-sm space-y-6">
      {/* Top Controls: Search Input */}
      <div className="flex items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-gray-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder={t.searchUserPlaceholder}
            className="w-full bg-[#040812] border border-border-color rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder:text-gray-600 focus:outline-none focus:border-[#0071E3] transition-colors"
          />
        </div>
      </div>

      {/* User Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-175">
          <thead>
            <tr className="border-b border border-border-color/80 text-[11px] font-semibold text-description uppercase tracking-wider">
              <th className="py-3 px-4">{t.tableUser}</th>
              <th className="py-3 px-4">{t.tableRole}</th>
              <th className="py-3 px-4">EMAIL VERIFICATION</th>
              <th className="py-3 px-4">{t.tableJoined}</th>
              <th className="py-3 px-4 text-right">{t.tableActions}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border-color/50 text-xs">
            {isLoading ? (
              <tr>
                <td colSpan={5} className="py-12 text-center text-description">
                  <div className="flex items-center justify-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin text-[#0071E3]" />
                    <span>Loading platform users...</span>
                  </div>
                </td>
              </tr>
            ) : users.length === 0 ? (
              <tr>
                <td colSpan={5} className="py-12 text-center text-description">
                  No platform users found.
                </td>
              </tr>
            ) : (
              users.map((user) => (
                <tr
                  key={user.id}
                  className="hover:bg-[#040812]/60 transition-colors group"
                >
                  {/* USER (Avatar + Profile Name + Email) */}
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-[#0071E3]/20 border border-[#0071E3]/40 text-[#0071E3] font-bold text-xs flex items-center justify-center shrink-0 overflow-hidden">
                        {user.avatar ? (
                          <img
                            src={user.avatar}
                            alt={user.profile_name || 'User Avatar'}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <User className="w-4 h-4 text-[#0071E3]" />
                        )}
                      </div>
                      <div className="min-w-0">
                        <h4 className="font-bold text-white group-hover:text-[#0071E3] transition-colors truncate">
                          {user.profile_name || 'Unnamed User'}
                        </h4>
                        <p className="text-[11px] text-description font-mono truncate mt-0.5">
                          {user.email}
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* ROLE (role_display) */}
                  <td className="py-4 px-4">
                    <span className="inline-flex items-center px-3 py-1 rounded-full bg-[#0071E3]/15 border border-[#0071E3]/30 text-[#0071E3] text-[11px] font-medium capitalize">
                      {user.role_display || user.role || 'User'}
                    </span>
                  </td>

                  {/* EMAIL VERIFICATION (is_email_verified) */}
                  <td className="py-4 px-4">
                    {user.is_email_verified ? (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full border text-[11px] font-semibold bg-emerald-500/15 border-emerald-500/30 text-emerald-400">
                        <CheckCircle2 className="w-3 h-3" />
                        <span>Verified</span>
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full border text-[11px] font-semibold bg-rose-500/15 border-rose-500/30 text-rose-400">
                        <XCircle className="w-3 h-3" />
                        <span>Unverified</span>
                      </span>
                    )}
                  </td>

                  {/* JOINED (created_at) */}
                  <td className="py-4 px-4 font-mono text-gray-400 text-[11px]">
                    {user.created_at ? new Date(user.created_at).toLocaleDateString() : 'N/A'}
                  </td>

                  {/* ACTIONS (deleteUser) */}
                  <td className="py-4 px-4 text-right">
                    <button
                      type="button"
                      onClick={() => onDeleteUser(user)}
                      title="Remove user account"
                      className="p-2 rounded-lg bg-rose-950/20 hover:bg-rose-900/30 text-rose-400 border border-rose-900/40 hover:border-rose-700/50 transition-colors inline-flex items-center justify-center cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2 text-xs text-description">
        <div>
          Page <span className="text-white font-semibold">{page}</span> of{' '}
          <span className="text-white font-semibold">{totalPages}</span> (Total users:{' '}
          <span className="text-white font-semibold">{totalUsersCount}</span>)
        </div>

        <div className="flex items-center gap-2">
          {/* Previous Page Button */}
          <button
            type="button"
            disabled={!hasPreviousPage && page <= 1}
            onClick={() => onPageChange(page - 1)}
            className="px-3 py-1.5 bg-[#040812] border border-border-color hover:border-[#0071E3] text-white rounded-lg flex items-center gap-1 transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Previous</span>
          </button>

          {/* Dynamic Page Number Buttons */}
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
            <button
              key={pageNum}
              type="button"
              onClick={() => onPageChange(pageNum)}
              className={`w-8 h-8 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                page === pageNum
                  ? 'bg-[#0071E3] text-white shadow-sm font-bold'
                  : 'bg-[#040812] border border-border-color text-description hover:text-white'
              }`}
            >
              {pageNum}
            </button>
          ))}

          {/* Next Page Button */}
          <button
            type="button"
            disabled={!hasNextPage && page >= totalPages}
            onClick={() => onPageChange(page + 1)}
            className="px-3 py-1.5 bg-[#040812] border border-border-color hover:border-[#0071E3] text-white rounded-lg flex items-center gap-1 transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <span>Next</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserManagementTable;