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
};

export const WEIGHT_ENTRY_QUERY_KEYS = {
    all: ['weight-entries'] as const,
    lists: () => [...WEIGHT_ENTRY_QUERY_KEYS.all, 'list'] as const,
    list: (params: WeightEntryListRequest) => [...WEIGHT_ENTRY_QUERY_KEYS.lists(), { params }] as const,
    details: () => [...WEIGHT_ENTRY_QUERY_KEYS.all, 'detail'] as const,
    detail: (slug: string | undefined) => [...WEIGHT_ENTRY_QUERY_KEYS.details(), slug] as const,
};