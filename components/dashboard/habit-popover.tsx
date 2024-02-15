import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { IHabitWithEntries } from '@/types/Habit';
import { Button } from '@/components/ui/button';

type HabitPopoverProps = {
    habit: IHabitWithEntries
}

const HabitPopover = ({ habit }: HabitPopoverProps) => {
    return (
        <Popover>
            <PopoverTrigger className='hover:underline hover:underline-offset-3'>{habit.name}</PopoverTrigger>
            <PopoverContent>
                <div className="space-y-1.5 mb-2">
                    <h1 className="font-semibold">{habit.name}</h1>
                    <p className="text-sm text-gray-500">{habit.description}</p>
                    <p className="text-sm text-gray-200"><span className='font-medium'>Missed: </span>{habit.total_missed}</p>
                    <p className="text-sm text-gray-200"><span className='font-medium'>Missed Last Week: </span>{habit.total_missed_last_week}</p>
                </div>
                <div className="flex justify-between items-center">
                    <Button variant="link" className='px-0'>Edit</Button>
                    <Button variant="link" className='px-0'>View</Button>
                </div>
            </PopoverContent>
        </Popover>
    )
}

export default HabitPopover