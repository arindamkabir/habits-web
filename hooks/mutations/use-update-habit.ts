import { HABIT_QUERY_KEYS } from "@/config/query-keys";
import axios from "@/lib/axios";
import { UpdateHabitRequest } from "@/types/Habit";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const updateHabit = async (data: UpdateHabitRequest) => {
    const { slug, ...payload } = data;

    const response = await axios.put(`/api/habits/${slug}`, payload);
    return response;
}

export const useUpdateHabit = (onSuccess: () => void) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: updateHabit,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: HABIT_QUERY_KEYS.all })
            onSuccess();
        },
    });
}