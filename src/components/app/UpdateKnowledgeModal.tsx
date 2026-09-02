'use client';

import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Edit3, X, AlertCircle, Save } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import {
  uploadKnowledgeDocumentSchema,
  UploadKnowledgeDocumentFormValues,
} from '@/validation/knowledgeBase.validation';
import { TKnowledgeBaseItem } from '@/redux/features/app/app.type';

interface UpdateKnowledgeModalProps {
  document: TKnowledgeBaseItem | null;
  isOpen: boolean;
  onClose: () => void;
  onUpdateDocument: (id: string, data: UploadKnowledgeDocumentFormValues) => Promise<void> | void;
  isUpdating?: boolean;
}

const UpdateKnowledgeModal: React.FC<UpdateKnowledgeModalProps> = ({
  document,
  isOpen,
  onClose,
  onUpdateDocument,
  isUpdating = false,
}) => {
  const { t } = useLanguage();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UploadKnowledgeDocumentFormValues>({
    resolver: zodResolver(uploadKnowledgeDocumentSchema),
    defaultValues: {
      title: '',
      content: '',
    },
  });

  useEffect(() => {
    if (document) {
      reset({
        title: document.title || '',
        content: document.content || '',
      });
    }
  }, [document, reset]);

  if (!isOpen || !document) return null;

  const onSubmit = async (data: UploadKnowledgeDocumentFormValues) => {
    await onUpdateDocument(document.id, data);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="w-full max-w-160 bg-[#0A101D] border border-border-color rounded-2xl p-6 sm:p-8 shadow-[0_0_50px_rgba(0,113,227,0.3)] relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-start justify-between gap-4 mb-6">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-[#0071E3]/15 border border-[#0071E3]/30 rounded-xl flex items-center justify-center text-[#0071E3] shrink-0 mt-0.5">
              <Edit3 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-white leading-tight mb-1">
                {t.updateKbDocTitle}
              </h3>
              <p className="text-xs text-description">
                {t.updateKbDocDesc} <span className="font-mono text-gray-300">{document.id}</span>
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-[#111A2E] hover:bg-[#18233D] border border-border-color flex items-center justify-center text-gray-400 hover:text-white transition-colors focus:outline-none shrink-0 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Update Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
          {/* Title Field */}
          <div>
            <label
              htmlFor="edit-title"
              className="block text-[11px] font-semibold text-input-label tracking-wider uppercase mb-2"
            >
              {t.documentTitleLabel}
            </label>
            <input
              id="edit-title"
              type="text"
              placeholder={t.documentTitlePlaceholder}
              {...register('title')}
              className={`w-full bg-[#040812] border ${
                errors.title ? 'border-red-500 focus:border-red-500' : 'border-border-color focus:border-[#0071E3]'
              } rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-gray-600 outline-none transition-colors`}
            />
            {errors.title && (
              <p className="text-red-400 text-xs mt-1.5 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" />
                {errors.title.message}
              </p>
            )}
          </div>

          {/* Text Content area */}
          <div>
            <label
              htmlFor="edit-content"
              className="block text-[11px] font-semibold text-input-label tracking-wider uppercase mb-2"
            >
              {t.knowledgeTextContentLabel}
            </label>
            <textarea
              id="edit-content"
              rows={6}
              placeholder={t.knowledgeTextContentPlaceholder}
              {...register('content')}
              className={`w-full bg-[#040812] border ${
                errors.content ? 'border-red-500 focus:border-red-500' : 'border-border-color focus:border-[#0071E3]'
              } rounded-xl p-4 text-sm text-white placeholder:text-gray-600 outline-none resize-y min-h-36 transition-colors`}
            />
            {errors.content && (
              <p className="text-red-400 text-xs mt-1.5 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" />
                {errors.content.message}
              </p>
            )}
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              disabled={isUpdating}
              className="py-2.5 px-5 bg-[#111A2E] hover:bg-[#18233D] border border-border-color text-white text-xs font-medium rounded-xl transition-colors cursor-pointer disabled:opacity-50"
            >
              {t.cancel}
            </button>

            <button
              type="submit"
              disabled={isUpdating}
              className="py-2.5 px-6 bg-[#0071E3] hover:bg-[#0060C4] active:bg-[#0052B0] text-white text-xs font-semibold rounded-xl flex items-center gap-2 shadow-lg shadow-[#0071E3]/30 transition-all cursor-pointer disabled:opacity-50"
            >
              <Save className="w-4 h-4" />
              <span>{isUpdating ? t.updatingEntry : t.updateKnowledgeEntry}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateKnowledgeModal;
