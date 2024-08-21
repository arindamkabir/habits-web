import { formatDate, isAfter } from 'date-fns';
import { Entry } from '@/types/Entry';
import { cn } from '@/utils/classNames';
import { CheckIcon, Cross2Icon } from '@radix-ui/react-icons';
import { Habit } from '@/types/Habit';

type Props = {
    entry: {
        date: Date;
        habitEntry?: Entry;
    };
    entryType: Habit['entry_type'];
    onClick: () => void;
    currentMonth: number;
    withDayName?: boolean;
};

export function HabitCalendarItem({
    entry,
    entryType,
    onClick,
    currentMonth,
    withDayName,
}: Props) {
    const getColorClasses = (entry: {
        date: Date;
        habitEntry?: Entry | undefined;
    }) => {
        if (entry.date.getMonth() !== currentMonth) return 'bg-zinc-950 text-zinc-950';
        if (isAfter(entry.date, Date.now())) return 'bg-zinc-900 text-zinc-600';
        if (!entry.habitEntry) return 'bg-zinc-900 text-zinc-600';
        return entry.habitEntry
            ? (
                entry.habitEntry.entry
                    ? 'bg-emerald-500 text-zinc-50'
                    : 'bg-rose-500 text-zinc-50'
            )
            : 'bg-zinc-800 text-zinc-400';
    };

    if (!entry) return null;

    return (
        <div className='flex flex-col justify-center items-center space-y-2'>
            {
                withDayName && (
                    <div className="text-xs text-zinc-300 font-semibold">
                        {formatDate(entry.date, 'E')}
                    </div>
                )
            }
            <div className={cn(
                'text-xs font-semibold',
                formatDate(entry.date, 'yyyy-MM-dd') === formatDate(Date.now(), 'yyyy-MM-dd')
                    ? 'underline underline-offset-1 decoration-sky-500 text-sky-500'
                    : 'text-zinc-300',
            )}>
                {formatDate(entry.date, 'd')}
            </div>
            <div
                className={cn(
                    'flex justify-center items-center rounded-lg h-8 w-8 text-[11.5px] font-semibold',
                    getColorClasses(entry),
                )}
                onClick={() => {
                    if (isAfter(entry.date, Date.now())) return;
                    onClick();
                }}
            >
                {
                    entry.habitEntry
                        ? entry.habitEntry.entry
                            ? (
                                entryType === "boolean"
                                    ? <CheckIcon className="w-4 h-4" />
                                    : entry.habitEntry.entry
                            )
                            : (
                                entryType === "boolean"
                                    ? <Cross2Icon className="w-4 h-4" />
                                    : entry.habitEntry.entry
                            )
                        : '-'
                }
            </div>
        </div>
    );
}
