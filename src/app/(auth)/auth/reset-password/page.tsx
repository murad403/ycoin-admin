'use client';
import { Suspense, useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Lock, Eye, EyeOff, Shield, AlertCircle, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { toast } from 'sonner';
import logo from '@/assets/logo.png';
import { resetPasswordSchema, ResetPasswordFormValues } from '@/validation/auth.validation';
import { useResetPasswordMutation } from '@/redux/features/auth/auth.api';

const ResetPasswordPage = () => {
  const searchParams = useSearchParams();
  const [resetToken, setResetToken] = useState<string>('');

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const [resetPasswordMutation, { isLoading: isSubmitting }] = useResetPasswordMutation();

  useEffect(() => {
    const urlToken = searchParams.get('token');
    const storedToken = typeof window !== 'undefined' ? sessionStorage.getItem('reset_token') : null;
    if (urlToken) {
      setResetToken(urlToken);
    } else if (storedToken) {
      setResetToken(storedToken);
    }
  }, [searchParams]);

  const { register, handleSubmit, formState: { errors } } = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = async (data: ResetPasswordFormValues) => {
    if (!resetToken) {
      toast.error('Reset token is missing. Please verify OTP first.');
      return;
    }
    try {
      const res = await resetPasswordMutation({
        reset_token: resetToken,
        new_password: data.password,
      }).unwrap();

      toast.success(res.detail || 'Password reset successfully!');
      setIsSuccess(true);
    } catch (err: any) {
      toast.error(err?.data?.detail || err?.data?.message || 'Password reset failed. Token may be invalid or expired.');
    }
  };

  return (
    <div className="w-full max-w-110 bg-[#0A101D] border border-border-color rounded-2xl p-8 sm:p-10 shadow-[0_0_50px_rgba(0,113,227,0.35)] relative z-10 backdrop-blur-md">
      {/* Logo & Header */}
      <div className="flex flex-col items-center text-center">
        <div className="flex items-center justify-center gap-3 mb-4">
          <Image
            src={logo}
            alt="Ycoin AI Logo"
            width={36}
            height={36}
            className="w-9 h-9 object-contain"
            priority
          />
          <span className="text-2xl font-bold tracking-tight text-white">
            Ycoin AI
          </span>
        </div>

        {/* Pill Badge */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0071E3]/15 border border-[#0071E3]/30 text-[#0071E3] text-[11px] font-semibold tracking-wider uppercase mb-3">
          <Shield className="w-3.5 h-3.5 text-[#0071E3]" />
          <span>YCOIN Password Reset</span>
        </div>

        {/* Description */}
        <p className="text-xs text-description leading-relaxed max-w-[320px] mb-8">
          Create a new strong administrator password for your account.
        </p>
      </div>

      {isSuccess ? (
        <div className="text-center space-y-6">
          <div className="w-12 h-12 bg-emerald-500/15 border border-emerald-500/30 rounded-full flex items-center justify-center mx-auto text-emerald-400">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-white text-base font-semibold mb-2">
              Password Reset Complete
            </h3>
            <p className="text-xs text-description leading-relaxed">
              Your password has been updated successfully. You can now log in with your new credentials.
            </p>
          </div>
          <Link
            href="/auth/sign-in"
            className="w-full py-3.5 px-4 bg-[#0071E3] hover:bg-[#0060C4] text-white font-medium text-sm rounded-lg shadow-lg shadow-[#0071E3]/30 transition-all flex items-center justify-center gap-2"
          >
            <Lock className="w-4 h-4" />
            <span>Login to Admin Dashboard</span>
          </Link>
        </div>
      ) : (
        /* Form */
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate>
          {/* New Password Field */}
          <div>
            <label
              htmlFor="password"
              className="block text-[11px] font-semibold tracking-wider uppercase text-input-label mb-2"
            >
              NEW PASSWORD
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                {...register('password')}
                className={`w-full px-4 py-3 bg-[#040812] border ${errors.password ? 'border-red-500' : 'border-border-color'
                  } rounded-lg text-white text-sm placeholder:text-gray-600 focus:outline-none focus:border-[#0071E3] focus:ring-1 focus:ring-[#0071E3] transition-colors pr-10`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-200 transition-colors focus:outline-none"
                tabIndex={-1}
              >
                {showPassword ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>
            {errors.password && (
              <p className="text-red-400 text-xs mt-1.5 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" />
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Confirm Password Field */}
          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-[11px] font-semibold tracking-wider uppercase text-input-label mb-2"
            >
              CONFIRM PASSWORD
            </label>
            <div className="relative">
              <input
                id="confirmPassword"
                type={showConfirmPassword ? 'text' : 'password'}
                placeholder="••••••••"
                {...register('confirmPassword')}
                className={`w-full px-4 py-3 bg-[#040812] border ${errors.confirmPassword ? 'border-red-500' : 'border-border-color'
                  } rounded-lg text-white text-sm placeholder:text-gray-600 focus:outline-none focus:border-[#0071E3] focus:ring-1 focus:ring-[#0071E3] transition-colors pr-10`}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-200 transition-colors focus:outline-none"
                tabIndex={-1}
              >
                {showConfirmPassword ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>
            {errors.confirmPassword && (
              <p className="text-red-400 text-xs mt-1.5 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" />
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3.5 px-4 bg-[#0071E3] hover:bg-[#0060C4] active:bg-[#0052B0] text-white font-medium text-sm rounded-lg shadow-lg shadow-[#0071E3]/30 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed mt-2"
          >
            <Lock className="w-4 h-4" />
            <span>
              {isSubmitting ? 'Updating Password...' : 'Reset Password'}
            </span>
          </button>

          {/* Back to Sign In Link */}
          <div className="text-center pt-2">
            <Link
              href="/auth/sign-in"
              className="inline-flex items-center gap-2 text-xs text-description hover:text-white transition-colors font-medium"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Sign In</span>
            </Link>
          </div>
        </form>
      )}
    </div>
  );
};





const page = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ResetPasswordPage />
    </Suspense>
  )
}

export default page;