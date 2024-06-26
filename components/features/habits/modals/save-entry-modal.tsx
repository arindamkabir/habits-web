import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import useAppStore from "@/store/store";
import SaveEntryForm from "../forms/save-entry-form";

const SaveEntryModal = () => {
    const saveEntryModalOpen = useAppStore(state => state.saveEntryModalOpen);
    const openSaveEntryModal = useAppStore(state => state.openSaveEntryModal);

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

export default SaveEntryModal;