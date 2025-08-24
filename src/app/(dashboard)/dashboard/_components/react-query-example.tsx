"use client";

import { useState } from "react";
import { Button } from "@/app/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { Loader2, Plus, Trash2, Edit, Calendar, User } from "lucide-react";
import {
  useAppointments,
  useCreateAppointment,
  useUpdateAppointment,
  useDeleteAppointment,
  type Appointment,
} from "../../_hooks/use-appointments";
import {
  useQueryUtils,
  queryKeys,
  handleQueryError,
  getLoadingState,
} from "../../_hooks/use-query-utils";

export default function ReactQueryExample() {
  const [isAddingAppointment, setIsAddingAppointment] = useState(false);
  const [editingAppointment, setEditingAppointment] = useState<string | null>(
    null
  );
  const [formData, setFormData] = useState({
    patientName: "",
    date: "",
    time: "",
    service: "",
    notes: "",
  });

  // React Query hooks
  const { data: appointments, isLoading, isError, error } = useAppointments();
  const createAppointment = useCreateAppointment();
  const updateAppointment = useUpdateAppointment();
  const deleteAppointment = useDeleteAppointment();
  const { invalidateQueries } = useQueryUtils();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (editingAppointment) {
      await updateAppointment.mutateAsync({
        id: editingAppointment,
        ...formData,
      });
      setEditingAppointment(null);
    } else {
      await createAppointment.mutateAsync(formData);
    }

    setFormData({
      patientName: "",
      date: "",
      time: "",
      service: "",
      notes: "",
    });
    setIsAddingAppointment(false);
  };

  const handleEdit = (appointment: Appointment) => {
    setEditingAppointment(appointment.id);
    setFormData({
      patientName: appointment.patientName,
      date: appointment.date,
      time: appointment.time,
      service: appointment.service,
      notes: appointment.notes || "",
    });
    setIsAddingAppointment(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this appointment?")) {
      await deleteAppointment.mutateAsync(id);
    }
  };

  const resetForm = () => {
    setFormData({
      patientName: "",
      date: "",
      time: "",
      service: "",
      notes: "",
    });
    setEditingAppointment(null);
    setIsAddingAppointment(false);
  };

  const loadingState = getLoadingState(isLoading, false, isError);

  if (isError) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="text-center text-red-600">
            <p>Error loading appointments: {handleQueryError(error)}</p>
            <Button
              onClick={() => invalidateQueries([queryKeys.appointments])}
              className="mt-2"
            >
              Retry
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Appointments</h2>
          <p className="text-muted-foreground">
            Manage your dental appointments with React Query
          </p>
        </div>
        <Button
          onClick={() => setIsAddingAppointment(true)}
          className="bg-sky-600 hover:bg-sky-700"
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Appointment
        </Button>
      </div>

      {/* Add/Edit Form */}
      {isAddingAppointment && (
        <Card>
          <CardHeader>
            <CardTitle>
              {editingAppointment ? "Edit Appointment" : "Add New Appointment"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="patientName">Patient Name</Label>
                  <Input
                    id="patientName"
                    value={formData.patientName}
                    onChange={(e) =>
                      setFormData({ ...formData, patientName: e.target.value })
                    }
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="service">Service</Label>
                  <Input
                    id="service"
                    value={formData.service}
                    onChange={(e) =>
                      setFormData({ ...formData, service: e.target.value })
                    }
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="date">Date</Label>
                  <Input
                    id="date"
                    type="date"
                    value={formData.date}
                    onChange={(e) =>
                      setFormData({ ...formData, date: e.target.value })
                    }
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="time">Time</Label>
                  <Input
                    id="time"
                    type="time"
                    value={formData.time}
                    onChange={(e) =>
                      setFormData({ ...formData, time: e.target.value })
                    }
                    required
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="notes">Notes</Label>
                <Input
                  id="notes"
                  value={formData.notes}
                  onChange={(e) =>
                    setFormData({ ...formData, notes: e.target.value })
                  }
                />
              </div>
              <div className="flex gap-2">
                <Button
                  type="submit"
                  disabled={
                    createAppointment.isPending || updateAppointment.isPending
                  }
                  className="bg-sky-600 hover:bg-sky-700"
                >
                  {(createAppointment.isPending ||
                    updateAppointment.isPending) && (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  {editingAppointment ? "Update" : "Create"}
                </Button>
                <Button type="button" variant="outline" onClick={resetForm}>
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Appointments List */}
      <Card>
        <CardHeader>
          <CardTitle>Appointments List</CardTitle>
        </CardHeader>
        <CardContent>
          {loadingState === "loading" ? (
            <div className="flex items-center justify-center p-8">
              <Loader2 className="h-8 w-8 animate-spin text-sky-600" />
              <span className="ml-2">Loading appointments...</span>
            </div>
          ) : appointments && appointments.length > 0 ? (
            <div className="space-y-4">
              {appointments.map((appointment) => (
                <div
                  key={appointment.id}
                  className="flex items-center justify-between p-4 border rounded-lg"
                >
                  <div className="flex items-center space-x-4">
                    <Calendar className="h-5 w-5 text-sky-600" />
                    <div>
                      <p className="font-medium">{appointment.patientName}</p>
                      <p className="text-sm text-muted-foreground">
                        {appointment.service} • {appointment.date} at{" "}
                        {appointment.time}
                      </p>
                      {appointment.notes && (
                        <p className="text-sm text-muted-foreground">
                          {appointment.notes}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleEdit(appointment)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleDelete(appointment.id)}
                      disabled={deleteAppointment.isPending}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center p-8 text-muted-foreground">
              <User className="h-12 w-12 mx-auto mb-4 text-gray-300" />
              <p>No appointments found</p>
              <p className="text-sm">
                Create your first appointment to get started
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* React Query Status */}
      <Card>
        <CardHeader>
          <CardTitle>React Query Status</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="font-medium">Loading State:</span> {loadingState}
            </div>
            <div>
              <span className="font-medium">Total Appointments:</span>{" "}
              {appointments?.length || 0}
            </div>
            <div>
              <span className="font-medium">Create Mutation:</span>{" "}
              {createAppointment.isPending ? "Pending" : "Idle"}
            </div>
            <div>
              <span className="font-medium">Update Mutation:</span>{" "}
              {updateAppointment.isPending ? "Pending" : "Idle"}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
