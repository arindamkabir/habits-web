import { z } from "zod";
import { HabitCategory } from "./HabitCategory";
import { Entry } from "./Entry";
import { storeHabitSchema } from "@/schemas/habit/store-habit";
import { updateHabitSchema } from "@/schemas/habit/update-habit";

export type Habit = {
    id: number
    slug: string,
    name: string,
    description: string,
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

export type StoreHabitRequest = z.infer<typeof storeHabitSchema>;

export type UpdateHabitRequest = z.infer<typeof updateHabitSchema> & { slug: string };