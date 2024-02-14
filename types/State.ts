export type HabitState = {
    addHabitDrawerOpen: boolean;
    openAddHabitDrawer: (val: boolean) => void;
}

export type BoundedState = HabitState;