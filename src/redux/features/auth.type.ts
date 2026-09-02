





export interface TSignInRequest {
  email: string;
  password: string;
}

export interface TUser {
  id: string;
  profile_name: string;
  email: string;
  avatar: string | null;
  role: string;
  is_email_verified: boolean;
  deleted_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface TSignInResponse {
  refresh: string;
  access: string;
  message: string;
  user: TUser;
}

export interface TForgotPasswordRequest {
  email: string;
}

export interface TForgotPasswordResponse {
  detail: string;
}

export interface TForgotPasswordVerifyOtpRequest {
  email: string;
  otp: string;
}

export interface TForgotPasswordVerifyOtpResponse {
  detail: string;
  reset_token: string;
}

export interface TResetPasswordRequest {
  reset_token: string;
  new_password: string;
}

export interface TResetPasswordResponse {
  detail: string;
}

export interface TChangePasswordRequest {
  current_password: string;
  new_password: string;
}

export interface TChangePasswordResponse {
  detail: string;
}

export interface TProfileResponse {
  id: string;
  profile_name: string;
  email: string;
  avatar: string | null;
  role: string;
  is_email_verified: boolean;
  deleted_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface TUpdateProfileRequest {
  profile_name?: string;
  email?: string;
  avatar?: File | Blob | null;
}

export interface TApiError {
  success?: boolean;
  code?: number;
  message?: string;
  detail?: string;
  errors?: Record<string, any>;
}
