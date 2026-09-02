'use client';

import React, { useState } from 'react';
import { Bell } from 'lucide-react';
import { toast } from 'sonner';
import ComposeBroadcastPushNotification from '@/components/app/ComposeBroadcastPushNotification';
import LivePushNotificationPreview from '@/components/app/LivePushNotificationPreview';
import SentBulkNotificationsBroadcastHistory from '@/components/app/SentBulkNotificationsBroadcastHistory';
import { useLanguage } from '@/context/LanguageContext';
import {
  useRetrieveNotificationsQuery,
  useCreateNotificationMutation,
  useDeleteNotificationMutation,
} from '@/redux/features/app/app.api';
import { PushNotificationFormValues } from '@/validation/pushNotification.validation';

const BulkPushNotificationsPage = () => {
  const { t } = useLanguage();
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [livePreview, setLivePreview] = useState<Partial<PushNotificationFormValues>>({
    category: 'alert',
    title: '',
    content: '',
  });

  // RTK Query hooks
  const { data, isLoading } = useRetrieveNotificationsQuery({ page, search, page_size: 10 });
  const [createNotification, { isLoading: isCreating }] = useCreateNotificationMutation();
  const [deleteNotification] = useDeleteNotificationMutation();

  const handleSearchChange = (term: string) => {
    setSearch(term);
    setPage(1);
  };

  const handleBroadcastSubmit = async (formData: PushNotificationFormValues) => {
    try {
      await createNotification({
        category: formData.category,
        title: formData.title,
        content: formData.content,
      }).unwrap();
      toast.success('Push notification broadcasted successfully to all users!');
    } catch (err: any) {
      toast.error(err?.data?.detail || err?.data?.message || 'Failed to broadcast push notification.');
    }
  };

  const handleDeleteNotification = async (id: number | string) => {
    try {
      await deleteNotification(id).unwrap();
      toast.success('Notification broadcast deleted successfully!');
    } catch (err: any) {
      toast.error(err?.data?.detail || err?.data?.message || 'Failed to delete notification broadcast.');
    }
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
          onValuesChange={(vals) => setLivePreview(vals)}
          onBroadcastSubmit={handleBroadcastSubmit}
          isSubmitting={isCreating}
        />
        <LivePushNotificationPreview
          category={livePreview.category}
          title={livePreview.title}
          content={livePreview.content}
        />
      </div>

      {/* Bottom Table: Sent History */}
      <SentBulkNotificationsBroadcastHistory
        notifications={data?.results || []}
        isLoading={isLoading}
        onDeleteNotification={handleDeleteNotification}
        searchTerm={search}
        onSearchChange={handleSearchChange}
        page={page}
        onPageChange={(newPage) => setPage(newPage)}
        hasNextPage={Boolean(data?.next)}
        hasPreviousPage={Boolean(data?.previous)}
        totalCount={data?.count || data?.results?.length || 0}
      />
    </div>
  );
};

export default BulkPushNotificationsPage;