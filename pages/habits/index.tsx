import { PlusIcon } from 'lucide-react';
import { useEffect } from 'react';
import AddHabitDrawer from '@/components/features/habits/drawers/add-habit-drawer';
import { HabitCard } from '@/components/features/habits/habit-card';
import DashboardLayout from '@/components/layouts/DashboardLayout';
import { Button } from '@/components/ui/button';
import { useGetHabitList } from '@/hooks/queries/habits/use-get-habits';
import useAppStore from '@/store/store';
import SaveEntryModal from '@/components/features/habits/modals/save-entry-modal';
import { DEFAULT_HABIT_LIST_DATES } from '@/config/habits';
import { formatDate } from 'date-fns';

const HabitsPage = () => {
    const setLoading = useAppStore((state) => state.setLoading);
    const openAddHabitDrawer = useAppStore((state) => state.openAddHabitDrawer);

    const { data: habitsList, isFetching } = useGetHabitList({
        start_date: formatDate(DEFAULT_HABIT_LIST_DATES[0], 'yyyy-MM-dd'),
        end_date: formatDate(DEFAULT_HABIT_LIST_DATES[DEFAULT_HABIT_LIST_DATES.length - 1], 'yyyy-MM-dd'),
    });

    useEffect(() => {
        setLoading(isFetching);
    }, [isFetching, setLoading]);

    return (
        <DashboardLayout header="Habits">
            <div className="flex justify-end mb-6">
                <Button
                    variant="secondary"
                    onClick={() => openAddHabitDrawer(true)}
                >
                    <PlusIcon className="h-5 w-5" />
                </Button>
            </div>
            <div className="space-y-2.5">
                {
                    !isFetching && habitsList?.data.map((habit) => (
                        <HabitCard
                            key={habit.id}
                            habit={habit}
                            dates={DEFAULT_HABIT_LIST_DATES}
                        />
                    ))
                }
                {
                    !isFetching && habitsList?.data.length === 0 && (
                        <div className="space-y-4">
                            <h1 className="text-center text-lg text-gray-500 dark:text-gray-300">
                                No habits found.
                            </h1>
                            <h1 className="text-center text-gray-500 dark:text-gray-400">
                                Add a habit to get started.
                            </h1>
                        </div>
                    )
                }
            </div>
            <AddHabitDrawer />
            <SaveEntryModal />
        </DashboardLayout>
    );
}

export default HabitsPage;
