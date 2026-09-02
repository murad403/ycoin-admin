'use client';
import React, { Suspense, useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ShieldCheck, Shield, AlertCircle, ArrowLeft, RefreshCw } from 'lucide-react';
import { toast } from 'sonner';
import logo from '@/assets/logo.png';
import { verifyOtpSchema, VerifyOtpFormValues } from '@/validation/auth.validation';
import { useForgotPasswordVerifyOtpMutation, useForgotPasswordMutation } from '@/redux/features/auth/auth.api';

const VerifyOtpPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState<string>('');

  const [verifyOtp, { isLoading: isSubmitting }] = useForgotPasswordVerifyOtpMutation();
  const [resendOtp, { isLoading: isResending }] = useForgotPasswordMutation();

  useEffect(() => {
    const urlEmail = searchParams.get('email');
    const storedEmail = typeof window !== 'undefined' ? sessionStorage.getItem('reset_email') : null;
    if (urlEmail) {
      setEmail(urlEmail);
    } else if (storedEmail) {
      setEmail(storedEmail);
    }
  }, [searchParams]);

  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<VerifyOtpFormValues>({
    resolver: zodResolver(verifyOtpSchema),
    defaultValues: {
      otp: '',
    },
  });

  const otpValue = watch('otp') || '';

  const handleOtpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/\D/g, '').slice(0, 6);
    setValue('otp', val, { shouldValidate: true });
  };

  const onSubmit = async (data: VerifyOtpFormValues) => {
    if (!email) {
      toast.error('Email is missing. Please restart password recovery.');
      return;
    }
    try {
      const res = await verifyOtp({ email, otp: data.otp }).unwrap();
      if (typeof window !== 'undefined' && res.reset_token) {
        sessionStorage.setItem('reset_token', res.reset_token);
      }
      toast.success(res.detail || 'OTP verified successfully!');
      router.push(`/auth/reset-password?token=${encodeURIComponent(res.reset_token || '')}`);
    } catch (err: any) {
      toast.error(err?.data?.detail || err?.data?.message || 'Invalid or expired OTP code.');
    }
  };

  const handleResend = async () => {
    if (!email) {
      toast.error('Email is missing. Please restart password recovery.');
      return;
    }
    try {
      const res = await resendOtp({ email }).unwrap();
      toast.success(res.detail || 'A new 6-digit OTP code has been sent to your email.');
    } catch (err: any) {
      toast.error(err?.data?.detail || err?.data?.message || 'Failed to resend OTP.');
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
          <span>YCOIN Security Verification</span>
        </div>

        {/* Description */}
        <p className="text-xs text-description leading-relaxed max-w-[320px] mb-8">
          Enter the 6-digit security verification code sent to{' '}
          <span className="text-white font-medium">{email || 'your email'}</span>.
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate>
        {/* Hidden registered field */}
        <input type="hidden" {...register('otp')} />

        {/* OTP Input Field */}
        <div>
          <label
            htmlFor="otp-input"
            className="block text-[11px] font-semibold tracking-wider uppercase text-input-label mb-3 text-center"
          >
            ENTER 6-DIGIT VERIFICATION CODE
          </label>
          <div className="relative">
            <input
              id="otp-input"
              type="text"
              inputMode="numeric"
              maxLength={6}
              value={otpValue}
              onChange={handleOtpChange}
              placeholder="123456"
              className={`w-full px-4 py-3.5 bg-[#040812] border ${errors.otp ? 'border-red-500' : 'border-border-color'
                } rounded-lg text-white text-center text-xl tracking-[0.4em] font-mono placeholder:text-gray-700 placeholder:tracking-[0.4em] focus:outline-none focus:border-[#0071E3] focus:ring-1 focus:ring-[#0071E3] transition-colors`}
            />
          </div>
          {errors.otp && (
            <p className="text-red-400 text-xs mt-2 text-center flex items-center justify-center gap-1">
              <AlertCircle className="w-3.5 h-3.5" />
              {errors.otp.message}
            </p>
          )}
        </div>

        {/* Resend Code Section */}
        <div className="flex items-center justify-between text-xs pt-1">
          <span className="text-description">Didn't receive the code?</span>
          <button
            type="button"
            onClick={handleResend}
            disabled={isResending}
            className="text-[#0071E3] hover:underline font-medium inline-flex items-center gap-1 focus:outline-none disabled:opacity-50 cursor-pointer"
          >
            <RefreshCw className={`w-3 h-3 ${isResending ? 'animate-spin' : ''}`} />
            <span>{isResending ? 'Sending...' : 'Resend Code'}</span>
          </button>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-3.5 px-4 bg-[#0071E3] hover:bg-[#0060C4] active:bg-[#0052B0] text-white font-medium text-sm rounded-lg shadow-lg shadow-[#0071E3]/30 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed mt-2"
        >
          <ShieldCheck className="w-4 h-4" />
          <span>
            {isSubmitting ? 'Verifying Code...' : 'Verify Code & Proceed'}
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
    </div>
  );
};


const page = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <VerifyOtpPage />
    </Suspense>
  )
}

export default page