import { WEIGHT_ENTRY_QUERY_KEYS } from "@/config/query-keys";
import axios from "@/lib/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type SaveWeightEntryRequest = {
    date: string,
    entry: number,
}

const saveEntry = async (data: SaveWeightEntryRequest) => {
    const response = await axios.post(`/api/health/weight/entries`, data);
    return response;
}

export const useSaveWeightEntry = (onSuccess: () => void) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: saveEntry,
        onSuccess: (_, req) => {
            queryClient.invalidateQueries({ queryKey: WEIGHT_ENTRY_QUERY_KEYS.detail(req.date) });
            queryClient.invalidateQueries({ queryKey: WEIGHT_ENTRY_QUERY_KEYS.charts() });
            onSuccess();
        },
    });
}