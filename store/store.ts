import { BoundedState } from "@/types/State";
import { create } from "zustand";
import createHabitSlice from "./slices/habitSlice";

const useAppStore = create<BoundedState>()((...a) => ({
    ...createHabitSlice(...a)
}));

export default useAppStore;
