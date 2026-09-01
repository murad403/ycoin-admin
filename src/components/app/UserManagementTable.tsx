'use client';
import { useState } from 'react';
import { Search, Trash2 } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { UserManagementItem } from './RemoveUserModal';

interface UserManagementTableProps {
  onDeleteUser: (user: UserManagementItem) => void;
}

export const initialUsers: UserManagementItem[] = [
  {
    id: 'usr-1',
    name: 'Satoshi Node Ops Alpha',
    email: 'node-alpha@satoshilabs.io',
    role: 'Node Operator',
    status: 'Active',
    staked: '25,000',
    joined: '2026-01-12T08:30:00Z',
  },
  {
    id: 'usr-2',
    name: 'Cypherpunk Capital',
    email: 'ventures@cypherpunk.vc',
    role: 'Validator',
    status: 'Active',
    staked: '100,000',
    joined: '2026-02-01T14:15:00Z',
  },
  {
    id: 'usr-3',
    name: 'BitVM Quantum AI Lab',
    email: 'research@bitvm-ai.org',
    role: 'Developer',
    status: 'Active',
    staked: '15,000',
    joined: '2026-02-20T10:00:00Z',
  },
  {
    id: 'usr-4',
    name: 'Hal Finney Sentinel',
    email: 'sentinel@halnode.net',
    role: 'Staker',
    status: 'Pending',
    staked: '5,000',
    joined: '2026-03-04T18:45:00Z',
  },
  {
    id: 'usr-5',
    name: 'A100 Cluster Node #4',
    email: 'cluster4@gpu-mining.co',
    role: 'Node Operator',
    status: 'Suspended',
    staked: '12,000',
    joined: '2026-02-15T11:20:00Z',
  },
];

const UserManagementTable = ({ onDeleteUser }: UserManagementTableProps) => {
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'All' | 'Active' | 'Suspended' | 'Pending'>('All');

  const filteredUsers = initialUsers.filter((user) => {
    const matchesTab = activeTab === 'All' || user.status === activeTab;
    const matchesSearch =
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  const getStatusBadgeStyle = (status: string) => {
    switch (status) {
      case 'Active':
        return {
          bg: 'bg-emerald-500/15 border-emerald-500/30 text-emerald-400',
          dot: 'bg-emerald-400',
          label: t.active,
        };
      case 'Pending':
        return {
          bg: 'bg-amber-500/15 border-amber-500/30 text-amber-400',
          dot: 'bg-amber-400',
          label: t.pending,
        };
      case 'Suspended':
        return {
          bg: 'bg-rose-500/15 border-rose-500/30 text-rose-400',
          dot: 'bg-rose-400',
          label: t.suspended,
        };
      default:
        return {
          bg: 'bg-gray-500/15 border-gray-500/30 text-gray-400',
          dot: 'bg-gray-400',
          label: status,
        };
    }
  };

  return (
    <div className="bg-[#0A101D] border border-border-color rounded-2xl p-4 sm:p-6 shadow-sm space-y-6">
      {/* Top Filter Controls */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        {/* Search Input */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-gray-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t.searchUserPlaceholder}
            className="w-full bg-[#040812] border border-border-color rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder:text-gray-600 focus:outline-none focus:border-[#0071E3] transition-colors"
          />
        </div>

        {/* Status Filter Tabs */}
        <div className="bg-[#040812] border border-border-color rounded-xl p-1 flex items-center gap-1 self-start sm:self-auto">
          {(['All', 'Active', 'Suspended', 'Pending'] as const).map((tab) => {
            const isSelected = activeTab === tab;
            let displayLabel = t.all;
            if (tab === 'Active') displayLabel = t.active;
            if (tab === 'Suspended') displayLabel = t.suspended;
            if (tab === 'Pending') displayLabel = t.pending;

            return (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-[#0071E3] text-white shadow-sm'
                    : 'text-description hover:text-white'
                }`}
              >
                {displayLabel}
              </button>
            );
          })}
        </div>
      </div>

      {/* User Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-175">
          <thead>
            <tr className="border-b border border-border-color/80 text-[11px] font-semibold text-description uppercase tracking-wider">
              <th className="py-3 px-4">{t.tableUser}</th>
              <th className="py-3 px-4">{t.tableRole}</th>
              <th className="py-3 px-4">{t.tableStatus}</th>
              <th className="py-3 px-4">{t.tableStakedSY}</th>
              <th className="py-3 px-4">{t.tableJoined}</th>
              <th className="py-3 px-4 text-right">{t.tableActions}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border-color/50 text-xs">
            {filteredUsers.map((user) => {
              const statusStyle = getStatusBadgeStyle(user.status);

              return (
                <tr
                  key={user.id}
                  className="hover:bg-[#040812]/60 transition-colors group"
                >
                  {/* USER */}
                  <td className="py-4 px-4">
                    <div>
                      <h4 className="font-bold text-white group-hover:text-[#0071E3] transition-colors">
                        {user.name}
                      </h4>
                      <p className="text-[11px] text-description mt-0.5 font-mono">
                        {user.email}
                      </p>
                    </div>
                  </td>

                  {/* ROLE */}
                  <td className="py-4 px-4">
                    <span className="inline-flex items-center px-3 py-1 rounded-full bg-[#0071E3]/15 border border-[#0071E3]/30 text-[#0071E3] text-[11px] font-medium">
                      {user.role}
                    </span>
                  </td>

                  {/* STATUS */}
                  <td className="py-4 px-4">
                    <span
                      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full border text-[11px] font-semibold ${statusStyle.bg}`}
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${statusStyle.dot}`}
                      />
                      <span>{statusStyle.label}</span>
                    </span>
                  </td>

                  {/* STAKED $Y */}
                  <td className="py-4 px-4 font-mono font-bold text-amber-400">
                    {user.staked}
                  </td>

                  {/* JOINED */}
                  <td className="py-4 px-4 font-mono text-gray-400 text-[11px]">
                    {user.joined}
                  </td>

                  {/* ACTIONS */}
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
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserManagementTable;