import { BoundedState } from "@/types/State";
import { create } from "zustand";
import createHabitSlice from "./slices/habitSlice";

const useBoundedStore = create<BoundedState>()((...a) => ({
    ...createHabitSlice(...a)
}));

export default useBoundedStore;
