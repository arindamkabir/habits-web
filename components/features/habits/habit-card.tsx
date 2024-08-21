import { formatDate } from 'date-fns';
import { useRouter } from 'next/router';
import { useMemo } from 'react';
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { HabitWithEntries } from '@/types/Habit';
import { cn } from '@/utils/classNames';
import { HabitCalendarItem } from './calendar/habit-calendar-item';
import useAppStore from '@/store/store';

type HabitCardProps = {
    className?: string;
    habit: HabitWithEntries;
    dates: Date[];
};

export function HabitCard({ className = '', habit, dates }: HabitCardProps) {
    const router = useRouter();

    const openSaveEntryModal = useAppStore((state) => state.openSaveEntryModal);
    const setSelectedHabitToEntry = useAppStore((state) => state.setSelectedHabitToEntry);

    const entries = useMemo(() => dates.map((date) => ({
        date,
        habitEntry: habit.entries.find(
            entry => formatDate(entry.date, 'yyyy-MM-dd') === formatDate(date, 'yyyy-MM-dd')
        ),
    })), [dates, habit.entries]);

    return (
        <Card
            className={cn('w-full md:w-[380px]', className)}
        >
            <CardHeader>
                <CardTitle
                    onClick={() => router.push(`/habits/${habit.slug}`)}
                    className="cursor-pointer"
                >
                    {habit.name}
                </CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4">
                <div className="flex justify-between font-normal">
                    {
                        entries.map((item) => (
                            <HabitCalendarItem
                                key={`${habit.id}-${item.date.toString()}`}
                                entryType={habit.entry_type}
                                onClick={() => {
                                    openSaveEntryModal(true);
                                    setSelectedHabitToEntry(
                                        habit,
                                        formatDate(item.date, 'yyyy-MM-dd'),
                                        item.habitEntry,
                                    );
                                }}
                                entry={item}
                                currentMonth={new Date().getMonth()}
                                withDayName
                            />
                        ))
                    }
                </div>
            </CardContent>
        </Card>
    );
}
