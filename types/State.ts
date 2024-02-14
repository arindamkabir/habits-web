import { IHabit } from "./habit/Habit";

export type HabitState = {
    addHabitDrawerOpen: boolean;
    habitDateInputModalOpen: boolean;
    selectedHabitToInput: IHabit & { date: string } | null;
    openAddHabitDrawer: (val: boolean) => void;
    openHabitDateInputModal: (val: boolean) => void;
    setSelectedHabitToInput: (habit: IHabit, date: string) => void;
}

export type BoundedState = HabitState;