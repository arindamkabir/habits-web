import React from 'react';
import useAppStore from '@/store/store';
import AddHabitForm from '../forms/add-habit-form';
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

function AddHabitModal() {
    const isDesktop = useMediaQuery('(min-width: 768px)');

    const addHabitModalOpen = useAppStore((state) => state.addHabitModalOpen);
    const openAddHabitModal = useAppStore((state) => state.openAddHabitModal);

    if (isDesktop) {
        return (
            <Dialog open={addHabitModalOpen} onOpenChange={openAddHabitModal}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Add Habit</DialogTitle>
                    </DialogHeader>

                    <AddHabitForm />
                </DialogContent>
            </Dialog>
        );
    }

    return (
        <Drawer open={addHabitModalOpen} onOpenChange={openAddHabitModal}>
            <DrawerContent>
                <div className="mx-auto w-full max-w-sm">
                    <DrawerHeader className="text-left">
                        <DrawerTitle>Add Habit</DrawerTitle>
                        <DrawerDescription>Create a new habit which you can keep track of.</DrawerDescription>
                    </DrawerHeader>

                    <div className="px-4 pb-6">
                        <AddHabitForm />
                    </div>
                </div>
            </DrawerContent>
        </Drawer>
    );
}

export default AddHabitModal;
