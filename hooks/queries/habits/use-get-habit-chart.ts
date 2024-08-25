import { ChartTimelineType } from "@/config/app";
import { HABIT_QUERY_KEYS } from "@/config/query-keys";
import axios from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

export type HabitChartRequest = {
    slug: string;
    time_period: ChartTimelineType;
}

export type HabitChartResponse = {
    data: Record<string, string>[];
};

const fetchHabitChart = async (params: HabitChartRequest): Promise<HabitChartResponse> => {
    const { slug, ...otherParams } = params;
    const response = await axios.get<HabitChartResponse>(`/api/habits/chart/${slug}`, {
        params: otherParams
    });
    return response.data;
};

export const useGetHabitChart = (params: HabitChartRequest) => {
    return useQuery<HabitChartResponse, Error>({
        queryKey: HABIT_QUERY_KEYS.chart(params),
        queryFn: () => {
            return fetchHabitChart(params);
        }
    });
};

export const habitChartPrefetchQuery = (params: HabitChartRequest) => {
    return {
        queryFn: () => {
            return fetchHabitChart(params);
        },
        queryKey: HABIT_QUERY_KEYS.chart(params),
    };
}