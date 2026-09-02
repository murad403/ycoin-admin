'use client';

import React from 'react';
import { FileText, X, User, Calendar } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { TKnowledgeBaseItem } from '@/redux/features/app/app.type';

interface DocumentDetailsModalProps {
  document: TKnowledgeBaseItem | null;
  isOpen: boolean;
  onClose: () => void;
}

const DocumentDetailsModal = ({
  document,
  isOpen,
  onClose,
}: DocumentDetailsModalProps) => {
  const { t } = useLanguage();

  if (!isOpen || !document) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="w-full max-w-160 bg-[#0A101D] border border-border-color rounded-2xl p-6 sm:p-8 shadow-[0_0_50px_rgba(0,113,227,0.3)] relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-4 mb-6">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-[#0071E3]/15 border border-[#0071E3]/30 rounded-xl flex items-center justify-center text-[#0071E3] shrink-0 mt-0.5">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-white leading-tight mb-1">
                {document.title}
              </h3>
              <p className="text-xs text-description font-mono">
                ID: {document.id}
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

        {/* Metadata Banner Grid */}
        <div className="bg-[#040812] border border-border-color rounded-xl p-4 grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6 text-xs">
          <div>
            <span className="text-description text-[11px] mb-1 flex items-center gap-1">
              <User className="w-3.5 h-3.5 text-[#0071E3]" /> Uploaded By
            </span>
            <span className="text-white font-medium block truncate">
              {document.uploaded_by_name || 'Admin'}
            </span>
            <span className="text-[11px] text-description font-mono block truncate">
              {document.uploaded_by_email}
            </span>
          </div>

          <div>
            <span className="text-description text-[11px] mb-1 flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-[#0071E3]" /> Dates
            </span>
            <span className="text-white font-medium block text-[11px] font-mono">
              Created: {document.created_at ? new Date(document.created_at).toLocaleString() : 'N/A'}
            </span>
            <span className="text-description block text-[11px] font-mono">
              Updated: {document.updated_at ? new Date(document.updated_at).toLocaleString() : 'N/A'}
            </span>
          </div>
        </div>

        {/* Content Payload Section */}
        <div className="mb-6">
          <label className="block text-[11px] font-semibold text-input-label tracking-wider uppercase mb-2">
            {t.inspectContentPayload}
          </label>
          <div className="bg-[#040812] border border-border-color rounded-xl p-4 text-xs font-mono text-gray-300 max-h-65 overflow-y-auto leading-relaxed whitespace-pre-wrap selection:bg-[#0071E3]/40">
            {document.content}
          </div>
        </div>

        {/* Footer Action */}
        <div className="flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="py-2.5 px-6 bg-[#111A2E] hover:bg-[#18233D] border border-border-color text-white text-xs font-medium rounded-lg transition-colors cursor-pointer"
          >
            {t.closeInspector}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DocumentDetailsModal;