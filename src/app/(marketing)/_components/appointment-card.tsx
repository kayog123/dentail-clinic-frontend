import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/app/components/ui/card";

interface AppointmentSlot {
  date: string;
  time: string;
  available: boolean;
}
interface AppointmentCardSlotProps {
  selectedAppointment: string;
  formatDate: (date: string) => string;
  slot: AppointmentSlot;
  handleAppointmentSelect: (data: string) => void;
}
export default function AppointmentCardSlot(props: AppointmentCardSlotProps) {
  const { selectedAppointment, formatDate, slot, handleAppointmentSelect } =
    props;

  return (
    <Card
      className={`cursor-pointer transition-all ${
        selectedAppointment === slot.time
          ? "ring-2 ring-blue-500 border-blue-500"
          : "hover:border-gray-300"
      }`}
      onClick={() => handleAppointmentSelect(slot.time)}
    >
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium">
          {formatDate(slot.date)}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <p className="text-lg font-semibold text-blue-600">{slot.time}</p>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span className="text-xs text-green-600">Available</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
