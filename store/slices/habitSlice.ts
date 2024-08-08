import { BoundedState, HabitState } from "@/types/State";
import { eachDayOfInterval, endOfWeek, format, startOfWeek } from "date-fns";
import { StateCreator } from "zustand";

const initialState = {
    addHabitDrawerOpen: false,
    addCategoryDrawerOpen: false,
    editHabitDrawerOpen: false,
    saveEntryModalOpen: false,
    selectedHabitToEntry: null,
    showingDates: eachDayOfInterval({
        start: startOfWeek(new Date(), { weekStartsOn: 0 }),
        end: endOfWeek(new Date(), { weekStartsOn: 0 }),
    }),
    habitListQueryParams: {
        search: "",
        start_date: format(startOfWeek(new Date(), { weekStartsOn: 0 }), 'yyyy-MM-dd'),
        end_date: format(endOfWeek(new Date(), { weekStartsOn: 0 }), 'yyyy-MM-dd')
    },
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
    openEditHabitDrawer: (val: boolean) => {
        set({ editHabitDrawerOpen: val });
    },
    openSaveEntryModal: (val: boolean) => {
        set({ saveEntryModalOpen: val });
    },
    openAddCategoryDrawer: (val: boolean) => {
        set({ addCategoryDrawerOpen: val });
    },
    setSelectedHabitToEntry: (habit, date, entry) => {
        set({ selectedHabitToEntry: { habit, currentEntry: entry, date } });
    },
    setHabitListQueryParams(params) {
        set((state) => {
            return {
                habitListQueryParams: {
                    ...state.habitListQueryParams,
                    ...params
                }
            }
        });
    },
    setShowingDates(dates) {
        set((state) => {
            return {
                showingDates: dates,
                habitListQueryParams: {
                    ...state.habitListQueryParams,
                    start_date: format(dates[0], 'yyyy-MM-dd'),
                    end_date: format(dates[6], 'yyyy-MM-dd')
                }
            }
        });
    },
    resetHabitState() {
        set(() => initialState);
    }
});

export default createHabitSlice;