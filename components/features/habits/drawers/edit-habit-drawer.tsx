import React from 'react';
import FormDrawer from '@/components/ui/form-drawer';
import useAppStore from '@/store/store';
// import EditHabitForm from '../forms/edit-habit-form';

function EditHabitDrawer() {
    const editHabitDrawerOpen = useAppStore((state) => state.editHabitDrawerOpen);
    const openEditHabitDrawer = useAppStore((state) => state.openEditHabitDrawer);

    return (
        <FormDrawer
          title="Edit Habit"
          open={editHabitDrawerOpen}
          onClose={() => openEditHabitDrawer(false)}
        >
            {/* <EditHabitForm /> */}
        </FormDrawer>
    );
}

export default EditHabitDrawer;
