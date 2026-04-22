import { db } from "@/app/db";
import { workouts, workoutExercises, exercises, sets } from "@/app/db/schema";
import { eq, and, gte, lt, count, max } from "drizzle-orm";
import { auth } from "@clerk/nextjs/server";
import { startOfDay, addDays } from "date-fns";

export type WorkoutExerciseSummary = {
  workoutExerciseId: string;
  exerciseName: string;
  setCount: number;
  maxWeight: string | null;
};

export async function getWorkoutsForDate(date: Date): Promise<WorkoutExerciseSummary[]> {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  return db
    .select({
      workoutExerciseId: workoutExercises.id,
      exerciseName: exercises.name,
      setCount: count(sets.id),
      maxWeight: max(sets.weight),
    })
    .from(workouts)
    .innerJoin(workoutExercises, eq(workoutExercises.workoutId, workouts.id))
    .innerJoin(exercises, eq(exercises.id, workoutExercises.exerciseId))
    .leftJoin(sets, eq(sets.workoutExerciseId, workoutExercises.id))
    .where(
      and(
        eq(workouts.userId, userId),
        gte(workouts.startedAt, startOfDay(date)),
        lt(workouts.startedAt, startOfDay(addDays(date, 1)))
      )
    )
    .groupBy(workoutExercises.id, exercises.name);
}
