import { add, eachDayOfInterval } from "date-fns";
import { MONTH_OPTIONS, chartTimelineWithLabels } from "./app";

export const DEFAULT_HABIT_LIST_DATES = eachDayOfInterval({
    start: add(Date.now(), { days: -6 }),
    end: Date.now(),
});

export const DEFAULT_HABIT_CALENDAR_MONTH = () => MONTH_OPTIONS[new Date().getMonth()];

export const DEFAULT_HABIT_CALENDAR_YEAR = () => new Date().getFullYear();

export const DEFAULT_HABIT_BAR_CHART_TIMELINE = chartTimelineWithLabels[0];

export const DEFAULT_HABIT_PIE_CHART_PERIOD = 'month' as const;