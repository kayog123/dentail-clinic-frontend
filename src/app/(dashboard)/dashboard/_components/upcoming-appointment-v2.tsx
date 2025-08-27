"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card";

import moment from "moment";
import {
  Calendar,
  DateRange,
  momentLocalizer,
  View,
  Views,
} from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useCallback, useState } from "react";
import { useAppointments, UserAppointmentItem } from "../../_hooks";
import AppointmentDetails from "./appointment-details";

export default function UpcomingAppointmentsV2() {
  const CALENDAR_DEFAULT_VIEW_STATE = Views.MONTH;
  const [viewAppointmentId, setViewAppointmentId] = useState<
    number | undefined
  >(undefined);
  const [startDate, setStartDate] = useState<Date>(
    moment().startOf("month").startOf("day").toDate()
  );

  const [endDate, setEndDate] = useState<Date>(
    moment().endOf("month").endOf("day").toDate()
  );
  const localizer = momentLocalizer(moment);

  const {
    data: appointments,
    isLoading,
    error,
  } = useAppointments({
    startOfDay: startDate.toISOString(),
    endOfDay: endDate.toISOString(),
  });

  const [date, setDate] = useState<Date>(new Date());
  const [view, setView] = useState<View>(CALENDAR_DEFAULT_VIEW_STATE);

  const onNavigate = useCallback(
    (newDate: Date) => setDate(newDate),
    [setDate]
  );
  const onView = useCallback((newView: View) => setView(newView), [setView]);

  const onSelectAppointment = (event: unknown) => {
    const { id } = event as UserAppointmentItem;
    setViewAppointmentId(id);
    console.log("Event details:", event);
  };

  const handleRangeChange = (range: Date[] | DateRange) => {
    let start, end;

    if (Array.isArray(range)) {
      // Week view: range is an array of dates
      start = range[0];
      end = range[range.length - 1];
    } else {
      // Day or Month view: range is an object with start and end
      start = range.start;
      end = range.end;
    }

    setStartDate(moment(start).startOf("day").toDate());
    setEndDate(
      moment(end).add(1, CALENDAR_DEFAULT_VIEW_STATE).endOf("day").toDate()
    );
  };
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
      {/* Recent Appointments */}
      <Card className="lg:col-span-4">
        <CardHeader>
          <CardTitle>Upcoming Appointments</CardTitle>
          <CardDescription>
            View upcoming scheduled appointments and their current status. Click
            appointments to <strong>cancel</strong> or{" "}
            <strong>reschedule</strong>.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4 lg:min-h-60 flex items-center justify-center">
            {isLoading && <p>Loading...</p>}
            {!isLoading && error && (
              <p className="text-red-500">{error.message}</p>
            )}
            {!isLoading && !error && (
              <Calendar
                localizer={localizer}
                events={
                  appointments?.map((appointmentItem: UserAppointmentItem) => {
                    return {
                      id: appointmentItem.id,
                      title: `Dr. ${
                        appointmentItem.dentist.firstName +
                        appointmentItem.dentist.lastName
                      } - ${appointmentItem.appType}`,
                      start: new Date(appointmentItem.prefferedAppointmentDate),
                      end: new Date(appointmentItem.prefferedAppointmentDate),
                    };
                  }) ?? []
                }
                startAccessor="start"
                endAccessor="end"
                style={{ height: 500 }}
                defaultDate={date}
                onNavigate={onNavigate}
                onView={onView}
                view={view}
                onSelectEvent={onSelectAppointment}
                className="w-full"
                onRangeChange={handleRangeChange}
              />
            )}
          </div>
        </CardContent>
      </Card>

      {/* Appointment Details & Tasks */}
      <AppointmentDetails id={viewAppointmentId} />
    </div>
  );
}
