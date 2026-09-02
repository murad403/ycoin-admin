'use client';
import React, { useEffect, useState } from 'react';
import { User, UserCheck } from 'lucide-react';
import { toast } from 'sonner';
import { useLanguage } from '@/context/LanguageContext';
import { useGetProfileQuery, useUpdateProfileMutation } from '@/redux/features/auth.api';

const AdministratorDetails = () => {
  const { t } = useLanguage();
  const { data: profile, isLoading: isProfileLoading } = useGetProfileQuery();
  const [updateProfile, { isLoading: isSaving }] = useUpdateProfileMutation();

  const [profileName, setProfileName] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    if (profile) {
      setProfileName(profile.profile_name || '');
      setEmail(profile.email || '');
    }
  }, [profile]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('profile_name', profileName);
      await updateProfile(formData).unwrap();
      toast.success('Administrator profile updated successfully!');
    } catch (err: any) {
      toast.error(err?.data?.detail || err?.data?.message || 'Failed to update administrator profile.');
    }
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
              required
              value={profileName}
              onChange={(e) => setProfileName(e.target.value)}
              placeholder="Administrator Name"
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
              value={email || 'admin@ycoin.ai'}
              disabled
              className="w-full px-4 py-3 bg-[#040812]/50 border border-border-color text-gray-500 text-xs rounded-xl cursor-not-allowed select-none"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSaving || isProfileLoading}
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