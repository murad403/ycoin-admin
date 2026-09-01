'use client';
import { Bell, Trash2 } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export interface HistoryItem {
    id: string;
    category: 'Alerts' | 'Discover';
    urgency: 'Alert' | 'Info' | 'Warning';
    title: string;
    message: string;
    targetAudience: string;
    recipients: string;
    sentDate: string;
}

interface SentBulkNotificationsBroadcastHistoryProps {
    historyList: HistoryItem[];
    onDeleteHistory: (id: string) => void;
}

const SentBulkNotificationsBroadcastHistory = ({ historyList, onDeleteHistory }: SentBulkNotificationsBroadcastHistoryProps) => {
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

                <span className="bg-[#111A2E] text-gray-300 border border-border-color text-xs px-3 py-1 rounded-full font-medium w-fit self-start sm:self-auto">
                    {historyList.length} Broadcasts
                </span>
            </div>

            {/* History Table */}
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse min-w-212.5">
                    <thead>
                        <tr className="border-b border-border-color/80 text-[11px] font-semibold text-description uppercase tracking-wider">
                            <th className="py-3 px-4 w-44">{t.tableCategoryUrgency}</th>
                            <th className="py-3 px-4">{t.tableTitleContent}</th>
                            <th className="py-3 px-4 w-40">{t.tableTargetAudience}</th>
                            <th className="py-3 px-4 w-32">{t.tableRecipients}</th>
                            <th className="py-3 px-4 w-44">{t.tableSentDate}</th>
                            <th className="py-3 px-4 text-right w-20">{t.tableAction}</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-border-color/50 text-xs">
                        {historyList.map((item) => {
                            const isAlerts = item.category === 'Alerts';

                            return (
                                <tr
                                    key={item.id}
                                    className="hover:bg-[#040812]/60 transition-colors group"
                                >
                                    {/* CATEGORY & URGENCY */}
                                    <td className="py-4 px-4 align-top">
                                        <div className="flex flex-col gap-1.5 items-start">
                                            <span
                                                className={`text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${isAlerts
                                                        ? 'bg-amber-500/20 text-amber-400 border-amber-500/40'
                                                        : 'bg-cyan-500/20 text-cyan-400 border-cyan-500/40'
                                                    }`}
                                            >
                                                {item.category}
                                            </span>
                                            <span className="text-[11px] text-description font-medium">
                                                {item.urgency}
                                            </span>
                                        </div>
                                    </td>

                                    {/* TITLE & MESSAGE CONTENT */}
                                    <td className="py-4 px-4 align-top">
                                        <div className="space-y-1 pr-4">
                                            <h4 className="font-bold text-white group-hover:text-[#0071E3] transition-colors leading-snug">
                                                {item.title}
                                            </h4>
                                            <p className="text-xs text-description leading-relaxed line-clamp-2">
                                                {item.message}
                                            </p>
                                        </div>
                                    </td>

                                    {/* TARGET AUDIENCE */}
                                    <td className="py-4 px-4 align-top text-gray-300 font-medium whitespace-nowrap">
                                        {item.targetAudience}
                                    </td>

                                    {/* RECIPIENTS */}
                                    <td className="py-4 px-4 align-top font-bold text-[#0071E3] whitespace-nowrap">
                                        {item.recipients}
                                    </td>

                                    {/* SENT DATE */}
                                    <td className="py-4 px-4 align-top font-mono text-gray-400 text-[11px] whitespace-nowrap">
                                        {item.sentDate}
                                    </td>

                                    {/* ACTION */}
                                    <td className="py-4 px-4 align-top text-right whitespace-nowrap">
                                        <button
                                            type="button"
                                            onClick={() => onDeleteHistory(item.id)}
                                            title="Delete broadcast record"
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

export default SentBulkNotificationsBroadcastHistory;