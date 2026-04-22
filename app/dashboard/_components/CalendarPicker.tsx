"use client";

import { useRouter } from "next/navigation";
import { format, parseISO } from "date-fns";
import { Calendar } from "@/components/ui/calendar";

export function CalendarPicker({ selectedDate }: { selectedDate: string }) {
  const router = useRouter();
  const parsed = parseISO(selectedDate);

  function handleSelect(d: Date | undefined) {
    if (!d) return;
    router.replace(`/dashboard?date=${format(d, "yyyy-MM-dd")}`);
    router.refresh();
  }

  return (
    <Calendar
      mode="single"
      selected={parsed}
      onSelect={handleSelect}
      className="rounded-lg border"
    />
  );
}
