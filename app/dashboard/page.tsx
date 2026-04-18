"use client";

import { useState } from "react";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

function formatDate(date: Date): string {
  const day = date.getDate();
  const suffix =
    day % 10 === 1 && day !== 11
      ? "st"
      : day % 10 === 2 && day !== 12
      ? "nd"
      : day % 10 === 3 && day !== 13
      ? "rd"
      : "th";
  return `${day}${suffix} ${format(date, "MMM yyyy")}`;
}

const MOCK_WORKOUTS = [
  { id: 1, name: "Bench Press", sets: 4, reps: 8, weight: "80kg" },
  { id: 2, name: "Squat", sets: 3, reps: 5, weight: "100kg" },
  { id: 3, name: "Deadlift", sets: 3, reps: 5, weight: "120kg" },
];

export default function DashboardPage() {
  const [date, setDate] = useState<Date>(new Date());

  return (
    <main className="flex gap-8 p-8 max-w-5xl mx-auto">
      <aside className="shrink-0">
        <Calendar
          mode="single"
          selected={date}
          onSelect={(d) => d && setDate(d)}
          className="rounded-lg border"
        />
      </aside>

      <section className="flex-1 space-y-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold">Workouts for {formatDate(date)}</h1>
          <Button variant="outline" size="sm" className="gap-2">
            <CalendarIcon className="size-4" />
            {formatDate(date)}
          </Button>
        </div>

        {MOCK_WORKOUTS.length === 0 ? (
          <p className="text-muted-foreground text-sm">No workouts logged for this date.</p>
        ) : (
          <div className="grid grid-cols-2 gap-4">
            {MOCK_WORKOUTS.map((workout) => (
              <Card key={workout.id}>
                <CardHeader className="pb-1">
                  <CardTitle className="text-base">{workout.name}</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">
                  {workout.sets} sets × {workout.reps} reps @ {workout.weight}
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
