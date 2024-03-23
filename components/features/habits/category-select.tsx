import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command"

import { cn } from "@/utils/shadcn"
import { useMemo, useState } from "react"
import { uuid } from 'uuidv4';
import { useGetAllCategories } from "@/hooks/queries/use-get-all-categories"
import { FormControl } from "@/components/ui/form"
import { Button } from "@/components/ui/button"


type CategorySelectProps = {
    value?: number | null,
    onSelect: (value: number) => void,
    exclude?: number | null,
}

const CategorySelect = ({ value, onSelect, exclude }: CategorySelectProps) => {
    const [open, setOpen] = useState<boolean>(false);
    const { data: categoriesData, isPending: isCategoriesPending } = useGetAllCategories();
    const loopKey = uuid();

    const categories = useMemo(() => {
        if (!categoriesData) return [];
        if (!exclude) return categoriesData;

        return categoriesData?.filter(
            category => category.id !== exclude
        ) || [];

    }, [categoriesData, exclude]);

    return (
        <>
            {(isCategoriesPending || !categories) ?
                <>
                    <FormControl>
                        <Button
                            variant="outline"
                            role="combobox"
                            className={cn(
                                "w-full justify-between",
                                "text-muted-foreground bg-gray-200"
                            )}
                        >
                            Loading categories...
                            <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                    </FormControl>
                </>
                : (
                    <Popover open={open} onOpenChange={setOpen}>
                        <PopoverTrigger asChild>
                            <FormControl>
                                <Button
                                    variant="outline"
                                    role="combobox"
                                    className={cn(
                                        "w-full justify-between",
                                        !value && "text-muted-foreground"
                                    )}
                                >
                                    {value
                                        ? categories.find(
                                            (category) => category.id === value
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
                                    {categories.map((category) => (
                                        <CommandItem
                                            value={category.name}
                                            key={`${loopKey}-${category.id}`}
                                            onSelect={() => {
                                                onSelect(category.id);
                                                setOpen(false);
                                            }}
                                        >
                                            {category.name}
                                            <CheckIcon
                                                className={cn(
                                                    "ml-auto h-4 w-4",
                                                    category.id === value
                                                        ? "opacity-100"
                                                        : "opacity-0"
                                                )}
                                            />
                                        </CommandItem>
                                    ))}
                                </CommandGroup>
                            </Command>
                        </PopoverContent>
                    </Popover>

                )}

        </>
    )
}

export default CategorySelect