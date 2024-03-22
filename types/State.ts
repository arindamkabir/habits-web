import { IHabit } from "./Habit";

export type MiscState = {
    loading: boolean;
    setLoading: (val: boolean) => void;
    clearStore: () => void;
};

export type HabitState = {
    addHabitDrawerOpen: boolean;
    addCategoryDrawerOpen: boolean;
    habitDateInputModalOpen: boolean;
    selectedHabitToInput: IHabit & { date: string } | null;
    openAddHabitDrawer: (val: boolean) => void;
    openAddCategoryDrawer: (val: boolean) => void;
    openHabitDateInputModal: (val: boolean) => void;
    setSelectedHabitToInput: (habit: IHabit, date: string) => void;
    resetHabitState: () => void;
}

export type BoundedState = MiscState & HabitState;