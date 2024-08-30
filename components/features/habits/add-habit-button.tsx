import React from 'react';
import { Button } from '@/components/ui/button';
import useAppStore from '@/store/store';

function AddHabitButton() {
    const openAddHabitModal = useAppStore((state) => state.openAddHabitModal);

    return (
        <Button type="button" onClick={() => openAddHabitModal(true)}>Add Habit</Button>
    );
}

export default AddHabitButton;
