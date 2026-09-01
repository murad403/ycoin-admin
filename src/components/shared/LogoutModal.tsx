'use client';
import { UserX, LogOut, X } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

interface LogoutModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    type?: 'logout' | 'delete-user';
    targetUser?: {
        name: string;
        email: string;
    } | null;
}

const LogoutModal = ({
    isOpen,
    onClose,
    onConfirm,
    type = 'logout',
    targetUser = null,
}: LogoutModalProps) => {
    const { t } = useLanguage();

    if (!isOpen) return null;

    const isDelete = type === 'delete-user';

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
            <div
                className="w-full max-w-110 bg-[#0A101D] border border-rose-900/40 rounded-2xl p-6 sm:p-8 shadow-[0_0_50px_rgba(225,29,72,0.25)] relative text-center"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors focus:outline-none"
                >
                    <X className="w-5 h-5" />
                </button>

                {/* Header Icon */}
                <div className="w-14 h-14 bg-rose-500/10 border border-rose-500/30 rounded-full flex items-center justify-center mx-auto mb-5 text-rose-500">
                    {isDelete ? <UserX className="w-7 h-7" /> : <LogOut className="w-7 h-7" />}
                </div>

                {/* Modal Title */}
                <h3 className="text-xl font-bold text-white mb-2">
                    {isDelete ? t.removeUserAccount : t.confirmLogout}
                </h3>

                {/* Subtitle / User details */}
                <p className="text-xs text-description leading-relaxed mb-8 max-w-[320px] mx-auto">
                    {isDelete
                        ? targetUser
                            ? `"${targetUser.name}" (${targetUser.email})`
                            : t.removeUserDesc
                        : t.logoutDesc}
                </p>

                {/* Action Buttons */}
                <div className="flex items-center justify-center gap-3">
                    <button
                        type="button"
                        onClick={onClose}
                        className="flex-1 py-3 px-4 bg-[#111A2E] hover:bg-[#18233D] border border-border-color text-white font-medium text-sm rounded-xl transition-colors cursor-pointer"
                    >
                        {t.cancel}
                    </button>
                    <button
                        type="button"
                        onClick={onConfirm}
                        className="flex-1 py-3 px-4 bg-[#E11D48] hover:bg-[#F43F5E] active:bg-[#BE123C] text-white font-medium text-sm rounded-xl shadow-lg shadow-rose-950/40 transition-all cursor-pointer"
                    >
                        {isDelete ? t.deleteAccount : t.logout}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default LogoutModal;