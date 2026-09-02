'use client';

import React from 'react';
import { Bell, Trash2, Search, Loader2 } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { TNotificationItem } from '@/redux/features/app/app.type';
import CustomPagination from '@/components/shared/CustomPagination';

interface SentBulkNotificationsBroadcastHistoryProps {
  notifications: TNotificationItem[];
  isLoading: boolean;
  onDeleteNotification: (id: number | string) => void;
  searchTerm: string;
  onSearchChange: (term: string) => void;
  page: number;
  onPageChange: (newPage: number) => void;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  totalCount: number;
}

const SentBulkNotificationsBroadcastHistory = ({
  notifications,
  isLoading,
  onDeleteNotification,
  searchTerm,
  onSearchChange,
  page,
  onPageChange,
  hasNextPage,
  hasPreviousPage,
  totalCount,
}: SentBulkNotificationsBroadcastHistoryProps) => {
  const { t } = useLanguage();

  return (
    <div className="bg-[#0A101D] border border-border-color rounded-2xl p-6 sm:p-8 shadow-sm space-y-6">
      {/* Card Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="w-9 h-9 rounded-xl bg-[#0071E3]/15 border border-[#0071E3]/30 flex items-center justify-center text-[#0071E3] shrink-0 mt-0.5">
            <Bell className="w-4.5 h-4.5" />
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-bold text-white tracking-tight">
              {t.historyTitle}
            </h3>
            <p className="text-xs text-description leading-relaxed mt-0.5">
              {t.historyDesc}
            </p>
          </div>
        </div>

        {/* Search Input */}
        <div className="relative">
          <Search className="w-4 h-4 text-gray-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search broadcasts..."
            className="w-full sm:w-64 bg-[#040812] border border-border-color focus:border-[#0071E3] text-xs text-white placeholder:text-gray-500 rounded-full pl-9 pr-4 py-2 outline-none transition-all"
          />
        </div>
      </div>

      {/* Broadcasts History Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-175">
          <thead>
            <tr className="border-b border-border-color text-[11px] font-semibold text-description uppercase tracking-wider">
              <th className="pb-3 px-3">{t.tableCategoryUrgency}</th>
              <th className="pb-3 px-3">{t.tableTitleContent}</th>
              <th className="pb-3 px-3">{t.tableSentDate}</th>
              <th className="pb-3 px-3 text-right">{t.tableAction}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border-color/40 text-xs">
            {isLoading ? (
              <tr>
                <td colSpan={4} className="py-12 text-center text-description">
                  <div className="flex items-center justify-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin text-[#0071E3]" />
                    <span>Loading broadcast notifications...</span>
                  </div>
                </td>
              </tr>
            ) : notifications.length === 0 ? (
              <tr>
                <td colSpan={4} className="py-12 text-center text-description">
                  No notification broadcasts found.
                </td>
              </tr>
            ) : (
              notifications.map((item) => {
                const isAlert = item.category?.toLowerCase().includes('alert');
                return (
                  <tr
                    key={item.id}
                    className="hover:bg-[#040812]/60 transition-colors group"
                  >
                    {/* CATEGORY */}
                    <td className="py-4 px-3">
                      <span
                        className={`inline-block px-2.5 py-1 rounded-full border font-bold text-[10px] uppercase tracking-wider ${
                          isAlert
                            ? 'bg-amber-500/15 border-amber-500/30 text-amber-400'
                            : 'bg-cyan-500/15 border-cyan-500/30 text-cyan-400'
                        }`}
                      >
                        {item.category || 'alert'}
                      </span>
                    </td>

                    {/* TITLE & CONTENT */}
                    <td className="py-4 px-3">
                      <h4 className="font-bold text-white text-xs sm:text-sm group-hover:text-[#0071E3] transition-colors truncate max-w-72 sm:max-w-96">
                        {item.title}
                      </h4>
                      <p className="text-xs text-description line-clamp-2 mt-1 leading-relaxed">
                        {item.content}
                      </p>
                    </td>

                    {/* SENT DATE */}
                    <td className="py-4 px-3 font-mono text-[11px] text-description">
                      {item.sent_date ? new Date(item.sent_date).toLocaleString() : 'N/A'}
                    </td>

                    {/* ACTIONS */}
                    <td className="py-4 px-3 text-right">
                      <button
                        type="button"
                        onClick={() => onDeleteNotification(item.id)}
                        className="w-8 h-8 rounded-lg bg-[#111A2E] hover:bg-rose-500/20 border border-border-color hover:border-rose-500/40 items-center justify-center text-gray-400 hover:text-rose-400 transition-all cursor-pointer inline-flex"
                        title="Delete Notification"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Reusable Custom Pagination */}
      <CustomPagination
        page={page}
        totalCount={totalCount}
        hasNextPage={hasNextPage}
        hasPreviousPage={hasPreviousPage}
        onPageChange={onPageChange}
        isLoading={isLoading}
      />
    </div>
  );
};

export default SentBulkNotificationsBroadcastHistory;