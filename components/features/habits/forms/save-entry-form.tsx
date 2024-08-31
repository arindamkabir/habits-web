import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from '@/components/ui/form';
import {
    ToggleGroup,
    ToggleGroupItem,
} from '@/components/ui/toggle-group';
import useAppStore from '@/store/store';
import { saveEntrySchema } from '@/schemas/habit/save-entry';
import { useSaveEntry } from '@/hooks/mutations/use-save-entry';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { Label } from '@/components/ui/label';

function SaveEntryForm() {
    const { toast } = useToast();

    const openSaveEntryModal = useAppStore((state) => state.openSaveEntryModal);
    const selectedHabitToEntry = useAppStore((state) => state.selectedHabitToEntry);

    const existingEntry = selectedHabitToEntry?.currentEntry;

    const form = useForm<z.infer<typeof saveEntrySchema>>({
        resolver: zodResolver(saveEntrySchema),
    });

    const { mutate, isPending: isCreating } = useSaveEntry(
        () => {
            openSaveEntryModal(false);
            toast({
                title: `Entry ${existingEntry ? 'updated' : 'added'} successfully.`,
            });
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
    }, [existingEntry, form]);

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-3 items-center gap-4">
                    <Label>Value</Label>
                    <FormField
                        control={form.control}
                        name="entry"
                        render={({ field }) => (
                            <FormItem className='col-span-2'>
                                <FormControl>
                                    {
                                        selectedHabitToEntry?.habit.entry_type === 'boolean' ? (
                                            <div>
                                                <ToggleGroup
                                                    type="single"
                                                    className="justify-start w-full"
                                                    variant="outline"
                                                    value={`${field.value}`}
                                                    onValueChange={field.onChange}
                                                >
                                                    <ToggleGroupItem value="1" className='w-1/2'>
                                                        Yes
                                                    </ToggleGroupItem>
                                                    <ToggleGroupItem value="0" className='w-1/2'>
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
                </div>


                <Button
                    type="submit"
                    loading={isCreating}
                    className='w-full'
                >
                    Save
                </Button>
            </form>
        </Form>
    );
}

export default SaveEntryForm;
