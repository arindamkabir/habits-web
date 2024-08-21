import { WATER_ENTRY_QUERY_KEYS } from "@/config/query-keys";
import axios from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

export type GetWaterEntryResponse = {
    data: {
        entry: number;
    };
};

const fetchWaterEntry = async (date: string): Promise<GetWaterEntryResponse> => {
    const response = await axios.get<GetWaterEntryResponse>('/api/health/water/entries/' + date);
    return response.data;
};

export const useGetWaterEntry = (date: string) => {
    return useQuery<GetWaterEntryResponse, Error>({
        queryKey: WATER_ENTRY_QUERY_KEYS.detail(date),
        queryFn: () => {
            return fetchWaterEntry(date);
        }
    });
};