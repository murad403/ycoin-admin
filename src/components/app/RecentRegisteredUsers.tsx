'use client';
import Link from 'next/link';
import { Users, Trash2 } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export interface UserItem {
    id: string;
    avatar: string;
    name: string;
    email: string;
    role: string;
    status: 'Active' | 'Pending';
}

interface RecentRegisteredUsersProps {
    onDeleteUser: (user: UserItem) => void;
}

export const mockUsers: UserItem[] = [
    {
        id: 'usr-001',
        avatar: 'S',
        name: 'Satoshi Node Ops Alpha',
        email: 'node-alpha@satoshilabs.io',
        role: 'Node Op',
        status: 'Active',
    },
    {
        id: 'usr-002',
        avatar: 'C',
        name: 'Cypherpunk Capital',
        email: 'ventures@cypherpunk.vc',
        role: 'Vali',
        status: 'Active',
    },
    {
        id: 'usr-003',
        avatar: 'B',
        name: 'BitVM Quantum AI Lab',
        email: 'research@bitvm-ai.org',
        role: 'Deve',
        status: 'Active',
    },
    {
        id: 'usr-004',
        avatar: 'H',
        name: 'Hal Finney Sentinel',
        email: 'sentinel@halnode.net',
        role: 'Si',
        status: 'Pending',
    },
];

const RecentRegisteredUsers = ({ onDeleteUser }: RecentRegisteredUsersProps) => {
    const { t } = useLanguage();

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
                    {mockUsers.map((user) => (
                        <div
                            key={user.id}
                            className="bg-[#040812] border border-border-color/80 hover:border-[#0071E3]/50 rounded-xl p-3.5 flex items-center justify-between gap-3 group transition-all"
                        >
                            <div className="flex items-center gap-3 min-w-0">
                                {/* Avatar Badge */}
                                <div className="w-9 h-9 rounded-lg bg-amber-500/15 border border-amber-500/30 text-amber-400 font-bold text-xs flex items-center justify-center shrink-0">
                                    {user.avatar}
                                </div>

                                {/* Details */}
                                <div className="min-w-0">
                                    <h4 className="text-xs font-semibold text-white truncate">
                                        {user.name}
                                    </h4>
                                    <p className="text-[11px] text-description truncate mt-0.5">
                                        {user.email} • {user.role}
                                    </p>
                                </div>
                            </div>

                            {/* Status Pill & Optional Delete Action */}
                            <div className="flex items-center gap-2 shrink-0">
                                <span
                                    className={`text-[10px] font-semibold px-2.5 py-0.5 rounded-full border flex items-center gap-1 ${user.status === 'Active'
                                            ? 'bg-emerald-500/15 border-emerald-500/30 text-emerald-400'
                                            : 'bg-amber-500/15 border-amber-500/30 text-amber-400'
                                        }`}
                                >
                                    <span
                                        className={`w-1.5 h-1.5 rounded-full ${user.status === 'Active' ? 'bg-emerald-400' : 'bg-amber-400'
                                            }`}
                                    />
                                    <span>{user.status === 'Active' ? t.active : t.pending}</span>
                                </span>

                                <button
                                    type="button"
                                    onClick={() => onDeleteUser(user)}
                                    title="Remove user"
                                    className="w-7 h-7 rounded-lg bg-[#111A2E] hover:bg-rose-500/20 text-gray-400 hover:text-rose-400 border border-border-color hover:border-rose-500/30 flex items-center justify-center transition-all opacity-70 group-hover:opacity-100"
                                >
                                    <Trash2 className="w-3.5 h-3.5" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default RecentRegisteredUsers;