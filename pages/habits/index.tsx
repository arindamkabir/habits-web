import { HabitCard } from '@/components/features/habits/habit-card';
import DashboardLayout from '@/components/layouts/DashboardLayout';
import PageLoader from '@/components/ui/page-loader';
import { useGetHabitList } from '@/hooks/queries/use-get-habits';
import useAppStore from '@/store/store';
import { add, eachDayOfInterval, formatDate } from "date-fns"
import { useEffect } from 'react';

const dates = eachDayOfInterval({
    start: add(Date.now(), { days: -3 }),
    end: add(Date.now(), { days: 3 })
});

const startDate = formatDate(dates[0], 'yyyy-MM-dd');
const endDate = formatDate(dates[dates.length - 1], 'yyyy-MM-dd');

const HabitsPage = () => {
    const setLoading = useAppStore(state => state.setLoading);

    const { data: habitsList, isFetching } = useGetHabitList({
        start_date: startDate,
        end_date: endDate
    });

    useEffect(() => {
        setLoading(isFetching);
    }, [isFetching, setLoading]);

    return (
        <DashboardLayout header='Habits'>
            <div className="space-y-2.5">
                {
                    !isFetching && habitsList?.data.map((habit) => (
                        <HabitCard
                            key={habit.id}
                            habit={habit}
                            dates={dates}
                        />
                    ))
                }
            </div>
        </DashboardLayout>
    )
}

export default HabitsPage