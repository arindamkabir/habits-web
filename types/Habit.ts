import { z } from "zod";
import { HabitCategory } from "./HabitCategory";
import { Entry } from "./Entry";
import { saveHabitSchema } from "@/schemas/habit/save-habit";

export type Habit = {
    id: number
    slug: string,
    name: string,
    description: string,
    total_missed: number,
    total_missed_last_week: number,
    category_id: string,
    category: HabitCategory,
    entry_type: "number" | "boolean",
    user_id: number,
    updated_at: string,
    created_at: string,
};

export type HabitWithEntries = Habit & {
    entries: Entry[]
}

export type StoreHabitRequest = z.infer<typeof saveHabitSchema>;

export type UpdateHabitRequest = StoreHabitRequest & { id: number };