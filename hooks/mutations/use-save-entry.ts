import { HABIT_QUERY_KEYS } from "@/config/query-keys";
import axios from "@/lib/axios";
import { SaveEntryRequest } from "@/types/Entry";
import { IErrorResponse } from "@/types/Error";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";

const saveEntry = async (data: SaveEntryRequest) => {
    const response = await axios.post(`/api/habits/entries`, data);
    return response;
}

export const useSaveEntry = (onSuccess: () => void) => {
    const queryClient = useQueryClient();

    return useMutation<any, AxiosError<IErrorResponse>, SaveEntryRequest>({
        mutationFn: saveEntry,
        onSuccess: (res) => {
            queryClient.invalidateQueries({ queryKey: HABIT_QUERY_KEYS.all });
            onSuccess();
        },
        // onError: (err) => {
        //     if (err.response?.status === 422 && err.response.data?.errors) {
        //         for (const [key, value] of Object.entries(err.response.data?.errors)) {
        //             setError(key as keyof ICreateHabitEntryRequest, { type: "custom", message: value[0] });
        //         }
        //     }
        // }
    });
}