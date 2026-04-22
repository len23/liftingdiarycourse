# Data Fetching

## The Rule: Server Components Only

**ALL data fetching MUST be done via Server Components.** No exceptions.

Do NOT fetch data via:
- Route handlers (`app/api/`)
- Client components (`"use client"`)
- `useEffect` + `fetch`
- SWR, React Query, or any client-side data fetching library

Server Components fetch data directly — no API layer needed. This is the architecture of this app.

## Database Queries: `/data` Directory

All database queries MUST live in helper functions inside the `/data` directory. These functions use Drizzle ORM — **never raw SQL**.

```
data/
  workouts.ts
  exercises.ts
  ...
```

Example helper:

```ts
// data/workouts.ts
import { db } from "@/db";
import { workouts } from "@/db/schema";
import { eq } from "drizzle-orm";
import { auth } from "@clerk/nextjs/server";

export async function getWorkouts() {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  return db.select().from(workouts).where(eq(workouts.userId, userId));
}
```

## Security: Users May Only Access Their Own Data

Every helper function in `/data` that queries user-owned data **MUST**:

1. Call `auth()` from Clerk to get the current `userId`
2. Throw (or return null) if `userId` is not present
3. Filter all queries by `userId` — **always scope queries to the authenticated user**

Never trust a `userId` passed in from a component or route param — always read it from the session via `auth()`.

This is not optional. A logged-in user must never be able to read, modify, or delete another user's data.

## Usage in Server Components

Call `/data` helpers directly inside `async` Server Components:

```tsx
// app/dashboard/page.tsx
import { getWorkouts } from "@/data/workouts";

export default async function DashboardPage() {
  const workouts = await getWorkouts();
  return <WorkoutList workouts={workouts} />;
}
```

## Summary

| Concern | Correct approach |
|---|---|
| Where to fetch data | Server Components |
| Where database queries live | `/data` directory |
| ORM | Drizzle ORM (no raw SQL) |
| Auth scoping | Always filter by `userId` from `auth()` |
| Client-side fetching | Never |
| Route handler fetching | Never |
