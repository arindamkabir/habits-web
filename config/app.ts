export const timelineOptions = [
    'monthly',
    'weekly',
    'yearly',
] as const;

export type TimelineType = typeof timelineOptions[number];

export const monthOptions = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
] as const;

export type MonthType = typeof monthOptions[number];