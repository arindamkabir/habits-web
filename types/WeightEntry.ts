import { saveEntrySchema } from "@/schemas/weight-entry/save-entry";
import { z } from "zod";

export type WeightEntry = {
    id: number,
    entry: number
    note?: string | null,
    date: string,
    created_at?: string | null,
    updated_at?: string | null,
};

export type StoreWeightEntry = z.infer<typeof saveEntrySchema> & {
    date: string;
};