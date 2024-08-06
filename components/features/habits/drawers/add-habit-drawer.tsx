import React from 'react';
import FormDrawer from '@/components/ui/form-drawer';
import useAppStore from '@/store/store';
import AddHabitForm from '../forms/add-habit-form';

function AddHabitDrawer() {
    const addHabitDrawerOpen = useAppStore((state) => state.addHabitDrawerOpen);
    const openAddHabitDrawer = useAppStore((state) => state.openAddHabitDrawer);

    return (
        <FormDrawer
          title="Add New Habit"
          open={addHabitDrawerOpen}
          onClose={() => openAddHabitDrawer(false)}
        >
            <AddHabitForm />
        </FormDrawer>
    );
}

export default AddHabitDrawer;
