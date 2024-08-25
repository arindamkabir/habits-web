import { ChartTimelineType } from "@/config/app";
import { WATER_ENTRY_QUERY_KEYS } from "@/config/query-keys";
import axios from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

export type WaterBarChartRequest = {
    time_period: ChartTimelineType;
}

export type WaterBarChartResponse = {
    data: Record<string, string>[];
};

const fetchWaterBarChart = async (params: WaterBarChartRequest) => {
    const response = await axios.get(`/api/health/water/chart`, {
        params
    });
    return response.data;
};

export const useGetWaterBarChart = (params: WaterBarChartRequest) => {
    return useQuery<WaterBarChartResponse, Error>({
        queryKey: WATER_ENTRY_QUERY_KEYS.chart(params),
        queryFn: () => {
            return fetchWaterBarChart(params);
        }
    });
};

export const waterBarChartPrefetchQuery = (params: WaterBarChartRequest) => {
    return {
        queryFn: () => {
            return fetchWaterBarChart(params);
        },
        queryKey: WATER_ENTRY_QUERY_KEYS.chart(params),
    };
}