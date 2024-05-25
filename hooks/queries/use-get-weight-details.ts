import axios from "@/lib/axios";
import { TWeightChartData } from "@/types/WeightEntry";
import { useQuery } from "@tanstack/react-query";

export type TWeightDetailsRequest = {
    year: string,
} | {
    start_date: string,
    end_date: string,
};

export type TWeightDetailsResponse = {
    data: TWeightChartData;
};

const fetchWeightDetails = async (params: TWeightDetailsRequest): Promise<TWeightDetailsResponse> => {
    const response = await axios.get<TWeightDetailsResponse>(`/api/health/weight-entries/details`, { params: params });
    return response.data;
};

export const useGetWeightDetails = (params: TWeightDetailsRequest) => {
    return useQuery<TWeightDetailsResponse, Error>({
        // queryKey: HABIT_QUERY_KEYS.list(params),
        queryKey: ['weight-entries-details', params],
        queryFn: () => {
            return fetchWeightDetails(params);
        }
    });
};