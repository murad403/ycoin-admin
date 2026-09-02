'use client';

import React from 'react';
import { BookOpen, Search, Eye, Edit3, Trash2, Loader2, User } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { TKnowledgeBaseItem } from '@/redux/features/app/app.type';
import CustomPagination from '@/components/shared/CustomPagination';

interface IndexedKnowledgeDocumentsProps {
  documents: TKnowledgeBaseItem[];
  isLoading: boolean;
  onSelectDocument: (doc: TKnowledgeBaseItem) => void;
  onEditDocument: (doc: TKnowledgeBaseItem) => void;
  onDeleteDocument: (doc: TKnowledgeBaseItem) => void;
  searchTerm: string;
  onSearchChange: (term: string) => void;
  page: number;
  onPageChange: (newPage: number) => void;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  totalCount: number;
}

const IndexedKnowledgeDocuments = ({
  documents,
  isLoading,
  onSelectDocument,
  onEditDocument,
  onDeleteDocument,
  searchTerm,
  onSearchChange,
  page,
  onPageChange,
  hasNextPage,
  hasPreviousPage,
  totalCount,
}: IndexedKnowledgeDocumentsProps) => {
  const { t } = useLanguage();

  return (
    <div className="bg-[#0A101D] border border-border-color rounded-2xl p-6 shadow-sm space-y-6">
      {/* Table Header Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <BookOpen className="w-4 h-4 text-[#0071E3]" />
            <h2 className="text-base font-bold text-white tracking-tight">
              {t.indexedKbDocsTitle}
            </h2>
          </div>
          <p className="text-xs text-description">
            {t.indexedKbDocsDesc}
          </p>
        </div>

        {/* Search Input */}
        <div className="relative">
          <Search className="w-4 h-4 text-gray-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder={t.searchDocsPlaceholder}
            className="w-full sm:w-64 bg-[#040812] border border-border-color focus:border-[#0071E3] text-xs text-white placeholder:text-gray-500 rounded-full pl-9 pr-4 py-2 outline-none transition-all"
          />
        </div>
      </div>

      {/* Documents Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-175">
          <thead>
            <tr className="border-b border-border-color text-[11px] font-semibold text-description uppercase tracking-wider">
              <th className="pb-3 px-3">{t.tableDocTitle}</th>
              <th className="pb-3 px-3">CONTENT PREVIEW</th>
              <th className="pb-3 px-3">UPLOADED BY</th>
              <th className="pb-3 px-3">{t.tableIndexedDate}</th>
              <th className="pb-3 px-3 text-right">{t.tableActions}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border-color/40 text-xs">
            {isLoading ? (
              <tr>
                <td colSpan={5} className="py-12 text-center text-description">
                  <div className="flex items-center justify-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin text-[#0071E3]" />
                    <span>Loading knowledge base documents...</span>
                  </div>
                </td>
              </tr>
            ) : documents.length === 0 ? (
              <tr>
                <td colSpan={5} className="py-12 text-center text-description">
                  {t.noIndexedDocsFound}
                </td>
              </tr>
            ) : (
              documents.map((doc) => (
                <tr
                  key={doc.id}
                  className="hover:bg-[#040812]/60 transition-colors group"
                >
                  {/* Title */}
                  <td className="py-4 px-3">
                    <div className="font-bold text-white text-xs sm:text-sm group-hover:text-[#0071E3] transition-colors truncate max-w-48 sm:max-w-64">
                      {doc.title}
                    </div>
                  </td>

                  {/* Content Preview */}
                  <td className="py-4 px-3">
                    <div className="text-xs text-gray-300 font-mono line-clamp-2 max-w-64 sm:max-w-80">
                      {doc.content}
                    </div>
                  </td>

                  {/* Uploaded By */}
                  <td className="py-4 px-3">
                    <div className="flex items-center gap-2">
                      <User className="w-3.5 h-3.5 text-[#0071E3] shrink-0" />
                      <div className="min-w-0">
                        <div className="font-semibold text-white text-xs truncate">
                          {doc.uploaded_by_name || 'Admin'}
                        </div>
                        <div className="text-[11px] text-description font-mono truncate">
                          {doc.uploaded_by_email}
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* Indexed Date */}
                  <td className="py-4 px-3 font-mono text-[11px] text-description">
                    {doc.created_at ? new Date(doc.created_at).toLocaleDateString() : 'N/A'}
                  </td>

                  {/* Actions */}
                  <td className="py-4 px-3 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        type="button"
                        onClick={() => onSelectDocument(doc)}
                        className="w-8 h-8 rounded-lg bg-[#111A2E] hover:bg-[#0071E3] border border-border-color hover:border-[#0071E3] flex items-center justify-center text-gray-400 hover:text-white transition-all cursor-pointer"
                        title="View Document Details"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => onEditDocument(doc)}
                        className="w-8 h-8 rounded-lg bg-[#111A2E] hover:bg-[#0071E3] border border-border-color hover:border-[#0071E3] flex items-center justify-center text-gray-400 hover:text-white transition-all cursor-pointer"
                        title="Edit Document"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => onDeleteDocument(doc)}
                        className="w-8 h-8 rounded-lg bg-[#111A2E] hover:bg-rose-500/20 border border-border-color hover:border-rose-500/40 flex items-center justify-center text-gray-400 hover:text-rose-400 transition-all cursor-pointer"
                        title="Delete Document"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
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

export default IndexedKnowledgeDocuments;