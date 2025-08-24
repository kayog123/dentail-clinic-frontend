import { CheckCircle } from "lucide-react";

export default function VerificationComplete({ email }: { email: string }) {
  return (
    <div className="text-center space-y-4">
      <div className="mx-auto h-12 w-12 bg-green-100 rounded-full flex items-center justify-center">
        <CheckCircle className="h-6 w-6 text-green-600" />
      </div>
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          Password reset complete!
        </h3>
        <p className="text-sm text-gray-600 mb-3">
          Yo&apos;ve successfully updated your account under{" "}
          <strong>{email}</strong>. You may now access your account with the new
          password created.
        </p>
      </div>
    </div>
  );
}
