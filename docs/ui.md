# UI Coding Standards

## Component Library

**All UI must be built exclusively with [shadcn/ui](https://ui.shadcn.com) components.**

- Do NOT create custom UI components under any circumstances.
- Do NOT write raw HTML elements styled with Tailwind as standalone components.
- If a shadcn/ui component exists for the use case, use it. If one does not exist, request a new shadcn component be added to the project before writing any alternative.
- Components live in `components/ui/` and are installed via the shadcn CLI:
  ```bash
  npx shadcn@latest add <component-name>
  ```

## Date Formatting

All dates must be formatted using [date-fns](https://date-fns.org). No other date formatting library or manual string manipulation is permitted.

### Required Format

Dates are displayed using ordinal day, abbreviated month, and full year:

```
1st Sep 2025
2nd Aug 2025
3rd Jan 2026
4th Jun 2024
```

### Implementation

```ts
import { format } from "date-fns";

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
```

Use this utility (or a shared version of it) wherever a date is rendered in the UI. Do not inline ad-hoc date formatting.
