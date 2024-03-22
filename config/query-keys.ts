import { HabitListRequest } from "@/hooks/queries/use-get-habits";

export const HABIT_QUERY_KEYS = {
    all: ['habits'] as const,
    lists: () => [...HABIT_QUERY_KEYS.all, 'list'] as const,
    list: (params: HabitListRequest) => [...HABIT_QUERY_KEYS.lists(), { params }] as const,
    details: () => [...HABIT_QUERY_KEYS.all, 'detail'] as const,
    detail: (slug: string | undefined) => [...HABIT_QUERY_KEYS.details(), slug] as const,
};