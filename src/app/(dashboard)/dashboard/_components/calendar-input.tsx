"use client";

import { ChevronDownIcon } from "lucide-react";
import { Button } from "@/app/components/ui/button";
import { Calendar } from "@/app/components/ui/calendar";
import { Label } from "@/app/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/app/components/ui/popover";
import { useState } from "react";

export default function CalendarInput({
  date,
  setDate,
}: {
  date: Date | undefined;
  setDate: (data: Date | undefined) => void;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex flex-col gap-3 ">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            id="date"
            className="w-full justify-between font-normal"
          >
            {date ? date.toLocaleDateString() : "Select date of reschedule"}
            <ChevronDownIcon />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto overflow-hidden p-0" align="start">
          <Calendar
            mode="single"
            selected={date}
            captionLayout="dropdown"
            onSelect={(dateSelected) => {
              setDate(dateSelected);
              setOpen(false);
            }}
            disabled={(date) => date < new Date()} // Disable past dates
            className="w-60"
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
