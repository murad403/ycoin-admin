'use client';

import React, { useState } from 'react';
import { Database } from 'lucide-react';
import { toast } from 'sonner';
import UploadNewKnowledgeDocument from '@/components/app/UploadNewKnowledgeDocument';
import IndexedKnowledgeDocuments from '@/components/app/IndexedKnowledgeDocuments';
import DocumentDetailsModal from '@/components/app/DocumentDetailsModal';
import { useLanguage } from '@/context/LanguageContext';
import {
  useRetrieveKnowledgeBasesQuery,
  useCreateKnowledgeBaseMutation,
  useUpdateKnowledgeBaseMutation,
  useDeleteKnowledgeBaseMutation,
} from '@/redux/features/app/app.api';
import { TKnowledgeBaseItem } from '@/redux/features/app/app.type';
import { UploadKnowledgeDocumentFormValues } from '@/validation/knowledgeBase.validation';

const KnowledgeBasePage = () => {
  const { t } = useLanguage();
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [selectedDoc, setSelectedDoc] = useState<TKnowledgeBaseItem | null>(null);
  const [editingDoc, setEditingDoc] = useState<TKnowledgeBaseItem | null>(null);

  // RTK Query hooks
  const { data, isLoading } = useRetrieveKnowledgeBasesQuery({ page, search, page_size: 10 });
  const [createKnowledgeBase, { isLoading: isCreating }] = useCreateKnowledgeBaseMutation();
  const [updateKnowledgeBase, { isLoading: isUpdating }] = useUpdateKnowledgeBaseMutation();
  const [deleteKnowledgeBase] = useDeleteKnowledgeBaseMutation();

  const handleSearchChange = (term: string) => {
    setSearch(term);
    setPage(1);
  };

  const handleFormSubmit = async (formData: UploadKnowledgeDocumentFormValues) => {
    try {
      if (editingDoc) {
        await updateKnowledgeBase({
          id: editingDoc.id,
          data: {
            title: formData.title,
            content: formData.content,
          },
        }).unwrap();
        toast.success(`Knowledge document "${formData.title}" updated successfully!`);
        setEditingDoc(null);
      } else {
        await createKnowledgeBase({
          title: formData.title,
          content: formData.content,
        }).unwrap();
        toast.success(`Knowledge document "${formData.title}" saved successfully!`);
      }
    } catch (err: any) {
      toast.error(err?.data?.detail || err?.data?.message || 'Failed to save knowledge document.');
    }
  };

  const handleDeleteDocument = async (doc: TKnowledgeBaseItem) => {
    try {
      await deleteKnowledgeBase(doc.id).unwrap();
      toast.success(`Document "${doc.title}" deleted successfully!`);
      if (editingDoc?.id === doc.id) {
        setEditingDoc(null);
      }
    } catch (err: any) {
      toast.error(err?.data?.detail || err?.data?.message || 'Failed to delete knowledge document.');
    }
  };

  return (
    <div className="space-y-6 sm:space-y-8 animate-in fade-in duration-300">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <div className="w-8 h-8 rounded-xl bg-[#0071E3]/15 border border-[#0071E3]/30 flex items-center justify-center text-[#0071E3]">
              <Database className="w-4 h-4" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              {t.aiKbManagementTitle}
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-description max-w-3xl leading-relaxed">
            {t.aiKbManagementDesc}
          </p>
        </div>
      </div>

      {/* Top Card: Upload / Edit Form */}
      <UploadNewKnowledgeDocument
        onSubmitForm={handleFormSubmit}
        editingDoc={editingDoc}
        onCancelEdit={() => setEditingDoc(null)}
        isSubmitting={isCreating || isUpdating}
      />

      {/* Bottom Card: Indexed Documents Table */}
      <IndexedKnowledgeDocuments
        documents={data?.results || []}
        isLoading={isLoading}
        onSelectDocument={(doc) => setSelectedDoc(doc)}
        onEditDocument={(doc) => setEditingDoc(doc)}
        onDeleteDocument={handleDeleteDocument}
        searchTerm={search}
        onSearchChange={handleSearchChange}
        page={page}
        onPageChange={(newPage) => setPage(newPage)}
        hasNextPage={Boolean(data?.next)}
        hasPreviousPage={Boolean(data?.previous)}
        totalCount={data?.count || data?.kb_count || data?.results?.length || 0}
      />

      {/* Document Details Inspector Modal */}
      <DocumentDetailsModal
        document={selectedDoc}
        isOpen={!!selectedDoc}
        onClose={() => setSelectedDoc(null)}
      />
    </div>
  );
};

export default KnowledgeBasePage;