import { parseISO, format } from "date-fns";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getWorkoutsForDate } from "@/data/workouts";
import { CalendarPicker } from "./_components/CalendarPicker";

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

export default async function DashboardPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { date: dateParam } = await searchParams;
  const dateString =
    typeof dateParam === "string" ? dateParam : format(new Date(), "yyyy-MM-dd");
  const selectedDate = parseISO(dateString);

  const workoutEntries = await getWorkoutsForDate(selectedDate);

  return (
    <main className="flex gap-8 p-8 max-w-5xl mx-auto">
      <aside className="shrink-0">
        <CalendarPicker selectedDate={dateString} />
      </aside>

      <section className="flex-1 space-y-4">
        <h1 className="text-2xl font-semibold">
          Workouts for {formatDate(selectedDate)}
        </h1>

        {workoutEntries.length === 0 ? (
          <p className="text-muted-foreground text-sm">
            No workouts logged for this date.
          </p>
        ) : (
          <div className="grid grid-cols-2 gap-4">
            {workoutEntries.map((entry) => (
              <Card key={entry.workoutExerciseId}>
                <CardHeader className="pb-1">
                  <CardTitle className="text-base">
                    {entry.exerciseName}
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">
                  {entry.setCount} {entry.setCount === 1 ? "set" : "sets"}
                  {entry.maxWeight ? ` @ ${entry.maxWeight}kg` : ""}
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
