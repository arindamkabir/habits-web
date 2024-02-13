export type HabitState = {
    addHabitDrawerOpen: boolean;
    openHabitDrawer: (val: boolean) => void;
}

export type BoundedState = HabitState;