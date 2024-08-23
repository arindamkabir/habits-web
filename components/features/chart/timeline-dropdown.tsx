import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { chartTimelineWithLabelsAlt, type ChartTimelineWithLabelsType } from '@/config/app';
import { capitalize } from '@/utils/string';
import { cn } from '@/utils/classNames';

export const TimelineDropdown = ({
    timeline,
    setTimeline,
}: {
    timeline: ChartTimelineWithLabelsType, setTimeline: (value: ChartTimelineWithLabelsType) => void
}) => {
    const handleOnChange = (value: ChartTimelineWithLabelsType) => {
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
                    {capitalize(timeline.label)}
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
                className='!min-w-20'
                align='end'
            >
                {
                    chartTimelineWithLabelsAlt.map((item) => (
                        <DropdownMenuItem
                            key={`timeline-${item.value}`}
                            className={cn(
                                'text-xs py-2 justify-center',
                                timeline.value === item.value ? 'bg-zinc-300 text-zinc-950' : ''
                            )}
                            onClick={() => handleOnChange(item)}
                        >
                            {capitalize(item.label)}
                        </DropdownMenuItem>
                    ))
                }
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
