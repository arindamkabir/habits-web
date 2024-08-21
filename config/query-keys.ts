import { HabitEntryListRequest } from "@/hooks/queries/use-get-habit-entries";
import { HabitPieChartRequest } from "@/hooks/queries/use-get-habit-pie-chart";
import { HabitListRequest } from "@/hooks/queries/use-get-habits";
import { WeightEntryListRequest } from "@/hooks/queries/use-get-weight-entries";

export const HABIT_QUERY_KEYS = {
    all: ['habits'] as const,
    lists: () => [...HABIT_QUERY_KEYS.all, 'list'] as const,
    list: (params: HabitListRequest) => [...HABIT_QUERY_KEYS.lists(), { params }] as const,
    details: () => [...HABIT_QUERY_KEYS.all, 'detail'] as const,
    detail: (slug: string | undefined) => [...HABIT_QUERY_KEYS.details(), slug] as const,
    charts: () => [...HABIT_QUERY_KEYS.all, 'chart'] as const,
    chart: (slug: string | undefined) => [...HABIT_QUERY_KEYS.charts(), slug] as const,
    pieCharts: () => [...HABIT_QUERY_KEYS.all, 'pie-chart'] as const,
    pieChart: (params: HabitPieChartRequest) => [...HABIT_QUERY_KEYS.pieCharts(), params] as const,
};

export const HABIT_ENTRY_QUERY_KEYS = {
    all: ['habit-entries'] as const,
    lists: () => [...HABIT_ENTRY_QUERY_KEYS.all, 'list'] as const,
    list: (params: HabitEntryListRequest) => [...HABIT_ENTRY_QUERY_KEYS.lists(), { params }] as const,
    details: () => [...HABIT_ENTRY_QUERY_KEYS.all, 'detail'] as const,
    detail: (slug: string | undefined) => [...HABIT_ENTRY_QUERY_KEYS.details(), slug] as const,
};

export const WEIGHT_ENTRY_QUERY_KEYS = {
    all: ['weight-entries'] as const,
    lists: () => [...WEIGHT_ENTRY_QUERY_KEYS.all, 'list'] as const,
    list: (params: WeightEntryListRequest) => [...WEIGHT_ENTRY_QUERY_KEYS.lists(), { params }] as const,
    details: () => [...WEIGHT_ENTRY_QUERY_KEYS.all, 'detail'] as const,
    detail: (slug: string | undefined) => [...WEIGHT_ENTRY_QUERY_KEYS.details(), slug] as const,
};

export const WATER_ENTRY_QUERY_KEYS = {
    all: ['water-entries'] as const,
    lists: () => [...WATER_ENTRY_QUERY_KEYS.all, 'list'] as const,
    list: (params: WeightEntryListRequest) => [...WATER_ENTRY_QUERY_KEYS.lists(), { params }] as const,
    details: () => [...WATER_ENTRY_QUERY_KEYS.all, 'detail'] as const,
    detail: (date: string | undefined) => [...WATER_ENTRY_QUERY_KEYS.details(), date] as const,
};