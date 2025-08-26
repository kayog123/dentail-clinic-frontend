export default function NoAppointment() {
  return (
    <div className="text-center py-8">
      <p className="text-gray-600 mb-4">
        No available appointments match your preferences.
      </p>
      <p className="text-sm text-gray-500">
        Please try adjusting your date, time, or provider preferences.
      </p>
    </div>
  );
}
