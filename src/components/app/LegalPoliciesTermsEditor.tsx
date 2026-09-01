'use client';

import React, { useState } from 'react';
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
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import DeleteLegalModal from './DeleteLegalModal';

const defaultTermsContent = `YCOIN SOVEREIGN AI & BITCOIN L2 - TERMS OF SERVICE

1. ACCEPTANCE OF TERMS
By accessing or using the YCOIN Admin Portal and Bitcoin Layer-2 Intelligence protocol services, you agree to be bound by these Terms of Service. All AI inference workloads and BitVM zero-knowledge proof verifications executed on this platform are subject to Bitcoin L1 Proof-of-Work consensus rules.

2. NODE OPERATOR & STAKING OBLIGATIONS
Node operators must stake $Y tokens to run verified LLM inference nodes. Unscheduled downtime, failure to submit ZK validity proofs within the challenge period, or generation of invalid state roots will result in automated slashing of staked assets.

3. INTELLECTUAL PROPERTY & AI KNOWLEDGE DOCS
All documents uploaded into the YCOIN Live Knowledge Base RAG system are indexed and vectorised for AI inference. Operators retain full rights over proprietary documentation, subject to execution rules governed by BitVM verifier scripts.`;

const defaultPrivacyContent = `YCOIN SOVEREIGN AI & BITCOIN L2 - PRIVACY POLICY

1. DATA PRIVACY & ZERO-KNOWLEDGE CONCEALMENT
YCOIN leverages BitVM zero-knowledge rollups to ensure that private AI computation payloads remain confidential. Raw prompt data and proprietary knowledge base embeddings are processed in zero-knowledge enclaves.

2. ON-CHAIN METRICS & TELEMETRY
Only anonymized state root hashes, node latency SLAs, and staking transaction hashes are committed to Bitcoin L1 Taproot outputs. No personal identifying information (PII) is written to immutable block space.`;

const LegalPoliciesTermsEditor = () => {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<'terms' | 'privacy'>('terms');
  const [termsContent, setTermsContent] = useState(defaultTermsContent);
  const [privacyContent, setPrivacyContent] = useState(defaultPrivacyContent);
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const currentContent = activeTab === 'terms' ? termsContent : privacyContent;

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target.value;
    if (activeTab === 'terms') {
      setTermsContent(val);
    } else {
      setPrivacyContent(val);
    }
  };

  const handleApplyFormat = (prefix: string, suffix: string = '') => {
    if (activeTab === 'terms') {
      setTermsContent((prev) => `${prev}\n${prefix} ${suffix}`);
    } else {
      setPrivacyContent((prev) => `${prev}\n${prefix} ${suffix}`);
    }
  };

  const handleConfirmDelete = () => {
    if (activeTab === 'terms') {
      setTermsContent('');
    } else {
      setPrivacyContent('');
    }
    setIsDeleteModalOpen(false);
  };

  const handleSavePolicy = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      alert(`${activeTab === 'terms' ? 'Terms of Service' : 'Privacy Policy'} published successfully!`);
    }, 800);
  };

  return (
    <div className="bg-[#0A101D] border border-border-color rounded-2xl p-6 sm:p-8 shadow-sm space-y-6">
      {/* Header (No reset defaults button per request) */}
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

      {/* Editor Main Container */}
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
        <div className="bg-[#040812] border border-border-color focus-within:border-[#0071E3] rounded-xl overflow-hidden transition-colors">
          {/* Formatting Toolbar */}
          <div className="bg-[#0A101D] border-b border-border-color p-2 flex items-center gap-1 flex-wrap text-gray-400">
            <button
              type="button"
              onClick={() => handleApplyFormat('**', '**')}
              title="Bold"
              className="p-1.5 rounded-md hover:bg-[#111A2E] hover:text-white transition-colors"
            >
              <Bold className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => handleApplyFormat('_', '_')}
              title="Italic"
              className="p-1.5 rounded-md hover:bg-[#111A2E] hover:text-white transition-colors"
            >
              <Italic className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => handleApplyFormat('<u>', '</u>')}
              title="Underline"
              className="p-1.5 rounded-md hover:bg-[#111A2E] hover:text-white transition-colors"
            >
              <Underline className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => handleApplyFormat('~~', '~~')}
              title="Strikethrough"
              className="p-1.5 rounded-md hover:bg-[#111A2E] hover:text-white transition-colors"
            >
              <Strikethrough className="w-4 h-4" />
            </button>
            <div className="w-px h-4 bg-border-color mx-1" />
            <button
              type="button"
              onClick={() => handleApplyFormat('## Section Header')}
              title="Heading"
              className="p-1.5 rounded-md hover:bg-[#111A2E] hover:text-white transition-colors"
            >
              <Heading className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => handleApplyFormat('- Bullet point item')}
              title="Bullet List"
              className="p-1.5 rounded-md hover:bg-[#111A2E] hover:text-white transition-colors"
            >
              <List className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => handleApplyFormat('1. Numbered item')}
              title="Numbered List"
              className="p-1.5 rounded-md hover:bg-[#111A2E] hover:text-white transition-colors"
            >
              <ListOrdered className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => handleApplyFormat('> Blockquote text')}
              title="Quote"
              className="p-1.5 rounded-md hover:bg-[#111A2E] hover:text-white transition-colors"
            >
              <Quote className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => handleApplyFormat('`code snippet`')}
              title="Code"
              className="p-1.5 rounded-md hover:bg-[#111A2E] hover:text-white transition-colors"
            >
              <Code className="w-4 h-4" />
            </button>
            <div className="w-px h-4 bg-border-color mx-1" />
            <button
              type="button"
              onClick={() => {
                if (activeTab === 'terms') setTermsContent('');
                else setPrivacyContent('');
              }}
              title="Clear Formatting"
              className="p-1.5 rounded-md hover:bg-rose-500/20 hover:text-rose-400 transition-colors"
            >
              <RemoveFormatting className="w-4 h-4" />
            </button>
          </div>

          {/* Editor Content Textarea */}
          <textarea
            rows={10}
            value={currentContent}
            onChange={handleContentChange}
            placeholder="Edit or enter terms content here..."
            className="w-full bg-transparent p-4 text-xs font-mono text-gray-200 leading-relaxed outline-none resize-y min-h-90"
          />
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
          type="button"
          onClick={handleSavePolicy}
          disabled={isSaving}
          className="w-full sm:w-auto px-6 py-2.5 bg-[#0071E3] hover:bg-[#0060C4] active:bg-[#0052B0] text-white text-xs font-semibold rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-[#0071E3]/30 transition-all cursor-pointer disabled:opacity-50"
        >
          <Save className="w-3.5 h-3.5" />
          <span>{isSaving ? 'Publishing Policy...' : t.savePublishPolicy}</span>
        </button>
      </div>

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