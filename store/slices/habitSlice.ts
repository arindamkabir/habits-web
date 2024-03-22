import { BoundedState, HabitState } from "@/types/State";
import { StateCreator } from "zustand";

const initialState = {
    addHabitDrawerOpen: false,
    addCategoryDrawerOpen: false,
    habitDateInputModalOpen: false,
    selectedHabitToInput: null,
    habitListQueryParams: {
        search: ""
    }
};

const createHabitSlice: StateCreator<
    BoundedState,
    [],
    [],
    HabitState
> = (set) => ({
    ...initialState,
    openAddHabitDrawer: (val: boolean) => {
        set({ addHabitDrawerOpen: val });
    },
    openHabitDateInputModal: (val: boolean) => {
        set({ habitDateInputModalOpen: val });
    },
    openAddCategoryDrawer: (val: boolean) => {
        set({ addCategoryDrawerOpen: val });
    },
    setSelectedHabitToInput: (habit, date) => {
        set({ selectedHabitToInput: { ...habit, date: date } });
    },
    setHabitListSearch: (search) => {
        set((state) => {
            return {
                habitListQueryParams: {
                    ...state.habitListQueryParams,
                    search: search
                }
            };
        });
    },
    resetHabitState() {
        set((state) => initialState);
    }
});

export default createHabitSlice;