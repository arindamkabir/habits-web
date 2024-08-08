import { formatDate } from 'date-fns';
import { Entry } from '@/types/Entry';
import { cn } from '@/utils/classNames';

type Props = {
    entry: {
        date: Date;
        habitEntry?: Entry;
    };
    textClass: string;
    bgClass: string;
    onClick: () => void;
    currentMonth: number;
};

export function HabitCalendarItem({
    entry,
    textClass,
    bgClass,
    onClick,
    currentMonth,
}: Props) {
    const getColorClasses = (entry: {
        date: Date;
        habitEntry?: Entry | undefined;
    }, textClass: string, bgClass: string) => {
        if (entry.date.getMonth() !== currentMonth) return 'bg-zinc-950 text-zinc-400';
        return entry.habitEntry
            ? (
                entry.habitEntry.entry
                    ? `${bgClass} text-white`
                    : `bg-zinc-900 ${textClass}`
            )
            : 'bg-zinc-600 text-zinc-400';
    };

    if (!entry) return null;

    return (
        <div
            className={cn(
                'flex justify-center items-center rounded-lg h-8 w-8 text-[11.5px] font-semibold',
                getColorClasses(entry, textClass, bgClass),
            )}
            onClick={onClick}
        >
            {formatDate(entry.date, 'd')}
        </div>
    );
}
