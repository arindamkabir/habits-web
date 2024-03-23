import { storeEntrySchema } from "@/schemas/habit/store-entry";
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

export type StoreEntryRequest = z.infer<typeof storeEntrySchema> & {
    habit_id: number;
    date: string;
};