import { formatDate } from 'date-fns';
import { useMemo } from 'react';
import { useGetHabitDetails } from '@/hooks/queries/use-get-habit-details';
import {
 Card, CardContent, CardHeader, CardTitle,
} from '@/components/ui/card';
import { cn } from '@/utils/classNames';
import { bgClasses, textClasses } from '@/config/colors';
import { generateDatesByMonth, weekDayNames } from '@/utils/dates';
import useAppStore from '@/store/store';
import { HabitCalendarItem } from './habit-calendar-item';

type Props = {
    slug: string;
};

export function HabitCalendar({ slug }: Props) {
    const openSaveEntryModal = useAppStore((state) => state.openSaveEntryModal);
    const setSelectedHabitToEntry = useAppStore((state) => state.setSelectedHabitToEntry);

    const { data: habitDetails } = useGetHabitDetails({ slug });

    const dates = useMemo(() => generateDatesByMonth(Date.now()), []);

    const entries = useMemo(() => dates.map((week) => week.map((date) => ({
        date,
        habitEntry: habitDetails?.data.entries
            .find((entry) => formatDate(entry.date, 'yyyy-MM-dd') === formatDate(date, 'yyyy-MM-dd')),
    }))), [dates, habitDetails?.data.entries]);

    const bgClass = bgClasses[habitDetails?.data.category.color as keyof typeof bgClasses];
    const textClass = textClasses[habitDetails?.data.category.color as keyof typeof textClasses];

    if (!habitDetails) return null;

    return (
        <Card
          className={cn('w-full md:w-[380px]')}
        >
            <CardHeader>
                <CardTitle>{habitDetails?.data.name}</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4">
                <div className="flex justify-between pb-2 border-b border-zinc-800">
                    {
                        weekDayNames.map((day) => (
                            <div key={day} className="text-xs w-8 text-center">
                                {day}
                            </div>
                        ))
                    }
                </div>
                <div className="space-y-2">
                    {
                        entries.map((week, index) => (
                            <div key={index} className="flex justify-between">
                                {
                                    week.map((entry) => (
                                        <HabitCalendarItem
                                          key={entry.date.toString()}
                                          onClick={() => {
                                                openSaveEntryModal(true);
                                                setSelectedHabitToEntry(habitDetails.data, formatDate(entry.date, 'yyyy-MM-dd'));
                                            }}
                                          entry={entry}
                                          textClass={textClass}
                                          bgClass={bgClass}
                                          currentMonth={new Date().getMonth()}
                                        />
                                      ))
                                }
                            </div>
                        ))
                    }
                </div>
            </CardContent>
        </Card>
    );
}
