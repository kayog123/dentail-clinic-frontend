import AuthProvider from "./auth-provider";

export default function AdminProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AuthProvider authMode="admin">{children}</AuthProvider>;
}
