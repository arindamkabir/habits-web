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
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command"
import { cn } from "@/utils/shadcn"
import { useGetCategories } from "@/hooks/queries/use-get-categories"

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

    const { data: categoriesData, isPending: isCategoriesPending } = useGetCategories();

    const { mutate, isPending: isCreating } = useCreateHabit(
        () => {
            // toast("Habit category added.");
            openAddHabitDrawer(false);
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
                {(isCategoriesPending || !categoriesData) ? "Loading..." : (
                    <FormField
                        control={form.control}
                        name="category_id"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Category</FormLabel>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <FormControl>
                                            <Button
                                                variant="outline"
                                                role="combobox"
                                                className={cn(
                                                    "w-full justify-between",
                                                    !field.value && "text-muted-foreground"
                                                )}
                                            >
                                                {field.value
                                                    ? categoriesData.find(
                                                        (category) => category.id === field.value
                                                    )?.name
                                                    : "Select category"}
                                                <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                            </Button>
                                        </FormControl>
                                    </PopoverTrigger>
                                    <PopoverContent className="p-0" side="bottom" align="center">
                                        <Command>
                                            <CommandInput
                                                placeholder="Search categories..."
                                                className="h-9"
                                            />
                                            <CommandEmpty>No category found.</CommandEmpty>
                                            <CommandGroup>
                                                {categoriesData.map((category) => (
                                                    <CommandItem
                                                        value={category.name}
                                                        key={category.id}
                                                        onSelect={() => {
                                                            form.setValue("category_id", category.id)
                                                        }}
                                                    >
                                                        {category.name}
                                                        <CheckIcon
                                                            className={cn(
                                                                "ml-auto h-4 w-4",
                                                                category.id === field.value
                                                                    ? "opacity-100"
                                                                    : "opacity-0"
                                                            )}
                                                        />
                                                    </CommandItem>
                                                ))}
                                                <span className="w-full flex justify-center py-1.5">
                                                    <Button variant="link" onClick={() => {
                                                        // openAddHabitDrawer(false);
                                                        openAddCategoryDrawer(true);
                                                    }}>
                                                        Create new category
                                                    </Button>
                                                </span>
                                            </CommandGroup>
                                        </Command>
                                    </PopoverContent>
                                </Popover>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                )}


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