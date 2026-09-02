'use client';

import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { User, UserCheck, Camera, CheckCircle2, XCircle, Lock, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';
import { useLanguage } from '@/context/LanguageContext';
import { useGetProfileQuery, useUpdateProfileMutation } from '@/redux/features/auth/auth.api';
import { updateProfileSchema, UpdateProfileFormValues } from '@/validation/auth.validation';

const AdministratorDetails = () => {
  const { t } = useLanguage();
  const { data: profile, isLoading: isProfileLoading } = useGetProfileQuery();
  const [updateProfile, { isLoading: isSaving }] = useUpdateProfileMutation();

  const [role, setRole] = useState('');
  const [email, setEmail] = useState('');
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<UpdateProfileFormValues>({
    resolver: zodResolver(updateProfileSchema),
    defaultValues: {
      profile_name: '',
    },
  });

  useEffect(() => {
    if (profile) {
      setValue('profile_name', profile.profile_name || '');
      setEmail(profile.email || '');
      setRole(profile.role || 'admin');
      setIsEmailVerified(!!profile.is_email_verified);
      setAvatarUrl(profile.avatar || null);
    }
  }, [profile, setValue]);

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const onSubmit = async (data: UpdateProfileFormValues) => {
    try {
      const formData = new FormData();
      formData.append('profile_name', data.profile_name);
      if (selectedFile) {
        formData.append('avatar', selectedFile);
      }
      await updateProfile(formData).unwrap();
      toast.success('Administrator profile updated successfully!');
      setSelectedFile(null);
    } catch (err: any) {
      toast.error(err?.data?.detail || err?.data?.message || 'Failed to update administrator profile.');
    }
  };

  const currentAvatarSrc = previewUrl || avatarUrl;

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

        {/* Avatar Upload Section */}
        <div className="flex items-center gap-5 mb-6 p-4 bg-[#040812] border border-border-color rounded-xl">
          <div className="relative group shrink-0">
            <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-[#0071E3]/40 bg-[#0A101D] flex items-center justify-center text-white font-bold">
              {currentAvatarSrc ? (
                <img
                  src={currentAvatarSrc}
                  alt="Administrator Avatar"
                  className="w-full h-full object-cover"
                />
              ) : (
                <User className="w-8 h-8 text-[#0071E3]" />
              )}
            </div>
            <label
              htmlFor="avatar-upload"
              className="absolute inset-0 bg-black/60 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer text-white"
              title={t.changeAvatarLabel}
            >
              <Camera className="w-5 h-5" />
            </label>
            <input
              id="avatar-upload"
              type="file"
              accept="image/*"
              onChange={handleAvatarChange}
              className="hidden"
            />
          </div>

          <div className="space-y-1">
            <h4 className="text-xs font-semibold text-white">{t.profilePhotoLabel}</h4>
            {/* <p className="text-[11px] text-description">
              {t.uploadFileHint}
            </p> */}
            <label
              htmlFor="avatar-upload"
              className="inline-block text-[11px] font-semibold text-[#0071E3] hover:underline cursor-pointer pt-0.5"
            >
              {t.changeAvatarLabel}
            </label>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
          {/* Name Field (Editable with React Hook Form + Zod) */}
          <div>
            <label
              htmlFor="profile_name"
              className="block text-[11px] font-semibold tracking-wider uppercase text-input-label mb-2"
            >
              {t.nameLabel}
            </label>
            <input
              id="profile_name"
              type="text"
              placeholder="Administrator Name"
              {...register('profile_name')}
              className={`w-full px-4 py-3 bg-[#040812] border ${errors.profile_name ? 'border-red-500' : 'border-border-color focus:border-[#0071E3]'
                } rounded-xl text-white text-xs outline-none focus:ring-1 focus:ring-[#0071E3] transition-colors`}
            />
            {errors.profile_name && (
              <p className="text-red-400 text-xs mt-1.5 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" />
                {errors.profile_name.message}
              </p>
            )}
          </div>

          {/* Admin Email Address (Locked - Cannot be changed) */}
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

          {/* Role (Locked - Cannot be changed) */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label
                htmlFor="admin-role"
                className="block text-[11px] font-semibold tracking-wider uppercase text-input-label"
              >
                {t.roleLabel}
              </label>
              <span className="text-[10px] font-bold text-amber-400 flex items-center gap-1">
                <Lock className="w-3 h-3" /> {t.cannotBeChanged}
              </span>
            </div>
            <input
              id="admin-role"
              type="text"
              value={role ? role.toUpperCase() : 'ADMIN'}
              disabled
              className="w-full px-4 py-3 bg-[#040812]/50 border border-border-color text-gray-400 font-mono text-xs rounded-xl cursor-not-allowed select-none capitalize"
            />
          </div>

          {/* Email Verification Status (Locked - Cannot be changed) */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-[11px] font-semibold tracking-wider uppercase text-input-label">
                {t.emailVerificationLabel}
              </label>
              <span className="text-[10px] font-bold text-amber-400 flex items-center gap-1">
                <Lock className="w-3 h-3" /> {t.cannotBeChanged}
              </span>
            </div>
            <div className="w-full px-4 py-2.5 bg-[#040812]/50 border border-border-color rounded-xl flex items-center justify-between">
              <span className="text-xs text-gray-300">
                {email || 'Administrator Email'}
              </span>
              {isEmailVerified ? (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-[11px] font-semibold">
                  <CheckCircle2 className="w-3.5 h-3.5" /> {t.verifiedStatus}
                </span>
              ) : (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-rose-500/15 border border-rose-500/30 text-rose-400 text-[11px] font-semibold">
                  <XCircle className="w-3.5 h-3.5" /> {t.unverifiedStatus}
                </span>
              )}
            </div>
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