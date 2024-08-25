import { WEIGHT_ENTRY_QUERY_KEYS } from "@/config/query-keys";
import axios from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

export type GetWeightEntryResponse = {
    data: {
        entry: number;
    };
};

const fetchWeightEntry = async (date: string): Promise<GetWeightEntryResponse> => {
    const response = await axios.get<GetWeightEntryResponse>('/api/health/weight/entries/' + date);
    return response.data;
};

export const useGetWeightEntry = (date: string) => {
    return useQuery<GetWeightEntryResponse, Error>({
        queryKey: WEIGHT_ENTRY_QUERY_KEYS.detail(date),
        queryFn: () => {
            return fetchWeightEntry(date);
        }
    });
};