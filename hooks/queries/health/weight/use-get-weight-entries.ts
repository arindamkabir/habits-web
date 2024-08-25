import { WEIGHT_ENTRY_QUERY_KEYS } from "@/config/query-keys";
import axios from "@/lib/axios";
import { WeightEntry } from "@/types/WeightEntry";
import { PaginatedResponse } from "@/types/Pagination";
import { useQuery } from "@tanstack/react-query";

export type WeightEntryListRequest = {
    search: string
}

export type WeightEntryListResponse = PaginatedResponse<WeightEntry>;

const fetchWeightEntryList = async (params: WeightEntryListRequest): Promise<WeightEntryListResponse> => {
    const response = await axios.get<WeightEntryListResponse>(`/api/health/weight-entries`, { params: params });
    return response.data;
};

export const useGetWeightEntryList = (params: WeightEntryListRequest) => {
    return useQuery<WeightEntryListResponse, Error>({
        queryKey: WEIGHT_ENTRY_QUERY_KEYS.list(params),
        queryFn: () => {
            return fetchWeightEntryList(params);
        }
    });
};