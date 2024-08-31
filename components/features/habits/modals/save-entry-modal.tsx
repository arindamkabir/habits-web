import { useMediaQuery } from 'usehooks-ts';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import useAppStore from '@/store/store';
import SaveEntryForm from '../forms/save-entry-form';
import {
    Drawer, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle,
} from '@/components/ui/drawer';
import { format } from 'date-fns';

function SaveEntryModal() {
    const isDesktop = useMediaQuery('(min-width: 768px)');

    const saveEntryModalOpen = useAppStore((state) => state.saveEntryModalOpen);
    const openSaveEntryModal = useAppStore((state) => state.openSaveEntryModal);

    const selectedHabitToEntry = useAppStore((state) => state.selectedHabitToEntry);

    if (!selectedHabitToEntry) return null;

    if (isDesktop) {
        return (
            <Dialog open={saveEntryModalOpen} onOpenChange={openSaveEntryModal}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>
                            Add Entry
                        </DialogTitle>
                        <DialogDescription>
                            {selectedHabitToEntry?.habit.name} on {format(selectedHabitToEntry?.date, 'MMM dd, yyyy')}
                        </DialogDescription>
                    </DialogHeader>

                    <SaveEntryForm />
                </DialogContent>
            </Dialog>
        );
    }

    return (
        <Drawer open={saveEntryModalOpen} onOpenChange={openSaveEntryModal}>
            <DrawerContent>
                <DrawerHeader className="text-left">
                    <DrawerTitle>
                        Add Entry
                    </DrawerTitle>
                    <DrawerDescription>
                        {selectedHabitToEntry?.habit.name} on {format(selectedHabitToEntry?.date, 'MMM dd, yyyy')}
                    </DrawerDescription>
                </DrawerHeader>

                <div className="px-4 pb-6">
                    <SaveEntryForm />
                </div>
            </DrawerContent>
        </Drawer>
    );
}

export default SaveEntryModal;
