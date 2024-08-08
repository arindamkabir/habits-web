import { HABIT_QUERY_KEYS } from "@/config/query-keys";
import axios from "@/lib/axios";
import { StoreHabitRequest } from "@/types/Habit";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const storeHabit = async (data: StoreHabitRequest) => {
    const response = await axios.post('/api/habits/', data);
    return response;
}

export const useStoreHabit = (onSuccess: () => void) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: storeHabit,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: HABIT_QUERY_KEYS.all })
            onSuccess();
        },
    });
}