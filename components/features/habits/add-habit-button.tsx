import React from 'react';
import { Button } from '@/components/ui/button';
import useAppStore from '@/store/store';

function AddHabitButton() {
    const openAddHabitDrawer = useAppStore((state) => state.openAddHabitDrawer);

    return (
        <Button type="button" onClick={() => openAddHabitDrawer(true)}>Add Habit</Button>
    );
}

export default AddHabitButton;
