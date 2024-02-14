import { IHabitCategory } from "./HabitCategory"
import { IHabitEntry } from "./HabitEntry"

export type IHabit = {
    id: number
    slug: string,
    name: string,
    description: string,
    total_missed: number,
    total_missed_last_week: number,
    category_id: string,
    category: IHabitCategory,
    entry_type: "number" | "boolean",
    user_id: number,
    updated_at: string,
    created_at: string,
};

export type IHabitWithEntries = IHabit & {
    entries: IHabitEntry[]
}

