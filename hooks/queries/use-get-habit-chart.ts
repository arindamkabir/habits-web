import { HABIT_QUERY_KEYS } from "@/config/query-keys";
import axios from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

export type HabitChartRequest = {
    slug: string;
}

export type HabitChartResponse = {
    data: Record<string, string>[];
};

const fetchHabitChart = async (slug: string): Promise<HabitChartResponse> => {
    const response = await axios.get<HabitChartResponse>(`/api/habits/chart/${slug}`);
    return response.data;
};

export const useGetHabitChart = ({ slug }: HabitChartRequest) => {
    return useQuery<HabitChartResponse, Error>({
        queryKey: HABIT_QUERY_KEYS.chart(slug),
        queryFn: () => {
            return fetchHabitChart(slug);
        }
    });
};

export const habitChartPrefetchQuery = ({ slug }: HabitChartRequest) => {
    return {
        queryFn: () => {
            return fetchHabitChart(slug);
        },
        queryKey: HABIT_QUERY_KEYS.chart(slug),
    };
}