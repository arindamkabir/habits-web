import { Button } from '@/components/ui/button'
import useAppStore from '@/store/store';
import React from 'react'

const AddHabitButton = () => {
    const openAddHabitDrawer = useAppStore(state => state.openAddHabitDrawer);

    return (
        <Button onClick={() => openAddHabitDrawer(true)}>Add Habit</Button>
    )
}

export default AddHabitButton