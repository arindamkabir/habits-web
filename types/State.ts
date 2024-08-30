import { Entry } from "./Entry";
import { Habit } from "./Habit";

export type MiscState = {
    loading: boolean;
    setLoading: (val: boolean) => void;
    clearStore: () => void;
};

export type HabitState = {
    addHabitModalOpen: boolean;
    editHabitModalOpen: boolean;
    editingHabit: Habit | null;
    addCategoryDrawerOpen: boolean;
    saveEntryModalOpen: boolean;
    selectedHabitToEntry: {
        habit: Habit;
        currentEntry?: Entry
        date: string;
    } | null;
    habitListQueryParams: {
        search: string;
        start_date: string;
        end_date: string;
    };
    showingDates: Date[];
    openAddHabitModal: (val: boolean) => void;
    openEditHabitModal: (val: boolean) => void;
    setEditingHabit: (habit: Habit) => void;
    openAddCategoryDrawer: (val: boolean) => void;
    openSaveEntryModal: (val: boolean) => void;
    setSelectedHabitToEntry: (habit: Habit, date: string, entry?: Entry,) => void;
    setHabitListQueryParams: (params: { search: string, start_date: string, end_date: string }) => void;
    setShowingDates: (dates: Date[]) => void;
    resetHabitState: () => void;
}

export type BoundedState = MiscState & HabitState;