import { WEIGHT_ENTRY_QUERY_KEYS } from "@/config/query-keys";
import axios from "@/lib/axios";
import { IErrorResponse } from "@/types/Error";
import { StoreWeightEntry } from "@/types/WeightEntry";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";

const storeWeightEntry = async (data: StoreWeightEntry) => {
    const response = await axios.post('/api/health/weight-entries', data);
    return response;
}

export const useStoreWeightEntry = (onSuccess: () => void) => {
    const queryClient = useQueryClient();

    return useMutation<any, AxiosError<IErrorResponse>, StoreWeightEntry>({
        mutationFn: storeWeightEntry,
        onSuccess: (res) => {
            queryClient.invalidateQueries({ queryKey: WEIGHT_ENTRY_QUERY_KEYS.all })
            onSuccess();
        },
    });
}