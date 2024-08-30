import { Entry } from "./Entry";
import { Habit } from "./Habit";

export type MiscState = {
    loading: boolean;
    setLoading: (val: boolean) => void;
    clearStore: () => void;
};

export type HabitState = {
    addHabitModalOpen: boolean;
    editHabitDrawerOpen: boolean;
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
    openEditHabitDrawer: (val: boolean) => void;
    openAddCategoryDrawer: (val: boolean) => void;
    openSaveEntryModal: (val: boolean) => void;
    setSelectedHabitToEntry: (habit: Habit, date: string, entry?: Entry,) => void;
    setHabitListQueryParams: (params: { search: string, start_date: string, end_date: string }) => void;
    setShowingDates: (dates: Date[]) => void;
    resetHabitState: () => void;
}

export type BoundedState = MiscState & HabitState;