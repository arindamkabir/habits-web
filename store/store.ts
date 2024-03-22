import { BoundedState } from "@/types/State";
import { create } from "zustand";
import createHabitSlice from "./slices/habitSlice";
import createMiscSlice from "./slices/miscSlice";

const useAppStore = create<BoundedState>()((...a) => ({
    ...createMiscSlice(...a),
    ...createHabitSlice(...a)
}));

export default useAppStore;
