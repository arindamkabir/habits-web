import { ChartTimelineType } from "@/config/app";
import { HABIT_QUERY_KEYS } from "@/config/query-keys";
import axios from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

export type HabitPieChartRequest = {
    slug: string;
    time_period: ChartTimelineType;
}

export type HabitPieChartResponse = {
    data: Record<string, string>[];
};

const fetchHabitPieChart = async (params: HabitPieChartRequest): Promise<HabitPieChartResponse> => {
    const { slug, ...otherParams } = params;

    const response = await axios.get(`/api/habits/pie-chart/${slug}`, {
        params: otherParams
    });
    return response.data;
};

export const useGetHabitPieChart = (params: HabitPieChartRequest) => {
    return useQuery<HabitPieChartResponse, Error>({
        queryKey: HABIT_QUERY_KEYS.pieChart(params),
        queryFn: () => {
            return fetchHabitPieChart(params);
        }
    });
};

export const habitPieChartPrefetchQuery = (params: HabitPieChartRequest) => {
    return {
        queryFn: () => {
            return fetchHabitPieChart(params);
        },
        queryKey: HABIT_QUERY_KEYS.pieChart(params),
    };
}