import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import useBoundedStore from "@/store/store";

const HabitDateInputModal = () => {
    const habitDateInputModalOpen = useBoundedStore(state => state.habitDateInputModalOpen);
    const openHabitDateInputModal = useBoundedStore(state => state.openHabitDateInputModal);

    return (
        <Dialog open={habitDateInputModalOpen} onOpenChange={openHabitDateInputModal}>
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

export default HabitDateInputModal;