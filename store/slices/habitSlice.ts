import { BoundedState, HabitState } from "@/types/State";
import { StateCreator } from "zustand";

const createCouponSlice: StateCreator<
    BoundedState,
    [],
    [],
    HabitState
> = (set) => ({
    addHabitDrawerOpen: false,
    openHabitDrawer: (val: boolean) => {
        set({ addHabitDrawerOpen: val });
    }
});

export default createCouponSlice;