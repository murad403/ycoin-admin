'use client';

import Link from 'next/link';
import { BookOpen, Eye, User } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { useRetrieveKnowledgeBasesQuery } from '@/redux/features/app/app.api';
import { TKnowledgeBaseItem } from '@/redux/features/app/app.type';

interface RecentKnowledgeBaseDocumentsProps {
  onSelectDocument: (doc: TKnowledgeBaseItem) => void;
}

const RecentKnowledgeBaseDocuments = ({
  onSelectDocument,
}: RecentKnowledgeBaseDocumentsProps) => {
  const { t } = useLanguage();
  const { data } = useRetrieveKnowledgeBasesQuery({ page: 1, page_size: 3 });
  const recentDocs = (data?.results || []).slice(0, 3);

  return (
    <div className="bg-[#0A101D] border border-border-color rounded-2xl p-6 shadow-sm flex flex-col justify-between h-full">
      <div>
        {/* Card Title & Link */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-[#0071E3]" />
            <h2 className="text-sm font-bold text-white tracking-tight">
              {t.recentKbDocs}
            </h2>
          </div>
          <Link
            href="/knowledge-base"
            className="text-xs text-[#0071E3] hover:underline font-medium"
          >
            {t.viewAll}
          </Link>
        </div>

        {/* Documents List */}
        <div className="space-y-3">
          {recentDocs.length === 0 ? (
            <div className="py-8 text-center text-xs text-description">
              No knowledge base documents found.
            </div>
          ) : (
            recentDocs.map((doc) => (
              <div
                key={doc.id}
                onClick={() => onSelectDocument(doc)}
                className="bg-[#040812] border border-border-color/80 hover:border-[#0071E3]/50 rounded-xl p-3.5 flex items-center justify-between gap-3 group transition-all cursor-pointer"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-9 h-9 rounded-lg bg-[#0071E3]/15 border border-[#0071E3]/30 text-[#0071E3] flex items-center justify-center shrink-0">
                    <BookOpen className="w-4 h-4" />
                  </div>

                  {/* Info */}
                  <div className="min-w-0">
                    <h4 className="text-xs font-semibold text-white truncate group-hover:text-[#0071E3] transition-colors">
                      {doc.title}
                    </h4>
                    <p className="text-[11px] text-description truncate mt-0.5 font-mono flex items-center gap-1">
                      <User className="w-3 h-3 text-[#0071E3]" /> {doc.uploaded_by_name || 'Admin'} • {doc.created_at ? new Date(doc.created_at).toLocaleDateString() : ''}
                    </p>
                  </div>
                </div>

                {/* Action Eye Icon */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectDocument(doc);
                  }}
                  className="w-8 h-8 rounded-lg bg-[#111A2E] group-hover:bg-[#0071E3] border border-border-color group-hover:border-[#0071E3] flex items-center justify-center text-gray-400 group-hover:text-white transition-all shrink-0 cursor-pointer"
                >
                  <Eye className="w-4 h-4" />
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default RecentKnowledgeBaseDocuments;