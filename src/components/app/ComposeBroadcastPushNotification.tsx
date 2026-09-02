'use client';

import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Megaphone, Radio, Send, AlertCircle } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { pushNotificationSchema, PushNotificationFormValues } from '@/validation/pushNotification.validation';

interface ComposeBroadcastPushNotificationProps {
  onValuesChange: (values: Partial<PushNotificationFormValues>) => void;
  onBroadcastSubmit: (data: PushNotificationFormValues) => Promise<void> | void;
  isSubmitting?: boolean;
}

const ComposeBroadcastPushNotification = ({
  onValuesChange,
  onBroadcastSubmit,
  isSubmitting = false,
}: ComposeBroadcastPushNotificationProps) => {
  const { t } = useLanguage();

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm<PushNotificationFormValues>({
    resolver: zodResolver(pushNotificationSchema),
    defaultValues: {
      category: 'alert',
      title: '',
      content: '',
    },
  });

  const watchedValues = watch();

  useEffect(() => {
    onValuesChange(watchedValues);
  }, [watchedValues.category, watchedValues.title, watchedValues.content, onValuesChange]);

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset({
        category: 'alert',
        title: '',
        content: '',
      });
    }
  }, [isSubmitSuccessful, reset]);

  const onSubmit = async (data: PushNotificationFormValues) => {
    await onBroadcastSubmit(data);
  };

  return (
    <div className="bg-[#0A101D] border border-border-color rounded-2xl p-6 sm:p-8 shadow-sm flex flex-col justify-between h-full">
      <div>
        {/* Header */}
        <div className="flex items-start gap-3.5 mb-6">
          <div className="w-10 h-10 bg-[#0071E3]/15 border border-[#0071E3]/30 rounded-xl flex items-center justify-center text-[#0071E3] shrink-0 mt-0.5">
            <Megaphone className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-bold text-white tracking-tight">
              {t.composeTitle}
            </h2>
            <p className="text-xs text-description leading-relaxed mt-0.5">
              {t.composeDesc}
            </p>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
          {/* Push Category */}
          <div>
            <label className="block text-[11px] font-semibold tracking-wider uppercase text-input-label mb-2 items-center gap-1.5">
              <Radio className="w-3.5 h-3.5 text-[#0071E3]" />
              <span>{t.pushCategory}</span>
            </label>
            <select
              {...register('category')}
              className="w-full px-4 py-3 bg-[#040812] border border-border-color rounded-xl text-white text-sm focus:outline-none focus:border-[#0071E3] focus:ring-1 focus:ring-[#0071E3] transition-colors cursor-pointer capitalize"
            >
              <option value="alert" className="bg-[#0A101D]">{t.alertsCategory} (alert)</option>
              <option value="discover" className="bg-[#0A101D]">{t.discoverCategory} (discover)</option>
            </select>
            {errors.category && (
              <p className="text-red-400 text-xs mt-1.5 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" />
                {errors.category.message}
              </p>
            )}
          </div>

          {/* Notification Title */}
          <div>
            <label
              htmlFor="title"
              className="block text-[11px] font-semibold tracking-wider uppercase text-input-label mb-2"
            >
              {t.notificationTitleLabel}
            </label>
            <input
              id="title"
              type="text"
              placeholder={t.notificationTitlePlaceholder}
              {...register('title')}
              className={`w-full px-4 py-3 bg-[#040812] border ${
                errors.title ? 'border-red-500' : 'border-border-color focus:border-[#0071E3]'
              } rounded-xl text-white text-sm placeholder:text-gray-600 outline-none focus:ring-1 focus:ring-[#0071E3] transition-colors`}
            />
            {errors.title && (
              <p className="text-red-400 text-xs mt-1.5 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" />
                {errors.title.message}
              </p>
            )}
          </div>

          {/* Notification Content */}
          <div>
            <label
              htmlFor="content"
              className="block text-[11px] font-semibold tracking-wider uppercase text-input-label mb-2"
            >
              {t.pushMessageLabel}
            </label>
            <textarea
              id="content"
              rows={4}
              placeholder={t.pushMessagePlaceholder}
              {...register('content')}
              className={`w-full px-4 py-3 bg-[#040812] border ${
                errors.content ? 'border-red-500' : 'border-border-color focus:border-[#0071E3]'
              } rounded-xl text-white text-sm placeholder:text-gray-600 outline-none focus:ring-1 focus:ring-[#0071E3] transition-colors leading-relaxed resize-none`}
            />
            {errors.content && (
              <p className="text-red-400 text-xs mt-1.5 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" />
                {errors.content.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3.5 px-4 bg-[#0071E3] hover:bg-[#0060C4] active:bg-[#0052B0] text-white font-semibold text-sm rounded-xl shadow-lg shadow-[#0071E3]/30 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed mt-4"
          >
            <Send className="w-4 h-4" />
            <span>
              {isSubmitting
                ? 'Broadcasting Signal...'
                : t.broadcastNowButton}
            </span>
          </button>
        </form>
      </div>
    </div>
  );
};

export default ComposeBroadcastPushNotification;