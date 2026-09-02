'use client';

import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  FileText,
  Pencil,
  Bold,
  Italic,
  Underline,
  Strikethrough,
  Heading,
  List,
  ListOrdered,
  Quote,
  Code,
  RemoveFormatting,
  Trash2,
  Save,
  Loader2,
} from 'lucide-react';
import { toast } from 'sonner';
import { useLanguage } from '@/context/LanguageContext';
import DeleteLegalModal from './DeleteLegalModal';
import {
  useRetrievePrivacyPolicyQuery,
  useUpdatePrivacyPolicyMutation,
  useRetrieveTermsAndConditionsQuery,
  useUpdateTermsAndConditionsMutation,
} from '@/redux/features/app/app.api';
import { TUpdateLegalDocumentRequest } from '@/redux/features/app/app.type';

const LegalPoliciesTermsEditor = () => {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<'terms' | 'privacy'>('terms');
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // Queries
  const {
    data: termsData,
    isLoading: isTermsLoading,
  } = useRetrieveTermsAndConditionsQuery();

  const {
    data: privacyData,
    isLoading: isPrivacyLoading,
  } = useRetrievePrivacyPolicyQuery();

  // Mutations
  const [updateTerms, { isLoading: isUpdatingTerms }] = useUpdateTermsAndConditionsMutation();
  const [updatePrivacy, { isLoading: isUpdatingPrivacy }] = useUpdatePrivacyPolicyMutation();

  const isUpdating = isUpdatingTerms || isUpdatingPrivacy;
  const isDataLoading = activeTab === 'terms' ? isTermsLoading : isPrivacyLoading;

  const { register, handleSubmit, setValue, watch } = useForm<TUpdateLegalDocumentRequest>({
    defaultValues: {
      content: '',
    },
  });

  const currentContent = watch('content') || '';

  // Update form content when tab or API data changes
  useEffect(() => {
    if (activeTab === 'terms') {
      setValue('content', termsData?.content || '');
    } else {
      setValue('content', privacyData?.content || '');
    }
  }, [activeTab, termsData, privacyData, setValue]);

  const handleApplyFormat = (prefix: string, suffix: string = '') => {
    const newContent = `${currentContent}\n${prefix} ${suffix}`;
    setValue('content', newContent);
  };

  const handleConfirmDelete = async () => {
    setValue('content', '');
    setIsDeleteModalOpen(false);
    toast.info('Document content cleared. Click "Save & Publish" to save the cleared document.');
  };

  const onSubmit = async (data: TUpdateLegalDocumentRequest) => {
    try {
      if (activeTab === 'terms') {
        const res = await updateTerms({ content: data.content }).unwrap();
        toast.success(`${res.document_type_display || 'Terms & Conditions'} published successfully!`);
      } else {
        const res = await updatePrivacy({ content: data.content }).unwrap();
        toast.success(`${res.document_type_display || 'Privacy Policy'} published successfully!`);
      }
    } catch (err: any) {
      toast.error(err?.data?.detail || err?.data?.message || 'Failed to update legal document.');
    }
  };

  return (
    <div className="bg-[#0A101D] border border-border-color rounded-2xl p-6 sm:p-8 shadow-sm space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-3.5">
          <div className="w-10 h-10 bg-[#0071E3]/15 border border-[#0071E3]/30 rounded-xl flex items-center justify-center text-[#0071E3] shrink-0 mt-0.5">
            <FileText className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-bold text-white tracking-tight">
              {t.legalEditorTitle}
            </h2>
            <p className="text-xs text-description leading-relaxed mt-0.5">
              {t.legalEditorDesc}
            </p>
          </div>
        </div>
      </div>

      {/* Policy Switcher Tabs */}
      <div className="bg-[#040812] border border-border-color rounded-xl p-1.5 flex items-center gap-1.5">
        <button
          type="button"
          onClick={() => setActiveTab('terms')}
          className={`flex-1 py-2.5 px-4 rounded-lg text-xs font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer ${
            activeTab === 'terms'
              ? 'bg-[#0071E3] text-white shadow-md'
              : 'text-description hover:text-white'
          }`}
        >
          <FileText className="w-4 h-4" />
          <span>{t.termsOfService}</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('privacy')}
          className={`flex-1 py-2.5 px-4 rounded-lg text-xs font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer ${
            activeTab === 'privacy'
              ? 'bg-[#0071E3] text-white shadow-md'
              : 'text-description hover:text-white'
          }`}
        >
          <div className="w-3.5 h-3.5 rounded-full border border-current flex items-center justify-center">
            <div className="w-1.5 h-1.5 rounded-full bg-current" />
          </div>
          <span>{t.privacyPolicy}</span>
        </button>
      </div>

      {/* Editor Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate>
        <div className="space-y-2">
          {/* Editor Title & Character Counter Header */}
          <div className="flex items-center justify-between text-[11px] font-semibold tracking-wider uppercase text-input-label">
            <div className="flex items-center gap-1.5">
              <Pencil className="w-3.5 h-3.5 text-[#0071E3]" />
              <span>{t.editPolicyClauses}</span>
            </div>
            <span className="font-mono text-description text-[11px]">
              {currentContent.length} {t.characters}
            </span>
          </div>

          {/* Rich Text Editor Wrapper */}
          <div className="bg-[#040812] border border-border-color focus-within:border-[#0071E3] rounded-xl overflow-hidden transition-colors relative">
            {/* Formatting Toolbar */}
            <div className="bg-[#0A101D] border-b border-border-color p-2 flex items-center gap-1 flex-wrap text-gray-400">
              <button
                type="button"
                onClick={() => handleApplyFormat('**', '**')}
                title="Bold"
                className="p-1.5 rounded-md hover:bg-[#111A2E] hover:text-white transition-colors cursor-pointer"
              >
                <Bold className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => handleApplyFormat('_', '_')}
                title="Italic"
                className="p-1.5 rounded-md hover:bg-[#111A2E] hover:text-white transition-colors cursor-pointer"
              >
                <Italic className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => handleApplyFormat('<u>', '</u>')}
                title="Underline"
                className="p-1.5 rounded-md hover:bg-[#111A2E] hover:text-white transition-colors cursor-pointer"
              >
                <Underline className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => handleApplyFormat('~~', '~~')}
                title="Strikethrough"
                className="p-1.5 rounded-md hover:bg-[#111A2E] hover:text-white transition-colors cursor-pointer"
              >
                <Strikethrough className="w-4 h-4" />
              </button>
              <div className="w-px h-4 bg-border-color mx-1" />
              <button
                type="button"
                onClick={() => handleApplyFormat('## Section Header')}
                title="Heading"
                className="p-1.5 rounded-md hover:bg-[#111A2E] hover:text-white transition-colors cursor-pointer"
              >
                <Heading className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => handleApplyFormat('- Bullet point item')}
                title="Bullet List"
                className="p-1.5 rounded-md hover:bg-[#111A2E] hover:text-white transition-colors cursor-pointer"
              >
                <List className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => handleApplyFormat('1. Numbered item')}
                title="Numbered List"
                className="p-1.5 rounded-md hover:bg-[#111A2E] hover:text-white transition-colors cursor-pointer"
              >
                <ListOrdered className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => handleApplyFormat('> Blockquote text')}
                title="Quote"
                className="p-1.5 rounded-md hover:bg-[#111A2E] hover:text-white transition-colors cursor-pointer"
              >
                <Quote className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => handleApplyFormat('`code snippet`')}
                title="Code"
                className="p-1.5 rounded-md hover:bg-[#111A2E] hover:text-white transition-colors cursor-pointer"
              >
                <Code className="w-4 h-4" />
              </button>
              <div className="w-px h-4 bg-border-color mx-1" />
              <button
                type="button"
                onClick={() => setValue('content', '')}
                title="Clear Formatting"
                className="p-1.5 rounded-md hover:bg-rose-500/20 hover:text-rose-400 transition-colors cursor-pointer"
              >
                <RemoveFormatting className="w-4 h-4" />
              </button>
            </div>

            {/* Editor Content Textarea */}
            {isDataLoading ? (
              <div className="flex items-center justify-center py-20 text-xs text-description gap-2">
                <Loader2 className="w-4 h-4 animate-spin text-[#0071E3]" />
                <span>Loading legal document content...</span>
              </div>
            ) : (
              <textarea
                rows={10}
                {...register('content')}
                placeholder="Edit or enter terms content here..."
                className="w-full bg-transparent p-4 text-xs font-mono text-gray-200 leading-relaxed outline-none resize-y min-h-90"
              />
            )}
          </div>
        </div>

        {/* Bottom Actions Row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
          <button
            type="button"
            onClick={() => setIsDeleteModalOpen(true)}
            className="w-full sm:w-auto px-4 py-2.5 bg-rose-950/30 border border-rose-900/50 hover:bg-rose-900/40 text-rose-400 text-xs font-semibold rounded-xl flex items-center justify-center gap-2 transition-colors cursor-pointer"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>{t.deleteClearTerms}</span>
          </button>

          <button
            type="submit"
            disabled={isUpdating || isDataLoading}
            className="w-full sm:w-auto px-6 py-2.5 bg-[#0071E3] hover:bg-[#0060C4] active:bg-[#0052B0] text-white text-xs font-semibold rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-[#0071E3]/30 transition-all cursor-pointer disabled:opacity-50"
          >
            <Save className="w-3.5 h-3.5" />
            <span>{isUpdating ? 'Publishing Policy...' : t.savePublishPolicy}</span>
          </button>
        </div>
      </form>

      {/* Delete Legal Policy Confirmation Modal */}
      <DeleteLegalModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        policyName={activeTab === 'terms' ? t.termsOfService : t.privacyPolicy}
      />
    </div>
  );
};

export default LegalPoliciesTermsEditor;