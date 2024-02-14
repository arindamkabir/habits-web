import FormDrawer from '@/components/ui/form-drawer'
import useBoundedStore from '@/store/store';
import React from 'react'
import AddHabitForm from '../forms/add-habit-form';

const AddHabitDrawer = () => {
    const addHabitDrawerOpen = useBoundedStore(state => state.addHabitDrawerOpen);
    const openAddHabitDrawer = useBoundedStore(state => state.openAddHabitDrawer);

    return (
        <FormDrawer
            title={"Add New Habit"}
            open={addHabitDrawerOpen}
            onClose={() => openAddHabitDrawer(false)}
        >
            <AddHabitForm />
        </FormDrawer>
    )
}

export default AddHabitDrawer