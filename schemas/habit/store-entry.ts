import { z } from "zod"

export const storeEntrySchema = z.object({
    entry: z.coerce.number().min(0.0001, { message: "This field has to be filled." }),
    note: z.string().min(1, { message: "This field has to be filled." }),
});