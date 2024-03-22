import { Category } from "./Category"
import { Entry } from "./Entry";

export type Habit = {
    id: number
    slug: string,
    name: string,
    description: string,
    total_missed: number,
    total_missed_last_week: number,
    category_id: string,
    category: Category,
    entry_type: "number" | "boolean",
    user_id: number,
    updated_at: string,
    created_at: string,
};

export type HabitWithEntries = Habit & {
    entries: Entry[]
}

