'use client';
import { Eye, Users } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

interface LivePushNotificationPreviewProps {
    category?: 'Alerts' | 'Discover';
    title?: string;
    message?: string;
}

const LivePushNotificationPreview = ({ category = 'Alerts', title = '', message = '' }: LivePushNotificationPreviewProps) => {
    const { t } = useLanguage();

    const isAlerts = category === 'Alerts';

    return (
        <div className="bg-[#0A101D] border border-border-color rounded-2xl p-6 sm:p-8 shadow-sm flex flex-col justify-between h-full">
            <div>
                {/* Header */}
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                        <Eye className="w-4 h-4 text-[#0071E3]" />
                        <h3 className="text-xs font-bold uppercase tracking-wider text-white">
                            {t.livePreviewTitle}
                        </h3>
                    </div>
                    <span className="bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-[10px] font-bold uppercase px-2.5 py-0.5 rounded-full">
                        {t.livePreviewBadge}
                    </span>
                </div>

                {/* Subtitle */}
                <p className="text-xs text-description leading-relaxed mb-6">
                    {t.livePreviewDesc}
                </p>

                {/* Terminal Push Card */}
                <div className="bg-[#040812] border border-border-color rounded-2xl p-5 relative space-y-4 mb-6 shadow-inner">
                    {/* Top Pill & Timestamp Row */}
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <span
                                className={`text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${isAlerts
                                        ? 'bg-amber-500/20 text-amber-400 border-amber-500/40'
                                        : 'bg-cyan-500/20 text-cyan-400 border-cyan-500/40'
                                    }`}
                            >
                                {isAlerts ? 'ALERTS' : 'DISCOVER'}
                            </span>
                            <span className="text-[11px] text-description font-medium">
                                {isAlerts ? 'Alert' : 'Info'}
                            </span>
                        </div>
                        <span className="text-[11px] font-mono text-description">
                            {t.justNow}
                        </span>
                    </div>

                    {/* Render Title */}
                    <h4 className="text-sm font-bold text-white leading-snug">
                        {title.trim() ? title : t.sampleTitlePlaceholder}
                    </h4>

                    {/* Render Message Content */}
                    <p className="text-xs text-description leading-relaxed wrap-break-word">
                        {message.trim() ? message : t.sampleMessagePlaceholder}
                    </p>

                    {/* Target & Action Row */}
                    <div className="pt-3 border-t border-border-color/60 flex items-center justify-between gap-3">
                        <div className="text-[11px] text-description">
                            <span>{t.targetLabel} </span>
                            <span className="text-white font-medium">{t.targetValue}</span>
                        </div>

                        <button
                            type="button"
                            className="bg-[#0071E3] hover:bg-[#0060C4] text-white text-xs px-3.5 py-1.5 rounded-lg font-semibold shadow-sm transition-colors cursor-pointer"
                        >
                            {t.viewAlertButton}
                        </button>
                    </div>
                </div>
            </div>

            {/* Estimated Reach Stats Box */}
            <div className="bg-[#040812] border border-border-color rounded-xl p-4 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-[#0071E3]/15 border border-[#0071E3]/30 text-[#0071E3] flex items-center justify-center shrink-0">
                        <Users className="w-4 h-4" />
                    </div>
                    <div>
                        <h5 className="text-xs font-bold text-white">
                            {t.estimatedReachTitle}
                        </h5>
                        <p className="text-[11px] text-description">
                            {t.estimatedReachDesc}
                        </p>
                    </div>
                </div>

                <span className="text-sm font-bold text-[#0071E3] tracking-tight shrink-0">
                    {t.reachPercent}
                </span>
            </div>
        </div>
    );
};

export default LivePushNotificationPreview;