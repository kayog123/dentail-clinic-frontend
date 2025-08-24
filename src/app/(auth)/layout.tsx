import AuthProvider from "../(dashboard)/_components/auth-provider";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50">
      <AuthProvider authMode="auth"> {children}</AuthProvider>
    </div>
  );
}
