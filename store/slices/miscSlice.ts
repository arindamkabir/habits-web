import { BoundedState, MiscState } from "@/types/State";
import { StateCreator } from "zustand";

const initialState = {
    loading: false
}

const createMiscSlice: StateCreator<
    BoundedState,
    [],
    [],
    MiscState
> = (set, get) => ({
    ...initialState,
    setLoading(val) {
        set({ loading: val });
    },
    clearStore() {
        get().resetHabitState();
    }
});

export default createMiscSlice;