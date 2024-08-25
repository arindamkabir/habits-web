import { HabitChartRequest } from "@/hooks/queries/habits/use-get-habit-chart";
import { HabitEntryListRequest } from "@/hooks/queries/habits/use-get-habit-entries";
import { HabitPieChartRequest } from "@/hooks/queries/habits/use-get-habit-pie-chart";
import { HabitListRequest } from "@/hooks/queries/habits/use-get-habits";
import { WaterBarChartRequest } from "@/hooks/queries/health/water/use-get-water-bar-chart";
import { WeightChartRequest } from "@/hooks/queries/health/weight/use-get-weight-chart";
import { WeightEntryListRequest } from "@/hooks/queries/health/weight/use-get-weight-entries";

export const HABIT_QUERY_KEYS = {
    all: ['habits'] as const,
    lists: () => [...HABIT_QUERY_KEYS.all, 'list'] as const,
    list: (params: HabitListRequest) => [...HABIT_QUERY_KEYS.lists(), { params }] as const,
    details: () => [...HABIT_QUERY_KEYS.all, 'detail'] as const,
    detail: (slug: string | undefined) => [...HABIT_QUERY_KEYS.details(), slug] as const,
    charts: () => [...HABIT_QUERY_KEYS.all, 'chart'] as const,
    chart: (slug: HabitChartRequest) => [...HABIT_QUERY_KEYS.charts(), slug] as const,
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
    charts: () => [...WEIGHT_ENTRY_QUERY_KEYS.all, 'chart'] as const,
    chart: (params: WeightChartRequest) => [...WEIGHT_ENTRY_QUERY_KEYS.charts(), params] as const,
};

export const WATER_ENTRY_QUERY_KEYS = {
    all: ['water-entries'] as const,
    lists: () => [...WATER_ENTRY_QUERY_KEYS.all, 'list'] as const,
    list: (params: WeightEntryListRequest) => [...WATER_ENTRY_QUERY_KEYS.lists(), { params }] as const,
    details: () => [...WATER_ENTRY_QUERY_KEYS.all, 'detail'] as const,
    detail: (date: string | undefined) => [...WATER_ENTRY_QUERY_KEYS.details(), date] as const,
    charts: () => [...WATER_ENTRY_QUERY_KEYS.all, 'chart'] as const,
    chart: (params: WaterBarChartRequest) => [...WATER_ENTRY_QUERY_KEYS.charts(), params] as const,
};