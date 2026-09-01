'use client';
import React, { useState } from 'react';
import { User, UserCheck } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

const AdministratorDetails = () => {
  const { t } = useLanguage();
  const [name, setName] = useState('YCOIN Administrator');
  const [protocolTitle, setProtocolTitle] = useState('AI & Bitcoin Protocol Lead');
  const [bio, setBio] = useState('Lead Administrator Managing AI Knowledge Base, Users, And Node Status.');
  const [isSaving, setIsSaving] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      alert('Administrator profile updated successfully!');
    }, 800);
  };

  return (
    <div className="bg-[#0A101D] border border-border-color rounded-2xl p-6 sm:p-8 shadow-sm flex flex-col justify-between h-full">
      <div>
        {/* Header */}
        <div className="flex items-start gap-3.5 mb-6">
          <div className="w-9 h-9 bg-[#0071E3]/15 border border-[#0071E3]/30 rounded-xl flex items-center justify-center text-[#0071E3] shrink-0 mt-0.5">
            <User className="w-4.5 h-4.5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white tracking-tight">
              {t.adminDetailsTitle}
            </h3>
            <p className="text-xs text-description leading-relaxed mt-0.5">
              {t.adminDetailsDesc}
            </p>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name Field */}
          <div>
            <label
              htmlFor="admin-name"
              className="block text-[11px] font-semibold tracking-wider uppercase text-input-label mb-2"
            >
              {t.nameLabel}
            </label>
            <input
              id="admin-name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 bg-[#040812] border border-border-color rounded-xl text-white text-xs focus:outline-none focus:border-[#0071E3] focus:ring-1 focus:ring-[#0071E3] transition-colors"
            />
          </div>

          {/* Admin Email Address (Locked) */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label
                htmlFor="admin-email"
                className="block text-[11px] font-semibold tracking-wider uppercase text-input-label"
              >
                {t.adminEmailLabel}
              </label>
              <span className="text-[10px] font-bold text-amber-400">
                {t.emailLocked}
              </span>
            </div>
            <input
              id="admin-email"
              type="email"
              value="admin@ycoin.ai"
              disabled
              className="w-full px-4 py-3 bg-[#040812]/50 border border-border-color text-gray-500 text-xs rounded-xl cursor-not-allowed select-none"
            />
          </div>

          {/* Protocol Title */}
          <div>
            <label
              htmlFor="protocol-title"
              className="block text-[11px] font-semibold tracking-wider uppercase text-input-label mb-2"
            >
              {t.protocolTitleLabel}
            </label>
            <input
              id="protocol-title"
              type="text"
              value={protocolTitle}
              onChange={(e) => setProtocolTitle(e.target.value)}
              className="w-full px-4 py-3 bg-[#040812] border border-border-color rounded-xl text-white text-xs focus:outline-none focus:border-[#0071E3] focus:ring-1 focus:ring-[#0071E3] transition-colors"
            />
          </div>

          {/* Bio / Description */}
          <div>
            <label
              htmlFor="bio"
              className="block text-[11px] font-semibold tracking-wider uppercase text-input-label mb-2"
            >
              {t.bioLabel}
            </label>
            <textarea
              id="bio"
              rows={3}
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="w-full px-4 py-3 bg-[#040812] border border-border-color rounded-xl text-white text-xs focus:outline-none focus:border-[#0071E3] focus:ring-1 focus:ring-[#0071E3] transition-colors leading-relaxed resize-none"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSaving}
            className="w-full py-3.5 px-4 bg-[#0071E3] hover:bg-[#0060C4] active:bg-[#0052B0] text-white font-semibold text-xs rounded-xl shadow-lg shadow-[#0071E3]/30 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed mt-4"
          >
            <UserCheck className="w-4 h-4" />
            <span>
              {isSaving ? 'Saving Profile...' : t.saveProfileDetails}
            </span>
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdministratorDetails;