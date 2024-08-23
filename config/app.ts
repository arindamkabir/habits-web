export const PAGE_LOADER_THRESHOLD = 300; // in milliseconds

export const timelineOptions = [
    'monthly',
    'weekly',
    'yearly',
] as const;

export type TimelineType = typeof timelineOptions[number];

export const chartTimelineOptions = [
    'week',
    '2weeks',
    'month',
    '3months',
    '6months',
    'year',
] as const;

export type ChartTimelineType = typeof chartTimelineOptions[number];

export const chartTimelineWithLabels: {
    label: string;
    value: ChartTimelineType;
}[] = [
        {
            label: '1W',
            value: 'week',
        },
        {
            label: '2W',
            value: '2weeks',
        },
        {
            label: '1M',
            value: 'month',
        },
        {
            label: '3M',
            value: '3months',
        },
        {
            label: '6M',
            value: '6months',
        },
        {
            label: '1Y',
            value: 'year',
        },
    ];

export const chartTimelineWithLabelsAlt: {
    label: string;
    value: ChartTimelineType;
}[] = [
        {
            label: 'This week',
            value: 'week',
        },
        {
            label: 'Last 2 weeks',
            value: '2weeks',
        },
        {
            label: 'This month',
            value: 'month',
        },
        {
            label: 'Last 3 months',
            value: '3months',
        },
        {
            label: 'Last 6 months',
            value: '6months',
        },
        {
            label: 'This year',
            value: 'year',
        },
    ];

export type ChartTimelineWithLabelsType = typeof chartTimelineWithLabels[number];

export const MONTH_OPTIONS = [
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

export type MonthType = typeof MONTH_OPTIONS[number];