import { WEIGHT_ENTRY_QUERY_KEYS } from "@/config/query-keys";
import axios from "@/lib/axios";
import { TStoreWeightEntryRequest } from "@/types/WeightEntry";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const storeWeightEntry = async (data: TStoreWeightEntryRequest) => {
    const response = await axios.post('/api/health/weight-entries', data);
    return response;
}

export const useStoreWeightEntry = (onSuccess: () => void) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: storeWeightEntry,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: WEIGHT_ENTRY_QUERY_KEYS.all })
            onSuccess();
        },
    });
}