'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { KeyRound, Shield, AlertCircle, ArrowLeft, Mail } from 'lucide-react';
import logo from '@/assets/logo.png';
import {
  forgotPasswordSchema,
  ForgotPasswordFormValues,
} from '@/validation/auth.validation';

const ForgotPasswordPage = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: '',
    },
  });

  const onSubmit = (data: ForgotPasswordFormValues) => {
    setIsSubmitting(true);
    console.log('Forgot Password Data:', data);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1000);
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
          <span>YCOIN Password Recovery</span>
        </div>

        {/* Description */}
        <p className="text-xs text-description leading-relaxed max-w-[320px] mb-8">
          Enter your registered admin email address below to receive an OTP verification code.
        </p>
      </div>

      {isSubmitted ? (
        <div className="text-center space-y-6">
          <div className="w-12 h-12 bg-[#0071E3]/15 border border-[#0071E3]/30 rounded-full flex items-center justify-center mx-auto text-[#0071E3]">
            <Mail className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-white text-base font-semibold mb-2">
              Verification Code Sent
            </h3>
            <p className="text-xs text-description leading-relaxed">
              We have sent a 6-digit OTP code to your administrator email address.
            </p>
          </div>
          <Link
            href="/auth/verify-otp"
            className="w-full py-3.5 px-4 bg-[#0071E3] hover:bg-[#0060C4] text-white font-medium text-sm rounded-lg shadow-lg shadow-[#0071E3]/30 transition-all flex items-center justify-center gap-2"
          >
            <span>Proceed to Verify OTP</span>
          </Link>
        </div>
      ) : (
        /* Form */
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate>
          {/* Email Field */}
          <div>
            <label
              htmlFor="email"
              className="block text-[11px] font-semibold tracking-wider uppercase text-input-label mb-2"
            >
              ADMIN EMAIL
            </label>
            <input
              id="email"
              type="email"
              placeholder="admin@ycoin.ai"
              {...register('email')}
              className={`w-full px-4 py-3 bg-[#040812] border ${
                errors.email ? 'border-red-500' : 'border-border-color'
              } rounded-lg text-white text-sm placeholder:text-gray-600 focus:outline-none focus:border-[#0071E3] focus:ring-1 focus:ring-[#0071E3] transition-colors`}
            />
            {errors.email && (
              <p className="text-red-400 text-xs mt-1.5 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" />
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3.5 px-4 bg-[#0071E3] hover:bg-[#0060C4] active:bg-[#0052B0] text-white font-medium text-sm rounded-lg shadow-lg shadow-[#0071E3]/30 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed mt-2"
          >
            <KeyRound className="w-4 h-4" />
            <span>
              {isSubmitting ? 'Sending Request...' : 'Send Reset Code'}
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

export default ForgotPasswordPage;
