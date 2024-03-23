import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import useAppStore from "@/store/store";
import AddEntryForm from "../forms/add-entry-form";

const AddEntryModal = () => {
    const addEntryModalOpen = useAppStore(state => state.addEntryModalOpen);
    const openAddEntryModal = useAppStore(state => state.openAddEntryModal);

    return (
        <Dialog open={addEntryModalOpen} onOpenChange={openAddEntryModal}>
            {/* <DialogTrigger></DialogTrigger> */}
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add new entry</DialogTitle>
                </DialogHeader>

                <AddEntryForm />
            </DialogContent>
        </Dialog>
    )
}

export default AddEntryModal;