import ChangePasswordForm from "./_components/change-password";
import ProfileForm from "./_components/profile-form";

export default function UserProfile() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">User Profile</h1>
          <p className="text-muted-foreground">
            Manage your profile information here.
          </p>
        </div>
      </div>

      {/* Profile Form */}
      <div className="flex gap-x-4">
        <ProfileForm />
        <ChangePasswordForm />
      </div>
    </div>
  );
}
