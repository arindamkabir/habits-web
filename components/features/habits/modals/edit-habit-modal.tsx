import React from 'react';
import useAppStore from '@/store/store';
import { useMediaQuery } from 'usehooks-ts';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import {
    Drawer, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle,
} from '@/components/ui/drawer';
import EditHabitForm from '../forms/edit-habit-form';

const EditHabitModal = () => {
    const isDesktop = useMediaQuery('(min-width: 768px)');

    const editHabitModalOpen = useAppStore((state) => state.editHabitModalOpen);
    const openEditHabitModal = useAppStore((state) => state.openEditHabitModal);
    const editingHabit = useAppStore((state) => state.editingHabit);

    if (isDesktop) {
        return (
            <Dialog open={editHabitModalOpen} onOpenChange={openEditHabitModal}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Edit Habit</DialogTitle>
                    </DialogHeader>

                    <EditHabitForm />
                </DialogContent>
            </Dialog>
        );
    }

    return (
        <Drawer open={editHabitModalOpen} onOpenChange={openEditHabitModal}>
            <DrawerContent>
                <div className="mx-auto w-full max-w-sm">
                    <DrawerHeader className="text-left">
                        <DrawerTitle>Edit Habit</DrawerTitle>
                        <DrawerDescription>Update habit - {editingHabit?.name}.</DrawerDescription>
                    </DrawerHeader>

                    <div className="px-4 pb-6">
                        <EditHabitForm />
                    </div>
                </div>
            </DrawerContent>
        </Drawer>
    );
}

export default EditHabitModal;
