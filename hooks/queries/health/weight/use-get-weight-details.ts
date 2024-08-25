import { WEIGHT_ENTRY_QUERY_KEYS } from "@/config/query-keys";
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
        queryKey: WEIGHT_ENTRY_QUERY_KEYS.detail(params),
        queryFn: () => {
            return fetchWeightDetails(params);
        }
    });
};