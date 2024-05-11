import { HabitWithEntries } from '@/types/Habit';
import SaveEntryModal from '@/components/features/habits/modals/save-entry-modal';
import AddCategoryDrawer from '@/components/dashboard/add-category-drawer';
import DashboardLayout from '@/components/layouts/DashboardLayout';
import AddHabitButton from '@/components/features/habits/add-habit-button';
import AddHabitDrawer from '@/components/features/habits/drawers/add-habit-drawer';
import EntryBoard from '@/components/features/habits/entry-board/entry-board';

const HabitsPage = () => {
    return (
        <DashboardLayout>
            <div className="flex justify-end w-full">
                <AddHabitButton />
            </div>

            <EntryBoard />

            <AddHabitDrawer />
            <AddCategoryDrawer />
            <SaveEntryModal />
        </DashboardLayout>
    )
}

export default HabitsPage