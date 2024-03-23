import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import useAppStore from "@/store/store";

const AddEntryModal = () => {
    const addEntryModalOpen = useAppStore(state => state.addEntryModalOpen);
    const openAddEntryModal = useAppStore(state => state.openAddEntryModal);

    return (
        <Dialog open={addEntryModalOpen} onOpenChange={openAddEntryModal}>
            {/* <DialogTrigger></DialogTrigger> */}
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Are you absolutely sure?</DialogTitle>
                    <DialogDescription>
                        This action cannot be undone. This will permanently delete your account
                        and remove your data from our servers.
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}

export default AddEntryModal;