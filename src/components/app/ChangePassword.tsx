'use client';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Key, ShieldCheck, AlertCircle, Eye, EyeOff } from 'lucide-react';
import { toast } from 'sonner';
import { useLanguage } from '@/context/LanguageContext';
import { ChangePasswordFormValues, changePasswordSchema } from '@/validation/auth.validation';
import { useChangePasswordMutation } from '@/redux/features/auth.api';

const ChangePassword = () => {
    const { t } = useLanguage();
    const [showCurrent, setShowCurrent] = useState(false);
    const [showNew, setShowNew] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    const [changePassword, { isLoading: isSubmitting }] = useChangePasswordMutation();

    const { register, handleSubmit, reset, formState: { errors } } = useForm<ChangePasswordFormValues>({
        resolver: zodResolver(changePasswordSchema),
        defaultValues: {
            currentPassword: '',
            newPassword: '',
            confirmNewPassword: '',
        },
    });

    const onSubmit = async (data: ChangePasswordFormValues) => {
        try {
            const res = await changePassword({
                current_password: data.currentPassword,
                new_password: data.newPassword,
            }).unwrap();

            toast.success(res.detail || 'Password updated successfully!');
            reset();
        } catch (err: any) {
            toast.error(err?.data?.detail || err?.data?.message || 'Failed to update password. Please verify current password.');
        }
    };

    return (
        <div className="bg-[#0A101D] border border-border-color rounded-2xl p-6 sm:p-8 shadow-sm flex flex-col justify-between h-full">
            <div>
                {/* Header */}
                <div className="flex items-start gap-3.5 mb-6">
                    <div className="w-9 h-9 bg-amber-500/15 border border-amber-500/30 rounded-xl flex items-center justify-center text-amber-400 shrink-0 mt-0.5">
                        <Key className="w-4.5 h-4.5" />
                    </div>
                    <div>
                        <h3 className="text-base font-bold text-white tracking-tight">
                            {t.changePasswordTitle}
                        </h3>
                        <p className="text-xs text-description leading-relaxed mt-0.5">
                            {t.changePasswordDesc}
                        </p>
                    </div>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
                    {/* Current Password */}
                    <div>
                        <label
                            htmlFor="currentPassword"
                            className="block text-[11px] font-semibold tracking-wider uppercase text-input-label mb-2"
                        >
                            {t.currentPasswordLabel}
                        </label>
                        <div className="relative">
                            <input
                                id="currentPassword"
                                type={showCurrent ? 'text' : 'password'}
                                placeholder="••••••••••••"
                                {...register('currentPassword')}
                                className={`w-full px-4 py-3 bg-[#040812] border ${errors.currentPassword
                                        ? 'border-red-500'
                                        : 'border-border-color'
                                    } rounded-xl text-white text-xs placeholder:text-gray-600 focus:outline-none focus:border-[#0071E3] focus:ring-1 focus:ring-[#0071E3] transition-colors pr-10`}
                            />
                            <button
                                type="button"
                                onClick={() => setShowCurrent(!showCurrent)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-200 transition-colors focus:outline-none"
                                tabIndex={-1}
                            >
                                {showCurrent ? (
                                    <EyeOff className="w-4 h-4" />
                                ) : (
                                    <Eye className="w-4 h-4" />
                                )}
                            </button>
                        </div>
                        {errors.currentPassword && (
                            <p className="text-red-400 text-xs mt-1.5 flex items-center gap-1">
                                <AlertCircle className="w-3.5 h-3.5" />
                                {errors.currentPassword.message}
                            </p>
                        )}
                    </div>

                    {/* New Password */}
                    <div>
                        <label
                            htmlFor="newPassword"
                            className="block text-[11px] font-semibold tracking-wider uppercase text-input-label mb-2"
                        >
                            {t.newPasswordLabel}
                        </label>
                        <div className="relative">
                            <input
                                id="newPassword"
                                type={showNew ? 'text' : 'password'}
                                placeholder={t.newPasswordPlaceholder}
                                {...register('newPassword')}
                                className={`w-full px-4 py-3 bg-[#040812] border ${errors.newPassword ? 'border-red-500' : 'border-border-color'
                                    } rounded-xl text-white text-xs placeholder:text-gray-600 focus:outline-none focus:border-[#0071E3] focus:ring-1 focus:ring-[#0071E3] transition-colors pr-10`}
                            />
                            <button
                                type="button"
                                onClick={() => setShowNew(!showNew)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-200 transition-colors focus:outline-none"
                                tabIndex={-1}
                            >
                                {showNew ? (
                                    <EyeOff className="w-4 h-4" />
                                ) : (
                                    <Eye className="w-4 h-4" />
                                )}
                            </button>
                        </div>
                        {errors.newPassword && (
                            <p className="text-red-400 text-xs mt-1.5 flex items-center gap-1">
                                <AlertCircle className="w-3.5 h-3.5" />
                                {errors.newPassword.message}
                            </p>
                        )}
                    </div>

                    {/* Confirm New Password */}
                    <div>
                        <label
                            htmlFor="confirmNewPassword"
                            className="block text-[11px] font-semibold tracking-wider uppercase text-input-label mb-2"
                        >
                            {t.confirmNewPasswordLabel}
                        </label>
                        <div className="relative">
                            <input
                                id="confirmNewPassword"
                                type={showConfirm ? 'text' : 'password'}
                                placeholder={t.confirmNewPasswordPlaceholder}
                                {...register('confirmNewPassword')}
                                className={`w-full px-4 py-3 bg-[#040812] border ${errors.confirmNewPassword
                                        ? 'border-red-500'
                                        : 'border-border-color'
                                    } rounded-xl text-white text-xs placeholder:text-gray-600 focus:outline-none focus:border-[#0071E3] focus:ring-1 focus:ring-[#0071E3] transition-colors pr-10`}
                            />
                            <button
                                type="button"
                                onClick={() => setShowConfirm(!showConfirm)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-200 transition-colors focus:outline-none"
                                tabIndex={-1}
                            >
                                {showConfirm ? (
                                    <EyeOff className="w-4 h-4" />
                                ) : (
                                    <Eye className="w-4 h-4" />
                                )}
                            </button>
                        </div>
                        {errors.confirmNewPassword && (
                            <p className="text-red-400 text-xs mt-1.5 flex items-center gap-1">
                                <AlertCircle className="w-3.5 h-3.5" />
                                {errors.confirmNewPassword.message}
                            </p>
                        )}
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full py-3.5 px-4 bg-amber-500 hover:bg-amber-400 active:bg-amber-600 text-black font-extrabold text-xs rounded-xl shadow-lg shadow-amber-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed mt-4"
                    >
                        <ShieldCheck className="w-4 h-4" />
                        <span>
                            {isSubmitting ? 'Updating Password...' : t.updatePasswordButton}
                        </span>
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ChangePassword;