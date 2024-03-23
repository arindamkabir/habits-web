"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from "@/components/ui/textarea"
import useAppStore from "@/store/store"
import { toast } from "sonner"
import { storeEntrySchema } from "@/schemas/habit/store-entry"
import { useStoreEntry } from "@/hooks/mutations/use-store-entry"

const AddEntryForm = () => {
    const openAddEntryModal = useAppStore(state => state.openAddEntryModal);
    const selectedHabitToEntry = useAppStore(state => state.selectedHabitToEntry);

    const form = useForm<z.infer<typeof storeEntrySchema>>({
        resolver: zodResolver(storeEntrySchema)
    });

    const { mutate, isPending: isCreating } = useStoreEntry(
        () => {
            openAddEntryModal(false);
            toast.success("Entry added successfully.");
        }
    );

    function onSubmit(values: z.infer<typeof storeEntrySchema>) {
        if (!selectedHabitToEntry) return;

        mutate({
            habit_id: selectedHabitToEntry.id,
            date: selectedHabitToEntry.date,
            ...values
        });
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                    control={form.control}
                    name="entry"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Entry</FormLabel>
                            <FormControl>
                                <Input placeholder="Entry" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="note"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Note</FormLabel>
                            <FormControl>
                                <Textarea placeholder="Note" {...field} />
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

export default AddEntryForm;