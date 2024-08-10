import { MONTH_OPTIONS } from "./app";

export const DEFAULT_HABIT_CALENDAR_MONTH = () => MONTH_OPTIONS[new Date().getMonth()];

export const DEFAULT_HABIT_CALENDAR_YEAR = () => new Date().getFullYear();

export const DEFAULT_HABIT_PIE_CHART_PERIOD = 'month' as const;