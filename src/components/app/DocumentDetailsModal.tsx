'use client';
import { FileText, X } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export interface DocumentItem {
    id: string;
    title: string;
    filename: string;
    format: 'PDF' | 'WORD' | 'MD';
    chars: string;
    size: string;
    uploadedBy: string;
    content: string;
}

interface DocumentDetailsModalProps {
    document: DocumentItem | null;
    isOpen: boolean;
    onClose: () => void;
}

const formatBadgeColor = (format: string) => {
    switch (format) {
        case 'PDF':
            return 'bg-rose-500/20 text-rose-400 border-rose-500/40';
        case 'WORD':
            return 'bg-blue-500/20 text-blue-400 border-blue-500/40';
        case 'MD':
            return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40';
        default:
            return 'bg-gray-500/20 text-gray-400 border-gray-500/40';
    }
};

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
                            <div className="flex items-center gap-2 flex-wrap mb-1">
                                <h3 className="text-base sm:text-lg font-bold text-white leading-tight">
                                    {document.title}
                                </h3>
                                <span
                                    className={`text-[10px] font-bold px-2 py-0.5 rounded border uppercase ${formatBadgeColor(
                                        document.format
                                    )}`}
                                >
                                    {document.format}
                                </span>
                            </div>
                            <p className="text-xs text-description">{document.filename}</p>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="w-8 h-8 rounded-lg bg-[#111A2E] hover:bg-[#18233D] border border-border-color flex items-center justify-center text-gray-400 hover:text-white transition-colors focus:outline-none shrink-0"
                    >
                        <X className="w-4 h-4" />
                    </button>
                </div>

                {/* Metadata Banner Grid */}
                <div className="bg-[#040812] border border-border-color rounded-xl p-4 grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6 text-xs">
                    <div>
                        <span className="text-description block text-[11px] mb-1">
                            {t.docId}
                        </span>
                        <span className="font-mono text-white font-medium">
                            {document.id}
                        </span>
                    </div>
                    <div>
                        <span className="text-description block text-[11px] mb-1">
                            {t.totalLength}
                        </span>
                        <span className="text-white font-medium">{document.chars}</span>
                    </div>
                    <div>
                        <span className="text-description block text-[11px] mb-1">
                            {t.fileSize}
                        </span>
                        <span className="text-white font-medium">{document.size}</span>
                    </div>
                    <div>
                        <span className="text-description block text-[11px] mb-1">
                            {t.uploadedBy}
                        </span>
                        <span className="text-white font-medium truncate block">
                            {document.uploadedBy}
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