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
import { useCreateCategory } from "@/hooks/mutations/use-store-category"
import useBoundedStore from "@/store/store"

const formSchema = z.object({
    name: z.string().min(1, { message: "This field has to be filled." }),
    color: z.string().min(1, { message: "This field has to be filled." }),
})

const AddCategoryForm = () => {
    const openAddCategoryDrawer = useBoundedStore(state => state.openAddCategoryDrawer);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            color: ""
        },
    });

    const { mutate, isPending } = useCreateCategory(
        () => {
            // toast("Habit category added.");
            openAddCategoryDrawer(false);
        }
    );

    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values);
        mutate(values);
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
                                <Input placeholder="Category Name" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="color"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Color</FormLabel>
                            <FormControl>
                                <Input placeholder="Category Color" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit" loading={isPending}>Save</Button>
            </form>
        </Form>
    )
}

export default AddCategoryForm;