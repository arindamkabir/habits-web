import { ChartTimelineType } from "@/config/app";
import { WEIGHT_ENTRY_QUERY_KEYS } from "@/config/query-keys";
import axios from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

export type WeightChartRequest = {
    time_period: ChartTimelineType;
}

export type WeightChartResponse = {
    data: Record<string, string>[];
};

const fetchWeightChart = async (params: WeightChartRequest) => {
    const response = await axios.get(`/api/health/weight/chart`, {
        params
    });
    return response.data;
};

export const useGetWeightChart = (params: WeightChartRequest) => {
    return useQuery<WeightChartResponse, Error>({
        queryKey: WEIGHT_ENTRY_QUERY_KEYS.chart(params),
        queryFn: () => {
            return fetchWeightChart(params);
        }
    });
};

export const weightChartPrefetchQuery = (params: WeightChartRequest) => {
    return {
        queryFn: () => {
            return fetchWeightChart(params);
        },
        queryKey: WEIGHT_ENTRY_QUERY_KEYS.chart(params),
    };
}