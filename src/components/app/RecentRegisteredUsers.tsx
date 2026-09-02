'use client';

import Link from 'next/link';
import { Users, Trash2, CheckCircle2, XCircle, User as UserIcon } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { useRetrieveUsersQuery } from '@/redux/features/app/app.api';
import { TUserItem } from '@/redux/features/app/app.type';

interface RecentRegisteredUsersProps {
  onDeleteUser: (user: TUserItem) => void;
}

const RecentRegisteredUsers = ({ onDeleteUser }: RecentRegisteredUsersProps) => {
  const { t } = useLanguage();
  const { data } = useRetrieveUsersQuery({ page: 1 });
  const recentUsers = (data?.results || []).slice(0, 4);

  return (
    <div className="bg-[#0A101D] border border-border-color rounded-2xl p-6 shadow-sm flex flex-col justify-between h-full">
      <div>
        {/* Card Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-[#0071E3]" />
            <h2 className="text-sm font-bold text-white tracking-tight">
              {t.recentRegisteredUsers}
            </h2>
          </div>
          <Link
            href="/user-management"
            className="text-xs text-[#0071E3] hover:underline font-medium"
          >
            {t.viewAll}
          </Link>
        </div>

        {/* Users List */}
        <div className="space-y-3">
          {recentUsers.length === 0 ? (
            <div className="py-8 text-center text-xs text-description">
              No registered users found.
            </div>
          ) : (
            recentUsers.map((user) => (
              <div
                key={user.id}
                className="bg-[#040812] border border-border-color/80 hover:border-[#0071E3]/50 rounded-xl p-3.5 flex items-center justify-between gap-3 group transition-all"
              >
                <div className="flex items-center gap-3 min-w-0">
                  {/* Avatar Badge */}
                  <div className="w-9 h-9 rounded-lg bg-[#0071E3]/15 border border-[#0071E3]/30 text-[#0071E3] font-bold text-xs flex items-center justify-center shrink-0 overflow-hidden">
                    {user.avatar ? (
                      <img
                        src={user.avatar}
                        alt={user.profile_name || 'User'}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <UserIcon className="w-4 h-4 text-[#0071E3]" />
                    )}
                  </div>

                  {/* Details */}
                  <div className="min-w-0">
                    <h4 className="text-xs font-semibold text-white truncate">
                      {user.profile_name || 'Unnamed User'}
                    </h4>
                    <p className="text-[11px] text-description truncate mt-0.5 font-mono">
                      {user.email} • {user.role_display || user.role}
                    </p>
                  </div>
                </div>

                {/* Status Pill & Delete Action */}
                <div className="flex items-center gap-2 shrink-0">
                  {user.is_email_verified ? (
                    <span className="text-[10px] font-semibold px-2.5 py-0.5 rounded-full border flex items-center gap-1 bg-emerald-500/15 border-emerald-500/30 text-emerald-400">
                      <CheckCircle2 className="w-3 h-3" />
                      <span>Verified</span>
                    </span>
                  ) : (
                    <span className="text-[10px] font-semibold px-2.5 py-0.5 rounded-full border flex items-center gap-1 bg-rose-500/15 border-rose-500/30 text-rose-400">
                      <XCircle className="w-3 h-3" />
                      <span>Unverified</span>
                    </span>
                  )}

                  <button
                    type="button"
                    onClick={() => onDeleteUser(user)}
                    title="Remove user"
                    className="w-7 h-7 rounded-lg bg-[#111A2E] hover:bg-rose-500/20 text-gray-400 hover:text-rose-400 border border-border-color hover:border-rose-500/30 flex items-center justify-center transition-all opacity-70 group-hover:opacity-100 cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default RecentRegisteredUsers;