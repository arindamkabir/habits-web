import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import useAppStore from "@/store/store";
import SaveEntryForm from "../forms/save-entry-form";
import { useMediaQuery } from 'usehooks-ts'
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from "@/components/ui/drawer";

const SaveEntryModal = () => {
    const isDesktop = useMediaQuery("(min-width: 768px)")

    const saveEntryModalOpen = useAppStore(state => state.saveEntryModalOpen);
    const openSaveEntryModal = useAppStore(state => state.openSaveEntryModal);

    if (isDesktop) {
        return (
            <Dialog open={saveEntryModalOpen} onOpenChange={openSaveEntryModal}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Add new entry</DialogTitle>
                    </DialogHeader>

                    <SaveEntryForm />
                </DialogContent>
            </Dialog>
        )
    }

    return (
        <Drawer open={saveEntryModalOpen} onOpenChange={openSaveEntryModal}>
            <DrawerContent>
                <DrawerHeader className="text-left">
                    <DrawerTitle>Add new entry</DrawerTitle>
                </DrawerHeader>

                <div className="px-4 pb-6">
                    <SaveEntryForm />
                </div>
            </DrawerContent>
        </Drawer>
    )
}

export default SaveEntryModal;