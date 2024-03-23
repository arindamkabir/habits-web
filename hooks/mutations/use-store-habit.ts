import { HABIT_QUERY_KEYS } from "@/config/query-keys";
import axios from "@/lib/axios";
import { IErrorResponse } from "@/types/Error";
import { StoreHabitRequest } from "@/types/Habit";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";

const storeHabit = async (data: StoreHabitRequest) => {
    const response = await axios.post('/api/habits/', data);
    return response;
}

export const useStoreHabit = (onSuccess: () => void) => {
    const queryClient = useQueryClient();

    return useMutation<any, AxiosError<IErrorResponse>, StoreHabitRequest>({
        mutationFn: storeHabit,
        onSuccess: (res) => {
            queryClient.invalidateQueries({ queryKey: HABIT_QUERY_KEYS.all })
            onSuccess();
        },
        // onError: (err) => {
        //     console.log(err);
        // }
    });
}