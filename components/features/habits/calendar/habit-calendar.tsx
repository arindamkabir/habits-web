import { formatDate, lastDayOfMonth } from 'date-fns';
import { useMemo, useState } from 'react';
import { useGetHabitDetails } from '@/hooks/queries/use-get-habit-details';
import {
    Card,
    CardContent,
    CardHeader,
} from '@/components/ui/card';
import { cn } from '@/utils/classNames';
import { bgClasses, textClasses } from '@/config/colors';
import { generateDatesByMonth, weekDayNames } from '@/utils/dates';
import useAppStore from '@/store/store';
import { HabitCalendarItem } from './habit-calendar-item';
import { MonthType, monthOptions } from '@/config/app';
import { useGetHabitEntryList } from '@/hooks/queries/use-get-habit-entries';
import { MonthDropdown } from './month-dropdown';
import { YearDropdown } from './year-dropdown';

type Props = {
    slug: string;
};

export function HabitCalendar({ slug }: Props) {
    const [selectedMonth, setSelectedMonth] = useState<MonthType>(monthOptions[new Date().getMonth()]);
    const [selectedYear, setSelectedYear] = useState<number>(new Date().getFullYear());

    const openSaveEntryModal = useAppStore((state) => state.openSaveEntryModal);
    const setSelectedHabitToEntry = useAppStore((state) => state.setSelectedHabitToEntry);

    const firstDayOfMonth = useMemo(
        () => new Date(selectedYear, monthOptions.indexOf(selectedMonth), 1),
        [selectedYear, selectedMonth]
    );

    const dates = useMemo(() => generateDatesByMonth(firstDayOfMonth), [firstDayOfMonth]);

    const { data: habitDetails } = useGetHabitDetails({ slug });
    const { data: entryListData } = useGetHabitEntryList({
        slug,
        start_date: formatDate(firstDayOfMonth, 'yyyy-MM-01'),
        end_date: formatDate(lastDayOfMonth(firstDayOfMonth), 'yyyy-MM-dd'),
    });


    const entries = useMemo(() => dates.map((week) => week.map((date) => ({
        date,
        habitEntry: entryListData?.data.find(
            entry => formatDate(entry.date, 'yyyy-MM-dd') === formatDate(date, 'yyyy-MM-dd')
        ),
    }))), [dates, entryListData?.data]);

    const bgClass = bgClasses[habitDetails?.data.category.color as keyof typeof bgClasses];
    const textClass = textClasses[habitDetails?.data.category.color as keyof typeof textClasses];

    if (!habitDetails) return null;

    return (
        <Card
            className={cn('w-full md:w-[380px]')}
        >
            <CardHeader className="!flex-row justify-between items-center space-y-0">
                <div className="flex space-x-5">
                    <MonthDropdown
                        selectedMonth={selectedMonth}
                        setSelectedMonth={setSelectedMonth}
                    />
                    <YearDropdown
                        selectedYear={selectedYear}
                        setSelectedYear={setSelectedYear}
                    />
                </div>
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
                                                setSelectedHabitToEntry(
                                                    habitDetails.data,
                                                    formatDate(entry.date, 'yyyy-MM-dd'),
                                                    entry.habitEntry,
                                                );
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
