import { saveEntrySchema } from "@/schemas/habit/save-entry";
import { z } from "zod";

export type Entry = {
    id: number;
    entry: number;
    habit_id: number;
    note: string;
    date: string;
    created_at: string;
    updated_at: string;
};

export type SaveEntryRequest = z.infer<typeof saveEntrySchema> & {
    habit_id: number;
    date: string;
};