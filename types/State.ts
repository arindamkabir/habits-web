import { Habit, HabitWithEntries } from "./Habit";

export type MiscState = {
    loading: boolean;
    setLoading: (val: boolean) => void;
    clearStore: () => void;
};

export type HabitState = {
    addHabitDrawerOpen: boolean;
    editHabitDrawerOpen: boolean;
    addCategoryDrawerOpen: boolean;
    saveEntryModalOpen: boolean;
    selectedHabitToEntry: HabitWithEntries & { date: string } | null;
    habitListQueryParams: {
        search: string;
        start_date: string;
        end_date: string;
    };
    showingDates: Date[];
    openAddHabitDrawer: (val: boolean) => void;
    openEditHabitDrawer: (val: boolean) => void;
    openAddCategoryDrawer: (val: boolean) => void;
    openSaveEntryModal: (val: boolean) => void;
    setSelectedHabitToEntry: (habit: HabitWithEntries, date: string) => void;
    setHabitListQueryParams: (params: { search: string, start_date: string, end_date: string }) => void;
    setShowingDates: (dates: Date[]) => void;
    resetHabitState: () => void;
}

export type BoundedState = MiscState & HabitState;