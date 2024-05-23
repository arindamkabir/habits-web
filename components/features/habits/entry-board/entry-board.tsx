import { Fragment } from 'react'
import DateRangeSelect from './date-range-select'
import useAppStore from '@/store/store';
import EntrySquare from './entry-square';
import HabitPopover from '@/components/features/habits/modals/habit-popover';
import { format } from 'date-fns';
import { useGetAllHabits } from '@/hooks/queries/use-get-all-habits';

const EntryBoard = () => {
    const showingDates = useAppStore(state => state.showingDates);
    const habitListQueryParams = useAppStore(state => state.habitListQueryParams);

    const { data: habitListResponse } = useGetAllHabits(habitListQueryParams);

    return (
        <div>
            <div className="mb-16">
                <DateRangeSelect />
            </div>

            <div className="max-w-4xl mx-auto my-10">
                <div className="grid grid-cols-12 gap-6 place-items-center">
                    <div className="col-span-4"></div>
                    {
                        showingDates.map((item) => (
                            <div key={`day-of-week-${item.toString()}`}>
                                <div className='text-center text-sm'>{format(item, 'EEE')}</div>
                                <div className='text-center text-xs text-gray-400'>{format(item, 'd/M')}</div>
                            </div>
                        ))
                    }
                    <div></div>

                    {
                        habitListResponse?.map((habit, index) =>
                            <Fragment key={`habit-${index}`}>
                                <div className="col-span-4">
                                    <HabitPopover habit={habit} />
                                </div>
                                {
                                    showingDates.map((item) => (
                                        <EntrySquare
                                            key={`day-of-week-habit-${item.toString()}-${habit.id}`}
                                            habit={habit}
                                            date={item}
                                        >
                                        </EntrySquare>
                                    ))
                                }
                                <div></div>
                            </Fragment>
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default EntryBoard