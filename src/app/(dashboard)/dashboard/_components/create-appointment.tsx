"use client";

import WizardStepHeader from "@/app/(marketing)/_components/booking-wizard/wizard-step-hearder";
import { WIZARD_STEPS } from "@/app/(marketing)/_utils/const";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/app/components/ui/dialog";
import { Clock } from "lucide-react";

export function CreateAppointment() {
  return (
    <Dialog>
      <DialogTrigger className="flex items-center bg-sky-600 px-4 py-2 hover:cursor-pointer rounded-md text-white shadow-md hover:bg-sky-700">
        <Clock className="mr-2 h-4 w-4" />
        Create Appointments
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Book an appointment</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </DialogDescription>
          <div></div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
