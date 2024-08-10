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