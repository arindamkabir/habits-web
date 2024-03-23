import { BoundedState, HabitState } from "@/types/State";
import { add, eachDayOfInterval, endOfWeek, startOfWeek } from "date-fns";
import { StateCreator } from "zustand";

const initialState = {
    addHabitDrawerOpen: false,
    addCategoryDrawerOpen: false,
    addEntryModalOpen: false,
    selectedHabitToEntry: null,
    habitListQueryParams: {
        search: ""
    },
    showingDates: eachDayOfInterval({
        start: startOfWeek(new Date(), { weekStartsOn: 0 }),
        end: endOfWeek(new Date(), { weekStartsOn: 0 }),
    }),
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
    openAddEntryModal: (val: boolean) => {
        set({ addEntryModalOpen: val });
    },
    openAddCategoryDrawer: (val: boolean) => {
        set({ addCategoryDrawerOpen: val });
    },
    setSelectedHabitToEntry: (habit, date) => {
        set({ selectedHabitToEntry: { ...habit, date: date } });
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
    setShowingDates(dates) {
        set({ showingDates: dates });
    },
    resetHabitState() {
        set((state) => initialState);
    }
});

export default createHabitSlice;