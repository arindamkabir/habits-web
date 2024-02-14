import { BoundedState, HabitState } from "@/types/State";
import { StateCreator } from "zustand";

const createCouponSlice: StateCreator<
    BoundedState,
    [],
    [],
    HabitState
> = (set) => ({
    addHabitDrawerOpen: false,
    openAddHabitDrawer: (val: boolean) => {
        set({ addHabitDrawerOpen: val });
    }
});

export default createCouponSlice;