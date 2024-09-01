import { useRouter } from 'next/router';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { HabitWithEntries } from '@/types/Habit';
import { Button } from '@/components/ui/button';
import useAppStore from '@/store/store';
import { Badge } from '@/components/ui/badge';

type HabitPopoverProps = {
    habit: HabitWithEntries
};

function HabitPopover({ habit }: HabitPopoverProps) {
    const router = useRouter();

    const openEditHabitModal = useAppStore((state) => state.openEditHabitModal);
    const setEditingHabit = useAppStore((state) => state.setEditingHabit);

    return (
        <Popover>
            <PopoverTrigger className="hover:underline hover:underline-offset-3">{habit.name}</PopoverTrigger>
            <PopoverContent align="start" >
                <div className="space-y-1.5 mb-2">
                    <div className="flex space-x-2 items-center">
                        <h1 className="font-semibold">{habit.name}</h1>
                        <Badge className='!text-xs !bg-sky-600 !text-gray-50'>
                            {
                                habit.entry_type === 'boolean' ? 'Yes/No'
                                    : (habit.entry_type === 'number' ? 'Number' : '')
                            }
                        </Badge>
                    </div>
                    <p className="text-sm text-gray-500">{habit.description}</p>
                    <p className="text-sm text-gray-400">
                        <span className="font-medium">Category: </span>
                        {habit.category.name}
                    </p>
                    {/* TODO: TO BE IMPLEMENTED */}
                    {/* <p className="text-sm text-gray-200">
                        <span className="font-medium">Missed: </span>
                        {habit.total_missed}
                    </p>
                    <p className="text-sm text-gray-200">
                        <span className="font-medium">Missed Last Week: </span>
                        {habit.total_missed_last_week}
                    </p> */}
                </div>
                <div className="space-y-2 pt-4">
                    <Button
                        className='w-full h-7'
                        onClick={() => {
                            setEditingHabit(habit);
                            openEditHabitModal(true);
                        }}
                    >
                        Edit
                    </Button>
                    <Button
                        onClick={() => router.push(`/habits/${habit.slug}`)}
                        variant="secondary"
                        className="w-full h-7"
                    >
                        View
                    </Button>
                </div>
            </PopoverContent>
        </Popover>
    );
}

export default HabitPopover;
