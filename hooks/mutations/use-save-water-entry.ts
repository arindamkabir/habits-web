import { WATER_ENTRY_QUERY_KEYS } from "@/config/query-keys";
import axios from "@/lib/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type SaveWaterEntryRequest = {
    date: string,
    entry: number,
}

const saveEntry = async (data: SaveWaterEntryRequest) => {
    const response = await axios.post(`/api/health/water/entries`, data);
    return response;
}

export const useSaveWaterEntry = (onSuccess: () => void) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: saveEntry,
        onSuccess: (_, req) => {
            queryClient.invalidateQueries({ queryKey: WATER_ENTRY_QUERY_KEYS.detail(req.date) });
            onSuccess();
        },
    });
}