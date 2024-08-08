import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { timelineOptions, type TimelineType } from '@/config/app';
import { capitalize } from '@/utils/string';
import { cn } from '@/utils/classNames';

export const TimelineDropdown = ({
    timeline,
    setTimeline,
}: {
    timeline: TimelineType, setTimeline: (value: TimelineType) => void
}) => {
    const handleOnChange = (value: TimelineType) => {
        setTimeline(value);
    };
    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <Button
                    size="sm"
                    variant="outline"
                    className='min-w-20'
                >
                    {capitalize(timeline)}
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
                className='!min-w-20'
                align='end'
            >
                {
                    timelineOptions.map((value) => (
                        <DropdownMenuItem
                            key={`timeline-${value}`}
                            className={cn(
                                'text-xs py-2 justify-center',
                                timeline === value ? 'bg-zinc-300 text-zinc-950' : ''
                            )}
                            onClick={() => handleOnChange(value)}
                        >
                            {capitalize(value)}
                        </DropdownMenuItem>
                    ))
                }
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
