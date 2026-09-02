'use client';
import { UserX, X } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { TUserItem } from '@/redux/features/app/app.type';

interface RemoveUserModalProps {
  user: TUserItem | null;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  isDeleting?: boolean;
}

const RemoveUserModal = ({
  user,
  isOpen,
  onClose,
  onConfirm,
  isDeleting = false,
}: RemoveUserModalProps) => {
  const { t } = useLanguage();

  if (!isOpen || !user) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="w-full max-w-110 bg-[#0A101D] border border-rose-900/40 rounded-2xl p-6 sm:p-8 shadow-[0_0_50px_rgba(225,29,72,0.25)] relative text-center"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors focus:outline-none cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Red Icon Badge */}
        <div className="w-14 h-14 bg-rose-500/10 border border-rose-500/30 rounded-full flex items-center justify-center mx-auto mb-5 text-rose-500">
          <UserX className="w-7 h-7" />
        </div>

        {/* Modal Title */}
        <h3 className="text-xl font-bold text-white mb-2">
          {t.removeUserAccount}
        </h3>

        {/* User Details */}
        <p className="text-xs text-description leading-relaxed mb-8 max-w-[320px] mx-auto">
          "{user.profile_name || 'User'}" ({user.email})
        </p>

        {/* Action Buttons */}
        <div className="flex items-center justify-center gap-3">
          <button
            type="button"
            onClick={onClose}
            disabled={isDeleting}
            className="flex-1 py-3 px-4 bg-[#111A2E] hover:bg-[#18233D] border border-border-color text-white font-medium text-sm rounded-xl transition-colors cursor-pointer disabled:opacity-50"
          >
            {t.cancel}
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={isDeleting}
            className="flex-1 py-3 px-4 bg-[#E11D48] hover:bg-[#F43F5E] active:bg-[#BE123C] text-white font-medium text-sm rounded-xl shadow-lg shadow-rose-950/40 transition-all cursor-pointer disabled:opacity-50"
          >
            {isDeleting ? 'Deleting...' : t.deleteAccount}
          </button>
        </div>
      </div>
    </div>
  );
};

export default RemoveUserModal;