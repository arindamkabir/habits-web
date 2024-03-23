import { Habit } from "./Habit";

export type MiscState = {
    loading: boolean;
    setLoading: (val: boolean) => void;
    clearStore: () => void;
};

export type HabitState = {
    addHabitDrawerOpen: boolean;
    addCategoryDrawerOpen: boolean;
    addEntryModalOpen: boolean;
    selectedHabitToEntry: Habit & { date: string } | null;
    habitListQueryParams: {
        search: string;
        start_data?: string;
        end_date?: string;
    };
    showingDates: Date[];
    openAddHabitDrawer: (val: boolean) => void;
    openAddCategoryDrawer: (val: boolean) => void;
    openAddEntryModal: (val: boolean) => void;
    setSelectedHabitToEntry: (habit: Habit, date: string) => void;
    setHabitListSearch: (search: string) => void;
    setShowingDates: (dates: Date[]) => void;
    resetHabitState: () => void;
}

export type BoundedState = MiscState & HabitState;