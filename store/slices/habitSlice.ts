import { BoundedState, HabitState } from "@/types/State";
import { StateCreator } from "zustand";

const createCouponSlice: StateCreator<
    BoundedState,
    [],
    [],
    HabitState
> = (set) => ({
    addHabitDrawerOpen: false,
    habitDateInputModalOpen: false,
    selectedHabitToInput: null,
    openAddHabitDrawer: (val: boolean) => {
        set({ addHabitDrawerOpen: val });
    },
    openHabitDateInputModal: (val: boolean) => {
        set({ habitDateInputModalOpen: val });
    },
    setSelectedHabitToInput: (habit, date) => {
        set({ selectedHabitToInput: { ...habit, date: date } });
    }
});

export default createCouponSlice;