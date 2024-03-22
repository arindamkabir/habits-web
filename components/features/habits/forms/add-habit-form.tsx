"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from "@/components/ui/textarea"
import { useCreateHabit } from "@/hooks/mutations/use-store-habit"
import useAppStore from "@/store/store"
import { useGetAllCategories } from "@/hooks/queries/use-get-all-categories"
import { toast } from "sonner"
import CategorySelect from "../../categories/CategorySelect"

const formSchema = z.object({
    name: z.string().min(1, { message: "This field has to be filled." }),
    description: z.string(),
    category_id: z.number().int().positive({ message: "This field has to be filled." }),
    entryType: z.enum(['boolean', 'number'], { required_error: "This field has to be filled." }),
})

const AddHabitForm = () => {
    const openAddHabitDrawer = useAppStore(state => state.openAddHabitDrawer);
    const openAddCategoryDrawer = useAppStore(state => state.openAddCategoryDrawer);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            description: "",
            category_id: undefined,
            entryType: undefined,
        },
    });

    const { data: categoriesData, isPending: isCategoriesPending } = useGetAllCategories();

    const { mutate, isPending: isCreating } = useCreateHabit(
        () => {
            openAddHabitDrawer(false);
            toast.success("Product added successfully.");
        }
    );

    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values)
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                                <Input placeholder="Habit Name" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                                <Textarea placeholder="Habit Description" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="category_id"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Category</FormLabel>
                            <CategorySelect
                                value={field.value}
                                onSelect={(value) => form.setValue("category_id", value)}
                            />
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="entryType"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Entry Type</FormLabel>
                            <FormControl>
                                <RadioGroup
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                    className="flex flex-col space-y-1"
                                >
                                    <FormItem className="flex items-center space-x-3 space-y-0">
                                        <FormControl>
                                            <RadioGroupItem value="boolean" />
                                        </FormControl>
                                        <FormLabel className="font-normal">
                                            Yes/No
                                        </FormLabel>
                                    </FormItem>
                                    <FormItem className="flex items-center space-x-3 space-y-0">
                                        <FormControl>
                                            <RadioGroupItem value="number" />
                                        </FormControl>
                                        <FormLabel className="font-normal">
                                            Numeric
                                        </FormLabel>
                                    </FormItem>
                                </RadioGroup>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit" loading={isCreating}>Save</Button>
            </form>
        </Form>
    )
}

export default AddHabitForm;