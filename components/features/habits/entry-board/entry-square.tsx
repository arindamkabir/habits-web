import useAppStore from '@/store/store';
import { HabitWithEntries } from '@/types/Habit';
import { format } from 'date-fns';
import React, { FC, useMemo } from 'react'

type Props = {
    habit: HabitWithEntries;
    date: Date;
}

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

const EntrySquare: FC<Props> = ({ habit, date }) => {
    const openSaveEntryModal = useAppStore(state => state.openSaveEntryModal);
    const setSelectedHabitToEntry = useAppStore(state => state.setSelectedHabitToEntry);

    const bgColor = useMemo(() => getSquareColor(habit, date), [habit, date]);

    return (
        <div
            className={`h-7 w-7 rounded-md `}
            onClick={() => {
                openSaveEntryModal(true);
                setSelectedHabitToEntry(habit, format(date, 'yyyy-MM-dd'));
            }}
            style={{ backgroundColor: bgColor }}
        >
        </div>
    )
}

export default EntrySquare