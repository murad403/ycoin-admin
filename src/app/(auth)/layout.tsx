import React from 'react';

const AuthLayout = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <div className="min-h-screen w-full bg-[#030712] flex items-center justify-center relative overflow-hidden p-4 sm:p-6 select-none">
      {/* Background radial glow effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-150 bg-[#0071E3]/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/4 left-1/3 w-75 h-75 bg-[#0071E3]/5 rounded-full blur-[90px] pointer-events-none" />

      {/* Main Container */}
      <div className="relative z-10 w-full flex items-center justify-center">
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;