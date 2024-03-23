import { Habit } from "./Habit";

export type MiscState = {
    loading: boolean;
    setLoading: (val: boolean) => void;
    clearStore: () => void;
};

export type HabitState = {
    addHabitDrawerOpen: boolean;
    addCategoryDrawerOpen: boolean;
    habitDateInputModalOpen: boolean;
    selectedHabitToInput: Habit & { date: string } | null;
    habitListQueryParams: {
        search: string;
        start_data?: string;
        end_date?: string;
    };
    openAddHabitDrawer: (val: boolean) => void;
    openAddCategoryDrawer: (val: boolean) => void;
    openHabitDateInputModal: (val: boolean) => void;
    setSelectedHabitToInput: (habit: Habit, date: string) => void;
    setHabitListSearch: (search: string) => void;
    resetHabitState: () => void;
}

export type BoundedState = MiscState & HabitState;