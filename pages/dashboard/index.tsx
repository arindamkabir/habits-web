import { Button } from '@/components/ui/button'
import useAppStore from '@/store/store'
import { Fragment, useMemo, useState } from 'react';
import { ArrowLongLeftIcon, ArrowLongRightIcon, ChevronLeftIcon, ChevronRightIcon, PlusIcon } from '@heroicons/react/24/solid';
import { eachDayOfInterval, endOfWeek, format, startOfWeek, add } from 'date-fns';
import { HabitWithEntries } from '@/types/Habit';
import HabitDateInputModal from '@/components/dashboard/habit-date-input-modal';
import HabitPopover from '@/components/dashboard/habit-popover';
import AddCategoryDrawer from '@/components/dashboard/add-category-drawer';
import DashboardLayout from '@/components/layouts/DashboardLayout';
import AddHabitDrawer from '@/components/features/habits/drawers/add-habit-drawer';

const habits: HabitWithEntries[] = Array.from({ length: 5 }, (_, i) => {
    const currentDate = new Date();
    return {
        id: i + 1,
        slug: `habit-${i + 1}`,
        name: `Habit ${i + 1}`,
        description: `Description for Habit ${i + 1}`,
        total_missed: 0,
        total_missed_last_week: 0,
        category_id: `${i + 1}`,
        category: {
            id: i + 1,
            name: `Category ${i + 1}`,
            color: `#${Math.floor(Math.random() * 16777215).toString(16)}`,
            icon: null,
            created_at: currentDate.toISOString(),
            updated_at: currentDate.toISOString()
        },
        entries: Array.from({ length: 10 }, (_, j) => {
            const entryDate = new Date();
            entryDate.setDate(currentDate.getDate() - j);
            return {
                id: j + 1,
                entry: Math.floor(Math.random() * 10),
                habit_id: i + 1,
                note: `Note ${j + 1}`,
                date: entryDate.toISOString(),
                created_at: entryDate.toISOString(),
                updated_at: entryDate.toISOString(),
            };
        }),
        entry_type: "number",
        user_id: 1,
        updated_at: currentDate.toISOString(),
        created_at: currentDate.toISOString(),
    };
});

const DashboardPage = () => {
    const openAddHabitDrawer = useAppStore(state => state.openAddHabitDrawer);
    const openHabitDateInputModal = useAppStore(state => state.openHabitDateInputModal);
    const setSelectedHabitToInput = useAppStore(state => state.setSelectedHabitToInput);

    const [currentWeek, setCurrentWeek] = useState<number>(0);
    const daysOfWeek = useMemo(() => eachDayOfInterval({
        start: add(startOfWeek(new Date(), { weekStartsOn: 0 }), { days: currentWeek * 7 }),
        end: add(endOfWeek(new Date(), { weekStartsOn: 0 }), { days: currentWeek * 7 }),
    }), [currentWeek]);

    const getSquareColor = (habit: HabitWithEntries, date: Date) => {
        const entry = habit.entries.find(
            entry =>
                format(new Date(entry.date), 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd')
        );
        if (entry) {
            return entry.entry > 0 ? '#dc2626' : `${habit.category.color}`;
        }
        return '#52525b';
    }

    return (
        <DashboardLayout>
            <div className="flex justify-end w-full">
                <Button onClick={() => openAddHabitDrawer(true)}>Add Habit</Button>
            </div>

            <div className='flex justify-center items-center space-x-8 mb-16'>
                <button
                    type="button"
                    className='h-12 w-12 hover:border hover:border-secondary-content hover:bg-base-300 rounded-full flex items-center justify-center'
                    onClick={() => setCurrentWeek((week) => week > 0 ? week - 1 : week)}
                >
                    <ArrowLongLeftIcon className='h-8 w-8' />
                </button>

                <div className="text-lg font-medium">
                    {`${format(daysOfWeek[0], "PP")} - ${format(daysOfWeek[6], "PP")}`}
                </div>

                <button
                    type="button"
                    className='h-12 w-12 hover:border hover:border-secondary-content hover:bg-base-00 rounded-full flex items-center justify-center'
                    onClick={() => setCurrentWeek((week) => week + 1)}
                >
                    <ArrowLongRightIcon className='h-8 w-8' />
                </button>
            </div>

            <div className="max-w-4xl mx-auto my-10">
                <div className="grid grid-cols-12 gap-6 place-items-center">
                    <div className="col-span-4"></div>
                    {
                        daysOfWeek.map((item, index) => (
                            <div key={`day-of-week-${item.toString()}`}>
                                <div className='text-center text-sm'>{format(item, 'EEE')}</div>
                                <div className='text-center text-xs text-gray-400'>{format(item, 'd/M')}</div>
                            </div>
                        ))
                    }
                    <div></div>

                    {
                        habits.map((habit, index) =>
                            <Fragment key={`habit-${index}`}>
                                <div className="col-span-4">
                                    <HabitPopover habit={habit} />
                                </div>
                                {
                                    daysOfWeek.map((item, index) => (
                                        <div
                                            key={`day-of-week-habit-${item.toString()}-${habit.id}`}
                                            className={`h-7 w-7 rounded-md `}
                                            onClick={() => {
                                                openHabitDateInputModal(true);
                                                setSelectedHabitToInput(habit, format(item, 'yyyy-MM-dd'));
                                            }}
                                            style={{ backgroundColor: getSquareColor(habit, item) }}
                                        >
                                        </div>
                                    ))
                                }
                                <div></div>
                            </Fragment>
                        )
                    }
                </div>
            </div>

            <AddHabitDrawer />
            <AddCategoryDrawer />
            <HabitDateInputModal />
        </DashboardLayout>
    )
}

export default DashboardPage