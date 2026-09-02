'use client';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Upload, Plus, AlertCircle } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import {
  uploadKnowledgeDocumentSchema,
  UploadKnowledgeDocumentFormValues,
} from '@/validation/knowledgeBase.validation';

interface UploadNewKnowledgeDocumentProps {
  onAddDocument: (data: UploadKnowledgeDocumentFormValues) => Promise<void> | void;
  isSubmitting?: boolean;
}

const UploadNewKnowledgeDocument = ({
  onAddDocument,
  isSubmitting = false,
}: UploadNewKnowledgeDocumentProps) => {
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

  const onSubmit = async (data: UploadKnowledgeDocumentFormValues) => {
    await onAddDocument(data);
    reset();
  };

  return (
    <div className="bg-[#0A101D] border border-border-color rounded-2xl p-6 shadow-sm space-y-6">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 mb-1">
          <Upload className="w-4 h-4 text-[#0071E3]" />
          <h2 className="text-base font-bold text-white tracking-tight">
            {t.uploadNewKbDocTitle}
          </h2>
        </div>
        <p className="text-xs text-description leading-relaxed">
          {t.uploadNewKbDocDesc}
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
        {/* Title Field */}
        <div>
          <label
            htmlFor="title"
            className="block text-[11px] font-semibold text-input-label tracking-wider uppercase mb-2"
          >
            {t.documentTitleLabel}
          </label>
          <input
            id="title"
            type="text"
            placeholder={t.documentTitlePlaceholder}
            {...register('title')}
            className={`w-full bg-[#040812] border ${errors.title ? 'border-red-500 focus:border-red-500' : 'border-border-color focus:border-[#0071E3]'
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
            htmlFor="content"
            className="block text-[11px] font-semibold text-input-label tracking-wider uppercase mb-2"
          >
            {t.knowledgeTextContentLabel}
          </label>
          <textarea
            id="content"
            rows={5}
            placeholder={t.knowledgeTextContentPlaceholder}
            {...register('content')}
            className={`w-full bg-[#040812] border ${errors.content ? 'border-red-500 focus:border-red-500' : 'border-border-color focus:border-[#0071E3]'
              } rounded-xl p-4 text-sm text-white placeholder:text-gray-600 outline-none resize-none transition-colors`}
          />
          {errors.content && (
            <p className="text-red-400 text-xs mt-1.5 flex items-center gap-1">
              <AlertCircle className="w-3.5 h-3.5" />
              {errors.content.message}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-5 py-2.5 bg-[#0071E3] hover:bg-[#005bb5] active:bg-[#004993] text-white text-xs font-semibold rounded-xl flex items-center gap-2 shadow-lg shadow-[#0071E3]/20 transition-all cursor-pointer disabled:opacity-50"
          >
            <Plus className="w-4 h-4" />
            <span>{isSubmitting ? 'Saving Entry...' : t.saveKnowledgeEntry}</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default UploadNewKnowledgeDocument;