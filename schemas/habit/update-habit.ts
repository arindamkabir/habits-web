import { z } from "zod"

export const updateHabitSchema = z.object({
    name: z.string().min(1, { message: "This field has to be filled." }),
    description: z.string().optional(),
    category_id: z.number().min(1, { message: "This field has to be filled." }),
});