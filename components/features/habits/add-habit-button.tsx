import { Button } from '@/components/ui/button'
import useAppStore from '@/store/store';
import React from 'react'
import AddHabitDrawer from './drawers/add-habit-drawer';

const AddHabitButton = () => {
    const openAddHabitDrawer = useAppStore(state => state.openAddHabitDrawer);

    return (
        <>
            <Button onClick={() => openAddHabitDrawer(true)}>Add Habit</Button>
            <AddHabitDrawer />
        </>
    )
}

export default AddHabitButton