import React from "react";

interface AuthWrapperProps {
  title: string;
  subtitle: string;
  children: React.ReactNode;
  Icon?: React.ReactNode;
}

export default function AuthWrapper(props: AuthWrapperProps) {
  const { title, subtitle, children, Icon } = props;
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-6">
        {/* Header */}
        <div className="text-center">
          {Icon}
          <h2 className="text-2xl font-bold text-gray-900 mb-1">{title}</h2>
          <p className="text-sm text-gray-600">{subtitle}</p>
        </div>

        {/* Login Form */}
        <div className="bg-white rounded-xl shadow-lg p-6">{children}</div>
      </div>
    </div>
  );
}
