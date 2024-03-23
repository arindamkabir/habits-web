import { HabitWithEntries } from '@/types/Habit';
import AddEntryModal from '@/components/features/habits/modals/add-entry-modal';
import AddCategoryDrawer from '@/components/dashboard/add-category-drawer';
import DashboardLayout from '@/components/layouts/DashboardLayout';
import AddHabitButton from '@/components/features/habits/add-habit-button';
import AddHabitDrawer from '@/components/features/habits/drawers/add-habit-drawer';
import EntryBoard from '@/components/features/habits/entry-board/entry-board';

const habits: HabitWithEntries[] = Array.from({ length: 5 }, (_, i) => {
    const currentDate = new Date();
    return {
        id: i + 1,
        slug: `habit-${i + 1}`,
        name: `Habit ${i + 1}`,
        description: `Description for Habit ${i + 1}`,
        total_missed: 0,
        total_missed_last_week: 0,
        category_id: `${i + 1}`,
        category: {
            id: i + 1,
            name: `Category ${i + 1}`,
            color: `#${Math.floor(Math.random() * 16777215).toString(16)}`,
            icon: null,
            created_at: currentDate.toISOString(),
            updated_at: currentDate.toISOString()
        },
        entries: Array.from({ length: 10 }, (_, j) => {
            const entryDate = new Date();
            entryDate.setDate(currentDate.getDate() - j);
            return {
                id: j + 1,
                entry: Math.floor(Math.random() * 10),
                habit_id: i + 1,
                note: `Note ${j + 1}`,
                date: entryDate.toISOString(),
                created_at: entryDate.toISOString(),
                updated_at: entryDate.toISOString(),
            };
        }),
        entry_type: "number",
        user_id: 1,
        updated_at: currentDate.toISOString(),
        created_at: currentDate.toISOString(),
    };
});

const HabitsPage = () => {


    return (
        <DashboardLayout>
            <div className="flex justify-end w-full">
                <AddHabitButton />
            </div>

            <EntryBoard />

            <AddHabitDrawer />
            <AddCategoryDrawer />
            <AddEntryModal />
        </DashboardLayout>
    )
}

export default HabitsPage