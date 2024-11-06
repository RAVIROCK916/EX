"use client";

import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/utils/cn";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { SelectSingleEventHandler } from "react-day-picker";

type DatePickerProps = {
  date: string;
  onDateSelect?: SelectSingleEventHandler;
  maxDate?: Date;
};

export default function DatePicker({
  date,
  onDateSelect,
  maxDate,
}: DatePickerProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "flex w-[280px] justify-start text-left font-normal",
            !date && "text-muted-foreground",
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, "PPP") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          captionLayout="dropdown-buttons"
          fromYear={1947}
          toYear={2024}
          selected={new Date(date)}
          onSelect={onDateSelect}
          disabled={maxDate && { after: maxDate }}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}
