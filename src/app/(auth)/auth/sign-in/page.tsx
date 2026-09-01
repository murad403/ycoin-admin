'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Lock, Eye, EyeOff, Shield, AlertCircle } from 'lucide-react';
import logo from '@/assets/logo.png';
import { signInSchema, SignInFormValues } from '@/validation/auth.validation';

const SignInPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormValues>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: 'admin@ycoin.ai',
      password: '',
    },
  });

  const onSubmit = (data: SignInFormValues) => {
    setIsSubmitting(true);
    console.log('Sign In Data:', data);
    setTimeout(() => {
      setIsSubmitting(false);
      alert('Sign in submitted successfully!');
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

        {/* Sovereign Admin Portal Pill */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0071E3]/15 border border-[#0071E3]/30 text-[#0071E3] text-[11px] font-semibold tracking-wider uppercase mb-3">
          <Shield className="w-3.5 h-3.5 text-[#0071E3]" />
          <span>YCOIN Sovereign Admin Portal</span>
        </div>

        {/* Description */}
        <p className="text-xs text-description leading-relaxed max-w-[320px] mb-8">
          Enter administrator credentials to manage live AI knowledge docs and
          platform users.
        </p>
      </div>

      {/* Form */}
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

        {/* Password Field */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label
              htmlFor="password"
              className="block text-[11px] font-semibold tracking-wider uppercase text-input-label"
            >
              PASSWORD
            </label>
            <Link
              href="/auth/forgot-password"
              className="text-[11px] text-[#0071E3] hover:underline font-medium transition-colors"
            >
              Forgot password?
            </Link>
          </div>
          <div className="relative">
            <input
              id="password"
              type={showPassword ? 'text' : 'password'}
              placeholder="••••••••"
              {...register('password')}
              className={`w-full px-4 py-3 bg-[#040812] border ${
                errors.password ? 'border-red-500' : 'border-border-color'
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

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-3.5 px-4 bg-[#0071E3] hover:bg-[#0060C4] active:bg-[#0052B0] text-white font-medium text-sm rounded-lg shadow-lg shadow-[#0071E3]/30 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed mt-2"
        >
          <Lock className="w-4 h-4" />
          <span>
            {isSubmitting ? 'Authenticating...' : 'Login to Admin Dashboard'}
          </span>
        </button>
      </form>
    </div>
  );
};

export default SignInPage;