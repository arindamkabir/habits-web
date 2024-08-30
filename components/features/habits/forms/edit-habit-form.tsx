import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import useAppStore from '@/store/store';
import CategorySelect from '../category-select';
import { saveHabitSchema } from '@/schemas/habit/save-habit';
import { useToast } from '@/components/ui/use-toast';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { HABIT_ENTRY_TYPE_OPTIONS } from '@/config/habits';
import { useEffect } from 'react';
import { useUpdateHabit } from '@/hooks/mutations/use-update-habit';

const EditHabitForm = () => {
    const { toast } = useToast();

    const openEditHabitModal = useAppStore((state) => state.openEditHabitModal);
    const editingHabit = useAppStore((state) => state.editingHabit);
    const openAddCategoryDrawer = useAppStore((state) => state.openAddCategoryDrawer);

    const form = useForm<z.infer<typeof saveHabitSchema>>({
        resolver: zodResolver(saveHabitSchema),
    });

    const { mutate, isPending: isCreating } = useUpdateHabit(
        () => {
            openEditHabitModal(false);
            toast({
                title: 'Habit updated successfully'
            });
        },
    );

    function onSubmit(values: z.infer<typeof saveHabitSchema>) {
        if (!editingHabit) return;
        mutate({
            ...values,
            id: editingHabit.id,
        });
    }

    useEffect(() => {
        if (!editingHabit) return;
        form.setValue("name", editingHabit.name);
        form.setValue("category_id", Number(editingHabit.category_id));
        form.setValue("description", editingHabit?.description ?? undefined);
        form.setValue("entry_type", editingHabit.entry_type);
    }, [editingHabit, form]);

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
                            <div className="flex space-x-2 items-center">
                                <CategorySelect
                                    value={field.value}
                                    onSelect={(value) => form.setValue('category_id', value)}
                                />
                                <Button type="button" onClick={() => openAddCategoryDrawer(true)}>Add Category</Button>
                            </div>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="entry_type"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Entry Type</FormLabel>

                            <ToggleGroup
                                type="single"
                                variant="outline"
                                value={field.value}
                                onValueChange={field.onChange}
                                disabled={field.disabled}
                                className='justify-start'
                            >
                                {
                                    HABIT_ENTRY_TYPE_OPTIONS.map((item) => (
                                        <ToggleGroupItem
                                            key={`habit-create-form-entry-type-${item.value}`}
                                            value={item.value}
                                        >
                                            {item.label}
                                        </ToggleGroupItem>
                                    ))
                                }
                            </ToggleGroup>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button
                    type="submit"
                    loading={isCreating}
                    className='w-full'
                >
                    Update
                </Button>
            </form>
        </Form>
    );
}

export default EditHabitForm;
