import { HABIT_ENTRY_QUERY_KEYS, HABIT_QUERY_KEYS } from "@/config/query-keys";
import axios from "@/lib/axios";
import { SaveEntryRequest } from "@/types/Entry";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const saveEntry = async (data: SaveEntryRequest) => {
    const response = await axios.post(`/api/habits/entries`, data);
    return response;
}

export const useSaveEntry = (onSuccess: () => void) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: saveEntry,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: HABIT_QUERY_KEYS.all });
            queryClient.invalidateQueries({ queryKey: HABIT_ENTRY_QUERY_KEYS.all });
            onSuccess();
        },
    });
}