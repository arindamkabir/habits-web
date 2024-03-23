import { z } from "zod"

export const storeHabitSchema = z.object({
    name: z.string().min(1, { message: "This field has to be filled." }),
    description: z.string(),
    category_id: z.number().min(1, { message: "This field has to be filled." }),
    entry_type: z.enum(['boolean', 'number'], { required_error: "This field has to be filled." }),
});