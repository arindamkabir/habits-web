import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { toast } from 'sonner';
import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import {
    ToggleGroup,
    ToggleGroupItem,
} from '@/components/ui/toggle-group';
import { Textarea } from '@/components/ui/textarea';
import useAppStore from '@/store/store';
import { saveEntrySchema } from '@/schemas/habit/save-entry';
import { useSaveEntry } from '@/hooks/mutations/use-save-entry';
import { Input } from '@/components/ui/input';

function SaveEntryForm() {
    const openSaveEntryModal = useAppStore((state) => state.openSaveEntryModal);
    const selectedHabitToEntry = useAppStore((state) => state.selectedHabitToEntry);

    const existingEntry = selectedHabitToEntry?.currentEntry;

    const form = useForm<z.infer<typeof saveEntrySchema>>({
        resolver: zodResolver(saveEntrySchema),
    });

    const { mutate, isPending: isCreating } = useSaveEntry(
        () => {
            openSaveEntryModal(false);
            toast.success('Entry added successfully.');
        },
    );

    function onSubmit(values: z.infer<typeof saveEntrySchema>) {
        if (!selectedHabitToEntry) return;

        mutate({
            habit_id: selectedHabitToEntry.habit.id,
            date: selectedHabitToEntry.date,
            ...values,
        });
    }

    useEffect(() => {
        if (!existingEntry) {
            form.reset();
            return;
        }
        form.setValue('entry', existingEntry?.entry || 0);
        form.setValue('note', existingEntry?.note || '');
    }, [existingEntry, form]);

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                    control={form.control}
                    name="entry"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Did you perform this habit on this day?</FormLabel>
                            <FormControl>
                                {
                                    selectedHabitToEntry?.habit.entry_type === 'boolean' ? (
                                        <div>
                                            <ToggleGroup
                                                type="single"
                                                className="justify-start"
                                                value={`${field.value}`}
                                                onValueChange={field.onChange}
                                            >
                                                <ToggleGroupItem value="1">
                                                    Yes
                                                </ToggleGroupItem>
                                                <ToggleGroupItem value="0">
                                                    No
                                                </ToggleGroupItem>
                                            </ToggleGroup>
                                        </div>
                                    )
                                        : <Input placeholder="Entry" {...field} />
                                }
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
    );
}

export default SaveEntryForm;
