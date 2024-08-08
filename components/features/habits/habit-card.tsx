import { formatDate } from 'date-fns';
import { useRouter } from 'next/router';
import { useMemo } from 'react';
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { bgClasses, textClasses } from '@/config/colors';
import { HabitWithEntries } from '@/types/Habit';
import { cn } from '@/utils/classNames';

type HabitCardProps = {
    className?: string;
    habit: HabitWithEntries;
    dates: Date[];
};

export function HabitCard({ className = '', habit, dates }: HabitCardProps) {
    const router = useRouter();
    const entries = useMemo(() => dates.map((date) => ({
        date,
        habitEntry: habit.entries.find((entry) => formatDate(new Date(entry.date), 'yyyy-MM-dd') === formatDate(date, 'yyyy-MM-dd')),
    })), [dates, habit.entries]);

    const bgClass = bgClasses[habit.category.color as keyof typeof bgClasses];
    const textClass = textClasses[habit.category.color as keyof typeof textClasses];

    return (
        <Card
            className={cn('w-full md:w-[380px]', className)}
            onClick={() => router.push(`/habits/${habit.slug}`)}
        >
            <CardHeader>
                <CardTitle>{habit.name}</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4">
                <div className="flex justify-between">
                    {
                        entries.map((item) => (
                            <div key={`${habit.id}-${item.date.toString()}`} className="flex flex-col items-center space-y-1">
                                <div className="text-xs">
                                    {formatDate(item.date, 'EEE')}
                                </div>
                                <div className={cn(
                                    'flex justify-center items-center rounded-full h-8 w-8 text-xs',
                                    item.habitEntry
                                        ? (
                                            item.habitEntry.entry
                                                ? `${bgClass} text-white`
                                                : `bg-zinc-900 ${textClass}`
                                        )
                                        : 'bg-zinc-600 text-zinc-400',
                                )}
                                >
                                    {formatDate(item.date, 'd')}
                                </div>
                            </div>
                        ))
                    }
                </div>
            </CardContent>
        </Card>
    );
}
