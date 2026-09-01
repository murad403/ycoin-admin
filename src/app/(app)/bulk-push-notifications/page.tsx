'use client';
import { useState } from 'react';
import { Bell, RefreshCw } from 'lucide-react';
import ComposeBroadcastPushNotification from '@/components/app/ComposeBroadcastPushNotification';
import LivePushNotificationPreview from '@/components/app/LivePushNotificationPreview';
import SentBulkNotificationsBroadcastHistory, { HistoryItem } from '@/components/app/SentBulkNotificationsBroadcastHistory';
import { useLanguage } from '@/context/LanguageContext';
import { PushNotificationFormValues } from '@/validation/pushNotification.validation';

const initialHistory: HistoryItem[] = [
  {
    id: 'bc-1',
    category: 'Alerts',
    urgency: 'Alert',
    title: '⚡ Bitcoin Volatility Trigger: BTC Surges Past $98,000',
    message:
      'Bitcoin price has broken major resistance at $98,000. BitVM L2 state settlement channels are processing high-frequency ZK verifications.',
    targetAudience: 'All Platform Users',
    recipients: '14,208 Users',
    sentDate: '8/5/2026, 11:54:47 AM',
  },
  {
    id: 'bc-2',
    category: 'Discover',
    urgency: 'Info',
    title: '🚀 New Sovereign AI Agent Live: Satoshi Oracle v2.4',
    message:
      'Discover the newly deployed Satoshi Oracle trained on the latest PoW block subsidy models and BitVM zero-knowledge rollups.',
    targetAudience: 'All Platform Users',
    recipients: '14,208 Users',
    sentDate: '8/5/2026, 10:09:47 AM',
  },
  {
    id: 'bc-3',
    category: 'Alerts',
    urgency: 'Warning',
    title: '⚠️ PoW Difficulty Rebalance Alert',
    message:
      'YCOIN L2 Hashrate spiked +18.4% in the last 24 hours. Mining yield calculators and difficulty adjustment curves updated.',
    targetAudience: 'Node Operators',
    recipients: '14,208 Users',
    sentDate: '8/5/2026, 7:09:47 AM',
  },
];

const BulkPushNotificationsPage = () => {
  const { t } = useLanguage();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [livePreview, setLivePreview] = useState<Partial<PushNotificationFormValues>>({
    category: 'Alerts',
    title: '',
    message: '',
  });
  const [historyList, setHistoryList] = useState<HistoryItem[]>(initialHistory);

  const handleRefreshFeed = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
    }, 800);
  };

  const handleAddBroadcast = (data: PushNotificationFormValues) => {
    const newRecord: HistoryItem = {
      id: `bc-${Date.now()}`,
      category: data.category,
      urgency: data.category === 'Alerts' ? 'Alert' : 'Info',
      title: data.title,
      message: data.message,
      targetAudience: 'All Platform Users',
      recipients: '14,208 Users',
      sentDate: new Date().toLocaleString(),
    };
    setHistoryList((prev) => [newRecord, ...prev]);
  };

  const handleDeleteHistory = (id: string) => {
    setHistoryList((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <div className="space-y-6 sm:space-y-8 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <div className="w-8 h-8 rounded-xl bg-[#0071E3]/15 border border-[#0071E3]/30 flex items-center justify-center text-[#0071E3]">
              <Bell className="w-4 h-4" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              {t.bulkPushSystemTitle}
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-description max-w-3xl leading-relaxed">
            {t.bulkPushSystemDesc}
          </p>
        </div>
      </div>

      {/* Top Grid: Compose Form + Live Preview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
        <ComposeBroadcastPushNotification
          onValuesChange={(values) => setLivePreview(values)}
          onBroadcastSuccess={handleAddBroadcast}
        />
        <LivePushNotificationPreview
          category={livePreview.category}
          title={livePreview.title}
          message={livePreview.message}
        />
      </div>

      {/* Bottom Section: Broadcast History */}
      <SentBulkNotificationsBroadcastHistory
        historyList={historyList}
        onDeleteHistory={handleDeleteHistory}
      />
    </div>
  );
};

export default BulkPushNotificationsPage;