'use client';

import React, { useState } from 'react';
import { BookOpen, Search, Eye, Trash2 } from 'lucide-react';
import { DocumentItem } from './DocumentDetailsModal';
import { useLanguage } from '@/context/LanguageContext';

export interface IndexedDocumentItem extends DocumentItem {
  indexedDate?: string;
}

interface IndexedKnowledgeDocumentsProps {
  documents: IndexedDocumentItem[];
  onSelectDocument: (doc: IndexedDocumentItem) => void;
  onDeleteDocument: (docId: string) => void;
}

const formatBadgeStyle = (format: string) => {
  switch (format) {
    case 'PDF':
      return 'bg-rose-500/15 border-rose-500/30 text-rose-400';
    case 'WORD':
      return 'bg-blue-500/15 border-blue-500/30 text-blue-400';
    case 'MD':
      return 'bg-rose-500/15 border-rose-500/30 text-rose-400';
    default:
      return 'bg-gray-500/15 border-gray-500/30 text-gray-400';
  }
};

const IndexedKnowledgeDocuments = ({
  documents,
  onSelectDocument,
  onDeleteDocument,
}: IndexedKnowledgeDocumentsProps) => {
  const { t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredDocuments = documents.filter(
    (doc) =>
      doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.filename.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.format.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
            onChange={(e) => setSearchTerm(e.target.value)}
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
              <th className="pb-3 px-3 text-center">{t.tableFormat}</th>
              <th className="pb-3 px-3">{t.tablePayloadSize}</th>
              <th className="pb-3 px-3">{t.tableIndexedDate}</th>
              <th className="pb-3 px-3 text-right">{t.tableActions}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border-color/40 text-xs">
            {filteredDocuments.length === 0 ? (
              <tr>
                <td colSpan={5} className="py-8 text-center text-description">
                  {t.noIndexedDocsFound}
                </td>
              </tr>
            ) : (
              filteredDocuments.map((doc) => (
                <tr
                  key={doc.id}
                  className="hover:bg-[#040812]/60 transition-colors group"
                >
                  {/* Title & Filename */}
                  <td className="py-4 px-3">
                    <div className="font-bold text-white text-xs sm:text-sm group-hover:text-[#0071E3] transition-colors">
                      {doc.title}
                    </div>
                    <div className="text-[11px] text-description font-mono mt-0.5">
                      {doc.filename}
                    </div>
                  </td>

                  {/* Format Badge */}
                  <td className="py-4 px-3 text-center">
                    <span
                      className={`inline-block px-2 py-0.5 rounded border font-bold text-[10px] uppercase ${formatBadgeStyle(
                        doc.format
                      )}`}
                    >
                      {doc.format}
                    </span>
                  </td>

                  {/* Payload Size */}
                  <td className="py-4 px-3">
                    <div className="font-semibold text-white text-xs">{doc.size}</div>
                    <div className="text-[11px] text-description">{doc.chars}</div>
                  </td>

                  {/* Indexed Date */}
                  <td className="py-4 px-3 font-mono text-[11px] text-description">
                    {doc.indexedDate || '2026-08-01T06:03:28.899Z'}
                  </td>

                  {/* Actions */}
                  <td className="py-4 px-3 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        type="button"
                        onClick={() => onSelectDocument(doc)}
                        className="w-8 h-8 rounded-lg bg-[#111A2E] hover:bg-[#0071E3] border border-border-color hover:border-[#0071E3] flex items-center justify-center text-gray-400 hover:text-white transition-all cursor-pointer"
                        title="View Document Payload"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => onDeleteDocument(doc.id)}
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
    </div>
  );
};

export default IndexedKnowledgeDocuments;